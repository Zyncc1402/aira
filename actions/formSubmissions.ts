"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== "Admin") {
    return null;
  }
  const images = formData.getAll("images");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sm = formData.get("sm") as string;
  const md = formData.get("md") as string;
  const lg = formData.get("lg") as string;
  const xl = formData.get("xl") as string;
  const price = formData.get("price") as unknown as string;
  const color = formData.get("color") as string;
  const isArchived = formData.get("isArchived") as string;
  const isFeatured = formData.get("featured") as string;
  const category = formData.get("category") as string;
  const fabric = formData.get("fabric") as string;
  const transparency = formData.get("transparency") as string;
  const weavePattern = formData.get("weavePattern") as string;
  const fit = formData.get("fit") as string;
  const colors = color.split(" ");

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  let arrayOfImages = [];

  if (images.length == 0) {
    return {
      noImage: true,
    };
  }
  if (images)
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
        fabric,
        transparency,
        weavePattern,
        fit,
        isFeatured: Boolean(isFeatured),
        color: colors,
        category: category,
        images: arrayOfImages as string[],
        isArchived: Boolean(isArchived),
      },
      include: {
        quantity: true,
      },
    });
    console.log("Success");
  } catch (error) {
    console.log(error);
    throw Error("Failed to create product");
  } finally {
    revalidatePath("/men");
    revalidatePath("/admin/products");
  }
}

export async function updateProduct(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== "Admin") {
    return null;
  }
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sm = formData.get("sm") as string;
  const md = formData.get("md") as string;
  const lg = formData.get("lg") as string;
  const xl = formData.get("xl") as string;
  const price = formData.get("price") as string;
  const color = formData.get("color") as string;
  const category = formData.get("category") as string;
  const isArchived = formData.get("isArchived") as string;
  const featured = formData.get("featured") as string;
  const colors = color.split(" ");

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
        color: colors,
        category,
        isFeatured: Boolean(featured),
        isArchived: Boolean(Number(isArchived)),
      },
      include: {
        quantity: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("Failed to update product");
  } finally {
    revalidatePath(`/${category}`);
    revalidatePath("/admin/products");
  }
}

export async function updateProductWithImage(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== "Admin") {
    return null;
  }
  const images = formData.getAll("images");
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sm = formData.get("sm") as string;
  const md = formData.get("md") as string;
  const lg = formData.get("lg") as string;
  const xl = formData.get("xl") as string;
  const price = formData.get("price") as string;
  const color = formData.get("color") as string;
  const category = formData.get("category") as string;
  const isArchived = formData.get("isArchived") as string;
  const featured = formData.get("featured") as string;
  const colors = color.split(" ");

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
        color: colors,
        category: category,
        isFeatured: Boolean(featured),
        images: arrayOfImages as string[],
        isArchived: Boolean(isArchived),
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("Failed to update product");
  } finally {
    revalidatePath(`/${category}`);
    revalidatePath("/admin/products");
  }
}

export async function uploadReview(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const images = formData.getAll("images");
  const pid = formData.get("pid") as string;
  const uid = formData.get("uid") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  if (images) {
    let arrayOfImages = [];
    for (const image of images) {
      const file = image as File;
      const arrayBuffer = await file?.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const res = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Reviews" }, (error, result) => {
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
      await prisma.reviews.create({
        data: {
          title,
          description,
          images: arrayOfImages as string[],
          productId: pid,
          userId: uid,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      revalidatePath(`/${category}/${pid}`);
      redirect(`/${category}/${pid}`);
    }
  } else {
    try {
      await prisma.reviews.create({
        data: {
          title,
          description,
          productId: pid,
          userId: uid,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      revalidatePath(`/men/${pid}`);
    }
  }
}

export async function updateUserAddress(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address1 = formData.get("address1") as string;
  const address2 = formData.get("address2") as string;
  const state = formData.get("state") as string;
  const zipcode = formData.get("zipcode") as string;
  const landmark = formData.get("landmark") as string;

  await prisma.address.create({
    data: {
      userId: id,
      name,
      email,
      phone,
      address1,
      address2,
      landmark,
      state,
      zipcode: Number(zipcode),
    },
  });
  revalidatePath("/cart");
}

export async function deleteAddress(id: string) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  await prisma.address.delete({
    where: {
      userId: id,
    },
  });
  revalidatePath("/cart");
}
