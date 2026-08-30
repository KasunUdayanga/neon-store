import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NeonCreator from "../../components/NeonCreator";
import Image from "next/image";

export default function CreateNeonPage() {
  const showcaseImages = [
    {
      id: 1,
      src: "/wall/Bar-Bat-Mitzvah-piclumen-1769592902465.webp",
      alt: "Happy Bat Mitzvah Sarah neon sign",
    },
    {
      id: 2,
      src: "/wall/Bar-Bat-Mitzvah-piclumen-1769593672089.webp",
      alt: "Happy Bar Mitzvah neon sign",
    },
    {
      id: 3,
      src: "/wall/Bar-Bat-Mitzvah-piclumen-1769594125925.webp",
      alt: "Happy Bat Mitzvah Lips neon sign",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 w-full max-w-[1600px] mx-auto px-4 relative">
        
        {/* 1. The Customizer Plugin */}
        <NeonCreator />

        {/* 2. Inspiration / Showcase Gallery */}
        <div className="mt-32 mb-12 max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-purple-600 dark:text-purple-200 uppercase tracking-wider transition-all duration-300 dark:[text-shadow:0_0_10px_#a855f7,0_0_20px_#a855f7,0_0_40px_#a855f7]">
            Need Inspiration?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseImages.map((image) => (
              <div 
                key={image.id} 
                className="group relative bg-white dark:bg-black aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.3)] dark:hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] dark:hover:border-purple-500/50 flex items-center justify-center cursor-pointer"
              >
                <Image 
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Glow Overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 dark:from-purple-500/40 transition-all duration-500 z-10" />
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}