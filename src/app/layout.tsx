import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter-sans",
  display: "swap",
});

export const metadata = {
  title: "ARQIS",
  description: "ARQIS - Modern web application built with Next.js",
};

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <div id="header-portal" />
        <div id="footer-portal" />
        {children}
      </body>
    </html>
  );
}