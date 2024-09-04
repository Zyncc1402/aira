"use client";

import { checkoutStore } from "@/context/checkoutStore";
import React from "react";

export default function Page() {
  const { checkoutItems } = checkoutStore();
  console.log(checkoutItems);
  return <div className="container">{"CHECKOUT"}</div>;
}
