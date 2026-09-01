"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function MitzvahShowcasePage() {
  const showcaseImages = [
    { id: 1, alt: "Mazel Tov", src: "https://via.placeholder.com/600x400/0a0a0a/9370DB?text=Mazel+Tov" },
    { id: 2, alt: "Let's Party", src: "https://via.placeholder.com/600x400/0a0a0a/4169E1?text=Let%27s+Party" },
    { id: 3, alt: "Star of David", src: "https://via.placeholder.com/600x400/0a0a0a/00BFFF?text=Star+of+David" },
    { id: 4, alt: "Bat Mitzvah", src: "https://via.placeholder.com/600x400/0a0a0a/FF69B4?text=Bat+Mitzvah" },
    { id: 5, alt: "Bar Mitzvah", src: "https://via.placeholder.com/600x400/0a0a0a/1E90FF?text=Bar+Mitzvah" },
    { id: 6, alt: "Custom Name", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Custom+Name" },
    { id: 7, alt: "Dance Floor", src: "https://via.placeholder.com/600x400/0a0a0a/32CD32?text=Dance+Floor" },
    { id: 8, alt: "13 Neon", src: "https://via.placeholder.com/600x400/0a0a0a/FF4500?text=13" },
    { id: 9, alt: "Good Vibes", src: "https://via.placeholder.com/600x400/0a0a0a/9370DB?text=Good+Vibes" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Purple Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#9370DB] uppercase mb-12 tracking-wide drop-shadow-[0_0_8px_rgba(147,112,219,0.5)]">
          Bar & Bat Mitzvah Neons We Did
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