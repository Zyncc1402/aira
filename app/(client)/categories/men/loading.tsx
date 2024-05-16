import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import React from "react";

const loading = async () => {
  const products = await prisma.product.count({
    where: {
      category: "men",
      isArchived: false,
    },
  });
  const number = [];
  for (let i = 1; i <= products; i++) number.push(i);
  return (
    <div className="pt-[100px] md:container">
      <div className="flex justify-between container">
        <h1 className="font-semibold text-3xl">Men</h1>
      </div>
      <div className="md:m-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[2px] md:gap-5 lg:gap-7 py-10">
        {number.map((num, key) => (
          <div key={key} className="w-[100%]">
            <Skeleton className="w-full aspect-square rounded-none md:rounded-md" />
            <Skeleton className="w-[80%] h-[20px] mt-2 max-w-[768px]:ml-2" />
            <Skeleton className="w-[65%] h-[20px] mt-2 max-w-[768px]:ml-2 max-w-[768px]:mb-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
