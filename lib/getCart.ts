"use server";

import { auth } from "@/auth";
import prisma from "./prisma";

export async function getCart() {
  const session = await auth();
  const cart = await prisma.cart.findUnique({
    where: {
      userId: session?.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart?.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart?.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}
