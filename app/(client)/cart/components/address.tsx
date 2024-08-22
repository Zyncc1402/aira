"use client";

import React, { useState } from "react";
import { UserWithAddress } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  user: UserWithAddress | null;
};

export default function Address({ user }: Props) {
  const [selectedAddress, setSelectedAddress] = useState("");
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Your Addresses</h1>
      </div>
      {user?.address.map((address) => (
        <Button
          key={address.id}
          onClick={() => setSelectedAddress(address.id)}
          variant={"secondary"}
          className={`p-5 rounded-md w-full h-fit items-start relative flex flex-col gap-2 mt-3 `}
        >
          <h1 className="font-semibold text-xl">{address.name}</h1>
          <p className="font-normal">{address.address1}</p>
          <p className="font-normal">{address.phone}</p>
          <p className="font-normal">{address.zipcode}</p>
          <Input
            type="radio"
            className="absolute bottom-3 right-3 w-5"
            checked={selectedAddress == address.id}
          />
        </Button>
      ))}
    </>
  );
}
