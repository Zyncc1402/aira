import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/authProvider";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Aira",
  description: "Aira",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <Navbar />
          <Toaster />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
