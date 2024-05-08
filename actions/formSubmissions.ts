"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const images = formData.getAll("images");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sm = formData.get("sm") as string;
  const md = formData.get("md") as string;
  const lg = formData.get("lg") as string;
  const xl = formData.get("xl") as string;
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

  try {
    await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        quantity: {
          create: {
            sm: Number(sm),
            md: Number(md),
            lg: Number(lg),
            xl: Number(xl),
          },
        },
        category: category,
        images: arrayOfImages as string[],
        isArchived: Boolean(isArchived),
      },
      include: {
        quantity: true,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  } finally {
    revalidatePath("/categories/men");
    revalidatePath("/categories/women");
    revalidatePath("/admin/products");
  }
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sm = formData.get("sm") as string;
  const md = formData.get("md") as string;
  const lg = formData.get("lg") as string;
  const xl = formData.get("xl") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const isArchived = formData.get("isArchived") as string;

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        price: Number(price),
        quantity: {
          update: {
            sm: Number(sm),
            md: Number(md),
            lg: Number(lg),
            xl: Number(xl),
          },
        },
        category: category,
        isArchived: Boolean(isArchived),
      },
      include: {
        quantity: true,
      },
    });
  } catch (error) {
    return {
      error: "Something Went Wrong",
    };
  } finally {
    revalidatePath("/categories/men");
    revalidatePath("/categories/women");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
  }
}

export async function updateProductWithImage(formData: FormData) {
  const images = formData.getAll("images");
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sm = formData.get("sm") as string;
  const md = formData.get("md") as string;
  const lg = formData.get("lg") as string;
  const xl = formData.get("xl") as string;
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
  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        price: Number(price),
        quantity: {
          update: {
            sm: Number(sm),
            md: Number(md),
            lg: Number(lg),
            xl: Number(xl),
          },
        },
        category: category,
        images: arrayOfImages as string[],
        isArchived: Boolean(isArchived),
      },
    });
  } catch (error) {
    return {
      error: "Something Went Wrong",
    };
  } finally {
    revalidatePath("/categories/men");
    revalidatePath("/categories/women");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
  }
}
