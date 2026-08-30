"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, User, Menu, Sun, Moon, X } from "lucide-react"; // Imported 'X' for the close icon

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); 
  
  const { cartCount, cartTotal, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Create Your Neon", href: "/create" },
    { name: "Upload Your Design", href: "/upload" },
    { name: "All Neons", href: "/products" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo Area */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 transition-transform hover:scale-105">
              <Image 
                src="/image/logo.PNG" 
                alt="Neon Sign Creator Logo" 
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 48px, 64px" 
              />
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-8 font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 transition-colors duration-300 group ${
                  isActive
                    ? "text-neon-pink font-bold" 
                    : "text-gray-700 dark:text-gray-300 hover:text-neon-pink dark:hover:text-neon-pink"
                }`}
              >
                {link.name}
                <span 
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-neon-pink transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle, Cart, and Icons */}
        <div className="flex items-center gap-3 md:gap-6 text-neon-pink font-semibold">
          
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 md:p-2 text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink transition-transform hover:rotate-12"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={22} className="md:w-6 md:h-6" /> : <Moon size={22} className="md:w-6 md:h-6" />}
            </button>
          )}

          {/* Live Cart Price (Hidden on tiny screens) */}
          <span className="hidden sm:block text-sm md:text-base">${cartTotal.toFixed(2)}</span>

          {/* Live Cart Icon */}
          <div 
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer text-gray-800 dark:text-white hover:text-neon-pink transition-transform hover:scale-110 flex items-center justify-center p-1"
          >
            <ShoppingBag size={24} strokeWidth={2.5} className="md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-2 bg-neon-pink text-white text-[10px] md:text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center border-2 border-white dark:border-dark-bg shadow-sm">
              {cartCount}
            </span>
          </div>

          {/* Profile Icon (Hidden on mobile, pushed to menu) */}
          <div className="cursor-pointer text-gray-800 dark:text-white hover:text-neon-pink transition hidden sm:block p-1">
            <User size={24} strokeWidth={2.5} className="md:w-6 md:h-6" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden text-gray-900 dark:text-white p-1 ml-1 transition-transform active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Navigation Dropdown --- */}
      {isMobileMenuOpen && (
        <>
          {/* Background Overlay (Click to close) */}
          <div 
            className="fixed inset-0 top-[72px] bg-black/40 backdrop-blur-sm lg:hidden z-40 animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 shadow-2xl flex flex-col font-medium z-50 animate-in slide-in-from-top-4 fade-in duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-5 border-b border-gray-100 dark:border-zinc-900 text-lg transition-colors ${
                    isActive 
                      ? "text-neon-pink font-bold bg-pink-50/50 dark:bg-pink-900/10" 
                      : "text-gray-700 dark:text-gray-300 hover:text-neon-pink hover:bg-gray-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Mobile Profile Link */}
            <div className="px-6 py-5 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-neon-pink">
               <User size={20} />
               <span>My Account</span>
            </div>
          </div>
        </>
      )}
    </header>
  );
}