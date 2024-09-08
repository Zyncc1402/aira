import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import InfiniteLoader from "./infiniteLoader";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import getSession from "@/lib/getSession";
import { capitalizeFirstLetter } from "@/lib/caplitaliseFirstLetter";
import { FiBox } from "react-icons/fi";
import { LiaAddressCardSolid } from "react-icons/lia";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

const Account = async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect(`/signin?callbackUrl=/account`);
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    // take: 5,
    include: {
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="pt-[40px]">
      <div className="container flex items-center flex-col">
        <Image
          src={session.user.image || "/user.png"}
          width={200}
          height={200}
          priority
          className="rounded-full"
          alt="Profile Picture"
          quality={100}
        />
        <h1 className="font-semibold text-3xl mt-2">
          {capitalizeFirstLetter(session?.user.name?.toLowerCase() ?? "")}
        </h1>
        <div className="flex gap-4 mt-5 flex-wrap items-center justify-center ">
          <Link href={"/account/orders"}>
            <div className="cursor-pointer bg-secondary rounded-lg p-5 flex items-center gap-x-3">
              <FiBox size={35} />
              <h1 className="font-medium text-xl">Your Orders</h1>
            </div>
          </Link>
          <Link href={"/account/addresses"}>
            <div className="cursor-pointer bg-secondary rounded-lg p-5 flex items-center gap-x-3">
              <LiaAddressCardSolid size={35} />
              <h1 className="font-medium text-xl">Your Addresses</h1>
            </div>
          </Link>
        </div>
        <div className="w-[70%] mt-10">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="w-full border-2 border-muted mb-5 flex rounded-lg"
            >
              <Image
                src={order.image}
                className="object-cover aspect-square rounded-l-lg"
                width={200}
                height={200}
                alt="Order Image"
                priority
              />
              <div className="flex flex-col w-full">
                <div className="bg-secondary p-3 flex justify-between gap-x-4">
                  <div className="flex gap-x-5">
                    <div>
                      <h1>Order Placed</h1>
                      <h1>{order.createdAt.toDateString()}</h1>
                    </div>
                    <div>
                      <h1>Order Total</h1>
                      <h1>
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
                      className="underline underline-offset-2"
                    >
                      Order Details
                    </Link>
                  </div>
                </div>
                <div className="p-3">
                  <h1 className="font-medium text-lg">{order.title}</h1>
                  <h1>Qty - {order.quantity}</h1>
                </div>
              </div>
            </div>
          ))}
          {/* <InfiniteLoader id={session.user.id as string} /> */}
        </div>
      </div>
    </div>
  );
};

export default Account;
