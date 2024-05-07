"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LuMenu } from "react-icons/lu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdExit } from "react-icons/io";

import { useMediaQuery } from "react-responsive";

const AdminNavbar = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  if (!isDesktop) {
    return (
      <header className="z-10 header pt-4 pb-4 w-full fixed top-0 left-0 right-0 bg-white text-black">
        <nav className="container flex justify-between items-center">
          <Link aria-label="navigation-link" href={"/admin"}>
            <h1 className="font-bold text-2xl">Aira Admin</h1>
          </Link>
          <Sheet>
            <SheetTrigger>
              <LuMenu size={32} />
            </SheetTrigger>
            <SheetContent>
              <ul className="items-start gap-8 flex flex-col mt-0">
                <li className="font-medium text-md">
                  <SheetClose asChild>
                    <Link aria-label="navigation-link" href={"/admin"}>
                      Admin
                    </Link>
                  </SheetClose>
                </li>
                <li className="font-medium text-md">
                  <SheetClose asChild>
                    <Link aria-label="navigation-link" href={"/admin/users"}>
                      Users
                    </Link>
                  </SheetClose>
                </li>
                <li className="font-medium text-md">
                  <SheetClose asChild>
                    <Link aria-label="navigation-link" href={"/admin/products"}>
                      Products
                    </Link>
                  </SheetClose>
                </li>
              </ul>
              <Link aria-label="navigation-link" href={"/"}>
                <SheetClose asChild>
                  <Button
                    aria-label="Button"
                    variant={"secondary"}
                    className="absolute bottom-5 right-5"
                  >
                    <IoMdExit size={20} className="mr-2" />
                    Exit
                  </Button>
                </SheetClose>
              </Link>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="z-10 header pt-4 pb-4 w-full fixed top-0 left-0 right-0 bg-white text-black">
        <nav className="container flex justify-between items-center">
          <Link aria-label="navigation-link" href={"/admin"}>
            <h1 className="font-bold text-2xl">Aira Admin</h1>
          </Link>

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
  }
};

export default AdminNavbar;
