import React from "react";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu, LuUser } from "react-icons/lu";
import { PiShoppingBagOpen } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { MdLockOutline, MdSearch } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

const Navbar = async () => {
  const navlinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Men",
      href: "/categories/men",
    },
    {
      label: "Women",
      href: "/categories/women",
    },
  ];
  const session = await auth();
  return (
    <header className="z-10 header pb-4 pt-4 w-full fixed top-0 left-0 right-0 bg-white text-black">
      <nav className="container flex justify-between items-center ">
        <Link href={"/"}>
          <h1 className="font-semibold text-2xl">AIRA</h1>
        </Link>
        <ul className="items-center gap-8 hidden lg:flex">
          {navlinks.map((navlink) => (
            <li key={navlink.label} className="font-medium text-md">
              <Link href={navlink.href}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <LuMenu size={32} className="lg:hidden" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <ul className="items-start gap-8 flex flex-col">
                  {navlinks.map((navlink) => (
                    <li key={navlink.label} className="font-medium text-md">
                      <Link href={navlink.href}>{navlink.label}</Link>
                    </li>
                  ))}
                  <Separator />
                  <li className="font-medium text-md">
                    <Link href={"/account"}>Account</Link>
                  </li>
                  <li className="font-medium text-md">
                    <Link href={"/search"}>Search</Link>
                  </li>
                  <li className="font-medium text-md">
                    <Link href={"/cart"} aria-label="cart">
                      Cart
                    </Link>
                  </li>
                  <li className="font-medium text-md">
                    <Link href={"/wishlist"}>Wishlist</Link>
                  </li>
                  {session?.user?.role == "Admin" ? (
                    <li className="font-medium text-md">
                      <Link href={"/admin"}>Admin</Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </SheetHeader>
              {session?.user ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    aria-label="button"
                    type="submit"
                    className="absolute bottom-5 right-5"
                  >
                    Sign Out
                  </Button>
                </form>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <Button
                    aria-label="button"
                    className="absolute bottom-5 right-5"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </form>
              )}
            </SheetContent>
          </Sheet>
        </div>
        <div className="items-center gap-4 hidden lg:flex">
          <Link href={"/search"}>
            <MdSearch size={32} />
          </Link>
          <Link href={"/cart"}>
            <IoCartOutline size={32} className="lg:block hidden" />
          </Link>
          {session?.user ? (
            <Menubar className="hidden lg:flex items-center">
              <MenubarMenu>
                <MenubarTrigger>
                  <Image
                    src={session?.user?.image || ""}
                    height={35}
                    width={35}
                    alt="profile-avatar"
                    priority={true}
                    quality={40}
                    className="rounded-full"
                  />
                </MenubarTrigger>
                <MenubarContent>
                  <Link href={"/account"}>
                    <MenubarItem>
                      <LuUser size={18} className="mr-2" />
                      Account
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href={"/orders"}>
                    <MenubarItem>
                      <PiShoppingBagOpen size={18} className="mr-2" />
                      Orders
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <Link href={"/wishlist"}>
                    <MenubarItem>
                      <FaRegHeart size={18} className="mr-2" />
                      Wishlist
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  {session?.user?.role === "Admin" && (
                    <>
                      <Link href={"/admin"}>
                        <MenubarItem>
                          <MdLockOutline size={18} className="mr-2" />
                          Admin
                        </MenubarItem>
                      </Link>
                      <MenubarSeparator />
                    </>
                  )}
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button aria-label="button" className="w-[100%]">
                      Sign Out
                    </Button>
                  </form>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <VscAccount size={30} />
                </MenubarTrigger>
                <MenubarContent>
                  <Link href={"/wishlist"}>
                    <MenubarItem>
                      <FaRegHeart size={18} className="mr-2" />
                      Wishlist
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <form
                    action={async () => {
                      "use server";
                      await signIn("google");
                    }}
                  >
                    <Button aria-label="button" className="w-[100%]">
                      Sign In
                    </Button>
                  </form>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
