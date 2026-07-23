import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "DJ Abhishek | DJ, Remixer & Producer",
    description:
      "DJ Abhishek - Pune-based DJ, remixer and producer performing Bollywood, house, pop, hip-hop, tech and moombahton since 2011.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "DJ Abhishek | Turn Up The Night",
      description: "DJ, remixer and producer moving dance floors since 2011.",
      type: "website",
      images: [{ url: new URL("/images/og.png", base).toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "DJ Abhishek | Turn Up The Night",
      description: "DJ, remixer and producer moving dance floors since 2011.",
      images: [new URL("/images/og.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
