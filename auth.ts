import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import NextAuth, { type DefaultSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

const config = {
  trustHost: true,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });
          if (user?.password != undefined) {
            const comparePassword = bcrypt.compareSync(
              credentials.password as string,
              user?.password
            );
            if (!comparePassword) {
              return null;
            }
          }
          if (!user) {
            throw new Error("User not found.");
          }
          return user;
        } catch (error) {
          console.log(error);
          throw new Error();
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    // async signIn({ profile }) {
    //   const userExists = await prisma.user.findUnique({
    //     where: {
    //       email: profile?.email as string,
    //     },
    //   });
    //   if (userExists?.password && userExists?.usingSocialLogin == true) {
    //     console.log("User Already Exists");
    //     return true;
    //   }
    //   return true;
    // },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });
      if (!user) {
        return session;
      }
      if (user) {
        session.user.id = user.id as string;
        session.user.name = user.name;
        session.user.email = user.email as string;
        session.user.role = user.role as string;
      }
      return session;
    },
  },
  ...config,
});
