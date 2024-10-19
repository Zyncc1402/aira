"use client";

import { deleteCartItem, updateCartItemQuantity } from "@/actions/action";
import { CartItemsWithProducts, CartWithCartItems } from "@/lib/types";
import { Cart } from "@prisma/client";
import { Session } from "next-auth";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import { SheetClose } from "../ui/sheet";

export default function CartQuantityForm({
  item,
  session,
}: {
  session: Session | null;
  item: CartItemsWithProducts;
}) {
  function handleQuantityChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    if (session?.user.id) {
      updateCartItemQuantity(session?.user.id, Number(event.target.value), id);
    }
  }
  return (
    <>
      <Link
        href={`/${item.product.category}/${item.product.id}`}
        className="flex"
      >
        <SheetClose>
          <Image
            src={item.product.images[0]}
            height={200}
            width={200}
            alt="Image"
            className="object-cover aspect-square rounded-lg flex-shrink-0"
            priority
          />
        </SheetClose>
      </Link>
      <div className="w-full">
        <div className="flex w-full justify-between max-[400px]:flex-col">
          <h1 className="font-medium">{item.product.title}</h1>
          <h1 className="font-semibold justify-self-end text-lg">
            {formatCurrency(item.product.price).split(".")[0]}
          </h1>
        </div>
        <h2 className="text-muted-foreground">
          {capitalizeFirstLetter(item.product.color[0])}
        </h2>
        <h2 className="text-muted-foreground">
          {(item.size == "sm" && "Small") ||
            (item.size == "md" && "Medium") ||
            (item.size == "lg" && "Large") ||
            (item.size == "xl" && "XL")}
        </h2>
        <form>
          <label htmlFor="quantity">Quantity</label>
          <select
            className="mx-2 p-1 focus:border-0 bg-transparent"
            name="quantity"
            id="quantity"
            onChange={(e) => handleQuantityChange(e, item.id)}
            defaultValue={item.quantity}
            value={item.quantity}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option
                key={num}
                value={num}
                disabled={
                  (item.size === "sm" &&
                    (item.product.quantity?.sm ?? 0) < num) ||
                  (item.size === "md" &&
                    (item.product.quantity?.md ?? 0) < num) ||
                  (item.size === "lg" &&
                    (item.product.quantity?.lg ?? 0) < num) ||
                  (item.size === "xl" && (item.product.quantity?.xl ?? 0) < num)
                }
                className="disabled:text-muted"
              >
                {num}
              </option>
            ))}
          </select>
        </form>
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            deleteCartItem(item.id, session?.user.id as string);
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
