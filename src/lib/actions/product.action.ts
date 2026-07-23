"use server";

import { prisma } from "../prisma";
import { createProductSchema } from "../schemas/createProduct.schema";
import { uploadFile } from "../upload";

export const createProductAction = async (
  initialState: any,
  formData: FormData,
) => {
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
  const exist = await prisma.product.findUnique({
    where: {
      slug: product.slug,
    },
  });
  if (exist) {
    return {
      success: false,
      message: "این آدرس URL قبلا ثبت شده است",
    };
  }
  const thumbnailUrl = await uploadFile(thumbnail);
  const galleryUrl = await Promise.all(gallery.map((file) => uploadFile(file)));

  await prisma.product.create({
    data: {
      thumbnail: thumbnailUrl,
      gallery:galleryUrl ,
    },
  });

  return { success: true, message: "دوره با موفقیت ایجاد شد" };
};
