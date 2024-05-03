import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import prisma from "@/lib/prisma";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductSlider from "@/components/carousel/productSlider";
import { addToCart } from "@/actions/action";
import { auth } from "@/auth";
import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import AddToCartBtn from "../../men/[id]/components/AddToCartBtn";

type Params = {
  params: {
    id: string;
  };
};

export const revalidate = 600;

interface Product {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  images?: string[];
  salePrice?: number | null;
  category?: string;
  isArchived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductById = async ({ params: { id } }: Params) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
      isArchived: false,
    },
  });
  const session = await auth();
  async function handleAddToCart() {
    "use server";
    if (product)
      await addToCart(
        id,
        product?.images[0],
        product?.price,
        product?.title,
        session?.user.id as string
      );
  }
  // await new Promise((resolve) =>
  //   setTimeout((resolve) => {
  //     resolve;
  //   }, 600)
  // );
  if (product?.title) {
    const { title, description, images, price, quantity, id } = product;
    const formatted = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "INR",
    }).format(price);
    const OPTIONS: EmblaOptionsType = {};
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {title.replaceAll(" ", "-").toLowerCase()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mt-10 flex-wrap md:flex-nowrap gap-12 md:container">
          <div className="md:basis-1/2">
            <ProductSlider slides={images} options={OPTIONS} />
          </div>
          <div className="md:basis-1/2 flex flex-col gap-4 w-[100%] container">
            <h1 className="text-3xl font-bold">{title}</h1>
            <h1>{description}</h1>
            <h1 className="text-xl font-semibold">{formatted}</h1>
            <h1>*Shipping cost calculated at checkout*</h1>
            {quantity < 10 && (
              <h1>
                Only <b className="text-red-600">{quantity}</b> remaining, Hurry
                up!
              </h1>
            )}
            <div className="flex gap-6">
              <form action={handleAddToCart} className="flex-1">
                <AddToCartBtn />
              </form>
              <Button
                aria-label="Button"
                className="rounded-md flex-1"
                variant={"secondary"}
              >
                <IoMdHeart className="mr-3" size={23} />
                Add to Wishlist
              </Button>
              {session?.user.role === "Admin" && (
                <Link href={"/admin/products/" + product.id} className="flex-1">
                  <Button
                    className="flex-1 w-full rounded-md"
                    aria-label="Button"
                  >
                    <MdOutlineModeEdit className="mr-3" size={23} />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return notFound();
  }
};

export default ProductById;

export async function generateStaticParams() {
  const products: Promise<Product[]> = prisma.product.findMany({
    where: {
      category: "women",
      isArchived: false,
    },
  });
  const product = await products;

  return product.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: {
      id,
      isArchived: false,
    },
  });

  if (!product?.title) {
    return {
      title: "No Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}
