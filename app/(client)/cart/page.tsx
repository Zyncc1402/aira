import React from "react";
import { redirect } from "next/navigation";
import CartCard from "./components/cartCard";
import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Aira - Cart",
};

const Cart = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/signin?callbackUrl=/cart");
  }
  const getCartInfo = await prisma.cart.findUnique({
    where: {
      userId: session?.user.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              quantity: true,
            },
          },
        },
      },
    },
  });
  const getSavedProducts = await prisma.saveforlater.findUnique({
    where: {
      userId: session?.user.id as string,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <section className="pt-[40px] container">
      <div className="flex flex-col md:flex-row gap-y-52 md:gap-y-0">
        <CartCard
          items={getCartInfo}
          saved={getSavedProducts}
          session={session}
        />
      </div>
    </section>
  );
};

export default Cart;
