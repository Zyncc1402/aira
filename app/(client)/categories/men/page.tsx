import prisma from "@/lib/prisma";
import React from "react";
import ProductGrid from "./ProductGrid";

export const revalidate = 6000;

const Men = async () => {
  const menProducts = await prisma.product.findMany({
    where: {
      category: "men",
      isArchived: false,
    },
    orderBy: {
      category: "desc",
    },
  });
  // await new Promise((resolve) =>
  //   setTimeout((resolve) => {
  //     resolve;
  //   }, 600)
  // );
  return (
    <div className="pt-[100px] ">
      <ProductGrid products={menProducts} />
    </div>
  );
};

export default Men;
