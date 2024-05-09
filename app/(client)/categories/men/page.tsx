import prisma from "@/lib/prisma";
import React from "react";
import ProductGrid from "./ProductGrid";

export const revalidate = 6000;

export const metadata = {
  title: "Aira - Men",
};

const Men = async () => {
  const menProducts = await prisma.product.findMany({
    where: {
      category: "men",
      isArchived: false,
      // quantity: {
      //   OR: [
      //     {
      //       sm: {
      //         gt: 0,
      //       },
      //     },
      //     {
      //       md: {
      //         gt: 0,
      //       },
      //     },
      //     {
      //       lg: {
      //         gt: 0,
      //       },
      //     },
      //     {
      //       xl: {
      //         gt: 0,
      //       },
      //     },
      //   ],
      // },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      quantity: true,
    },
  });
  // await new Promise((resolve) =>
  //   setTimeout((resolve) => {
  //     resolve;
  //   }, 600)
  // );
  return (
    <div className="pt-[80px]">
      <ProductGrid products={menProducts} />
    </div>
  );
};

export default Men;
