import { auth } from "@/auth";
import formatCurrency from "@/lib/formatCurrency";
import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";

const Orders = async () => {
  const session = await auth();
  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
      paymentSuccess: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(orders);
  return (
    <div className="pt-[100px]">
      <div className="container">
        <h1 className="font-semibold text-3xl">Your Orders</h1>
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <Image
                src={order.image}
                height={100}
                width={100}
                alt="Product image"
                className="object-cover"
              />
              <h1>{order.title}</h1>
              <h1>{order.category}</h1>
              <h1>{formatCurrency(order.price).split(".")[0]}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
