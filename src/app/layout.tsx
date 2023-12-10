import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/common/Navbar";
import TanstackProvider from "@/Providers/TanstackProvider";
import { AuthProvider } from "@/Providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendy Store",
  description:
    "Explore a delightful world of flavors at our food e-commerce site! Discover fresh, premium ingredients, gourmet specialties, and kitchen essentials. Convenient, reliable, and curated just for you. Start your culinary adventure today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TanstackProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster position="top-center" richColors />
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
