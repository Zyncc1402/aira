import { auth } from "@/auth";
import React from "react";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/getCart";
import prisma from "@/lib/prisma";
import formatCurrency from "@/lib/formatCurrency";
import AddressForm from "./components/addressForm";
import Address from "./components/address";
import { Button } from "@/components/ui/button";
import CartCard from "./components/cartCard";
import { Separator } from "@/components/ui/separator";
import { Pay } from "@/actions/pay";

export const metadata = {
  title: "Aira - Cart",
};

const Cart = async () => {
  const session = await auth();

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
            <form
              action={async (formData) => {
                "use server";
                formData.append(
                  "totalPrice",
                  `${String(Number(getCartInfo?.subtotal))}`
                );
                formData.append("items", String(getCartInfo.items));
                const redirectURL = await Pay(
                  formData,
                  session.user.id as string
                );
                redirect(redirectURL);
              }}
            >
              <Button
                variant={"default"}
                className="w-full"
                type="submit"
                disabled={getCartInfo.items.length == 0}
              >
                Checkout
              </Button>
            </form>
            <div className="my-[50px]">
              {!user?.address ? (
                <AddressForm />
              ) : (
                <>
                  <Address user={user} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Cart;
