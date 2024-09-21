import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/redux/Providers";
import Header from "@/components/Templates/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokemon App",
  description: "Pokemon App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="w-full h-screen">
            <Header />
            <div className="flex justify-center items-start">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
