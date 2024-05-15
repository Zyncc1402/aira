"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/actions/formSubmissions";
import CreateProductButton from "./CreateProductButton";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";

const CreateProductForm = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState(false);
  const [images, setImages] = useState<File[] | null>(null);
  function acceptFiles(acceptedFiles: File[]) {
    const sortedArray = acceptedFiles.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setIsDragOver(false);
    setDroppedFiles(true);
    setImages(sortedArray);
  }
  function rejectFiles(rejectedFiles: FileRejection[]) {
    setIsDragOver(false);
    if (rejectedFiles[0].errors[0].code == "file-too-large") {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select a file smaller than 2MB",
      });
    } else if (rejectedFiles[0].errors[0].code == "file-invalid-type") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select a PNG, JPG or JPEG",
      });
    }
  }

  async function handleFormSubmit(formData: FormData) {
    images?.map((image) => {
      formData.append("images", image);
    });
    const res = await createProduct(formData);
    if (res?.noImage) {
      toast({
        variant: "destructive",
        title: "No images uploaded",
        description: "Please select atleast 1 image",
      });
    }
  }

  return (
    <div className="flex flex-wrap gap-16 max-[734px]:flex-col mt-8 mb-16">
      <form
        action={(formData) => handleFormSubmit(formData)}
        className="flex flex-1 max-[734px]:order-2 flex-col gap-8 min-w-[320px]"
      >
        <Input name="title" required className="" placeholder="Title" />
        <Textarea
          placeholder="Description"
          name="description"
          className="resize-y h-[150px]"
          required
        />
        <Input
          name="color"
          autoCapitalize="false"
          type="text"
          required
          placeholder="Color"
        />
        <Input name="price" type="number" required placeholder="Price" />
        <Input name="sm" type="number" required placeholder="Small Qty" />
        <Input name="md" type="number" required placeholder="Medium Qty" />
        <Input name="lg" type="number" required placeholder="Large Qty" />
        <Input name="xl" type="number" required placeholder="Extra Large Qty" />
        <select
          name="featured"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value={1}>Is Featured</option>
          <option value={""} selected>
            Not Featured
          </option>
        </select>
        <select
          name="category"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="men">Men</option>
        </select>
        <select
          name="isArchived"
          defaultValue={""}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value={1}>Is Archived</option>
          <option value={""}>Not Archived</option>
        </select>
        <Label>Product Details</Label>
        <Input name="fabric" required placeholder="Fabric" />
        <Input name="transparency" required placeholder="Transparency" />
        <Input name="weavePattern" required placeholder="Weave Pattern" />
        <Input name="fit" required placeholder="Fit" />
        <CreateProductButton Atext="Creating..." text="Create" />
      </form>
      <div className="flex-1 flex justify-center max-[734px]:order-1">
        {!droppedFiles ? (
          <Dropzone
            onDropAccepted={acceptFiles}
            onDropRejected={rejectFiles}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpeg"],
              "image/jpg": [".jpg"],
            }}
            maxSize={2097152}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex h-[500px] w-full min-w-[320px] items-center rounded-lg p-4 bg-muted justify-center cursor-pointer"
              >
                <input {...getInputProps()} name="images" required />
                {!isDragOver ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <IoCloudUploadOutline size={27} />
                    <h1 className="font-medium text-sm">
                      Click to upload or{" "}
                      <span className="font-bold">Drag and Drop</span>
                    </h1>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">
                        PNG JPG JPEG
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Max 2MB per Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <IoCloudUploadOutline size={27} />
                    <h1 className="font-medium text-sm">
                      Click to upload or{" "}
                      <span className="font-bold">Drag and Drop</span>
                    </h1>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">
                        PNG JPG JPEG
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Max 2MB per Image
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        ) : (
          <>
            <div className="flex gap-4 flex-wrap h-fit">
              {images?.map((image, index) => (
                <div key={index}>
                  <Image
                    src={URL.createObjectURL(image)}
                    width={200}
                    height={200}
                    alt="product image"
                    className="object-cover aspect-square rounded-md"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateProductForm;
