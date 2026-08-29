import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Sign Creator", // Updated your title!
  description: "Custom LED neon signs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col transition-colors duration-300 dark:bg-dark-bg dark:text-white`} 
        suppressHydrationWarning
      >
        {/* We wrap the children inside the ThemeProvider here */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}