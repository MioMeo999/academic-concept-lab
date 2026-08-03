import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;
  const description = "Three visual directions for an evidence-grounded academic learning platform.";
  return {
    title: { default: "Concept Lab", template: "%s · Concept Lab" },
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "Concept Lab", description, type: "website", images: [{ url: imageUrl, width: 1536, height: 896, alt: "Concept Lab — three directions, one evidence base" }] },
    twitter: { card: "summary_large_image", title: "Concept Lab", description, images: [imageUrl] },
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
