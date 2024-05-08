import ProductCard from "@/components/cards/productCard";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Products } from "@/lib/types";
import { LuFilter } from "react-icons/lu";

type Props = {
  products: Products[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className="flex mt-14 gap-12 items-start">
      <div className="px-6 basis-[15%] border-r-2 h-screen sticky top-[90px] hidden lg:block">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-medium">Filters</h1>
          <LuFilter size={22} />
        </div>
        <Accordion className="mt-2" type="multiple">
          <AccordionItem value="item-2">
            <AccordionTrigger>Prices</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-one"
                    id="price-option-one"
                  />
                  <Label htmlFor="price-option-one">Under ₹500</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-two"
                    id="price-option-two"
                  />
                  <Label htmlFor="price-option-two">Under ₹1000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-three"
                    id="price-option-three"
                  />
                  <Label htmlFor="price-option-three">₹1000 - ₹1500</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="price-option-four"
                    id="price-option-four"
                  />
                  <Label htmlFor="price-option-four">Above ₹2000</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
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
          <AccordionItem value="item-4">
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
      </div>

      <div className="lg:container md:container lg:basis-[85%] lg:m-2 md:m-0 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-5 lg:gap-7 lg:pr-6 pb-10">
        {products?.map((product, key) => (
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
