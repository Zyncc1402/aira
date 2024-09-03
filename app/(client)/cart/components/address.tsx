"use client";

import React from "react";
import { UserWithAddress } from "@/lib/types";
import { useAddress } from "@/context/address";

type Props = {
  user: UserWithAddress | null;
};

export default function Address({ user }: Props) {
  const { setAddress, address } = useAddress();
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Your Addresses</h1>
      </div>
      {user?.address.map((addresss) => (
        <div
          key={addresss.id}
          onClick={() => setAddress(addresss.id)}
          className={`${
            address == addresss.id && "border-2 border-blue-400"
          } bg-secondary p-5 rounded-md w-full h-fit items-start relative flex flex-col gap-2 mt-3 `}
        >
          <h1 className="font-semibold text-xl">{addresss.name}</h1>
          <p className="font-normal">{addresss.address1}</p>
          <p className="font-normal">{addresss.address2}</p>
          <p className="font-normal">{addresss.phone}</p>
          <p className="font-normal">{addresss.zipcode}</p>
        </div>
      ))}
    </>
  );
}
