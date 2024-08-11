import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "Memo App",
  description: "App for memorizing anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} bg-sky-50`}>
        <Header/>
        <main className="p-5 sm:py-10 sm:px-20">
          {children}
        </main>
      </body>
    </html>
  );
}
