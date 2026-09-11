"use server";

import { prisma } from "../prisma";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";
import { requireAdmin } from "../session";
import { deleteFile, uploadFile } from "../upload";
import slugify from "slugify";

export const createProductAction = async (formData: FormData) => {
  try {
    await requireAdmin();

    const thumbnail = formData.get("thumbnail");
    const gallery = formData.getAll("gallery");

    const specificationRaw = formData.get("specification");

    if (typeof specificationRaw !== "string") {
      return {
        success: false,
        message: "ویژگی‌های محصول نامعتبر است",
      };
    }

    const specification = JSON.parse(specificationRaw);

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
      console.error(
        "CREATE PRODUCT VALIDATION ERROR:",
        result.error.flatten(),
      );

      return {
        success: false,
        message: "اطلاعات وارد شده صحیح نیست",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const product = result.data;

    const baseSlug = slugify(product.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (
      await prisma.product.findUnique({
        where: { slug },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const tempFiles: string[] = [];

    try {
      const thumbnailUrl = await uploadFile(product.thumbnail, slug);
      tempFiles.push(thumbnailUrl);

      const galleryUrls = await Promise.all(
        product.gallery.map(async (file) => {
          const url = await uploadFile(file, slug);
          tempFiles.push(url);
          return url;
        }),
      );

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

          gallery: {
            create: galleryUrls.map((url) => ({
              url,
            })),
          },
        },
      });

      return {
        success: true,
        message: "محصول با موفقیت ایجاد شد",
      };
    } catch (err) {
      console.error("CREATE PRODUCT ERROR:", err);

      await deleteFile(tempFiles);

      return {
        success: false,
        message: "خطا در ثبت محصول، مجدد امتحان کنید",
      };
    }
  } catch (err) {
    console.error("CREATE PRODUCT ACTION ERROR:", err);

    return {
      success: false,
      message: "مشکلی پیش آمد، مجدد امتحان کنید",
    };
  }
};

export const deleteProductAction = async (productId:string) => {
  try {
    await requireAdmin();
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        gallery: true,
      },
    });
    if (!product) {
      return {
        success: false,
        message: "محصول پیدا نشد",
      };
    }
    await deleteFile([product.thumbnail]);
    await deleteFile(product.gallery.map((file) => file.url));

    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });

    return { success: "true", message: "محصول مورد نظر حذف شد" };
  } catch {
    return { success: false, message: "err" };
  }
};





export const updateProductAction = async (
  productId: string,
  formData: FormData,
) => {
  await requireAdmin();

  const rawDatas = Object.fromEntries(formData.entries());
  const specification = JSON.parse(formData.get("specification") as string);
  const thumbnail = formData.get("thumbnail");
  const gallery = formData.getAll("gallery");
  console.log("rawDatas", rawDatas);

  const data = {
    id: productId,
    ...rawDatas,
    specification,
    thumbnail:
      thumbnail instanceof File && thumbnail.size > 0
        ? thumbnail // file -> for new file
        : (thumbnail as string), // string url ->  for old file
    gallery: gallery.filter((item) => {
      if (item instanceof File) {
        return item.size > 0; // file -> for new file
      }
      return true; // string url ->  for old file
    }),
  };

  const result = updateProductSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  const product = result.data;
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      gallery: true,
    },
  });

  if (!existingProduct) {
    return { success: false, message: " محصول پیدا نشد" };
  }

  let slug = existingProduct.slug; // old slug
  if (product.name !== existingProduct.name) {
    // if change name should change slug
    const baseSlug = slugify(product.name, {
      lower: true,
      strict: true,
      trim: true,
    });
    slug = baseSlug;
    let counter = 1;
    while (
      await prisma.product.findFirst({
        where: { slug },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  let tempFiles: string[] = [];

  try {
    // upload new thumbnail File && delete old File
    let thumbnailUrl = product.thumbnail as string;
    if (product.thumbnail instanceof File) {
      thumbnailUrl = await uploadFile(product.thumbnail, slug);
      tempFiles.push(thumbnailUrl);
      await deleteFile([existingProduct?.thumbnail]);
    }

    //upload new gallery File
    const finalGallery: string[] = [];
    for (const item of product.gallery) {
      if (item instanceof File) {
        const url = await uploadFile(item, slug);
        finalGallery.push(url);
      } else {
        finalGallery.push(item);
      }
    }

    // delete old file in gallery -> Diffing algorhytm
    const removedGalleryUrls = existingProduct?.gallery // select old file
      .map((f) => f.url)
      .filter((url) => !finalGallery.includes(url));

    if (removedGalleryUrls?.length > 0) {
      await deleteFile(removedGalleryUrls);
    }

    const newUrlToCreate = finalGallery.filter(
      // select new file
      (url) => !existingProduct?.gallery.some((f) => f.url === url),
    );

    await prisma.product.update({
      where: { id: productId },
      data: {
        ...product,
        slug,
        thumbnail: thumbnailUrl,
        gallery: {
          deleteMany: {
            // delete old file in db
            url: { in: removedGalleryUrls },
          },
          create: newUrlToCreate.map((url) => {
            return { url };
          }), //create new file in db
        },
      },
    });
    return { success: true, message: "تغییرات محصول انجام شد" };
  } catch (err) {
    await deleteFile(tempFiles);
    return { success: false, message: "خطا در ویرایش محصول مجدد امتحان کنید" };
  }
};
