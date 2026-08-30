"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion, Variants } from "framer-motion";
import { Ban, Edit3, ShieldCheck, Camera, Clock, Mail, RefreshCcw } from "lucide-react";

export default function RefundPage() {
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
            Refund & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-[#00BFFF] dark:[text-shadow:0_0_15px_#FF1493]">Cancellation</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Our policies on cancellations, modifications, returns, and issue resolutions.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          
          {/* Section 1: Order Cancellations */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Ban size={28} /></div>
              <h2 className="text-2xl font-bold">Order Cancellations</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>Since NeonSignCreator.com sells made-to-order products, orders cannot be modified or canceled once the production process is initiated. This applies to all custom and pre-designed products. Once production begins, your order and design are deemed final.</p>
              
              <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-xl border border-gray-200 dark:border-zinc-700 mt-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">How to Request Cancellation:</h3>
                <p>To request a cancellation and be eligible for a refund, email <a href="mailto:hello@neonsigncreator.com" className="text-neon-pink hover:underline">hello@neonsigncreator.com</a> with the subject line: <strong>“Cancel Order [Order Number]”</strong> within the applicable timeframe:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 font-semibold">
                  <li>4 hours for standard orders</li>
                  <li>1 hour for rush orders</li>
                </ul>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <Edit3 className="w-5 h-5 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                <p><strong>Design Modifications:</strong> We do not cancel custom orders with pre-approved designs. However, you may modify the design as many times as you wish <em>before</em> the production process is initiated.</p>
              </div>
              <p className="text-xs italic text-gray-500 mt-2">Refund Processing Timeline: After your refund is processed, it may take 10–12 business days to reflect in your account.</p>
            </div>
          </motion.section>

          {/* Section 2: Quality Assurance & Returns */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><ShieldCheck size={28} /></div>
              <h2 className="text-2xl font-bold">Quality Assurance & Returns</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>We are committed to delivering high-quality products free from manufacturing defects. In the rare event that you receive a faulty product, we provide hassle-free assistance.</p>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Returns for Ready-Made Products</h3>
              <p>We offer a <strong>21-day return window</strong> for ready-made products if they are found to have faults or defects upon receipt. The product must be returned in original condition with all packaging, alongside documentation and photos of the defect.</p>
              
              <div className="p-4 border-l-4 border-neon-pink bg-pink-50 dark:bg-pink-900/10 rounded-r-lg mt-4">
                <p><strong>Note:</strong> Custom or made-to-order products are not eligible for standard returns. However, if a custom product has a manufacturing defect, we will work with you to fix or replace it after careful inspection.</p>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-6">Replacements & Refunds</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>We provide replacements for defective products or missing items (upon validation of proof).</li>
                <li>Refunds for product costs and/or shipping are determined by our warranty guidelines and are at the discretion of NeonSignCreator.com.</li>
                <li>We do not offer refunds in cases of manufacturing defects or damaged/lost products without validated proof.</li>
                <li>We prioritize customer satisfaction and may offer a brand-new replacement as an alternative to refunds.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 3: Missing or Damaged Items */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><Camera size={28} /></div>
              <h2 className="text-2xl font-bold">Missing or Damaged Items</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>To ensure faster resolution of missing or damaged item complaints, the following documentation is <strong>required</strong>:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>An unboxing video showing the package being opened.</li>
                <li>Clear photos of the package condition as it is being opened.</li>
                <li>Detailed photos of all items received.</li>
                <li>Clear photos of the box damage (from multiple directions including all sides) if applicable.</li>
                <li>Photos/videos taken <em>before</em> opening the box if the package arrived damaged, punctured, or bent.</li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-xl border border-gray-200 dark:border-zinc-700 mt-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Why Documentation Matters:</h3>
                <p>This documentation is crucial to protect both your interests and ours, help us work with our shipping/insurance partners, and serve as essential proof for claims. We only provide replacements if the provided proofs are validated by our team.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Orders on Hold */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl"><Clock size={28} /></div>
              <h2 className="text-2xl font-bold">Orders on Hold (Missing Information)</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>If your order cannot proceed due to missing information or required inputs (such as high-resolution images, design approvals, or other essential inputs), our team will attempt to follow up with you via available communication channels.</p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Follow-Up Timeline:</strong> We will make at least 4–5 follow-up attempts at regular intervals over a period of <strong>30 days</strong> from the order date.</li>
                <li><strong>Refund Window Closure:</strong> If you do not respond with the necessary information within 30 days from the order date, the refund window will be permanently closed. No cancellations or refunds will be allowed beyond this period.</li>
                <li><strong>Order Fulfillment After 30 Days:</strong> We remain committed to fulfilling your original order. If you respond with the required inputs after 30 days (and specifications remain unchanged), we will still honor the order and communicate new production timelines.</li>
              </ul>
            </div>
          </motion.section>

          {/* Contact Footer */}
          <motion.section variants={fadeUpVariant} className="text-center pt-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Have questions about your order?</h2>
            <div className="inline-flex items-center justify-center gap-3 bg-neon-pink text-white px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1">
              <Mail size={20} />
              <a href="mailto:hello@neonsigncreator.com">hello@neonsigncreator.com</a>
            </div>
          </motion.section>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}