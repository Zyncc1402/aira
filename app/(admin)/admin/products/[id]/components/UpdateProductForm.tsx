"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  updateProduct,
  updateProductWithImage,
} from "@/actions/formSubmissions";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MdHideImage, MdImage } from "react-icons/md";
import CreateProductButton from "../../create/components/CreateProductButton";

interface Product {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  images?: string[];
  salePrice?: number | null;
  category?: string;
  isArchived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type Props = {
  product: Product | null;
};

const CreateProductForm = ({ product }: Props) => {
  const [imageDisabled, setImageDisabled] = useState(true);
  if (product) {
    const { title, description, images, price, quantity, category, id } =
      product;
    return (
      <div className="flex flex-wrap flex-col md:flex-row gap-20 mt-16 mb-16">
        <form
          action={imageDisabled ? updateProduct : updateProductWithImage}
          className="flex flex-1 flex-col gap-8"
        >
          <div className="flex gap-4">
            <Button
              aria-label="Button"
              type="button"
              size={"sm"}
              variant={"secondary"}
              onClick={() => setImageDisabled(!imageDisabled)}
            >
              {imageDisabled ? (
                <MdImage size={25} />
              ) : (
                <MdHideImage size={25} />
              )}
            </Button>
            <Input
              name="images"
              type="file"
              multiple
              disabled={imageDisabled}
            />
          </div>
          <input type="hidden" name="id" value={id} />
          <Input
            name="title"
            required
            placeholder="Title"
            defaultValue={title}
          />
          <Textarea
            placeholder="Description"
            name="description"
            defaultValue={description}
            className="resize-y h-[150px]"
          />
          <Input
            name="price"
            type="number"
            required
            placeholder="Price"
            defaultValue={price}
          />
          <Input
            name="quantity"
            type="number"
            required
            placeholder="Quantity"
            defaultValue={quantity}
          />
          <Label>Category</Label>
          <select
            name="category"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={category}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
          <Label>isArchived?</Label>
          <select
            name="isArchived"
            defaultValue={""}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value={1}>True</option>
            <option value={""}>False</option>
          </select>
          <CreateProductButton Atext="Updating..." text="Update" />
        </form>
        <Carousel
          className="flex flex-1"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {images?.map((image) => (
              <CarouselItem key={image}>
                <Image
                  src={image}
                  height={1000}
                  width={1000}
                  alt="Carousel Image"
                  priority={true}
                  className="rounded-sm"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
};

export default CreateProductForm;
