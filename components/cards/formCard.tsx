"use client";

import { deleteCartItem, updateCartItemQuantity } from "@/actions/action";
import formatCurrency from "@/lib/formatCurrency";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
  };
};

const FormCard = ({ item }: Props) => {
  const { data: session } = useSession();

  function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const quantity = Number(e.target.value);
    updateCartItemQuantity(session?.user.id as string, quantity, item.id);
  }

  const formatted = formatCurrency(item.price);

  return (
    <div className="flex gap-5 mt-5 rounded-md w-full">
      <Image
        src={item.image}
        height={150}
        width={150}
        alt="product image"
        className="rounded-sm object-cover"
        priority={true}
        quality={50}
      />
      <div className="flex flex-col gap-2">
        <h1>{item.title}</h1>
        <h1>{formatted}</h1>
        <form>
          <label htmlFor="quantity">Quantity</label>
          <select
            className="rounded-sm mx-2 p-1 border-[2px] border-slate-200"
            name="quantity"
            id="quantity"
            defaultValue={item.quantity}
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
        onClick={() => deleteCartItem(item.id, session?.user.id as string)}
      >
        <Trash2 size={28} strokeWidth={1.25} />
      </button>
    </div>
  );
};

export default FormCard;
