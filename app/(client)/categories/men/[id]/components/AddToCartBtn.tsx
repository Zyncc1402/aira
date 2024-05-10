"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { IoCartOutline } from "react-icons/io5";

export default function AddToCartBtn() {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-label="Button"
      className="rounded-sm w-full py-3 md:py-6"
      variant={"outline"}
      size={"lg"}
      type="submit"
      disabled={pending}
    >
      <IoCartOutline className="mr-3" size={27} />
      {pending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
