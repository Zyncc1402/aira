"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  text: string;
  Atext: string;
};

export default function CreateProductButton({ text, Atext }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button aria-label="Button" type="submit" disabled={pending}>
      {pending ? Atext : text}
    </Button>
  );
}
