import React from "react";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/getCart";
import prisma from "@/lib/prisma";
import formatCurrency from "@/lib/formatCurrency";
import AddressForm from "./components/addressForm";
import Address from "./components/address";
import CartCard from "./components/cartCard";
import { Separator } from "@/components/ui/separator";
import CheckoutForm from "./components/checkoutForm";
import Image from "next/image";
import getSession from "@/lib/getSession";

export const metadata = {
  title: "Aira - Cart",
};

const Cart = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id as string,
    },
    include: {
      address: true,
    },
  });
  const getCartInfo = await getCart();
  if (getCartInfo) {
    return (
      <section className="pt-[40px] container">
        <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0">
          {getCartInfo.items.length == 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="font-medium text-xl">
                There are no items in the Cart
              </p>
            </div>
          )}
          <CartCard items={getCartInfo} />
          <div className="flex-1">
            <h1 className="font-semibold text-3xl">Summary</h1>
            <div className="flex justify-between flex-col gap-x-10 my-5">
              <div className="flex gap-x-10 mt-3 justify-between">
                <h1 className="font-medium">Subtotal</h1>
                <p className="font-medium">
                  {formatCurrency(Number(getCartInfo?.subtotal)).split(".")[0]}
                </p>
              </div>
              <div className="flex gap-x-10 mt-3 justify-between">
                <h1 className="font-medium">Estimated Delivery</h1>
                <p className="font-medium">Free</p>
              </div>
              <Separator className="my-3" />
              <div className="flex gap-x-10 justify-between">
                <h1 className="font-medium">Total</h1>
                <p className="font-medium">
                  {formatCurrency(Number(getCartInfo?.subtotal)).split(".")[0]}
                </p>
              </div>
              <Separator className="my-3" />
            </div>
            <CheckoutForm session={session} getCartInfo={getCartInfo} />
            <div className="my-[50px]">
              {user != null && user.address.length == 0 ? (
                <AddressForm />
              ) : (
                <Address user={user} />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="container flex flex-col items-center justify-center h-screen">
        <Image
          src={"/empty-cart.svg"}
          width={500}
          height={500}
          alt="empty cart"
        />
        <h1 className="font-medium text-xl mt-5">Cart is empty</h1>
      </section>
    );
  }
};

export default Cart;
