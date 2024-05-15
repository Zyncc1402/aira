import React from "react";
import CreateProductForm from "./components/CreateProductForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const CreateProducts = async () => {
  const session = await auth();
  if (session?.user.role !== "Admin" || !session) {
    notFound();
  }
  return (
    <div className="pt-[100px] container">
      <h1 className="font-semibold text-3xl">Create Product</h1>
      <CreateProductForm />
    </div>
  );
};

export default CreateProducts;
