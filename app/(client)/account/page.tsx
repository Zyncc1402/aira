import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

const Account = async () => {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }
  return (
    <div className="pt-[40px]">
      <div className="container">
        <h1 className="font-semibold text-3xl">
          Hi there, {session?.user.name}
        </h1>
      </div>
    </div>
  );
};

export default Account;
