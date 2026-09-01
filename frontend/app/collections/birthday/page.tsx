"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function BirthdayShowcasePage() {
  // Replace the 'src' with the actual paths to your cropped birthday images in the /public folder
  const showcaseImages = [
    { id: 1, alt: "Happy Birthday Pink", src: "https://via.placeholder.com/600x400/0a0a0a/FF1493?text=Happy+Birthday" },
    { id: 2, alt: "Let's Party Blue", src: "https://via.placeholder.com/600x400/0a0a0a/00BFFF?text=Let%27s+Party" },
    { id: 3, alt: "Sweet 16 Purple", src: "https://via.placeholder.com/600x400/0a0a0a/DDA0DD?text=Sweet+16" },
    { id: 4, alt: "Cheers to 21", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Cheers+to+21" },
    { id: 5, alt: "Good Vibes Only", src: "https://via.placeholder.com/600x400/0a0a0a/32CD32?text=Good+Vibes+Only" },
    { id: 6, alt: "Happy Birthday Orange", src: "https://via.placeholder.com/600x400/0a0a0a/FF4500?text=Happy+Birthday" },
    { id: 7, alt: "Party Time Red", src: "https://via.placeholder.com/600x400/0a0a0a/FF0000?text=Party+Time" },
    { id: 8, alt: "Thirty Flirty & Thriving", src: "https://via.placeholder.com/600x400/0a0a0a/FF69B4?text=Thirty+%26+Flirty" },
    { id: 9, alt: "Oh Baby Neon", src: "https://via.placeholder.com/600x400/0a0a0a/00FA9A?text=Oh+Baby" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      
      {/* Global Header */}
      <Navbar />

      {/* Main Showcase Content */}
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#00BFFF] uppercase mb-12 tracking-wide drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
          Birthday Neons We Did
        </h1>
        
        {/* 3x3 Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {showcaseImages.map((image) => (
            <div 
              key={image.id} 
              className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-md group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Subtle dark overlay on hover to make the image pop */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

      </main>

      {/* Global Footer */}
      <Footer />
      
    </div>
  );
}