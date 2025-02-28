"use client";

import React from "react";

import { UploadDropzone } from "@/utils/uploadthing";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "imageUploader" | "messageFile";
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
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
