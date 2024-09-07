"use server";

import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { Product } from "@prisma/client";

type prod =
  | {
      item: Product;
      quantity: number;
      size: string;
    }[]
  | undefined;

export async function Pay(
  products: prod | undefined,
  addressId: string | undefined
) {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }
  let price = 0;
  if (products) {
    for (const pd of products) {
      const getProduct = await prisma.product.findUnique({
        where: { id: pd.item.id },
      });
      price += getProduct?.price ?? 0;
    }
  }
  const transactionId = uuidv4();
  const payload = {
    merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: "MUID123",
    amount: price * 100,
    redirectUrl: `http://localhost:3000/paymentstatus/${transactionId}`,
    // redirectUrl: `https://airaa.vercel.app/paymentstatus/${transactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: 123456789,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const checksum =
    sha256(base64Payload + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY) +
    "###" +
    process.env.NEXT_PUBLIC_SALT_INDEX;

  const options = {
    method: "POST",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: base64Payload,
    },
  };

  const response = await axios.request(options);
  if (response.data.code == "PAYMENT_INITIATED") {
    try {
      products?.map(async (item) => {
        const orderId = uuidv4();
        await prisma.order.create({
          data: {
            userId: session.user.id as string,
            productId: item.item.id,
            price: item.item.price,
            image: item.item.images[0],
            title: item.item.title,
            category: item.item.category,
            size: item.size,
            quantity: item.quantity,
            orderId,
            transactionId,
            addressId,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  redirect(response.data.data.instrumentResponse.redirectInfo.url);
}

export async function checkPaymentStatus(trID: string) {
  try {
    const checksum =
      sha256(
        `/pg/v1/status/${process.env.NEXT_PUBLIC_MERCHANT_ID}/${trID}` +
          process.env.NEXT_PUBLIC_SALT_KEY
      ) +
      "###" +
      process.env.NEXT_PUBLIC_SALT_INDEX;
    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.NEXT_PUBLIC_MERCHANT_ID}/${trID}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": process.env.NEXT_PUBLIC_MERCHANT_ID,
      },
    };
    const response = await axios.request(options);
    console.log(response)
    return response.data.code == "PAYMENT_SUCCESS";
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductQuantity(trID: string) {
  await prisma.order.updateMany({
    where: {
      transactionId: trID,
    },
    data: {
      paymentSuccess: true,
    },
  });
  try {
    const find = await prisma.order.findMany({
      where: {
        transactionId: trID,
        paymentSuccess: true,
      },
      select: {
        productId: true,
        size: true,
        quantity: true,
        userId: true,
      },
    });
    try {
      await prisma.cart.delete({
        where: {
          userId: find[0].userId,
        },
      });
    } catch (error) {
      console.log("FAILED!!!!!");
    }
    console.log(find);
    find.map(async (item) => {
      if (item.size == "sm") {
        await prisma.quantity.update({
          where: {
            productId: item.productId,
          },
          data: {
            sm: {
              decrement: item.quantity,
            },
          },
        });
      } else if (item.size == "md") {
        await prisma.quantity.update({
          where: {
            productId: item.productId,
          },
          data: {
            md: {
              decrement: item.quantity,
            },
          },
        });
      } else if (item.size == "lg") {
        await prisma.quantity.update({
          where: {
            productId: item.productId,
          },
          data: {
            lg: {
              decrement: item.quantity,
            },
          },
        });
      } else {
        await prisma.quantity.update({
          where: {
            productId: item.productId,
          },
          data: {
            xl: {
              decrement: item.quantity,
            },
          },
        });
      }
    });
    await prisma.order.updateMany({
      where: {
        transactionId: trID,
      },
      data: {
        updatedProductQuantity: true
      }
    })
  } catch (error) {
    console.log(error)
  }
}