import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Monoton } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CartProvider } from "../context/CartContext";
import ClerkUserSync from "../components/ClerkUserSync";
import Cart from "../components/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Added for the "Striped" Neon font effect
const monoton = Monoton({
  weight: "400",
  variable: "--font-monoton",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Sign Creator",
  description: "Custom LED neon signs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monoton.variable} antialiased min-h-full flex flex-col transition-colors duration-300 dark:bg-dark-bg dark:text-white`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          {/* Wrap the app in the CartProvider */}
          <CartProvider>
            <ThemeProvider>
              <ClerkUserSync />
              {children}
              {/* Place the Cart component here so it appears on every page */}
              <Cart />
            </ThemeProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
