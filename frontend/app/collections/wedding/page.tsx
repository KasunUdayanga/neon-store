"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function WeddingShowcasePage() {
  // Replace the 'src' with the actual paths to your cropped images in the /public folder
  const showcaseImages = [
    { id: 1, alt: "John & Jill", src: "https://via.placeholder.com/600x400/0a0a0a/00BFFF?text=John+%26+Jill" },
    { id: 2, alt: "Happy Ever After", src: "https://via.placeholder.com/600x400/0a0a0a/DDA0DD?text=Happy+Ever+After" },
    { id: 3, alt: "Just Married", src: "https://via.placeholder.com/600x400/0a0a0a/FF0000?text=Just+Married" },
    { id: 4, alt: "Bride to be", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Bride+to+be" },
    { id: 5, alt: "Engaged Blue", src: "https://via.placeholder.com/600x400/0a0a0a/00BFFF?text=Engaged" },
    { id: 6, alt: "Engaged Red", src: "https://via.placeholder.com/600x400/0a0a0a/FF0000?text=Engaged" },
    { id: 7, alt: "Mr & Mrs", src: "https://via.placeholder.com/600x400/0a0a0a/FF69B4?text=Mr+%26+Mrs" },
    { id: 8, alt: "Happily Ever After Yellow", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Happily+Ever+After" },
    { id: 9, alt: "Happily Ever After Pink", src: "https://via.placeholder.com/600x400/0a0a0a/FF1493?text=Happily+Ever+After" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      
      {/* Global Header */}
      <Navbar />

      {/* Main Showcase Content */}
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-neon-pink uppercase mb-12 tracking-wide drop-shadow-[0_0_8px_rgba(255,20,147,0.5)]">
          Wedding Neons We Did
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