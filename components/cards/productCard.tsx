"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import formatCurrency from "@/lib/formatCurrency";

type CardProps = {
  image: string;
  title: string;
  category?: string;
  id: string;
  price: number;
  showProductActions?: boolean;
  showIcons?: boolean;
  showAdminLinks?: boolean;
};

const ProductCard = ({ image, title, price, id, category }: CardProps) => {
  const [heart, setHeart] = useState(false);
  const [wishlistItem, setWishlistItem] = useState<string[]>([]);

  const formatted = formatCurrency(price);

  function handleAddToWishlist(id: string) {
    setHeart((prev) => !prev);
    const newArray = [...wishlistItem, id];
    setWishlistItem(newArray);
    localStorage.setItem("wishlist", newArray.toString());
  }

  return (
    <div className="flex flex-col sm:border-r md:border relative overflow-hidden text-left">
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
          <button
            aria-label="Button"
            onClick={() => {
              handleAddToWishlist(id);
            }}
          >
            <IoMdHeart
              color={heart ? "#dc6e73" : "8a8a8a"}
              size={27}
              className="cursor-pointer bg-red"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
