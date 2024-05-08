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
import { Label } from "@/components/ui/label";
import { addToCart } from "@/actions/action";
import { useToast } from "@/components/ui/use-toast";
import { Products } from "@/lib/types";

type Props = {
  product: Products;
};

export default function RightPage({ product }: Props) {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { data: session } = useSession();
  const { title, description, price, quantity, id } = product;
  const formatted = formatCurrency(price);

  async function handleAddToCart(formData: FormData) {
    console.log("yes");
    const size = formData.get("size") as string;
    if (!session?.user) {
      toast({
        variant: "destructive",
        title: "Must be logged in to add to cart",
      });
      return null;
    }
    const result = await addToCart(id, size, session?.user.id as string);
    if (result?.error) {
      toast({
        title: `${title} already in Cart`,
      });
    }
  }
  return (
    <div className="md:basis-1/2 flex flex-col gap-4 container">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h1>{description}</h1>
      <h1 className="text-xl font-semibold">{formatted.split(".")[0]}</h1>
      <div className="flex flex-col md:items-center md:flex-row gap-6">
        <div className="flex-1">
          <form
            action={handleAddToCart}
            className="flex flex-col items-start gap-4"
          >
            <h1>Select a size</h1>
            <div className="flex gap-6 items-start mb-2 overflow-hidden flex-wrap">
              <div className="flex flex-col items-center gap-2">
                {quantity?.sm !== 0 && (
                  <Label
                    htmlFor="sm"
                    className="w-[90px] smlabel p-1 text-secondary-foreground rounded-sm text-lg font-semibold text-center"
                  >
                    S
                    <input
                      id="sm"
                      name="sm"
                      type="radio"
                      hidden
                      required
                      value={"sm"}
                    />
                  </Label>
                )}
                {quantity?.sm && quantity?.sm < 10 && quantity?.sm !== 0 && (
                  <p className="text-sm font-medium text-red-400">
                    {quantity?.sm} left
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                {quantity?.md !== 0 && (
                  <Label
                    htmlFor="md"
                    className="w-[90px] smlabel p-1 text-secondary-foreground rounded-sm text-lg font-semibold text-center"
                  >
                    M
                    <input
                      id="md"
                      name="md"
                      type="radio"
                      hidden
                      required
                      value={"md"}
                    />
                  </Label>
                )}
                {quantity?.md && quantity?.md < 10 && quantity?.md !== 0 && (
                  <p className="text-sm font-medium text-red-400">
                    {quantity?.md} left
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                {quantity?.lg !== 0 && (
                  <Label
                    htmlFor="lg"
                    className="w-[90px] smlabel p-1 text-secondary-foreground rounded-sm text-lg font-semibold text-center"
                  >
                    L
                    <input
                      id="lg"
                      name="lg"
                      type="radio"
                      hidden
                      required
                      value={"lg"}
                    />
                  </Label>
                )}
                {quantity?.lg && quantity?.lg < 10 && quantity?.lg !== 0 && (
                  <p className="text-sm font-medium text-red-400">
                    {quantity?.lg} left
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                {quantity?.xl !== 0 && (
                  <Label
                    htmlFor="xl"
                    className="w-[90px] smlabel p-1 text-secondary-foreground rounded-sm text-lg font-semibold text-center"
                  >
                    XL
                    <input
                      id="xl"
                      name="xl"
                      type="radio"
                      hidden
                      required
                      value={"xl"}
                    />
                  </Label>
                )}
                {quantity?.xl && quantity?.xl < 10 && quantity?.xl !== 0 && (
                  <p className="text-sm font-medium text-red-400">
                    {quantity?.xl} left
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full flex-wrap flex-col md:flex-row">
              <Button
                aria-label="Button"
                className="flex-1 rounded-sm py-3 md:py-6"
                variant={"outline"}
                size={"lg"}
                type="submit"
                disabled={pending}
              >
                <IoCartOutline className="mr-3" size={27} />
                {pending ? "Adding..." : "Add to Cart"}
              </Button>
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
              {session?.user.role === "Admin" && (
                <Link href={"/admin/products/" + product.id} className="flex-1">
                  <Button
                    size={"lg"}
                    className="flex-1 w-full rounded-md py-3 md:py-6"
                    aria-label="Button"
                  >
                    <MdOutlineModeEdit className="mr-3" size={23} />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
