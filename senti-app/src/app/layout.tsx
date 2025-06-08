import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { ApolloWrapper } from "@/components/providers/apollo-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SentiAI",
  description: "Talk to Senti, Feel a Little Lighter (Mental Health companion AI agent)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ApolloWrapper>
          <Provider>
            {children}
          </Provider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
