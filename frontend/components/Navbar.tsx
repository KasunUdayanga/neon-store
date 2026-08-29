"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // This gets the current URL path

  // Ensure component is mounted before rendering the toggle icon
  useEffect(() => setMounted(true), []);

  // Define our links in an array to make mapping them easy
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Create Your Neon", href: "/create" },
    { name: "Upload Your Design", href: "/upload" },
    { name: "All Neons", href: "/products" },
  ];

  return (
   <header className="fixed top-0 w-full z-50 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 bg-white/60 dark:bg-dark-bg/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Left: Logo Area (Now using an Image) */}
        <div className="flex items-center">
          <Link href="/">
            {/* Update the src="" below to match your actual image file name */}
            <div className="relative w-16 h-16">
              <Image 
                src="/image/logo.PNG" 
                alt="Neon Sign Creator Logo" 
                fill
                className="object-contain"
                priority
                sizes="64px" 
              />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex gap-8 font-medium">
          {navLinks.map((link) => {
            // Check if the current path matches the link's href
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-neon-pink font-bold" // Active state
                    : "text-gray-700 dark:text-gray-300 hover:text-neon-pink dark:hover:text-neon-pink" // Inactive state
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart, Profile, and Theme Toggle */}
        <div className="flex items-center gap-4 text-neon-pink font-semibold">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink transition"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                // Sun Icon for Dark Mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon Icon for Light Mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}

          <span>$0.00</span>

          {/* Cart Icon */}
          <div className="relative cursor-pointer text-gray-800 dark:text-white hover:text-neon-pink transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </div>

          {/* Profile Icon */}
          <div className="cursor-pointer text-gray-800 dark:text-white hover:text-neon-pink transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}