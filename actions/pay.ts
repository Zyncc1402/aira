"use server";

import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function Pay(formData: FormData, id: string) {
  const price = formData.get("totalPrice");
  const totalPrice = Number(price);
  const transactionId = uuidv4();
  const payload = {
    merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
    merchantTransactionId: transactionId,
    merchantUserId: "MUID123",
    amount: totalPrice * 100,
    // redirectUrl: `http://localhost:3000/paymentstatus/${transactionId}`,
    redirectUrl: `https://airaa.vercel.app/paymentstatus/${transactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: 123,
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
    console.log("payment initiated");
    try {
      const userCartItems = await prisma.cart.findUnique({
        where: {
          userId: id,
        },
        include: {
          items: true,
        },
      });
      userCartItems?.items.map(async (item) => {
        const orderId = uuidv4();
        const getCurrentPriceOfItem = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
          select: {
            price: true,
            images: true,
            title: true,
            category: true,
          },
        });
        await prisma.order.create({
          data: {
            userId: id,
            productId: item.productId,
            price: getCurrentPriceOfItem?.price || 2000,
            image: getCurrentPriceOfItem?.images[0] || "",
            title: getCurrentPriceOfItem?.title || "",
            category: getCurrentPriceOfItem?.category || "",
            orderId: orderId,
            size: item.size,
            quantity: item.quantity,
            transactionId,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  const redirectURL = response.data.data.instrumentResponse.redirectInfo.url;
  return redirectURL;
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
    if (response.data.code == "PAYMENT_SUCCESS") {
      await prisma.order.updateMany({
        where: {
          transactionId: trID,
        },
        data: {
          paymentSuccess: true,
        },
      });
      const find = await prisma.order.findMany({
        where: {
          transactionId: trID,
          paymentSuccess: true,
        },
        select: {
          productId: true,
          size: true,
          quantity: true,
        },
      });
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
