import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/authProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Aira",
  description: "Aira Shopping",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B07TPNLBKT"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B07TPNLBKT');`}
        </Script>
        <meta
          name="google-site-verification"
          content="2q79Eq6b6YD4luQsXPMJCN_OL_3QTK_B8VqdWralAPA"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
