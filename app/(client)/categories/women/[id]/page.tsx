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
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductSlider from "@/components/carousel/productSlider";
import RightPage from "../../men/[id]/components/rightPage";

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
          <RightPage product={product} />
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
