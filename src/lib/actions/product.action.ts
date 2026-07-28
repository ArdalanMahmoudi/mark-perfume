"use server";

import { roles } from "../constant";
import { prisma } from "../prisma";
import { getCurrentUser } from "../queries/user.queries";
import { createProductSchema } from "../schemas/createProduct.schema";
import { uploadFile } from "../upload";
import slugify from "slugify";
export const createProductAction = async (
  initialState: any,
  formData: FormData,
) => {
  const user = await getCurrentUser()
  if (!user || user.role !== roles.ADMIN) {
    throw new Error("Unauthorized")
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
  let slug = baseSlug
  let counter = 1;
  const exist = await prisma.product.findUnique({
    where: {
      slug,
    },
  });
  while (exist) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  // 

  const thumbnailUrl = await uploadFile(thumbnail,slug);
  const galleryUrl = await Promise.all(gallery.map((file) => uploadFile(file,slug)));

  await prisma.product.create({
    data: {
      ...product,
      slug,
      thumbnail: thumbnailUrl,
      gallery: {
        create: galleryUrl.map((url) => ({
          url: url,
        })),
      },
    },
  });

  return { success: true, message: "محصول با موفقیت ایجاد شد" };
};
