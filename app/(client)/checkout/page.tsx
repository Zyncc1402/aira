"use client";

import { useCheckoutStore } from "@/context/checkoutStore";
import React from "react";
import Image from "next/image";

export default function Page() {
  const { checkoutItems } = useCheckoutStore();
  // if (checkoutItems?.length == 0) throw new Error();
  console.log(checkoutItems);
  return <div className="container mt-10">
    {checkoutItems?.map((item, index) => (
      <div key={index} className={'mb-2'}>
        <Image
            src={item.product.images[0]}
            height={200}
            width={200}
            alt="Image"
            className="object-cover aspect-square rounded-lg flex-shrink-0"
            priority
        />
      </div>
  ))}</div>;
}
