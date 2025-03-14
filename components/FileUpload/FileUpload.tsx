"use client";

import React from "react";

import Image from "next/image";

// uploadThing
import { UploadDropzone } from "@/utils/uploadthing";

// icons
import { X } from "lucide-react";

interface FileMetaData {
  key: string;
  ufsUrl: string;
}

interface FileUploadProps {
  onChange: (url: string) => void;
  value?: string;
  endpoint: "imageUploader" | "messageFile";
  setFileMetaData: React.Dispatch<React.SetStateAction<FileMetaData>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
  setFileMetaData,
}) => {
  const handleDeleteFile = async () => {
    console.log("deleting file");
  };

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

        <button
          type="button"
          onClick={handleDeleteFile}
          className="absolute p-1.5 -top-2 -right-2 flex item-center justify-center bg-rose-600 hover:bg-rose-500 transition-colors duration-75 rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="dark:border dark:border-dark-10"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        setFileMetaData({
          key: res?.[0].key,
          ufsUrl: res?.[0].ufsUrl,
        });
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
