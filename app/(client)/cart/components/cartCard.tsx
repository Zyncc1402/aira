"use client";

import { deleteCartItem, updateCartItemQuantity } from "@/actions/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import formatCurrency from "@/lib/formatCurrency";
import { CartWithCartItems } from "@/lib/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  items: CartWithCartItems;
};

export default function CartCard({ items }: Props) {
  const { data: session } = useSession();
  function handleQuantityChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    if (session?.user.id) {
      updateCartItemQuantity(items.userId, Number(event.target.value), id);
    }
  }
  return (
    <div className="flex-1 flex gap-y-5 flex-col w-full relative mr-10">
      {items?.items.map((item) => (
        <div key={item.product.id} className="flex gap-5 w-full">
          <Link href={`/${item.product.category}/${item.product.id}`}>
            <Image
              src={item.product.images[0]}
              height={200}
              width={200}
              alt="Image"
              className="object-cover aspect-square"
              priority
            />
          </Link>
          <div className="relative">
            <h1>{item.product.title}</h1>
            <h2>{capitalizeFirstLetter(item.product.category)}</h2>
            <h2>{capitalizeFirstLetter(item.product.color[0])}</h2>
            <p>{formatCurrency(item.product.price).split(".")[0]}</p>
            <form>
              <label htmlFor="quantity">Quantity</label>
              <select
                className="mx-2 p-1 focus:border-0"
                name="quantity"
                id="quantity"
                onChange={(e) => handleQuantityChange(e, item.id)}
                defaultValue={item.quantity}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </form>
            <Button
              variant={"link"}
              size={"icon"}
              onClick={() =>
                deleteCartItem(item.id, session?.user.id as string)
              }
            >
              <AiOutlineDelete size={27} />
            </Button>
          </div>
          <div className="flex flex-col justify-between">
            <Badge variant="secondary">
              {(item.size == "sm" && "Small") ||
                (item.size == "md" && "Medium") ||
                (item.size == "lg" && "Large") ||
                (item.size == "xl" && "XL")}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
