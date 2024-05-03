import { auth } from "@/auth";
import React from "react";

const Account = async () => {
  const session = await auth();
  return (
    <div className="pt-[100px]">
      <div className="container">
        <h1 className="font-semibold text-3xl">
          Hi there {session?.user.name}
        </h1>
      </div>
    </div>
  );
};

export default Account;
