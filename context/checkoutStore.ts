"use client";

import { cartItemWithProduct } from "@/lib/types";
import { create } from "zustand";

type checkoutStore = {
  checkoutItems: cartItemWithProduct[] | undefined;
  setCheckoutItems: (items: cartItemWithProduct[]) => void;
};

export const checkoutStore = create<checkoutStore>((set) => ({
  checkoutItems: [],
  setCheckoutItems: (items: cartItemWithProduct[]) =>
    set({ checkoutItems: items }),
}));
