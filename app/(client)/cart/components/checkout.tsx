"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

type Props = {
  cartitems: {
    items: {
      id: string;
      cartId: string;
      pid: string;
      title: string;
      price: number;
      image: string;
      quantity: number;
    }[];
  };
};

function Checkout({ cartitems }: Props) {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    let totalPrice = 0;
    cartitems.items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setPrice(totalPrice);
  }, [cartitems.items]);

  const formatted = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return (
    <div className="mt-10 pb-20 md:mt-0 md:mb-0">
      <h1 className="text-4xl font-semibold">Summary</h1>
      <h1 className="mt-3 mb-3 font-medium">Sub Total = {formatted}</h1>
      <Button className="w-full rounded-full font-bold">Checkout</Button>
    </div>
  );
}

export default Checkout;
