import "./globals.css";
import Providers from "@/components/Applications/Provider";

import {  Inter } from "next/font/google";



const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata = {
  title: "Book Managing App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body
        className="font-inter"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
