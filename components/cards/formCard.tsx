"use client";

import { deleteCartItem, updateCartItemQuantity } from "@/actions/action";
import formatCurrency from "@/lib/formatCurrency";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";

type Props = {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    salePrice: number | null;
    category: string;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  quantity: number;
  size: string;
  id: string;
};

const FormCard = ({ item, quantity, size, id }: Props) => {
  const { data: session } = useSession();

  function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const quantity = Number(e.target.value);
    updateCartItemQuantity(session?.user.id as string, quantity, id);
  }

  const formatted = formatCurrency(item.price);

  return (
    <div className="flex gap-5 mt-5 rounded-md w-full">
      <Image
        src={item.images[0]}
        height={120}
        width={120}
        alt="product image"
        className="rounded-md object-cover aspect-square"
        priority={true}
        quality={50}
      />
      <div className="flex flex-col gap-2">
        <h1>{item.title}</h1>
        <h1>{formatted.split(".")[0]}</h1>
        <form>
          <label htmlFor="quantity">Quantity</label>
          <select
            className="rounded-sm mx-2 p-1 border-[2px] border-slate-200"
            name="quantity"
            id="quantity"
            defaultValue={quantity}
            onChange={(e) => handleQuantityChange(e)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </form>
      </div>
      <button
        aria-label="delete button"
        onClick={() => deleteCartItem(id, session?.user.id as string)}
      >
        <Trash2 size={28} strokeWidth={1.25} />
      </button>
      <Badge
        variant="secondary"
        className="h-[30px] w-[70px] flex items-center justify-center"
      >
        Size {size}
      </Badge>
    </div>
  );
};

export default FormCard;
