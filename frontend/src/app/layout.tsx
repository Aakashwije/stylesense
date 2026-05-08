import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StyleSense — The Future of Beauty",
  description:
    "AI-powered salon platform with personalized hair analysis, virtual try-on, smart booking, and expert stylists.",
  keywords: ["salon", "AI", "beauty", "hairstyle", "booking", "StyleSense"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0B0F]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
