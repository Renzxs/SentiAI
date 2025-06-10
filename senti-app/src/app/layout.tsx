import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { ApolloWrapper } from "@/components/providers/apollo-provider";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SentiAI",
  description: "Talk to Senti, Feel a Little Lighter (Mental Health companion AI agent)",
  icons: {
    icon: "senti-logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolageGrotesque.variable}  antialiased`}>
        <ApolloWrapper>
            <Provider>
              {children}
            </Provider>  
        </ApolloWrapper>
      </body>
    </html>
  );
}
