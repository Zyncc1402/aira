"use client";

import { create } from "zustand";

type address = {
  selectedAddress: string | undefined;
  setAddress: (id: string) => void;
};

export const useAddress = create<address>((set) => ({
  selectedAddress: undefined,
  setAddress: (id: string) => set({ selectedAddress: id }),
}));
