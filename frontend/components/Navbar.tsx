"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, User, Menu, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // Gets the current URL path
  
  // New State for Cart and Mobile Menu
  const { cartCount, cartTotal, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ensure component is mounted before rendering the toggle icon
  useEffect(() => setMounted(true), []);

  // Restored Navigation Links Array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Create Your Neon", href: "/create" },
    { name: "Upload Your Design", href: "/upload" },
    { name: "All Neons", href: "/products" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 bg-white/60 dark:bg-dark-bg/60 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo Area */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
              <Image 
                src="/image/logo.PNG" 
                alt="Neon Sign Creator Logo" 
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 56px, 64px" 
              />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links (Restored Active State) */}
        <nav className="hidden lg:flex gap-8 font-medium">
          {navLinks.map((link) => {
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

        {/* Right: Theme Toggle, Cart, and Profile */}
        <div className="flex items-center gap-4 md:gap-6 text-neon-pink font-semibold">
          
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink transition"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          )}

          {/* Live Cart Price */}
          <span className="hidden sm:block">${cartTotal.toFixed(2)}</span>

          {/* Live Cart Icon (Now triggers the slide-out drawer) */}
          <div 
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer text-gray-800 dark:text-white hover:text-neon-pink transition flex items-center justify-center p-1"
          >
            <ShoppingBag size={26} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-2 bg-neon-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-dark-bg shadow-sm">
              {cartCount}
            </span>
          </div>

          {/* Profile Icon */}
          <div className="cursor-pointer text-gray-800 dark:text-white hover:text-neon-pink transition hidden sm:block p-1">
            <User size={26} strokeWidth={2.5} />
          </div>

          {/* Mobile Menu Toggle (Visible only on smaller screens) */}
          <button 
            className="lg:hidden text-gray-900 dark:text-white p-1 ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown (Includes Active State tracking) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800 shadow-lg flex flex-col font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 border-b border-gray-100 dark:border-gray-800 transition-colors ${
                  isActive ? "text-neon-pink font-bold bg-gray-50 dark:bg-zinc-900" : "text-gray-700 dark:text-gray-300 hover:text-neon-pink"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}