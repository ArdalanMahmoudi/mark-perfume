"use client";
import { CloudUploadIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Control, useController } from "react-hook-form";
const ThumbnailUploader = ({
  setValue,
  watch,
  name,
}: {
  setValue: any;
  watch: any;
  name: string;
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];
      if (!file) return;
      setValue(name, file);
    },
    multiple: false,
  });
  const file = watch(name);
  const [preview, setPreview] = useState("");
  
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <>
      <div
        {...getRootProps()}
        className="flex h-56 p-4 cursor-pointer flex-col items-center flex-wrap rounded-lg gap-2  border-2 border-dashed mt-2"
      >

        {!file ? (
          <>
            <input {...getInputProps()} />
            <div className="p-2 w-fit border border-grey220 rounded-sm">
              <CloudUploadIcon size={52} />
            </div>
            {isDragActive ? (
              <p>...فایل را رها کنید</p>
            ) : (
              <p>کلیک کنید یا فایل را بکشید.</p>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-2 items-start">
                <button
              className="p-1 rounded-full cursor-pointer bg-gray-50"
              onClick={() => setValue(name, undefined)}
            >
              <X size={18} />
            </button>
            <Image
              src={preview}
              className="size-40"
              width={208}
              height={208}
              alt="prev img"
            />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThumbnailUploader;
