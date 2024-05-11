"use client";

import ProductCard from "@/components/cards/productCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Products } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  products: Products[];
};

export default function ProductGrid({ products }: Props) {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  if (min && max) {
    const priceFilter = products.filter((product) => {
      return product.price < Number(max) && product.price > Number(min);
    });
  }
  return (
    <>
      <div className="flex w-screen container justify-between mt-6 mb-6">
        <h1 className="font-medium text-2xl">Men</h1>
        <Sheet>
          <SheetTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center px-3 py-2 rounded-sm font-semibold">
            Filters
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              {/* <SheetTitle className="text-center">Filters</SheetTitle> */}
              <div className="text-left">
                <div>
                  <h1 className="font-medium text-lg mb-3 mt-3">Price</h1>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <Link href={`?min=0&max=5000`} scroll={false} replace>
                        <RadioGroupItem
                          value="price-option-one"
                          id="price-option-one"
                        />
                      </Link>
                      <Label htmlFor="price-option-one">Under ₹5000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`?min=5000&max=10000`} scroll={false} replace>
                        <RadioGroupItem
                          value="price-option-two"
                          id="price-option-two"
                        />
                      </Link>
                      <Label htmlFor="price-option-two">₹5000 - ₹10,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`?min=10000&max=15000`}
                        scroll={false}
                        replace
                      >
                        <RadioGroupItem
                          value="price-option-three"
                          id="price-option-three"
                        />
                      </Link>
                      <Label htmlFor="price-option-three">
                        ₹10,000 - ₹15,000
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`?min=15000&max=150000`}
                        scroll={false}
                        replace
                      >
                        <RadioGroupItem
                          value="price-option-four"
                          id="price-option-four"
                        />
                      </Link>
                      <Label htmlFor="price-option-four">Above ₹15,000</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <h1 className="font-medium text-lg mb-3 mt-3">Size</h1>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="size-option-one"
                        id="size-option-one"
                      />
                      <Label htmlFor="size-option-one">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="size-option-two"
                        id="size-option-two"
                      />
                      <Label htmlFor="size-option-two">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="size-option-three"
                        id="size-option-three"
                      />
                      <Label htmlFor="size-option-three">Large</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="size-option-four"
                        id="size-option-four"
                      />
                      <Label htmlFor="size-option-four">Extra Large</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <h1 className="font-medium text-lg mb-3 mt-3">Colors</h1>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-one"
                        id="color-option-one"
                      />
                      <Label htmlFor="color-option-one">
                        <div className="flex gap-2">
                          Black
                          <div className="h-4 w-4 rounded-full bg-black"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-two"
                        id="color-option-two"
                      />
                      <Label htmlFor="color-option-two">
                        <div className="flex gap-2">
                          Blue
                          <div className="h-4 w-4 rounded-full bg-blue-400"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-three"
                        id="color-option-three"
                      />
                      <Label htmlFor="color-option-three">
                        <div className="flex gap-2">
                          Green
                          <div className="h-4 w-4 rounded-full bg-green-700"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-four"
                        id="color-option-four"
                      />
                      <Label htmlFor="color-option-four">
                        <div className="flex gap-2">
                          White
                          <div className="h-4 w-4 rounded-full bg-white border-[1px] border-black"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-five"
                        id="color-option-five"
                      />
                      <Label htmlFor="color-option-five">
                        <div className="flex gap-2">
                          Pink
                          <div className="h-4 w-4 rounded-full bg-pink-500"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-six"
                        id="color-option-six"
                      />
                      <Label htmlFor="color-option-six">
                        <div className="flex gap-2">
                          Red
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-seven"
                        id="color-option-seven"
                      />
                      <Label htmlFor="color-option-seven">
                        <div className="flex gap-2">
                          Brown
                          <div className="h-4 w-4 rounded-full bg-[#964B00]"></div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="color-option-eight"
                        id="color-option-eight"
                      />
                      <Label htmlFor="color-option-eight">
                        <div className="flex gap-2">
                          Beige
                          <div className="h-4 w-4 rounded-full bg-[#F5F5DC]"></div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex lg:container md:container lg:flex-row gap-8 items-start">
        <div className="md:m-0 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-5 lg:gap-7 pb-10">
          {filteredProducts?.map((product, key) => (
            <ProductCard
              key={key}
              image={product.images[0]}
              title={product.title}
              price={product.price}
              category={product.category}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
