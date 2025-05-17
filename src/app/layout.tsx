import type { Metadata } from "next";
import { Karla } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: "../../public/font/Satoshi-Variable.woff",
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Video Casero",
  description: "Video Casero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${satoshi.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
