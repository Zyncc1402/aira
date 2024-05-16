import { auth } from "@/auth";
import { notFound } from "next/navigation";
import React from "react";
import SalesAreaChart from "./components/salesAreaChart";
import { FaUsers } from "react-icons/fa";
import prisma from "@/lib/prisma";
import { MdArchive } from "react-icons/md";
import { IoIosShirt } from "react-icons/io";
import Charts from "./components/charts";

export const revalidate = 600;

const Admin = async () => {
  const session = await auth();
  if (session?.user.role !== "Admin" || !session) {
    notFound();
  }
  const totalUsers = prisma.user.count();
  const totalArchivedProducts = prisma.product.count({
    where: { isArchived: true },
  });
  const totalProducts = prisma.product.count();
  const [allArchivedProducts, allProducts, allUsers] = await Promise.all([
    totalArchivedProducts,
    totalProducts,
    totalUsers,
  ]);
  return (
    <div className="pt-[100px]">
      <div className="flex justify-between w-screen container flex-col">
        <div className="w-full mb-10 flex gap-5 flex-wrap">
          <div className="rounded-lg p-5 w-fit border-2 flex gap-2 border-foreground">
            <IoIosShirt size={22} />
            <div>
              <h1 className="font-semibold flex gap-2">All Products</h1>
              <h2>{allProducts}</h2>
            </div>
          </div>
          {allArchivedProducts > 0 && (
            <div className="rounded-lg p-5 w-fit border-2 flex gap-2 border-foreground">
              <MdArchive size={22} />
              <div>
                <h1 className="font-semibold flex gap-2">Archived Products</h1>
                <h2>{allArchivedProducts}</h2>
              </div>
            </div>
          )}
          <div className="rounded-lg p-5 w-fit border-2 flex gap-2 border-foreground">
            <FaUsers size={22} />
            <div>
              <h1 className="font-semibold flex gap-2">All Users</h1>
              <h2>{allUsers}</h2>
            </div>
          </div>
        </div>
      </div>
      <Charts />
    </div>
  );
};

export default Admin;
