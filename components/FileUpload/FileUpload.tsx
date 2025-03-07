"use client";

import React from "react";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url: string) => void;
  value?: string;
  endpoint: "imageUploader" | "messageFile";
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative size-16">
        <Image
          src={value}
          alt="Uploaded image"
          className="rounded-full"
          fill
          objectFit="cover"
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      className="dark:border dark:border-dark-10"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
