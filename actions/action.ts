"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: {
      id,
    },
  });
  console.log("Product Deleted");
  revalidatePath("/admin/products");
  revalidatePath("/categories/men");
  revalidatePath("/categories/women");
}

export async function archiveProduct(id: string) {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      isArchived: true,
    },
  });
  console.log("Product Archived");
  revalidatePath("/admin/products");
  revalidatePath("/categories/men");
  revalidatePath("/categories/women");
}

export async function unarchiveProduct(id: string) {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      isArchived: false,
    },
  });
  console.log("Product UnArchived");
  revalidatePath("/admin/products");
  revalidatePath("/categories/men");
  revalidatePath("/categories/women");
}

export async function addToCart(id: string, userId: string) {}

export async function deleteCartItem(id: string) {}
