"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { useFormStatus } from "react-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { useSession } from "next-auth/react";
import formatCurrency from "@/lib/formatCurrency";
import { z } from "zod";
import { addToCart } from "@/actions/action";
import { useToast } from "@/components/ui/use-toast";
import { Products } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import AddToCartBtn from "./AddToCartBtn";

type Props = {
  product: Products;
};

const sizeScheme = z.object({
  size: z.enum(["sm", "md", "lg", "xl"]),
  quantity: z.number().gt(0),
});

export default function RightPage({ product }: Props) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { data: session } = useSession();
  const { title, description, price, quantity, id } = product;
  const formatted = formatCurrency(price);

  async function handleAddToCart() {
    console.log("hgello");
    if (!session?.user) {
      toast({
        variant: "destructive",
        title: "Must be logged in to add to cart",
      });
      return null;
    }
    if (searchParams.get("size") == "sm") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.sm,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else if (searchParams.get("size") == "md") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.md,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else if (searchParams.get("size") == "lg") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.lg,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else if (searchParams.get("size") == "xl") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.xl,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please select a size to continue",
      });
    }
    const size = searchParams.get("size");
    if (size) {
      const result = await addToCart(id, size, session?.user.id as string);
      if (result?.exists) {
        toast({
          title: `${title} already in Cart`,
        });
      } else {
        toast({
          title: `Added ${title} to cart`,
        });
      }
    }
  }
  return (
    <div className="md:basis-1/2 flex flex-col gap-4 container">
      {session?.user.role === "Admin" ? (
        <Link href={"/admin/products/" + product.id}>
          <h1 className="text-3xl font-bold">{title}</h1>
        </Link>
      ) : (
        <h1 className="text-3xl font-bold">{title}</h1>
      )}
      <h1>{description}</h1>
      <h1 className="text-xl font-semibold">{formatted.split(".")[0]}</h1>
      <div className="flex flex-col md:items-center md:flex-row gap-6">
        <div className="flex-1">
          <form
            action={handleAddToCart}
            className="flex flex-col items-start gap-4"
          >
            {quantity?.sm == 0 &&
            quantity?.md == 0 &&
            quantity?.lg == 0 &&
            quantity?.xl == 0 ? (
              <></>
            ) : (
              <h1>Select a size</h1>
            )}
            <div className="flex gap-6 items-start mb-2 overflow-hidden flex-wrap">
              <div className="flex items-start justify-start gap-2 flex-wrap">
                {quantity?.sm !== 0 && (
                  <Link scroll={false} href={"?size=sm"} replace>
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"secondary"}
                        className={`flex flex-col text-lg ${
                          searchParams.get("size") == "sm" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        S
                      </Button>
                      {quantity && quantity?.sm < 5 && (
                        <span>{quantity?.sm} left</span>
                      )}
                    </span>
                  </Link>
                )}
                {quantity?.md !== 0 && (
                  <Link scroll={false} href={"?size=md"} replace>
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"secondary"}
                        className={`flex flex-col text-lg ${
                          searchParams.get("size") == "md" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        M
                      </Button>
                      {quantity && quantity?.md < 5 && (
                        <span>{quantity?.md} left</span>
                      )}
                    </span>
                  </Link>
                )}
                {quantity?.lg !== 0 && (
                  <Link scroll={false} href={"?size=lg"} replace>
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"secondary"}
                        className={`flex flex-col text-lg ${
                          searchParams.get("size") == "lg" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        L
                      </Button>
                      {quantity && quantity?.lg < 5 && (
                        <span>{quantity?.lg} left</span>
                      )}
                    </span>
                  </Link>
                )}
                {quantity?.xl !== 0 && (
                  <Link scroll={false} href={"?size=xl"} replace>
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"secondary"}
                        className={`flex flex-col text-lg ${
                          searchParams.get("size") == "xl" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        XL
                      </Button>
                      {quantity && quantity?.xl < 5 && (
                        <span>{quantity?.xl} left</span>
                      )}
                    </span>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full flex-wrap flex-col md:flex-row">
              {quantity?.sm == 0 &&
              quantity?.md == 0 &&
              quantity?.lg == 0 &&
              quantity?.xl == 0 ? (
                <Button
                  disabled
                  aria-label="Button"
                  className="flex-1 rounded-sm py-3 md:py-6"
                  variant={"outline"}
                  size={"lg"}
                >
                  Out of stock
                </Button>
              ) : (
                <AddToCartBtn />
              )}
              <Button
                aria-label="Button"
                className="rounded-md flex-1 py-3 md:py-6"
                size={"lg"}
                variant={"secondary"}
                type="button"
              >
                <IoMdHeart className="mr-3" size={23} />
                Add to Wishlist
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
