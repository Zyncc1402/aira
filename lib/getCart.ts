"use server";

import getSession from "./getSession";
import prisma from "./prisma";

export async function getCart() {
  const session = await getSession();
  const cart = await prisma.cart.findUnique({
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
  if (!cart) {
    return null;
  }
  return cart;
}
