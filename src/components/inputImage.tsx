/* eslint-disable no-unused-vars */
"use client";

import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function InputImage() {
  const [, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>();

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result as string);
    };

    file.readAsDataURL(target.files[0] as Blob);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center">
          {preview ? (
            <img src={preview} alt="Upload preview" className="h-full" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <FaUpload
                size={50}
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
        </div>
        <FileInput
          id="dropzone-file"
          className="hidden"
          accept="image/*"
          onChange={handleOnChange}
        />
      </Label>
    </div>
  );
}
