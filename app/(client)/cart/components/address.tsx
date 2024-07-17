"use client";

import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { deleteAddress } from "@/actions/formSubmissions";
import { useSession } from "next-auth/react";
import { UserWithAddress } from "@/lib/types";

type Props = {
  user: UserWithAddress;
};

export default function Address({ user }: Props) {
  const { data: session } = useSession();
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Your Address</h1>
      </div>
      <div className="p-5 rounded-md bg-gray-100 w-fit relative flex flex-col gap-2 mt-3">
        <h1 className="font-semibold text-xl">{user.address?.name}</h1>
        <p className="font-normal">{user.address?.email}</p>
        <p className="font-normal">{user.address?.phone}</p>
        <p className="font-normal">{user.address?.address1}</p>
        <p className="font-normal">{user.address?.address2}</p>
        <p className="font-normal">{user.address?.zipcode}</p>
        <p className="font-normal">{user.address?.landmark}</p>
        <Button
          className="absolute bottom-3 right-3"
          size={"icon"}
          variant={"secondary"}
          onClick={() => deleteAddress(session?.user.id as string)}
        >
          <MdDeleteOutline size={30} />
        </Button>
      </div>
    </>
  );
}
