"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const images = formData.getAll("images");
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const quantity = formData.get("quantity") as string;
  const price = formData.get("price") as unknown as string;
  const category = formData.get("category") as string;
  const isArchived = formData.get("isArchived") as string;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  let arrayOfImages = [];

  for (const image of images) {
    const file = image as File;
    const arrayBuffer = await file?.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result?.secure_url);
        })
        .end(buffer);
    });
    arrayOfImages.push(res);
  }

  await prisma.product.create({
    data: {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category: category,
      images: arrayOfImages as string[],
      isArchived: Boolean(isArchived),
    },
  });

  revalidatePath("/categories/men");
  revalidatePath("/categories/women");
  revalidatePath("/admin/products");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const quantity = formData.get("quantity") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const isArchived = formData.get("isArchived") as string;

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category: category,
      isArchived: Boolean(isArchived),
    },
  });

  revalidatePath("/categories/men");
  revalidatePath("/categories/women");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}

export async function updateProductWithImage(formData: FormData) {
  const images = formData.getAll("images");
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const quantity = formData.get("quantity") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const isArchived = formData.get("isArchived") as string;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const prevProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  const prevImages = prevProduct?.images;

  let arrayOfImages = prevImages;

  for (const image of images) {
    const file = image as File;
    const arrayBuffer = await file?.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const res: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result?.secure_url);
        })
        .end(buffer);
    });
    arrayOfImages?.push(res);
  }
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category: category,
      images: arrayOfImages as string[],
      isArchived: Boolean(isArchived),
    },
  });

  revalidatePath("/categories/men");
  revalidatePath("/categories/women");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}
