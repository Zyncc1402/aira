import { checkPaymentStatus, updateProductQuantity } from "@/actions/pay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ConfettiDecor from "@/components/confetti";

export default async function Page({ params }: { params: { trid: string } }) {
  const checkPayment = await checkPaymentStatus(params.trid);
  const orders = await prisma.order.findFirst({
    where: {
      transactionId: params.trid,
    },
  });
  if (!orders) return notFound();
  if (checkPayment) {
    if (!orders?.updatedProductQuantity) {
      console.log("UPDATE STARTED");
      await updateProductQuantity(params.trid);
    }
  }
  return (
    <div className="container flex items-center justify-center w-screen h-screen flex-col gap-5">
      {checkPayment ? (
        <>
          <div className="flex items-center gap-2">
            <RiVerifiedBadgeFill color="green" size={40} />
            <h1 className="font-semibold text-3xl text-center">
              Payment Success
            </h1>
          </div>
          <p className="text-center">Transaction ID: {params.trid}</p>
          <Link href={"/account"}>
            <Button variant={"secondary"}>Go to My Account</Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-semibold text-3xl">PAYMENT FAILED ❌</h1>
        </>
      )}
      <ConfettiDecor />
    </div>
  );
}
