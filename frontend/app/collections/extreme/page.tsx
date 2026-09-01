"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function ExtremeShowcasePage() {
  const showcaseImages = [
    { id: 1, alt: "Skull Neon", src: "https://via.placeholder.com/600x400/0a0a0a/39FF14?text=Skull+Neon" },
    { id: 2, alt: "Lightning Bolt", src: "https://via.placeholder.com/600x400/0a0a0a/FFD700?text=Lightning+Bolt" },
    { id: 3, alt: "Live Dangerously", src: "https://via.placeholder.com/600x400/0a0a0a/FF0000?text=Live+Dangerously" },
    { id: 4, alt: "No Limits", src: "https://via.placeholder.com/600x400/0a0a0a/FF4500?text=No+Limits" },
    { id: 5, alt: "Flame Neon", src: "https://via.placeholder.com/600x400/0a0a0a/FF8C00?text=Flames" },
    { id: 6, alt: "Cyberpunk City", src: "https://via.placeholder.com/600x400/0a0a0a/FF1493?text=Cyberpunk" },
    { id: 7, alt: "Beast Mode", src: "https://via.placeholder.com/600x400/0a0a0a/39FF14?text=Beast+Mode" },
    { id: 8, alt: "Hustle Hard", src: "https://via.placeholder.com/600x400/0a0a0a/00BFFF?text=Hustle+Hard" },
    { id: 9, alt: "Wild Thing", src: "https://via.placeholder.com/600x400/0a0a0a/FF00FF?text=Wild+Thing" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Neon Green Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#39FF14] uppercase mb-12 tracking-wide drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
          Extreme Neons We Did
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