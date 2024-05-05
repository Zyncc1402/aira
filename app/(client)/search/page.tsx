import ProductCard from "@/components/cards/productCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";

type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Search({ searchParams: { q } }: Props) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  if (products.length == 0) {
    return (
      <section className="py-[100px] container">
        {q && <h1 className="font-medium text-xl">You searched for {q}</h1>}
        <form
          action={async (formData: FormData) => {
            "use server";
            const q = formData.get("q");
            redirect(`/search?q=${q}`);
          }}
        >
          <div className="flex items-center mt-5 gap-4">
            <Input
              type="text"
              name="q"
              className="w-[500px] "
              placeholder="Search"
            />
            <Button type="submit" size={"icon"} variant={"secondary"}>
              <MdSearch size={32} className="flex-shrink-0" />
            </Button>
          </div>
        </form>
        <div className="h-[80vh] w-full flex items-center justify-center">
          <h1 className="text-xl">No products found</h1>
        </div>
      </section>
    );
  }
  return (
    <section className="py-[100px] container">
      {q && <h1 className="font-medium text-xl">You searched for {q}</h1>}
      <form
        action={async (formData: FormData) => {
          "use server";
          const q = formData.get("q");
          redirect(`/search?q=${q}`);
        }}
      >
        <div className="flex items-center mt-5 gap-4">
          <Input
            type="text"
            name="q"
            className="w-[500px] "
            placeholder="Search"
          />
          <Button type="submit" size={"icon"} variant={"secondary"}>
            <MdSearch size={32} className="flex-shrink-0" />
          </Button>
        </div>
      </form>
      <div className="m-2 md:m-0 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-5 lg:gap-7 py-10">
        {products.map((product, key) => (
          <ProductCard
            key={key}
            image={product.images[0]}
            title={product.title}
            price={product.price}
            category={product.category}
            id={product.id}
            showIcons={true}
          />
        ))}
      </div>
    </section>
  );
}
