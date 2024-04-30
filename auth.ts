import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import NextAuth, { type DefaultSession } from "next-auth";

const config = {
  trustHost: true,
  providers: [Google],
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ profile }) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: profile?.email as string,
        },
      });
      if (userExists) {
        console.log("User Already Exists");
      }
      if (!userExists) {
        await prisma.user.create({
          data: {
            name: profile?.name as string,
            email: profile?.email as string,
          },
        });
        console.log("User Created");
      }
      return true;
    },
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
    // async jwt({ token }) {
    //   const user = await prisma.user.findUnique({
    //     where: {
    //       email: token?.email as string,
    //     },
    //   });
    //   if (!user) {
    //     return token;
    //   }
    //   return {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   };
    // },
  },
  // session: { strategy: "jwt" },
  ...config,
});
