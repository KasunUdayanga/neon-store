"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function MothersDayShowcasePage() {
  const showcaseImages = [
    { id: 1, alt: "Best Mom Ever", src: "https://via.placeholder.com/600x400/0a0a0a/FF69B4?text=Best+Mom+Ever" },
    { id: 2, alt: "Mama Bear", src: "https://via.placeholder.com/600x400/0a0a0a/FF1493?text=Mama+Bear" },
    { id: 3, alt: "Super Mom", src: "https://via.placeholder.com/600x400/0a0a0a/DDA0DD?text=Super+Mom" },
    { id: 4, alt: "Mom's Kitchen", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Mom%27s+Kitchen" },
    { id: 5, alt: "Love You Mom", src: "https://via.placeholder.com/600x400/0a0a0a/FFB6C1?text=Love+You+Mom" },
    { id: 6, alt: "World's Best Mom", src: "https://via.placeholder.com/600x400/0a0a0a/FF69B4?text=World%27s+Best+Mom" },
    { id: 7, alt: "Mom", src: "https://via.placeholder.com/600x400/0a0a0a/FF1493?text=Mom+Neon" },
    { id: 8, alt: "Blessed Mama", src: "https://via.placeholder.com/600x400/0a0a0a/DDA0DD?text=Blessed+Mama" },
    { id: 9, alt: "Queen", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Queen" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Soft Pink Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#FF69B4] uppercase mb-12 tracking-wide drop-shadow-[0_0_8px_rgba(255,105,180,0.5)]">
          Mothers Day Neons We Did
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {showcaseImages.map((image) => (
            <div key={image.id} className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-md group cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}