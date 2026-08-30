"use client"; 

import Navbar from "../components/Navbar";
import Link from 'next/link';
import Footer from "../components/Footer";
import Image from "next/image";
// 1. Import Variants here
import { motion, Variants } from "framer-motion"; 

export default function Home() {
  const testimonials = [
    {
      id: 1,
      text: "We've ordered from Neonsigncreator multiple times, and it's always a pleasure to work with them. We're obsessed with all the neons we've received and can't wait to order more. They're top-notch quality, and everyone can't stop complimenting them. Highly recommended to all my friends.",
      name: "Liam V.",
      location: "New York, NY",
      avatar: "/profiles/Face-2.webp", 
    },
    {
      id: 2,
      text: "I am very happy with our order. Fast service, no fuss. We like that. Thanks for the support. We will be ordering again once we get our funding approved. Thank you for all your support. Excellent product!",
      name: "Franck B.",
      location: "Paris, France",
      avatar: "/profiles/Face-25.webp",
    },
    {
      id: 3,
      text: "The product is just as expected and doing its job in our business. Major success.",
      name: "Noah T.",
      location: "Chicago, IL",
      avatar: "/profiles/Face-31.webp",
    },
  ];

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

  // 2. Explicitly type the object as Variants
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-pink/10 dark:bg-neon-pink/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-28 pb-24 z-10">

        {/* Intro Section - Animated with Moving Neon Background */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="py-24 px-6 max-w-5xl mx-auto text-center relative z-10"
        >
          
          {/* --- NEW: Moving Neon Background --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            {/* Pink Orb */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 60, 0],
                y: [0, -40, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-neon-pink/20 dark:bg-neon-pink/30 rounded-full blur-[90px] md:blur-[120px]"
            />
            {/* Purple Orb */}
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -60, 0],
                y: [0, 50, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-purple-500/20 dark:bg-purple-600/30 rounded-full blur-[100px] md:blur-[130px]"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
            Crafting Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-600 dark:text-pink-100 dark:bg-none dark:[text-shadow:0_0_15px_#FF1493,0_0_30px_#a855f7,0_0_50px_#a855f7]">
              Personal Style
            </span>
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10 transition-colors duration-300">
            Neonsigncreator takes great pride in our ability to craft one-of-a-kind neon signs that truly reflect your personal style. With a wide range of colors and design options, we can create the perfect neon sign for your business or home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create" className="px-8 py-4 w-full sm:w-auto bg-neon-pink hover:bg-pink-600 text-white font-bold rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,20,147,0.39)] hover:shadow-[0_6px_20px_rgba(255,20,147,0.23)] hover:-translate-y-1">
              Design Your Neon
            </Link>
            <Link href="/products" className="px-8 py-4 w-full sm:w-auto bg-white dark:bg-transparent text-gray-900 dark:text-white border-2 border-gray-200 dark:border-zinc-800 hover:border-neon-pink dark:hover:border-neon-pink font-bold rounded-full transition-all duration-300 hover:-translate-y-1">
              Explore Gallery
            </Link>
          </div>
        </motion.section>
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="py-16 px-6 max-w-7xl mx-auto relative"
        >
   
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-purple-600 dark:text-purple-200 uppercase tracking-wider transition-all duration-300 dark:[text-shadow:0_0_10px_#a855f7,0_0_20px_#a855f7,0_0_40px_#a855f7]">
            Some of the neons we did
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseImages.map((image) => (
              <div key={image.id} className="group relative bg-white dark:bg-black aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.3)] dark:hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] dark:hover:border-purple-500/50 flex items-center justify-center cursor-pointer">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 dark:from-purple-500/40 transition-all duration-500 z-10" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section - Animated */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="py-24 px-6 max-w-7xl mx-auto mt-8 relative"
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-neon-pink dark:text-pink-100 uppercase tracking-wider transition-all duration-300 dark:[text-shadow:0_0_10px_#FF1493,0_0_20px_#FF1493,0_0_40px_#FF1493]">
            What customers say about us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((review) => (
              <div key={review.id} className="flex flex-col p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] dark:hover:border-neon-pink/30 transition-all duration-300 backdrop-blur-sm">
                <div className="text-[#FFB800] text-lg mb-4 tracking-widest">★★★★★</div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed flex-grow">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
                    <Image src={review.avatar} alt={`${review.name} profile picture`} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}