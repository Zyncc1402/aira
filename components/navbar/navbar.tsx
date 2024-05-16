import React from "react";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu, LuUser } from "react-icons/lu";
import { PiShoppingBagOpen } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="z-10 header pb-4 pt-4 w-full fixed top-0 left-0 right-0 bg-white text-black">
      <nav className="container flex justify-between items-center ">
        <Link href={"/"}>
          <h1 className="font-semibold text-2xl">AIRA</h1>
        </Link>
        <div className="hidden lg:block">
          <Menubar className="flex gap-x-6">
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="font-medium text-[15px]" href={"/"}>
                  Home
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="font-medium text-[15px]" href={"/about"}>
                  About
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer font-medium text-[15px]">
                Categories
              </MenubarTrigger>
              <MenubarContent>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/men"}
                >
                  <MenubarItem>MEN</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/co-ord-sets"}
                >
                  <MenubarItem>CO-ORD SETS</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/pants"}
                >
                  <MenubarItem>PANTS</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/jumpsuits"}
                >
                  <MenubarItem>JUMPSUITS</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/shorts"}
                >
                  <MenubarItem>SHORTS</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/dresses"}
                >
                  <MenubarItem>DRESSES</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/outerwear"}
                >
                  <MenubarItem>OUTERWEAR</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/tops"}
                >
                  <MenubarItem>TOPS</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/skirts"}
                >
                  <MenubarItem>SKIRTS</MenubarItem>
                </Link>
                <Link
                  className="font-medium text-[15px]"
                  href={"/categories/lounge-wear"}
                >
                  <MenubarItem>LOUNGE WEAR</MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="font-medium text-[15px]" href={"/account"}>
                  Account
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            {session?.user.role === "Admin" && (
              <MenubarMenu>
                <MenubarTrigger>
                  <Link className="font-medium text-[15px]" href={"/admin"}>
                    Admin
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
            )}
          </Menubar>
        </div>
        <div className="flex items-center justify-between">
          <Link className="font-medium text-[15px]" href={"/wishlist"}>
            <FaRegHeart size={25} className="ml-3" />
          </Link>
          <Link className="font-medium text-[15px]" href={"/cart"}>
            <IoCartOutline size={30} className="ml-3" />
          </Link>
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <LuMenu size={30} className="ml-3" />
            </SheetTrigger>
            <SheetContent className="flex flex-col text-left">
              <Link className="font-medium text-[15px]" href={"/"}>
                <SheetClose>Home</SheetClose>
              </Link>
              <Link className="font-medium text-[15px]" href={"/about"}>
                <SheetClose></SheetClose>About
              </Link>
              <Link className="font-medium text-[15px]" href={"/account"}>
                <SheetClose>Account</SheetClose>
              </Link>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-md font-normal">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 pt-4 flex flex-col gap-y-4">
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/men"}
                      >
                        <SheetClose>MEN</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/co-ord-sets"}
                      >
                        CO-ORD SETS
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/pants"}
                      >
                        <SheetClose>PANTS</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/jumpsuits"}
                      >
                        <SheetClose>JUMPSUITS</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/shorts"}
                      >
                        <SheetClose>SHORTS</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/dresses"}
                      >
                        <SheetClose>DRESSES</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/outerwear"}
                      >
                        <SheetClose>OUTERWEAR</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/tops"}
                      >
                        <SheetClose>TOPS</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/skirts"}
                      >
                        <SheetClose>SKIRTS</SheetClose>
                      </Link>
                      <Link
                        className="font-medium text-[15px]"
                        href={"/categories/lounge-wear"}
                      >
                        <SheetClose>LOUNGE WEAR</SheetClose>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {session?.user.role === "Admin" && (
                <Link className="font-medium text-[15px]" href={"/admin"}>
                  <SheetClose>Admin</SheetClose>
                </Link>
              )}
              <div className="absolute bottom-5 right-5">
                {session?.user ? (
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <SheetClose>
                      <Button variant={"secondary"} type="submit">
                        Sign out
                      </Button>
                    </SheetClose>
                  </form>
                ) : (
                  <form
                    action={async () => {
                      "use server";
                      await signIn("google");
                    }}
                  >
                    <SheetClose>
                      <Button variant={"secondary"}>Sign in</Button>
                    </SheetClose>
                  </form>
                )}
              </div>
            </SheetContent>
          </Sheet>
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                variant={"secondary"}
                type="submit"
                className="hidden lg:block ml-3"
              >
                Sign out
              </Button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button variant={"secondary"} className="hidden lg:block ml-3">
                Sign in
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
