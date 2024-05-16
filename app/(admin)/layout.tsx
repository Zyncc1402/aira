import type { Metadata } from "next";
import "../globals.css";
import Providers from "@/lib/authProvider";
import { Toaster } from "@/components/ui/toaster";
import AdminNavbar from "@/components/navbar/adminNavbar";
import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/lib/themeProvider";

export const metadata: Metadata = {
  title: "Aira Admin Panel",
  description: "Aira",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <Providers>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {session?.user.role !== "Admin" ? <Navbar /> : <AdminNavbar />}
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
