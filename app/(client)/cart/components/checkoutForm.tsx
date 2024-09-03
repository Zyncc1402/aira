"use client";

import { Pay } from "@/actions/pay";
import { Button } from "@/components/ui/button";
import { useAddress } from "@/context/address";
import React from "react";

export default function CheckoutForm({
  session,
  getCartInfo,
}: {
  session: any;
  getCartInfo: any;
}) {
  const { address } = useAddress();
  return (
    <form
      action={(formData) => {
        formData.append(
          "totalPrice",
          `${String(Number(getCartInfo?.subtotal))}`
        );
        formData.append("items", String(getCartInfo.items));
        Pay(formData, session.user.id as string, address);
      }}
    >
      <Button
        variant={"default"}
        className="w-full"
        type="submit"
        disabled={getCartInfo.items.length == 0 || address.length == 0}
      >
        Checkout
      </Button>
    </form>
  );
}
