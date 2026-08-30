"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function AboutPage() {
  // Animation variants
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Category data based on your screenshot
  const categories = [
    { name: "Business Signs", image: "/background/1.jpg" }, // Replace these paths with your actual category thumbnails
    { name: "Father's Day", image: "/background/2.jpg" },
    { name: "Mother's Day", image: "/background/3.jpg" },
    { name: "Bar/Bat Mitzvah", image: "/background/4.jpg" },
    { name: "Extreme Signs", image: "/background/5.jpg" },
    { name: "Wedding", image: "/background/6.jpg" },
    { name: "Divorce", image: "/background/1.jpg" },
    { name: "Birthday", image: "/background/2.jpg" },
    { name: "Bar", image: "/background/3.jpg" },
    { name: "Gifts", image: "/background/4.jpg" },
    { name: "Trade & Retailer", image: "/background/5.jpg" },
    { name: "Man Cave", image: "/background/6.jpg" },
    { name: "Decor", image: "/background/1.jpg" },
    { name: "Special Occasion", image: "/background/2.jpg" },
    { name: "Quotes & Motivation", image: "/background/3.jpg" },
    { name: "Cars", image: "/background/4.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00BFFF]/10 dark:bg-[#00BFFF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-neon-pink/10 dark:bg-neon-pink/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 z-10 px-6 max-w-7xl mx-auto w-full">
        {/* --- SECTION 1: Intro Story --- */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#00BFFF] dark:text-[#00BFFF] dark:[text-shadow:0_0_15px_rgba(0,191,255,0.5)]">
            Embark on a captivating journey with{" "}
            <br className="hidden md:block" /> NeonSignCreator.com
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8 text-gray-400">
            <div className="h-px bg-gray-300 dark:bg-zinc-700 w-16" />
            <ArrowDown size={20} />
            <div className="h-px bg-gray-300 dark:bg-zinc-700 w-16" />
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-medium">
            The premier destination for personalized neon signs that transform
            spaces and tell unique stories through radiant illumination. Our
            custom-made LED neon signs are not merely decorative elements; they
            are designed to be the focal point of any environment.
          </p>
        </motion.section>

        {/* --- SECTION 2: Split Content (Logo + Text) --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 bg-white dark:bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl backdrop-blur-sm"
        >
          {/* Logo Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,20,147,0.3)] border-4 border-zinc-900">
              <Image
                src="/image/logo1.PNG"
                alt="Neon Sign Creator Logo"
                fill
                className="object-cover bg-black p-4"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#00BFFF] leading-relaxed mb-10">
              Enhance your business's visibility with a dazzling neon sign that
              guarantees to captivate passersby and clients alike. Or, add a
              touch of character and charm to your living space with a
              custom-crafted neon artwork that reflects your personality.
              Moreover, elevate your special celebrations with our vibrant,
              eye-catching neon designs that create unforgettable memories.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pt-6">
                <div className="absolute top-0 left-0 w-12 h-1 bg-neon-pink rounded-full" />
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Experience the magic of bold, vivid colors and a flawless,
                  consistent glow that sets the mood for any occasion. At
                  NeonSignCreator.com, we turn ordinary walls into extraordinary
                  experiences by combining creativity, innovation, and
                  cutting-edge technology to bring your vision to life.
                </p>
              </div>
              <div className="relative pt-6">
                <div className="absolute top-0 left-0 w-12 h-1 bg-[#00BFFF] rounded-full" />
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Discover the endless possibilities of LED neon creations and
                  let NeonSignCreator.com turn your dreams into a breathtaking
                  reality. Embrace the power of illumination and let your story
                  unfold with our custom neon signs that spark joy and leave a
                  lasting impression.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- SECTION 3: Categories Grid --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUpVariant}
          className="text-center"
        >
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-neon-pink dark:[text-shadow:0_0_15px_rgba(255,20,147,0.5)]">
              Brighten Up Your World with Our Custom Neons!
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-[#00BFFF]">
              We customize your neon for all types of events
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={cardVariants}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-zinc-800 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,191,255,0.3)] group-hover:border-[#00BFFF]/50">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00BFFF] transition-colors text-sm md:text-base">
                  {category.name}
                </h4>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
