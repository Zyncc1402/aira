"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import formatCurrency from "@/lib/formatCurrency";
import { toast } from "../ui/use-toast";
import { FaRegHeart } from "react-icons/fa";

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
  const [heart, setHeart] = useState(false);
  const formatted = formatCurrency(price);

  useEffect(() => {
    const wishlistExists = localStorage.getItem("wishlist");
    if (wishlistExists) {
      const existingItems: wishlistItemsType = JSON.parse(wishlistExists);
      const index = existingItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        setHeart(true);
      } else {
        setHeart(false);
      }
    }
  }, [id]);

  function handleAddToWishlist(id: string) {
    const wishlistExists = localStorage.getItem("wishlist");
    if (wishlistExists) {
      const existingItems: wishlistItemsType = JSON.parse(wishlistExists);
      const index = existingItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        setHeart(false);
        existingItems.splice(index, 1);
      } else {
        setHeart(true);
        toast({
          title: `Added ${title} to wishlist`,
        });
        existingItems.push({ id, title, image, price, category });
      }
      localStorage.setItem("wishlist", JSON.stringify(existingItems));
    } else {
      setHeart(true);
      toast({
        title: `Added ${title} to wishlist`,
      });
      localStorage.setItem(
        "wishlist",
        JSON.stringify([{ id, title, price, image }])
      );
    }
  }

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
          <button
            aria-label="Button"
            onClick={() => {
              handleAddToWishlist(id);
            }}
          >
            {heart ? (
              <IoMdHeart
                color={"#dc6e73"}
                size={27}
                className="cursor-pointer"
              />
            ) : (
              <FaRegHeart
                color={"8a8a8a"}
                size={25}
                className="cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
