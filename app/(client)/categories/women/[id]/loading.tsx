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
    <section className="py-[100px]">
      <Breadcrumb className="container">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories/men">Women</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex mt-10 flex-wrap md:flex-nowrap gap-16 md:container m-0">
        <div className="md:basis-1/2 w-screen ">
          <div className="flex flex-col">
            <Skeleton className="w-[100%] h-[50vh] md:h-[60vh] rounded-none md:rounded-md" />
            <div className="flex gap-2 mt-3 overflow-hidden container">
              <Skeleton className="w-[90px] h-[90px] flex-shrink-0" />
              <Skeleton className="w-[90px] h-[90px] flex-shrink-0" />
              <Skeleton className="w-[90px] h-[90px] flex-shrink-0" />
              <Skeleton className="w-[90px] h-[90px] flex-shrink-0" />
              <Skeleton className="w-[90px] h-[90px] flex-shrink-0" />
            </div>
          </div>
        </div>
        <div className="md:basis-1/2 flex flex-col gap-4 w-screen container">
          <Skeleton className="w-[100%] h-[40px]" />
          <Skeleton className="w-[100%] h-[20px]" />
          <Skeleton className="w-[100%] h-[30px]" />
          <Skeleton className="w-[100%] h-[30px]" />
          <Skeleton className="w-[100%] h-[30px]" />
          <div className="flex flex-col md:flex-row gap-6">
            <Button className="rounded-sm md:w-[50%]" variant={"secondary"}>
              <IoCartOutline className="mr-3" size={27} />
              Add to Cart
            </Button>
            <Button className="rounded-sm md:w-[50%]" variant={"outline"}>
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
