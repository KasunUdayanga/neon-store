"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function FathersDayShowcasePage() {
  // Replace the 'src' with the actual paths to your cropped Father's Day images in the /public folder
  const showcaseImages = [
    { id: 1, alt: "Best Dad Ever", src: "https://via.placeholder.com/600x400/0a0a0a/1E90FF?text=Best+Dad+Ever" },
    { id: 2, alt: "Dad's Cave", src: "https://via.placeholder.com/600x400/0a0a0a/FF4500?text=Dad%27s+Cave" },
    { id: 3, alt: "Man Cave", src: "https://via.placeholder.com/600x400/0a0a0a/32CD32?text=Man+Cave" },
    { id: 4, alt: "Papa Bear", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Papa+Bear" },
    { id: 5, alt: "Super Dad", src: "https://via.placeholder.com/600x400/0a0a0a/FF0000?text=Super+Dad" },
    { id: 6, alt: "Grill Master", src: "https://via.placeholder.com/600x400/0a0a0a/FF8C00?text=Grill+Master" },
    { id: 7, alt: "Garage Neon", src: "https://via.placeholder.com/600x400/0a0a0a/00BFFF?text=Dad%27s+Garage" },
    { id: 8, alt: "#1 Dad", src: "https://via.placeholder.com/600x400/0a0a0a/DDA0DD?text=%231+Dad" },
    { id: 9, alt: "Cheers Dad", src: "https://via.placeholder.com/600x400/0a0a0a/FF1493?text=Cheers+Dad" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      
      {/* Global Header */}
      <Navbar />

      {/* Main Showcase Content */}
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#1E90FF] uppercase mb-12 tracking-wide drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]">
          Father's Day Neons We Did
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