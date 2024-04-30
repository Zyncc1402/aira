"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LuMenu } from "react-icons/lu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { IoMdExit } from "react-icons/io";

const AdminNavbar = () => {
  return (
    <header className="z-10 header pt-4 pb-4 w-full fixed top-0 left-0 right-0 bg-white text-black">
      <nav className="container flex justify-between items-center">
        <Link aria-label="navigation-link" href={"/admin"}>
          <h1 className="font-bold text-2xl">Aira Admin</h1>
        </Link>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <LuMenu size={32} className="lg:hidden" />
            </SheetTrigger>
            <SheetContent>
              <ul className="items-start gap-8 flex flex-col mt-0">
                <li className="font-medium text-md">
                  <Link aria-label="navigation-link" href={"/admin/users"}>
                    Users
                  </Link>
                </li>
                <Separator />
                <li className="font-medium text-md">
                  <Link aria-label="navigation-link" href={"/admin/products"}>
                    Products
                  </Link>
                </li>
                <li className="font-medium text-md">Categories </li>
                <li className="font-medium text-md">Men </li>
                <li className="font-medium text-md">Women </li>
                <Separator />
                <li className="font-medium text-md">
                  <Link aria-label="navigation-link" href={"/transactions"}>
                    Transactions
                  </Link>
                </li>
              </ul>
              <Link aria-label="navigation-link" href={"/"}>
                <Button
                  aria-label="Button"
                  variant={"secondary"}
                  className="absolute bottom-5 right-5"
                >
                  <IoMdExit size={20} className="mr-2" />
                  Exit
                </Button>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
        <ul className="lg:flex items-center gap-8 hidden">
          <li>
            <Link aria-label="navigation-link" href={"/admin/users"}>
              Users
            </Link>
          </li>
          <li>
            <Link aria-label="navigation-link" href={"/admin/products"}>
              Products
            </Link>
          </li>
          <Link aria-label="navigation-link" href={"/admin/transactions"}>
            Transactions
          </Link>
          <Link aria-label="navigation-link" href={"/"}>
            <Button aria-label="Button" variant={"secondary"}>
              <IoMdExit size={20} className="mr-2" />
              Exit
            </Button>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavbar;
