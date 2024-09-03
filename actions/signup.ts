"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function signup(formData: FormData) {
  const { name, email, password, phone } = Object.fromEntries(formData);

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password as string, saltRounds);
  console.log(hashedPassword);

  try {
    await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword as string,
        phone: phone as string,
        usingSocialLogin: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
