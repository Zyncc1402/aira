import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/authProvider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

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
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="2q79Eq6b6YD4luQsXPMJCN_OL_3QTK_B8VqdWralAPA"
        />
        {/* Meta tags for PWA */}
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Aira Shopping PWA" />
        {/* Web App Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        {/* Favicon */}
        <link rel="icon" href="/logo-330x330.png" />
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <NextTopLoader
          color={"#39FF14"}
          showSpinner={false}
          speed={200}
          easing="ease"
          height={3}
          crawlSpeed={200}
        />
        <Providers>
          <Navbar />
          <Toaster />
          <SpeedInsights />
          {children}
        </Providers>
      </body>
    </html>
  );
}
