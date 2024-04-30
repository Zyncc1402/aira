import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import React from "react";

const loading = async () => {
  const menProducts = await prisma.product.findMany({
    where: {
      category: "men",
      isArchived: false,
    },
  });
  return (
    <div className="pt-[100px] container">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Men</h1>
      </div>
      <div className="m-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-5 lg:gap-7 py-10">
        {menProducts.map((product, key) => (
          <div key={key} className="w-[100%]">
            <Skeleton className="w-[100%] h-[320px]" />
            <Skeleton className="w-[80%] h-[20px] mt-2" />
            <Skeleton className="w-[65%] h-[20px] mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
