import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/server/trpc/react";
import { siteConfig } from "siteConfig";
import { UIProvider } from "@/Hooks/Providers/NextUIProvider";
import AuthSessionProvider from "@/Hooks/Providers/AuthSessionProvider";
import { cn } from "@/utils/ui";
import type { Author } from "next/dist/lib/metadata/types/metadata-types";

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
  authors: siteConfig.authors as Author,
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
    <html
      lang={locale}
      className={cn("", "scroll-smooth")}
      suppressHydrationWarning
    >
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <AuthSessionProvider>
            <UIProvider
              themeProps={{
                attribute: "class",
                defaultTheme: "system",
                children,
              }}
            >
              {children}
            </UIProvider>
          </AuthSessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
