"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import formatCurrency from "@/lib/formatCurrency";

type CardProps = {
  image: string;
  title: string;
  category: string;
  id: string;
  price: number;
  showProductActions?: boolean;
  showIcons?: boolean;
  showAdminLinks?: boolean;
};

const ProductCard = ({ image, title, price, id, category }: CardProps) => {
  const formatted = formatCurrency(price);
  return (
    <div className="flex flex-col border-r border-b md:border relative overflow-hidden text-left">
      <Link aria-label="navigation-link" href={`/categories/${category}/${id}`}>
        <Image
          src={image}
          width={700}
          height={700}
          alt="product image"
          priority={true}
          className=" object-cover aspect-square"
        />
      </Link>
      <div className="p-2 gap-4 flex justify-between w-[100%]">
        <div className="flex w-[100%] items-center justify-between gap-4">
          <div>
            <Link
              aria-label="navigation-link"
              href={`/categories/${category}/${id}`}
            >
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
