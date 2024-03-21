import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/server/trpc/react";
import { siteConfig } from "siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  creator: siteConfig.creator,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [],
  description: siteConfig.description,
  authors: siteConfig.authors,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    creatorId: "@NambisanAman",
    card: "summary_large_image",
    title: siteConfig.name,
    creator: "@NambisanAman",
    images: [`${siteConfig.url}/og.webp`],
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
