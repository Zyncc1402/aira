import ProductCard from "@/components/cards/productCard";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 600;

const Men = async () => {
  const womenProducts = await prisma.product.findMany({
    where: {
      category: "women",
      isArchived: false,
    },
  });
  return (
    <div className="pt-[100px] md:container">
      <div className="flex justify-between title">
        <h1 className="font-medium text-3xl">Women</h1>
      </div>
      <div className="m-2 md:m-0 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-5 lg:gap-7 py-10">
        {womenProducts.map((product, key) => (
          <ProductCard
            key={key}
            image={product.images[0]}
            title={product.title}
            price={product.price}
            category={product.category}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Men;
