import prisma from "@/lib/prisma";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const revalidate = 3600;

const AllUsers = async () => {
  const user = await prisma.user.findMany();
  return (
    <section>
      <div className="pt-[100px]">
        <div className="flex justify-between w-screen container">
          <h1 className="font-semibold text-3xl">All Users</h1>
        </div>
      </div>
      <div className="container pt-5">
        <DataTable columns={columns} data={user} />
      </div>
    </section>
  );
};

export default AllUsers;
