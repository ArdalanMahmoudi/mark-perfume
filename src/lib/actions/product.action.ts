"use server";

import { roles } from "../constant";
import { prisma } from "../prisma";
import { getCurrentUser } from "../queries/user.queries";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";
import { deleteFile, uploadFile } from "../upload";
import slugify from "slugify";

export const createProductAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user || user.role !== roles.ADMIN) {
    throw new Error("Unauthorized");
  }
  const rawDatas = Object.fromEntries(formData.entries());
  const specification = JSON.parse(formData.get("specification") as string);
  const thumbnail = formData.get("thumbnail") as File;
  const gallery = formData.getAll("gallery") as File[];

  const data = {
    ...rawDatas,
    specification,
    thumbnail,
    gallery,
  };

  const result = createProductSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  const product = result.data;
  // create slug unique
  const baseSlug = slugify(product.name, {
    lower: true,
    strict: true,
    trim: true,
  });
  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.product.findUnique({
      where: {
        slug,
      },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  //
  let tempFiles: string[] = [];

  try {
    const thumbnailUrl = await uploadFile(thumbnail, slug);
    const galleryUrl = await Promise.all(
      gallery.map(async (file) => {
        const url = await uploadFile(file, slug);
        tempFiles.push(url);
        return url;
      }),
    );

    await prisma.product.create({
      data: {
        ...product,
        slug,
        thumbnail: thumbnailUrl,
        gallery: {
          create: galleryUrl.map((url) => ({
            url,
          })),
        },
      },
    });
  } catch (err) {
    await deleteFile(tempFiles);
    return { success: false, message: "خطا در ثبت محصول مجدد امتحان کنید" };
  }

  return { success: true, message: "محصول با موفقیت ایجاد شد" };
};

export const deleteProductAction = async (productId) => {
  const user = await getCurrentUser();
  if (!user || user.role !== roles.ADMIN) {
    throw new Error("Unauthorized");
  }

  try {
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
  const user = await getCurrentUser();
  if (!user || user.role !== roles.ADMIN) {
    throw new Error("Unauthorized");
  }

  const rawDatas = Object.fromEntries(formData.entries());
  const specification = JSON.parse(formData.get("specification") as string);
  const thumbnail = formData.get("thumbnail");
  const gallery = formData.getAll("gallery") ;

  const data = {
    id: productId,
    ...rawDatas,
    specification,
    thumbnail: thumbnail instanceof File && thumbnail.size > 0 ? thumbnail : (rawDatas.thumbnailUrl as string),
    gallery : gallery.filter(item => (item instanceof File) || item.size > 0),
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
    return {success:false, message:" محصول پیدا نشد"}
  }

  const slug = existingProduct?.slug;

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
      await deleteFile([removedGalleryUrls]);
    }

    const newUrlToCreate = finalGallery.filter( // select new file
      (url) => !existingProduct?.gallery.some((f) => f.url === url),
    );

    await prisma.product.update({
      where: { id: productId },
      data: {
        ...product,
        thumbnail: thumbnailUrl,
        gallery: {
          deleteMany: { // delete old file in db
            url: { in: removedGalleryUrls },
          },
          create: newUrlToCreate.map((url) => { //create new file in db
            url;
          }),
        },
      },
    });
  } catch (err) {
    await deleteFile(tempFiles);
    return { success: false, message: "خطا در ثبت محصول مجدد امتحان کنید" };
  }

  return { success: true, message: "محصول با موفقیت ایجاد شد" };
};
