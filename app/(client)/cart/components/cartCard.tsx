//@ts-nocheck
"use client";
import { deleteCartItem, updateCartItemQuantity } from "@/actions/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCheckoutStore } from "@/context/checkoutStore";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import formatCurrency from "@/lib/formatCurrency";
import { cartItemWithProduct, CartWithCartItems } from "@/lib/types";
import { Cart, CartItems } from "@prisma/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useMemo, useOptimistic, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  items: CartWithCartItems;
  session: Session;
};

type CartItem = {
  id: string;
  quantity: number;
  newQuantity: number;
};

export default function CartCard({ items, session }: Props) {
  function reducer(
    state: cartItemWithProduct[],
    action: { type: string; payload: CartItem }
  ) {
    switch (action.type) {
      case "DELETE":
        return state.filter((item) => item.id !== action.payload.id);
      case "UPDATE":
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        );
    }
  }
  const [optimisticItems, dispatch] = useOptimistic(items.items, reducer);

  function handleQuantityChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    if (session?.user.id) {
      dispatch({
        type: "UPDATE",
        payload: { id, newQuantity: event.target.value },
      });
      updateCartItemQuantity(items.userId, Number(event.target.value), id);
    }
  }

  const price = useMemo(() => {
    return optimisticItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [optimisticItems]);

  const { checkoutItems, setCheckoutItems } = useCheckoutStore();

  return (
    <>
      <div className="flex-1 flex gap-y-5 flex-col w-full relative mr-10">
        {optimisticItems.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-5 w-full border-b-2 border-muted pb-5"
          >
            <Link
              href={`/${item.product.category}/${item.product.id}`}
              className="flex"
            >
              <Image
                src={item.product.images[0]}
                height={200}
                width={200}
                alt="Image"
                className="object-cover aspect-square rounded-lg flex-shrink-0"
                priority
              />
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
                  <option
                    value={1}
                    disabled={
                      (item.size == "sm" && item.product.quantity.sm < 1) ||
                      (item.size == "md" && item.product.quantity.md < 1) ||
                      (item.size == "lg" && item.product.quantity.lg < 1) ||
                      (item.size == "xl" && item.product.quantity.xl < 1)
                    }
                    className={"disabled:text-muted"}
                  >
                    1
                  </option>
                  <option
                    value={2}
                    disabled={
                      (item.size == "sm" && item.product.quantity.sm < 2) ||
                      (item.size == "md" && item.product.quantity.md < 2) ||
                      (item.size == "lg" && item.product.quantity.lg < 2) ||
                      (item.size == "xl" && item.product.quantity.xl < 2)
                    }
                    className={"disabled:text-muted"}
                  >
                    2
                  </option>
                  <option
                    value={3}
                    disabled={
                      (item.size == "sm" && item.product.quantity.sm < 3) ||
                      (item.size == "md" && item.product.quantity.md < 3) ||
                      (item.size == "lg" && item.product.quantity.lg < 3) ||
                      (item.size == "xl" && item.product.quantity.xl < 3)
                    }
                    className={"disabled:text-muted"}
                  >
                    3
                  </option>
                  <option
                    value={4}
                    disabled={
                      (item.size == "sm" && item.product.quantity.sm < 4) ||
                      (item.size == "md" && item.product.quantity.md < 4) ||
                      (item.size == "lg" && item.product.quantity.lg < 4) ||
                      (item.size == "xl" && item.product.quantity.xl < 4)
                    }
                    className={"disabled:text-muted"}
                  >
                    4
                  </option>
                  <option
                    value={5}
                    disabled={
                      (item.size == "sm" && item.product.quantity.sm < 5) ||
                      (item.size == "md" && item.product.quantity.md < 5) ||
                      (item.size == "lg" && item.product.quantity.lg < 5) ||
                      (item.size == "xl" && item.product.quantity.xl < 5)
                    }
                    className={"disabled:text-muted"}
                  >
                    5
                  </option>
                </select>
              </form>
              <Button
                variant={"link"}
                size={"icon"}
                onClick={() => {
                  dispatch({ type: "DELETE", payload: item });
                  deleteCartItem(item.id, session?.user.id as string);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <h1 className="font-semibold text-3xl">Summary</h1>
        <div className="flex justify-between flex-col gap-x-10 my-5">
          <div className="flex mt-3 justify-between">
            <h1 className="font-medium">Subtotal</h1>
            <p className="font-medium">{formatCurrency(price).split(".")[0]}</p>
          </div>
          <Separator className="my-3" />
          <div className="flex gap-x-10 justify-between">
            <h1 className="font-medium">Total</h1>
            <p className="font-medium">{formatCurrency(price).split(".")[0]}</p>
          </div>
          <Separator className="my-3" />
          <Link href={"/checkout"}>
            <Button
              className="w-full"
              variant={"secondary"}
              onClick={() => {
                setCheckoutItems(undefined);
                setCheckoutItems(optimisticItems);
              }}
            >
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
