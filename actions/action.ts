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

export async function addToCart(
  pid: string,
  image: string,
  price: number,
  title: string,
  userId: string
) {
  console.log(image);
  const cartExists = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  const itemExists = await prisma.cartItems.findFirst({
    where: {
      cart: {
        userId,
      },
      pid,
    },
  });

  if (itemExists) {
    await prisma.cart.update({
      include: {
        items: true,
      },
      where: {
        userId,
      },
      data: {
        items: {
          update: {
            where: {
              id: itemExists.id,
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          },
        },
      },
    });
    revalidatePath("/cart");
  }

  if (cartExists) {
    if (!itemExists) {
      await prisma.cart.update({
        include: {
          items: true,
        },
        where: {
          userId,
        },
        data: {
          items: {
            create: {
              pid,
              image,
              price,
              title,
            },
          },
        },
      });
    }
  } else {
    await prisma.cart.create({
      include: {
        items: true,
      },
      data: {
        userId,
        items: {
          create: {
            title,
            image,
            pid,
            price,
          },
        },
      },
    });
  }
  revalidatePath("/cart");
}

export async function deleteCartItem(id: string, userId: string) {
  await prisma.cartItems.delete({
    where: {
      cart: {
        userId,
      },
      id,
    },
  });
  revalidatePath("/cart");
}

export async function updateCartItemQuantity(
  userId: string,
  quantity: number,
  id: string
) {
  await prisma.cartItems.update({
    where: {
      cart: {
        userId,
      },
      id,
    },
    data: {
      quantity,
    },
  });
  revalidatePath("/cart");
}
