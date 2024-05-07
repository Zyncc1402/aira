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
import { Metadata } from "next";
import ProductSlider from "@/components/carousel/productSlider";
import RightPage from "./components/rightPage";
import Image from "next/image";

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

  const similarProducts = await prisma.product.findMany({
    where: {
      AND: [
        {
          category: { contains: product?.category },
        },
      ],
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  // await new Promise((resolve) =>
  //   setTimeout((resolve) => {
  //     resolve;
  //   }, 600)
  // );
  if (product?.title) {
    const { title, images } = product;
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
              <BreadcrumbLink href="/categories/men">Men</BreadcrumbLink>
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
          <RightPage product={product} />
        </div>
        {similarProducts.length > 0 && (
          <div className="container mt-[100px]">
            <h1 className="text-2xl font-semibold">Products similar to this</h1>
            <div className="similar gap-2 mt-6 overflow-x-auto flex">
              {similarProducts.map((similarProduct) => (
                <Image
                  key={similarProduct.id}
                  src={similarProduct.images[0]}
                  height={400}
                  width={400}
                  alt="similar products"
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }
};

export default ProductById;

export async function generateStaticParams() {
  const products: Promise<Product[]> = prisma.product.findMany({
    where: {
      category: "men",
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
