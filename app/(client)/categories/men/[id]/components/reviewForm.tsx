"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Dropzone, { FileRejection } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { uploadReview } from "@/actions/formSubmissions";
import { UserWithReviews } from "@/lib/types";
import { useFormStatus } from "react-dom";

export default function ReviewForm({
  id,
  alreadyReviewed,
}: {
  id: string;
  alreadyReviewed: boolean;
}) {
  const { data: session } = useSession();
  const [isDragOver, setIsDragOver] = useState(false);
  const { pending } = useFormStatus();
  const [images, setImages] = useState<File[]>();
  function acceptFiles(acceptedFiles: File[]) {
    setIsDragOver(false);
    setImages(acceptedFiles);
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
    } else if (rejectedFiles[0].errors[0].code == "too-many-files") {
      toast({
        variant: "destructive",
        title: "Too many files",
        description: "Please select upto 3 images",
      });
    }
  }
  function handleReviewSubmit(formData: FormData) {
    images?.map((image) => {
      formData.append("images", image);
    });
    formData.append("pid", id);
    formData.append("uid", session?.user.id as string);
    uploadReview(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {true && (
          <Button variant="secondary" className="mt-4">
            Write a review
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this product with others
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted w-full h-full rounded-lg p-5 flex items-center justify-center">
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
            maxFiles={3}
            maxSize={2097152}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex items-center justify-center cursor-pointer"
              >
                <input {...getInputProps()} name="images" />
                {!isDragOver ? (
                  <div className="flex flex-col h-full w-full p-4 items-center justify-center gap-2">
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
                        Max 3 images upto 2MB each
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full w-full p-4 items-center justify-center border-2 border-dashed gap-2">
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
                        Max 3 images upto 2MB each
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <form action={(FormData) => handleReviewSubmit(FormData)}>
          <div className="grid gap-4 py-4">
            <Input
              id="title"
              name="title"
              placeholder="Title"
              className="col-span-3"
              maxLength={50}
              autoComplete="off"
              required
            />
            <Textarea
              id="message"
              name="description"
              defaultValue=""
              placeholder="Message"
              className="col-span-3 h-[150px] max-h-[300px] max-[640px]:h-[300px]"
              maxLength={550}
              autoComplete="off"
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={pending}>
                {pending ? "Posting Review" : "Post Review"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
