import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import formatCurrency from "@/lib/formatCurrency";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import InfiniteLoader from "../infiniteLoader";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function Page() {
  const session = await getSession();
  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id as string,
    },
    // take: 5,
    include: {
      address: true,
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container">
      <h1 className="mt-10 font-semibold text-2xl">Your Orders</h1>
      <div className="flex items-center flex-col">
        <div className="mt-10 w-full">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="w-full lg:border-2 border-b-2 border-muted mb-5 flex pb-5 lg:pb-0 lg:rounded-lg"
            >
              <Link href={`/account/orders/${order.id}`}>
                <Image
                  src={order.image}
                  className="object-cover aspect-square rounded-lg lg:rounded-l-lg"
                  width={200}
                  height={200}
                  alt="Order Image"
                  priority
                />
              </Link>
              <div className="flex flex-col w-full">
                <div className="bg-secondary hidden p-3 lg:flex justify-between gap-x-4">
                  <div className="flex gap-x-5">
                    <div>
                      <h1>Order Placed</h1>
                      <h1>{order.createdAt.toDateString()}</h1>
                    </div>
                    <div>
                      <h1>Order Total</h1>
                      <h1 className="font-semibold">
                        {
                          formatCurrency(order.price * order.quantity).split(
                            "."
                          )[0]
                        }
                      </h1>
                    </div>
                    <div>
                      <h1>Ship To</h1>
                      <HoverCard>
                        <HoverCardTrigger>
                          <Badge variant="outline" className="cursor-pointer">
                            <h1 className="text-md">
                              {capitalizeFirstLetter(
                                order.address?.name.toLowerCase() ?? ""
                              )}
                            </h1>
                          </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-left font-medium">
                          <p className="line-clamp-1">
                            {order.address?.address1}
                          </p>
                          <p className="line-clamp-1">
                            {order.address?.address2}
                          </p>
                          <p>{order.address?.phone}</p>
                          <p>{order.address?.landmark}</p>
                          <p>{order.address?.zipcode}</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                  <div className="flex flex-col text-right">
                    TXN#{order.transactionId.split("-").pop()}
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="underline underline-offset-2 font-semibold"
                    >
                      Order Details
                    </Link>
                  </div>
                </div>
                <div className="px-5 h-full flex justify-between">
                  <div className="flex flex-col justify-center">
                    <Link href={`/account/orders/${order.id}`}>
                      <h1 className="font-medium text-lg line-clamp-1 lg:line-clamp-none">
                        {order.title}
                      </h1>
                    </Link>
                    <h1 className="text-green-800">
                      Delivery by {order.createdAt.toDateString().slice(0, 10)}
                    </h1>
                    <h1 className="hidden lg:block">Qty - {order.quantity}</h1>
                  </div>
                  <div className="hidden md:flex flex-col gap-2 items-end justify-center">
                    <Link href={`/account/orders/${order.id}`}>
                      <Button variant={"outline"}>Track Package</Button>
                    </Link>
                    <Link href={`/reviews/add/${order.productId}`}>
                      <Button variant={"outline"}>Write Product Review</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <InfiniteLoader id={session?.user.id as string} /> */}
        </div>
      </div>
    </div>
  );
}
