import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="py-[100px] container">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories/men">Women</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex mt-10 flex-wrap md:flex-nowrap gap-16">
        <div className="md:basis-1/2 w-screen">
          <Skeleton className="w-[100%] h-[50vh] md:h-[60vh]" />
        </div>
        <div className="md:basis-1/2 flex flex-col gap-4 w-screen">
          <Skeleton className="w-[100%] h-[40px]" />
          <Skeleton className="w-[100%] h-[20px]" />
          <Skeleton className="w-[100%] h-[30px]" />
          <Skeleton className="w-[100%] h-[30px]" />
          <Skeleton className="w-[100%] h-[30px]" />
          <div className="flex flex-col gap-6">
            <Button
              aria-label="Button"
              className="rounded-full"
              variant={"outline"}
            >
              <IoCartOutline className="mr-3" size={27} />
              Add to Cart
            </Button>
            <Button
              aria-label="Button"
              className="rounded-full"
              variant={"secondary"}
            >
              <IoMdHeart className="mr-3" size={23} />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
