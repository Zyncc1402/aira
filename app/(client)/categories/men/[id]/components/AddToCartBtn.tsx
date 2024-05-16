"use client";

import Spinner from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { IoCartOutline } from "react-icons/io5";

export default function FormSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-label="Button"
      className={`rounded-sm w-full py-3 md:py-6 ${
        pending && "hover:cursor-progress font-semibold"
      }`}
      variant={"default"}
      size={"lg"}
      type="submit"
      disabled={pending}
    >
      <IoCartOutline className={`mr-3 ${pending && "hidden"}`} size={27} />
      {pending ? <Spinner size={30} /> : `Add to cart`}
    </Button>
  );
}
