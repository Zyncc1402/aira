import ProductCard from "@/components/cards/productCard";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 600;

const Archived = async () => {
  const archivedProducts = await prisma.product.findMany({
    where: {
      isArchived: true,
    },
  });
  return (
    <div className="pt-[100px] container">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Archived</h1>
      </div>
      <div className="flex gap-8 mt-10">
        {archivedProducts.map((product, index) => (
          <ProductCard
            key={index}
            image={product.images[0]}
            title={product.title}
            price={product.price}
            id={product.id}
            category={product.category}
            showProductActions={true}
            showAdminLinks={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Archived;
