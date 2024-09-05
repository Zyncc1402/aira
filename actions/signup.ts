"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export default async function signup(formData: FormData, callbackUrl: string | string[] | undefined) {
  const { name, email, password, phone } = Object.fromEntries(formData);
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password as string, saltRounds);

  await prisma.user.create({
    data: {
      name: name as string,
      email: email as string,
      password: hashedPassword as string,
      phone: phone as string,
      usingSocialLogin: false,
    },
  });
  redirect(`/signin?callbackUrl=${callbackUrl}`);
}
