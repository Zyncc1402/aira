"use server";

import prisma from "@/lib/prisma";

export async function InfiniteAccountOrders(skip: number, id: string) {
  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },
    skip,
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(orders);
  return orders;
}
