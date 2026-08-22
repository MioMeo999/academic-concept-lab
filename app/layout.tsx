import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;
  const description = "Theory, evidence, mechanisms and methods, drawn out with sources still attached.";
  return {
    title: { default: "Academic Concept Lab", template: "%s · Academic Concept Lab" },
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "Academic Concept Lab", description, type: "website", images: [{ url: imageUrl, width: 1536, height: 896, alt: "Academic Concept Lab — theory, evidence, mechanisms and methods" }] },
    twitter: { card: "summary_large_image", title: "Academic Concept Lab", description, images: [imageUrl] },
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
