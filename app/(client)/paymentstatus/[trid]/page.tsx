import { checkPaymentStatus } from "@/actions/pay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default async function Page({ params }: { params: { trid: string } }) {
  const checkPayment = await checkPaymentStatus(params.trid);
  console.log(checkPayment);
  return (
    <div className="container flex items-center justify-center w-screen h-screen flex-col gap-5">
      {checkPayment == true ? (
        <>
          <div className="flex items-center gap-2">
            <RiVerifiedBadgeFill color="green" size={40} />
            <h1 className="font-semibold text-3xl">Payment Success</h1>
          </div>
          <p>Transaction ID: {params.trid}</p>
          <Link href={"/account"}>
            <Button variant={"secondary"}>Go to My Orders</Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-semibold text-3xl">PAYMENT FAILED ❌</h1>
        </>
      )}
    </div>
  );
}
