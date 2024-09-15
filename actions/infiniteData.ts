"use server";

import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";

export async function InfiniteAccountOrders(skip: number) {
  const session = await getSession();
  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id as string,
    },
    skip,
    take: 10,
    include: {
      address: true,
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
}

export async function InfiniteProducts(skip: number) {
  const products = await prisma.product.findMany({
    where: {
      isArchived: false,
    },
    skip,
    take: 24,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      quantity: true,
    },
  });
  return products;
}
