import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

const notoSansKr = Noto_Sans_KR({
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RGT",
  description: "RGT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </head>

      <body className={notoSansKr.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
