import { auth, signIn } from "@/auth";
import FormCard from "@/components/cards/formCard";
import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import Checkout from "./components/checkout";
import { redirect } from "next/navigation";

const Cart = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const cartItems = await prisma.cart.findUnique({
    where: {
      userId: session?.user.id,
    },
    include: {
      items: true,
    },
  });
  if (cartItems) {
    return (
      <div className="flex justify-between h-screen w-screen container">
        {cartItems?.items.length == 0 ? (
          <div className="flex flex-col items-center justify-center w-screen h-[100%]">
            <Image
              src={"/empty-cart.svg"}
              height={450}
              width={450}
              alt="empty cart"
              className="noSelectImage"
              priority={true}
            />
            <h1 className="font-medium mt-10">No items in cart</h1>
          </div>
        ) : (
          <section className="mt-[100px] flex w-full flex-wrap md:flex-nowrap gap-x-20">
            <div className="">
              {cartItems?.items.map((item) => (
                <FormCard key={item.id} item={item} />
              ))}
            </div>
            {cartItems && <Checkout cartitems={cartItems} />}
          </section>
        )}
      </div>
    );
  }
};

export default Cart;
