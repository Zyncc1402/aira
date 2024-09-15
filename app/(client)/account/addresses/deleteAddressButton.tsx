"use client";

import { deleteAddress } from "@/actions/formSubmissions";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

export default function DeleteAddressButton({
  addressId,
}: {
  addressId: string;
}) {
  return (
    <Button variant={"link"} onClick={() => deleteAddress(addressId)}>
      Delete
    </Button>
  );
}
