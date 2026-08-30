"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, AlertTriangle, RefreshCcw, Info, Truck, PhoneCall } from "lucide-react";

export default function WarrantyPage() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-20 left-0 w-[500px] h-[500px] bg-neon-pink/10 dark:bg-neon-pink/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00BFFF]/10 dark:bg-[#00BFFF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 z-10 px-6 max-w-4xl mx-auto w-full">
        
        {/* Page Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            Warranty <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-[#00BFFF] dark:[text-shadow:0_0_15px_#FF1493]">Information</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Updated for purchases made on or after July 23rd, 2025
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          
          {/* Section 1: Timelines */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl"><ShieldCheck size={28} /></div>
              <h2 className="text-2xl font-bold">Warranty Timelines</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">LED Neon Signs (Static & Dynamic)</h3>
                  <p className="text-[#00BFFF] font-bold">2-Year Warranty</p>
                  <p>Includes sign and power supply. Suitable for indoor and outdoor use.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Accessories</h3>
                  <p className="text-[#00BFFF] font-bold">2-Year Warranty</p>
                  <p>Includes dimmers and controllers.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Channel, Lightbox & Metal Signs</h3>
                  <p className="text-[#00BFFF] font-bold">2-Year Warranty</p>
                  <p>Full structure, illumination, and paint defects covered.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Acrylic & Ultra-Thin Signs</h3>
                  <p className="text-[#00BFFF] font-bold">2-Year Warranty</p>
                  <p>Strictly for indoor use only.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Conditions & Limitations */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neon-pink/10 text-neon-pink rounded-xl"><AlertTriangle size={28} /></div>
              <h2 className="text-2xl font-bold">Conditions & Limitations</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Installation & Protection:</strong> All electrical components, including power supplies, must be placed under a shed or protective cover. Improper protection may result in malfunction and void the warranty.</p>
              <p><strong>Hard-Wired Signs:</strong> NeonSignCreator.com bears no responsibility for costs incurred for installing or uninstalling your sign. If your sign has been wired or modified by an electrician, we reserve the right to decide if the fault is covered.</p>
              <p>Warranty is valid from the date of purchase or invoice payment.</p>
            </div>
          </motion.section>

          {/* Section 3: Replacements */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><RefreshCcw size={28} /></div>
              <h2 className="text-2xl font-bold">Replacements & Resolution</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>In the rare event of a manufacturing defect, we provide returns or replacements for faulty products only. We may provide instructions to remotely fix the issue; if unsuccessful, a replacement will be issued at no cost.</p>
              <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Required Documentation:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>A short video showing the fault</li>
                  <li>Clear photos of the sign and affected areas</li>
                  <li>Detailed information about the issue</li>
                </ul>
                <p className="mt-2 text-xs italic text-gray-500">Note: Both video and photos are required. Without them, we have no obligation to resolve the issue.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Characteristics */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><Info size={28} /></div>
              <h2 className="text-2xl font-bold">Acceptable Variations</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Handcrafted Nature:</strong> Due to handmade craftsmanship, slight variations in shape, color, font, or size (1-3 inches) may occur. Hard glue marks used for fixing LEDs are normal.</p>
              <p><strong>Color Accuracy:</strong> UV printed and illuminated signs are printed in CMYK. Occasional variations between the on-screen mockup and the final product are not production errors. When illuminated signs are off, slight color variations will be present.</p>
              <p><strong>Operation:</strong> Signage systems may generate slight noise from LED lights, dimmers, or fans. Power supplies may experience slight heating during operation.</p>
            </div>
          </motion.section>

          {/* Section 5: Transit Damage */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><Truck size={28} /></div>
              <h2 className="text-2xl font-bold">Damage During Transit</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p className="font-bold text-gray-900 dark:text-white">Damage must be reported within 7 days of delivery.</p>
              <p>If the package is damaged upon arrival, take an unboxing video and clear pictures before opening. To claim transit damage, email us with an unboxing video, photos of the damaged sign, the outer box (all sides), and the shipping label.</p>
            </div>
          </motion.section>

          {/* Contact Footer */}
          <motion.section variants={fadeUpVariant} className="text-center pt-8">
            <div className="inline-flex items-center justify-center gap-3 bg-[#00BFFF] text-white px-8 py-4 rounded-full font-bold shadow-lg">
              <PhoneCall size={20} />
              <a href="mailto:hello@neonsigncreator.com">hello@neonsigncreator.com</a>
            </div>
          </motion.section>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}