"use server";

import { roles } from "../constant";
import { prisma } from "../prisma";
import { getCurrentUser } from "../queries/user.queries";
import { createProductSchema } from "../schemas/createProduct.schema";
import { deleteFile, uploadFile } from "../upload";
import slugify from "slugify";
export const createProductAction = async (
  initialState: any,
  formData: FormData,
) => {
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

    return {success:"true", message:"محصول مورد نظر حذف شد"}
  } catch {
    return { success: false, message: "err" };
  }
};
