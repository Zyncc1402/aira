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
import { toast } from "sonner";

type Props = {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    salePrice?: number | null;
    category: string;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function RightPage({ product }: Props) {
  const { pending } = useFormStatus();
  const { data: session } = useSession();
  const { title, description, price, quantity, id } = product;
  const formatted = formatCurrency(price);

  async function handleAddToCart(formData: FormData) {
    const size = formData.get("size") as string;
    const result = await addToCart(id, size, session?.user.id as string);
    if (result?.error) {
      toast.error(`${title} already in Cart`);
    }
  }

  return (
    <div className="md:basis-1/2 flex flex-col gap-4 w-[100%] container">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h1>{description}</h1>
      <h1 className="text-xl font-semibold">{formatted.split(".")[0]}</h1>
      <div className="flex flex-col md:items-center md:flex-row gap-6">
        <div className="flex-1">
          <form
            action={handleAddToCart}
            className="flex flex-col items-start gap-4"
          >
            <div className="flex items-center gap-4">
              <Label htmlFor="size" className="text-md">
                Sizes
              </Label>
              <select
                name="size"
                id="size"
                className="border-2 inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none    disabled:pointer-events-none disabled:opacity-50 rounded-[8px] p-1"
                required
              >
                <option selected></option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="flex w-full gap-4 flex-col md:flex-row">
              <Button
                aria-label="Button"
                className="rounded-sm flex-1"
                variant={"outline"}
                type="submit"
                disabled={pending}
              >
                <IoCartOutline className="mr-3" size={27} />
                {pending ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                aria-label="Button"
                className="rounded-md flex-1"
                variant={"secondary"}
              >
                <IoMdHeart className="mr-3" size={23} />
                Add to Wishlist
              </Button>
              {session?.user.role === "Admin" && (
                <Link href={"/admin/products/" + product.id} className="flex-1">
                  <Button
                    className="flex-1 w-full rounded-md"
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
