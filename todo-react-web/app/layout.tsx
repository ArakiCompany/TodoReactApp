import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ApolloClientProvider from "@/lib/ApolloProvider";
import { Analytics } from '@vercel/analytics/next';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App using React, Next.js, GraphQL, and Apollo Client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ApolloClientProvider>{children}</ApolloClientProvider>
         <Analytics />
      </body>
    </html>
  );
}
