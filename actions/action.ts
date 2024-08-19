"use server";

import {auth} from "@/auth";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {v2 as cloudinary} from "cloudinary";

export async function deleteProduct(id: string) {
    const session = await auth();
    if (session?.user.role === "Admin") {
        const getProduct = await prisma.product.findUnique({
            where: {
                id,
            },
        });
        let toDeleteImages: string[] = [];
        getProduct?.images.map((image) => {
            const imgId: string = String(image.split("/").pop());
            toDeleteImages.push(imgId.split(".")[0]);
        });
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        cloudinary.api.delete_resources(toDeleteImages);
        try {
            await prisma.product.delete({
                where: {
                    id,
                },
            });
            console.log("HELLO   ")
            console.log("Product Deleted");
            revalidatePath("/admin/products");
            revalidatePath("/men");
        } catch (error) {
            return {
                error: "Something went wrong",
            };
        }
    }
}

export async function archiveProduct(id: string) {
    const session = await auth();
    if (session?.user.role === "Admin") {
        try {
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
            revalidatePath("/men");
        } catch (error) {
            return {
                error: "Something went wrong",
            };
        }
    }
}

export async function unarchiveProduct(id: string) {
    const session = await auth();
    if (session?.user.role === "Admin") {
        try {
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
            revalidatePath("/men");
        } catch (error) {
            return {
                error: "Something went wrong",
            };
        }
    }
}

export async function addToCart(
    productId: string,
    size: string,
    userId: string
) {
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
            productId,
        },
    });

    if (itemExists) {
        return {
            exists: "Product already in cart",
        };
    }

    if (cartExists) {
        try {
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
                            productId,
                            size,
                        },
                    },
                },
            });
        } catch (error) {
            return {
                error: "Something went wrong",
            };
        }
    } else {
        try {
            await prisma.cart.create({
                include: {
                    items: true,
                },
                data: {
                    userId,
                    items: {
                        create: {
                            productId,
                            size,
                        },
                    },
                },
            });
        } catch (error) {
            return {
                error: "Something went wrong",
            };
        }
    }
    revalidatePath("/cart");
}

export async function deleteCartItem(id: string, userId: string) {
    try {
        await prisma.cartItems.delete({
            where: {
                cart: {
                    userId,
                },
                id,
            },
        });
        revalidatePath("/cart");
    } catch (error) {
        return {
            error: "Something went wrong",
        };
    }
}

export async function updateCartItemQuantity(
    userId: string,
    quantity: number,
    id: string
) {
    console.log(id);
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
        include: {
            cart: true,
        },
    });
    revalidatePath("/cart");
}
