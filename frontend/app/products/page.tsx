"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
// 1. Added Variants to the import
import { motion, Variants } from "framer-motion"; 
import { useCart } from "../../context/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Happy Bat Mitzvah Sarah",
      price: 199.99,
      image: "/wall/Bar-Bat-Mitzvah-piclumen-1769592902465.webp",
      category: "Events",
    },
    {
      id: 2,
      name: "Happy Bar Mitzvah",
      price: 189.99,
      image: "/wall/Bar-Bat-Mitzvah-piclumen-1769593672089.webp",
      category: "Events",
    },
    {
      id: 3,
      name: "Bat Mitzvah Lips",
      price: 249.99,
      image: "/wall/Bar-Bat-Mitzvah-piclumen-1769594125925.webp",
      category: "Custom",
    },
    {
      id: 4,
      name: "Good Vibes Only",
      price: 149.99,
      image: "/wall/Bar-Bat-Mitzvah-piclumen-1769592902465.webp",
      category: "Quotes",
    },
    {
      id: 5,
      name: "Better Together",
      price: 299.99,
      image: "/wall/Bar-Bat-Mitzvah-piclumen-1769593672089.webp",
      category: "Wedding",
    },
    {
      id: 6,
      name: "Open 24/7",
      price: 129.99,
      image: "/wall/Bar-Bat-Mitzvah-piclumen-1769594125925.webp",
      category: "Business",
    },
  ];

  // 2. Explicitly typed as Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // 3. Explicitly typed as Variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-neon-pink/10 dark:bg-neon-pink/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 z-10 px-6 max-w-7xl mx-auto w-full">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-pink-100 dark:[text-shadow:0_0_15px_#FF1493,0_0_30px_#a855f7]"
          >
            Our Neon Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Browse our pre-designed masterpieces or find inspiration for your own custom creation.
          </motion.p>
        </div>

        {/* Product Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={cardVariants}
              className="group flex flex-col bg-white dark:bg-zinc-900/60 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(255,20,147,0.15)] dark:hover:border-neon-pink/40 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              {/* Product Image Wrapper */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/50">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-gray-800 dark:text-gray-200">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors group-hover:text-neon-pink">
                  {product.name}
                </h3>
                <p className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-6">
                  ${product.price.toFixed(2)}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    addToCart({
                      name: product.name,
                      price: product.price,
                      details: `Category: ${product.category} | Pre-designed Neon`
                    });
                  }}
                  className="mt-auto w-full py-3 rounded-full font-bold text-sm bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-neon-pink hover:text-white dark:hover:bg-neon-pink transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,20,147,0.4)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Design CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-neon-pink/10 to-purple-600/10 dark:from-neon-pink/20 dark:to-purple-600/20 border border-neon-pink/20 dark:border-neon-pink/30 text-center relative overflow-hidden backdrop-blur-md"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 dark:text-white">Didn't find what you're looking for?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Create your own fully customized neon sign using our interactive design tool. Choose your text, font, color, and size.</p>
          <Link href="/create" className="inline-block px-8 py-4 bg-neon-pink hover:bg-pink-600 text-white font-bold rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,20,147,0.39)] hover:shadow-[0_6px_20px_rgba(255,20,147,0.23)] hover:-translate-y-1">
            Open Neon Creator
          </Link>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}