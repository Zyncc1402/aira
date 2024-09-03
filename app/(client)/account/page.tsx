import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import InfiniteLoader from "./infiniteLoader";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import getSession from "@/lib/getSession";

export const revalidate = 0;

const Account = async () => {
  const session = await getSession();
  if (!session?.user) {
    notFound();
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="pt-[40px]">
      <div className="container">
        <h1 className="font-semibold text-3xl">
          Hi there, {session?.user.name}
        </h1>
        <div className="flex gap-x-4 mt-5">
          <Button variant={"secondary"}>Orders</Button>
          <Button variant={"secondary"}>Addresses</Button>
        </div>
        <div>
          <div>
            {orders?.map((order) => (
              <div
                key={order.id}
                className="w-fit mt-5 mb-10 flex flex-col border-[1px] border-secondary rounded-xl"
              >
                <div className="flex gap-x-10 gap-y-5 bg-secondary rounded-tl-xl rounded-tr-xl p-4 flex-wrap">
                  <div>
                    <h1>Order Placed </h1>
                    <h1>{order.createdAt.toDateString().slice(4)}</h1>
                  </div>
                  <div>
                    <h1>Total</h1>
                    <h1>{formatCurrency(order.price).split(".")[0]}</h1>
                  </div>
                  <div>
                    <h1>Ship To</h1>
                    <h1>Chandan</h1>
                  </div>
                  <div>
                    <h1>Order ID</h1>
                    <h1>{order.orderId.split("-").pop()}</h1>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href={`/${order.category}/${order.productId}`}>
                    <Image
                      src={order.image}
                      height={150}
                      width={150}
                      priority
                      alt="Product image"
                      className="aspect-square object-cover rounded-bl-xl"
                    />
                  </Link>
                  <div className="flex flex-col gap-y-3 mt-3 font-medium">
                    <h1>{order.title}</h1>
                    <Link href={`/reviews/add/${order.productId}`}>
                      <Button variant={"secondary"}>Write a Review</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <InfiniteLoader id={session.user.id as string} />
        </div>
      </div>
    </div>
  );
};

export default Account;
