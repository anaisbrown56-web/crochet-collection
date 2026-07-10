import type { Metadata } from "next";
import { Ribeye_Marrow, Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const ribeyeMarrow = Ribeye_Marrow({
  variable: "--font-ribeye-marrow",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anaïs' Crochet Collection",
  description:
    "A handmade portfolio showcasing crochet projects — bags, plushies, accessories, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ribeyeMarrow.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-offwhite text-dark antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 stitch-dots">{children}</main>
          <footer className="border-t border-primary/10 bg-white py-8 text-center text-sm text-dark/50">
            <p>
              Made with 🧶 by Anaïs ·{" "}
              <span className="text-primary font-heading">Anaïs&apos; Crochet Collection</span>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
