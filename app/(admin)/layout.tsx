import type { Metadata } from "next";
import "../globals.css";
import Providers from "@/lib/authProvider";
import { Toaster } from "@/components/ui/toaster";
import AdminNavbar from "@/components/navbar/adminNavbar";

export const metadata: Metadata = {
  title: "Aira Admin Panel",
  description: "Aira",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <AdminNavbar />
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
