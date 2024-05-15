"use client";

import React, { useState } from "react";
import {
  Dialog,
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
import Image from "next/image";
import { useSession } from "next-auth/react";
import { uploadReview } from "@/actions/formSubmissions";
import { toast } from "@/components/ui/use-toast";
import { Divide } from "lucide-react";

export default function Reviews({ id }: { id: string }) {
  const { data: session } = useSession();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [images, setImages] = useState<File[]>();
  function acceptFiles(acceptedFiles: File[]) {
    setIsDragOver(false);
    setIsUploaded(true);
    setImages(acceptedFiles);
    console.log(images);
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
  return (
    <div className="container mt-[100px]">
      <h1 className="text-2xl font-semibold">Reviews</h1>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="mt-4">
              Write a review
            </Button>
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
            <form
              action={(FormData) => {
                const formObject = {
                  images: images,
                  formData: FormData,
                  pid: id,
                  uid: session?.user.id as string,
                };
                uploadReview(formObject);
              }}
            >
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
                <Button type="submit">Post Review</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <div className="mt-5 rounded-lg p-4 bg- max-w-[768px]">
          <div className="flex gap-2 items-center justify-start">
            <Image
              src={session?.user.image || ""}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full"
              priority
            />
            <h1 className="font-semibold">{session?.user.name}</h1>
          </div>
          <h1 className="font-medium mt-3">
            Walking on Clouds: Nike Air Max Plus is a Game Changer!
          </h1>
          <p className="mt-3 text-[15px] line-clamp-[7] md:line-clamp-4 lg:line-clamp-3">
            Let me start by saying, these Nike Air Max Plus sneakers have
            completely transformed my walking experience. From the moment I
            slipped them on, I felt like I was walking on clouds. The cushioning
            is next-level, providing unparalleled comfort with every step. Not
            only are they comfortable, but they're also incredibly stylish. The
            design is sleek and modern, turning heads wherever I go. Whether I'm
            running errands or hitting the gym, these shoes offer the perfect
            blend of style and performance. Needless to say, I couldn't be
            happier with my purchase. If you're in the market for a new pair of
            kicks, do yourself a favor and give the Nike Air Max Plus a try –
            you won't be disappointed!
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602596/sfaplm6frr2duulvnyzi.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602595/erebf1ps49iefq3fvgyp.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602597/itpd7w5wjblqsm3mtcy1.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
          </div>
        </div>
        <div className="mt-5 rounded-lg p-4 bg-  max-w-[768px]">
          <div className="flex gap-2 items-center justify-start">
            <Image
              src={session?.user.image || ""}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full"
              priority
            />
            <h1 className="font-semibold">{session?.user.name}</h1>
          </div>
          <h1 className="font-medium mt-3">
            Step Up Your Sneaker Game: Nike Air Max Plus is a Winner!
          </h1>
          <p className="mt-3 line-clamp-[7] md:line-clamp-4 lg:line-clamp-3">
            Let me just say, the Nike Air Max Plus sneakers are an absolute
            game-changer! From the moment I put them on, I knew I had found my
            new favorite kicks. The comfort level is off the charts – it feels
            like walking on a cloud. But it's not just about comfort – these
            shoes also deliver in the style department. The sleek design and
            vibrant colors make a statement wherever I go. Whether I'm running
            errands or hitting the gym, these shoes keep me looking fresh and
            feeling great. Overall, I couldn't be happier with my purchase. If
            you're in the market for a new pair of sneakers, do yourself a favor
            and check out the Nike Air Max Plus – you won't be disappointed!
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602596/sfaplm6frr2duulvnyzi.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602595/erebf1ps49iefq3fvgyp.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602597/itpd7w5wjblqsm3mtcy1.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
          </div>
        </div>
        <div className="mt-5 rounded-lg p-4 bg- max-w-[768px]">
          <div className="flex gap-2 items-center justify-start">
            <Image
              src={session?.user.image || ""}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full"
              priority
            />
            <h1 className="font-semibold">{session?.user.name}</h1>
          </div>
          <h1 className="mt-3 font-medium">
            Max Comfort, Max Style: Nike Air Max Plus Delivers!
          </h1>
          <p className="mt-3 line-clamp-[7] md:line-clamp-4 lg:line-clamp-3">
            These Nike Air Max Plus sneakers are an absolute game-changer! As
            someone who spends a lot of time on my feet, comfort is key, and
            these shoes deliver in spades. The cushioning is like walking on a
            plush carpet, providing support and stability with every stride. Not
            to mention, the design is top-notch. The sleek lines and bold colors
            make a statement, whether I'm hitting the streets or the gym. Plus,
            the quality is undeniable – these shoes are built to last. Overall,
            I couldn't be happier with my purchase. If you're in need of a
            versatile, stylish, and comfortable sneaker, look no further than
            the Nike Air Max Plus!
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602596/sfaplm6frr2duulvnyzi.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602595/erebf1ps49iefq3fvgyp.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
            <Image
              src={
                "https://res.cloudinary.com/dfdusmp26/image/upload/v1715602597/itpd7w5wjblqsm3mtcy1.jpg"
              }
              width={80}
              height={80}
              alt="review image"
              priority
              className="rounded-md aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
