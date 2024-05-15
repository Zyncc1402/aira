import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";

const Admin = async () => {
  const session = await auth();
  if (session?.user.role !== "Admin" || !session) {
    notFound();
  }
  return (
    <div className="pt-[100px]">
      <div className="flex justify-between w-screen container">
        <h1 className="font-semibold text-3xl">Authorised</h1>
      </div>
    </div>
  );
};

export default Admin;
