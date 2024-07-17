import React from "react";
import AddReviewPage from "./addReviewPage";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Params) {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (product)
    return (
      <section className="container mt-[40px]">
        <h1 className="text-2xl font-semibold">
          Add a review for {product?.title}
        </h1>
        <AddReviewPage id={id} category={product?.category} session={session} />
      </section>
    );
}
