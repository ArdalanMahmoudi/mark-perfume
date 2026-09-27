"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";
import { requireAdmin } from "../session";
import { deleteFile, uploadFile } from "../upload";
import slugify from "slugify";

async function generateUniqueSlug(name: string, excludeId?: string) {
  const baseSlug = slugify(name, { lower: true, strict: true, trim: true });
  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.product.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

export const createProductAction = async (formData: FormData) => {
  const tempFiles: string[] = [];

  try {
    await requireAdmin();

    const thumbnail = formData.get("thumbnail");
    const gallery = formData.getAll("gallery");
    const specificationRaw = formData.get("specification");

    if (typeof specificationRaw !== "string") {
      return { success: false, message: "ویژگی‌های محصول نامعتبر است" };
    }

    let specification: unknown;
    try {
      specification = JSON.parse(specificationRaw);
    } catch {
      return { success: false, message: "ویژگی‌های محصول نامعتبر است" };
    }

    const rawData = {
      name: formData.get("name"),
      categoryId: formData.get("categoryId"),
      price: Number(formData.get("price")),
      discount: Number(formData.get("discount") ?? 0),
      description: formData.get("description"),
      details: formData.get("details"),
      stock: Number(formData.get("stock")),
      volume: Number(formData.get("volume") ?? 0),
      specification,
      thumbnail,
      gallery,
    };

    const result = createProductSchema.safeParse(rawData);
    if (!result.success) {
      console.error("CREATE PRODUCT VALIDATION ERROR:", result.error.flatten());
      return {
        success: false,
        message: "اطلاعات وارد شده صحیح نیست",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const product = result.data;
    const slug = await generateUniqueSlug(product.name);

    let thumbnailUrl: string;
    let galleryUrls: string[];
    try {
      thumbnailUrl = await uploadFile(product.thumbnail, slug);
      tempFiles.push(thumbnailUrl);

      galleryUrls = [];
      for (const file of product.gallery) {
        const url = await uploadFile(file, slug);
        tempFiles.push(url);
        galleryUrls.push(url);
      }
    } catch (err) {
      console.error("CREATE PRODUCT UPLOAD ERROR:", err);
      await deleteFile(tempFiles);
      return { success: false, message: "خطا در آپلود تصاویر، مجدد امتحان کنید" };
    }

    
    try {
      await prisma.product.create({
        data: {
          name: product.name,
          slug,
          categoryId: product.categoryId,
          price: product.price,
          discount: product.discount,
          description: product.description,
          details: product.details,
          specification: product.specification,
          stock: product.stock,
          volume: product.volume ?? 0,
          thumbnail: thumbnailUrl,
          gallery: { create: galleryUrls.map((url) => ({ url })) },
        },
      });
    } catch (err) {
      console.error("CREATE PRODUCT DB ERROR:", err);
      await deleteFile(tempFiles);
      return { success: false, message: "خطا در ثبت محصول، مجدد امتحان کنید" };
    }

    revalidatePath(`/products/${slug}`);
    revalidatePath("/admin/products");
    return { success: true, message: "محصول با موفقیت ایجاد شد" };
  } catch (err) {
    console.error("CREATE PRODUCT ACTION ERROR:", err);
    await deleteFile(tempFiles);
    return { success: false, message: "مشکلی پیش آمد، مجدد امتحان کنید" };
  }
};

export const deleteProductAction = async (productId: string) => {
  try {
    await requireAdmin();

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { gallery: true },
    });
    if (!product) {
      return { success: false, message: "محصول پیدا نشد" };
    }

    const hasOrders = await prisma.orderItem.findFirst({
      where: { productId: product.id },
    });
    if (hasOrders) {
      
      await prisma.product.update({
        where: { id: product.id },
        data: { isArchived: true, stock: 0 },
      });
      revalidatePath(`/products/${product.slug}`);
      revalidatePath("/admin/products");
      return { success: true, message: "محصول دارای سابقه سفارش است و به‌جای حذف، آرشیو شد" };
    }

    
    await prisma.product.delete({ where: { id: product.id } });

    await deleteFile([product.thumbnail, ...product.gallery.map((f) => f.url)]);

    revalidatePath(`/products/${product.slug}`);
    revalidatePath("/admin/products");
    return { success: true, message: "محصول مورد نظر حذف شد" };
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    return { success: false, message: "خطا در حذف محصول، مجدد امتحان کنید" };
  }
};

export const updateProductAction = async (
  productId: string,
  formData: FormData,
) => {
  const tempFiles: string[] = [];

  try {
    await requireAdmin();

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { gallery: true },
    });
    if (!existingProduct) {
      return { success: false, message: "محصول پیدا نشد" };
    }

    const specificationRaw = formData.get("specification");
    if (typeof specificationRaw !== "string") {
      return { success: false, message: "ویژگی‌های محصول نامعتبر است" };
    }

    let specification: unknown;
    try {
      specification = JSON.parse(specificationRaw);
    } catch {
      return { success: false, message: "ویژگی‌های محصول نامعتبر است" };
    }

    const thumbnail = formData.get("thumbnail");
    const gallery = formData.getAll("gallery");
    const rawDatas = Object.fromEntries(formData.entries());

    const data = {
      id: productId,
      ...rawDatas,
      price: Number(formData.get("price")),
      discount: Number(formData.get("discount") ?? 0),
      stock: Number(formData.get("stock")),
      volume: Number(formData.get("volume") ?? 0),
      specification,
      thumbnail:
        thumbnail instanceof File && thumbnail.size > 0
          ? thumbnail
          : (thumbnail as string),
      gallery: gallery.filter((item) =>
        item instanceof File ? item.size > 0 : true,
      ),
    };

    const result = updateProductSchema.safeParse(data);
    if (!result.success) {
      console.error("UPDATE PRODUCT VALIDATION ERROR:", result.error.flatten());
      return {
        success: false,
        message: "اطلاعات وارد شده صحیح نیست",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const product = result.data;

    const slug =
      product.name !== existingProduct.name
        ? await generateUniqueSlug(product.name, productId)
        : existingProduct.slug;


    let thumbnailUrl = product.thumbnail as string;
    const oldThumbnailToDelete =
      product.thumbnail instanceof File ? existingProduct.thumbnail : null;

    let finalGallery: string[];
    try {
      if (product.thumbnail instanceof File) {
        thumbnailUrl = await uploadFile(product.thumbnail, slug);
        tempFiles.push(thumbnailUrl);
      }

      finalGallery = [];
      for (const item of product.gallery) {
        if (item instanceof File) {
          const url = await uploadFile(item, slug);
          tempFiles.push(url);
          finalGallery.push(url);
        } else {
          finalGallery.push(item);
        }
      }
    } catch (err) {
      console.error("UPDATE PRODUCT UPLOAD ERROR:", err);
      await deleteFile(tempFiles);
      return { success: false, message: "خطا در آپلود تصاویر، مجدد امتحان کنید" };
    }

    const removedGalleryUrls = existingProduct.gallery
      .map((f) => f.url)
      .filter((url) => !finalGallery.includes(url));
    const newUrlToCreate = finalGallery.filter(
      (url) => !existingProduct.gallery.some((f) => f.url === url),
    );

    
    try {
      await prisma.product.update({
        where: { id: productId },
        data: {
          name: product.name,
          categoryId: product.categoryId,
          price: product.price,
          discount: product.discount,
          description: product.description,
          details: product.details,
          specification: product.specification,
          stock: product.stock,
          volume: product.volume ?? 0,
          slug,
          thumbnail: thumbnailUrl,
          gallery: {
            deleteMany: { url: { in: removedGalleryUrls } },
            create: newUrlToCreate.map((url) => ({ url })),
          },
        },
      });
    } catch (err) {
      console.error("UPDATE PRODUCT DB ERROR:", err);
      await deleteFile(tempFiles);
      return { success: false, message: "خطا در ویرایش محصول مجدد امتحان کنید" };
    }

    if (oldThumbnailToDelete) await deleteFile([oldThumbnailToDelete]);
    if (removedGalleryUrls.length > 0) await deleteFile(removedGalleryUrls);

    revalidatePath(`/products/${slug}`);
    revalidatePath("/admin/products");
    return { success: true, message: "تغییرات محصول انجام شد" };
  } catch (err) {
    console.error("UPDATE PRODUCT ACTION ERROR:", err);
    await deleteFile(tempFiles);
    return { success: false, message: "مشکلی پیش آمد، مجدد امتحان کنید" };
  }
};