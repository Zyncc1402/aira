import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/actions/formSubmissions";
import { Skeleton } from "@/components/ui/skeleton";
import CreateProductButton from "./CreateProductButton";

const CreateProductForm = () => {
  return (
    <div className="flex gap-8 mt-16 mb-16">
      <form action={createProduct} className="flex flex-1 flex-col gap-8">
        <Input name="images" type="file" className="" multiple required />
        <Input name="title" required className="" placeholder="Title" />
        <Textarea placeholder="Description" name="description" />
        <Input
          name="price"
          type="number"
          required
          className=""
          placeholder="Price"
        />
        <Input
          name="quantity"
          type="number"
          required
          className=""
          placeholder="Quantity"
        />
        <Label>Category</Label>
        <select
          name="category"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        <CreateProductButton Atext="Creating..." text="Create" />
      </form>
      <Skeleton className="flex flex-1" />
    </div>
  );
};

export default CreateProductForm;
