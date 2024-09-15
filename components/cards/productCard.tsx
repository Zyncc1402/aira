"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import formatCurrency from "@/lib/formatCurrency";
import { toast } from "../ui/use-toast";

type CardProps = {
  image: string;
  title: string;
  category: string;
  id: string;
  price: number;
};

export type wishlistItemsType = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}[];

const ProductCard = ({ image, title, price, id, category }: CardProps) => {
  const formatted = formatCurrency(price);

  return (
    <div className="flex flex-col border-r border-b md:border relative overflow-hidden text-left">
      <Link aria-label="navigation-link" href={`/${category}/${id}`}>
        <Image
          src={image}
          width={400}
          height={400}
          alt="product image"
          priority={true}
          className=" object-cover aspect-square"
        />
      </Link>
      <div className="p-2 gap-4 flex justify-between w-[100%]">
        <div className="flex w-[100%] items-center justify-between gap-4">
          <div>
            <Link aria-label="navigation-link" href={`/${category}/${id}`}>
              <div className="text-slate-500 text-sm">
                <h1>{title}</h1>
              </div>
            </Link>
            <p className="text-base text-md text-slate-600">
              {formatted.split(".")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
