"use client";

import ProductCard from "@/components/cards/productCard";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Products } from "@/lib/types";
import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { Button } from "@/components/ui/button";

type Props = {
  products: Products[];
};

export default function ProductGrid({ products }: Props) {
  const [filteredProducts, setFilteredProducts] =
    useState<Products[]>(products);
  function handlePriceFilter(min: number, max: number) {
    const constraint = products.filter((product) => {
      return product.price > min && product.price < max;
    });
    setFilteredProducts(constraint);
  }
  return (
    <div className="flex flex-col lg:flex-row mt-8 gap-8 items-start">
      <div className="lg:hidden">
        <Drawer>
          <div className="flex container w-screen justify-between">
            <h1 className="font-medium text-2xl">Men</h1>
            <DrawerTrigger>
              <div className="flex font-medium gap-2 text-md">
                <LuFilter size={22} />
                Filter
              </div>
            </DrawerTrigger>
          </div>

          <DrawerContent className="container">
            <Accordion
              className="mt-2"
              type="single"
              collapsible
              defaultValue="opened"
            >
              <AccordionItem value="opened">
                <AccordionTrigger>Prices</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="price-option-one"
                        id="price-option-one"
                        onClick={() => handlePriceFilter(0, 5000)}
                      />
                      <Label htmlFor="price-option-one">Under ₹5000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="price-option-two"
                        id="price-option-two"
                        onClick={() => handlePriceFilter(5000, 10000)}
                      />
                      <Label htmlFor="price-option-two">₹5000 - ₹10,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="price-option-three"
                        id="price-option-three"
                        onClick={() => handlePriceFilter(10000, 15000)}
                      />
                      <Label htmlFor="price-option-three">
                        ₹10,000 - ₹15,000
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="price-option-four"
                        id="price-option-four"
                        onClick={() => handlePriceFilter(15000, 100000)}
                      />
                      <Label htmlFor="price-option-four">Above ₹15,000</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Sizes</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Colors</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <DrawerClose className="my-5">
              <Button
                variant={"destructive"}
                onClick={() => setFilteredProducts(products)}
              >
                Reset Filters
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="px-6 basis-[15%] border-r-2 h-screen sticky top-[90px] hidden lg:block">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-medium">Filters</h1>
          <LuFilter size={22} />
        </div>
        <Accordion
          className="mt-2"
          type="single"
          collapsible
          defaultValue="opened"
        >
          <AccordionItem value="opened">
            <AccordionTrigger>Prices</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-one"
                    id="price-option-one"
                    onClick={() => handlePriceFilter(0, 5000)}
                  />
                  <Label htmlFor="price-option-one">Under ₹5000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-two"
                    id="price-option-two"
                    onClick={() => handlePriceFilter(5000, 10000)}
                  />
                  <Label htmlFor="price-option-two">₹5000 - ₹10,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-three"
                    id="price-option-three"
                    onClick={() => handlePriceFilter(10000, 15000)}
                  />
                  <Label htmlFor="price-option-three">₹10,000 - ₹15,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-four"
                    id="price-option-four"
                    onClick={() => handlePriceFilter(15000, 100000)}
                  />
                  <Label htmlFor="price-option-four">Above ₹15,000</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="opened">
            <AccordionTrigger>Sizes</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="opened">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button
          className="mt-5"
          variant={"destructive"}
          onClick={() => setFilteredProducts(products)}
        >
          Reset Filters
        </Button>
      </div>
      <div className="lg:container md:container lg:basis-[85%] lg:m-2 md:m-0 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-5 lg:gap-7 lg:pr-6 pb-10">
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
  );
}
