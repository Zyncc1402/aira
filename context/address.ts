"use client";

import { create } from "zustand";

type address = {
  address: string;
  setAddress: (id: string) => void;
};

export const useAddress = create<address>((set) => ({
  address: "",
  setAddress: (id: string) => set({ address: id }),
}));
