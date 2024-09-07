//@ts-nocheck
"use client";
import {
  deleteCartItem,
  deleteSavedItem,
  movetocart,
  saveForLater,
  updateCartItemQuantity,
} from "@/actions/action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCheckoutStore } from "@/context/checkoutStore";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import formatCurrency from "@/lib/formatCurrency";
import {
  cartItemWithProduct,
  CartWithCartItems,
  saveforlaterWithItems,
} from "@/lib/types";
import { saveforlater } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useOptimistic } from "react";

type Props = {
  items: CartWithCartItems;
  session: Session;
  saved: saveforlaterWithItems | null;
};

type CartItem = {
  id: string;
  quantity: number;
  newQuantity: number;
};

export default function CartCard({ items, session, saved }: Props) {
  const router = useRouter();
  function cartReducer(
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
      case "ADD":
        return [...state, action.payload];
      default:
        return state;
    }
  }

  function savedReducer(
    state: saveforlaterWithItems[] | undefined,
    action: { type: string; payload: saveforlater }
  ) {
    switch (action.type) {
      case "DELETE":
        console.log(action.payload.id);
        return state.filter((item) => item.id !== action.payload.id);
      default:
        return [];
    }
  }

  const [optimisticItems, cartDispatch] = useOptimistic(
    items.items,
    cartReducer
  );
  const [optimisticSavedItems, savedDispatch] = useOptimistic(
    saved?.items,
    savedReducer
  );

  function handleQuantityChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    if (session?.user.id) {
      cartDispatch({
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

  const { setCheckoutItems } = useCheckoutStore();

  return (
    <>
      <div className="flex-1 flex gap-y-5 flex-col w-full relative mr-10">
        <h1 className="text-xl font-medium">Cart</h1>
        {optimisticItems.length == 0 && (
          <>
            <h1 className="text-lg font-medium text-muted-foreground">
              Your Cart is Empty
            </h1>
          </>
        )}
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
                size={"sm"}
                onClick={() => {
                  saveForLater(
                    item.id,
                    item.productId,
                    item.quantity,
                    item.size
                  );
                }}
              >
                Save for Later
              </Button>
              <Button
                variant={"link"}
                size={"sm"}
                onClick={() => {
                  cartDispatch({ type: "DELETE", payload: item });
                  deleteCartItem(item.id, session?.user.id as string);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {optimisticSavedItems.length > 0 && (
          <div className="mt-5">
            <h1 className="text-xl font-medium">Saved for Later</h1>
            {optimisticSavedItems?.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-5 w-full border-b-2 border-muted py-5"
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
                  <Button
                    variant={"link"}
                    size={"sm"}
                    onClick={() => {
                      movetocart(
                        item.id,
                        item.productId,
                        item.quantity,
                        item.size
                      );
                    }}
                  >
                    Move to Cart
                  </Button>
                  <Button
                    variant={"link"}
                    size={"sm"}
                    onClick={() => {
                      savedDispatch({
                        type: "DELETE",
                        payload: { id: item.id },
                      });
                      deleteSavedItem(item.id, session?.user.id as string);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h1 className="font-semibold text-3xl">Summary</h1>
        <div className="flex justify-between flex-col gap-x-10 my-5">
          <div className="flex mt-3 justify-between">
            <h1 className="font-medium">
              Subtotal {`(${optimisticItems.length} items)`}
            </h1>
            <p className="font-medium">{formatCurrency(price).split(".")[0]}</p>
          </div>
          <Button
            className="w-full mt-5"
            variant={"secondary"}
            disabled={optimisticItems.length == 0}
            onClick={() => {
              router.push("/checkout");
              setCheckoutItems(undefined);
              setCheckoutItems(optimisticItems);
            }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
}
