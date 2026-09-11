import { randomUUID } from "crypto";
import { supabase } from "./supabase";


const BUCKET = "products";

export async function uploadFile(
  file: File,
  folder = "products",
) {
  const extension = file.name.split(".").pop();
  const fileName = `${folder}/${randomUUID()}.${extension}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("SUPABASE UPLOAD ERROR:", error);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteFile(files: string[]) {
  if (!files?.length) return;

  const paths = files
    .map((url) => {
      try {
        const parsedUrl = new URL(url);
        const marker = `/storage/v1/object/public/${BUCKET}/`;

        const index = parsedUrl.pathname.indexOf(marker);

        if (index === -1) return null;

        return parsedUrl.pathname.slice(index + marker.length);
      } catch {
        return null;
      }
    })
    .filter((path): path is string => Boolean(path));

  if (!paths.length) return;

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove(paths);

  if (error) {
    console.error("SUPABASE DELETE ERROR:", error);
  }
}