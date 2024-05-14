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
import Dropzone from "react-dropzone";
import { IoCloudUploadOutline, IoImageOutline } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Reviews() {
  const { data: session } = useSession();
  const [isDragOver, setIsDragOver] = useState(false);
  function acceptFiles() {
    console.log("Files Accepted");
  }
  function rejectFiles() {
    console.log("Files Rejected");
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
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="h-full w-full flex items-center justify-center"
                  >
                    <input {...getInputProps()} />
                    {!isDragOver && (
                      <div className="flex flex-col items-center justify-center gap-2 bg-red">
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
                            MAX 2MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="grid gap-4 py-4">
              <Input
                id="title"
                name="title"
                placeholder="Title"
                className="col-span-3"
                maxLength={50}
                autoComplete="off"
              />
              <Textarea
                id="message"
                name="message"
                defaultValue=""
                placeholder="Message"
                className="col-span-3 max-h-[300px]"
                maxLength={550}
                autoComplete="off"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Post Review</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="mt-5 rounded-lg p-4 bg-gray-50 max-w-[768px]">
          <div className="flex gap-2 items-center justify-start">
            <Image
              src={session?.user.image || ""}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full"
              priority
            />
            <h1 className="font-semibold">
              Walking on Clouds: Nike Air Max Plus is a Game Changer!
            </h1>
          </div>
          <p className="mt-3 text-[15px] line-clamp-3">
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
        <div className="mt-5 rounded-lg p-4 bg-gray-50  max-w-[768px]">
          <div className="flex gap-2 items-center justify-start">
            <Image
              src={session?.user.image || ""}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full"
              priority
            />
            <h1 className="font-semibold">
              Step Up Your Sneaker Game: Nike Air Max Plus is a Winner!
            </h1>
          </div>
          <p className="mt-3 line-clamp-3">
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
        <div className="mt-5 rounded-lg p-4 bg-gray-50 max-w-[768px]">
          <div className="flex gap-2 items-center justify-start">
            <Image
              src={session?.user.image || ""}
              width={30}
              height={30}
              alt="Profile Picture"
              className="rounded-full"
              priority
            />
            <h1 className="font-semibold">
              Max Comfort, Max Style: Nike Air Max Plus Delivers!
            </h1>
          </div>
          <p className="mt-3 line-clamp-3">
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
