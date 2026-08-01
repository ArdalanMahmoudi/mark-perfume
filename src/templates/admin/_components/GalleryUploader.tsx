"use client";
import { CloudUploadIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const GalleryUploader = ({ name, setValue, watch }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles) {
      setValue(name, acceptedFiles);
    },
    multiple: true,
  });

  const files = watch(name,[]);
  const previews = useMemo(() => {
    return files.map((file) => file instanceof File ? URL.createObjectURL(file) 
    : file
    );
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);
  return (
    <div
      className="flex h-56 p-4 cursor-pointer flex-col items-center flex-wrap rounded-lg gap-2  border-2 border-dashed mt-2"
      {...getRootProps()}
    >
      {files?.length > 0 ? (
        <div className="flex justify-center items-center gap-1">
          {previews.map((preview, index) => (
            <div className="flex flex-col gap-2 items-start">
              <button
              type="button"
                className="p-1 rounded-full cursor-pointer bg-gray-50"
                onClick={() => {
                  const newFile = files.filter((_, i) => i !== index);
                  setValue(name, newFile);
                }}
              >
                <X size={14} />
              </button>

              <Image
                src={preview}
                className="size-15"
                width={208}
                height={208}
                alt="prev img"
              />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default GalleryUploader;
