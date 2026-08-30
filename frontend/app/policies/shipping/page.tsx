"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion, Variants } from "framer-motion";
import { Globe, Clock, AlertTriangle, MapPin, PackageX, Truck, Mail, ShieldAlert } from "lucide-react";

export default function ShippingPage() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-20 left-1/4 w-[500px] h-[500px] bg-[#00BFFF]/10 dark:bg-[#00BFFF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[600px] h-[600px] bg-neon-pink/10 dark:bg-neon-pink/10 blur-[150px] rounded-full pointer-events-none -z-10" />

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
            Shipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-neon-pink dark:[text-shadow:0_0_15px_#FF1493]">Policy</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Everything you need to know about delivery times, costs, and shipping coverage.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          
          {/* Section 1: Coverage & Performance */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl"><Globe size={24} /></div>
              <h2 className="text-2xl font-bold">Coverage & Performance</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>At NeonSignCreator.com, we ship our products to customers located in the <strong>United States, Canada, Europe, and Asia</strong> (with the exception of specific countries). Please note that applicable taxes and fees will be charged accordingly.</p>
              <p><strong>Delivery Performance:</strong> More than 98% of our orders are delivered within 12–18 days from the date of order, but we do not guarantee such a timeframe. We are committed to efficient manufacturing and fast delivery without compromising on quality.</p>
            </div>
          </motion.section>

          {/* Section 2: Timelines & Costs */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neon-pink/10 text-neon-pink rounded-xl"><Clock size={24} /></div>
              <h2 className="text-2xl font-bold">Delivery Timelines & Costs</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Production & Dispatch</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Rush Orders:</strong> Manufactured and dispatched within 6–8 business days.</li>
                  <li><strong>Standard Orders:</strong> Manufactured and dispatched within 9–12 business days.</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Transit & Shipping</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Express Shipping:</strong> 10–14 Business Days.</li>
                  <li>Transit time varies based on the size of your sign and the country of delivery.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Costs:</strong> In the custom design tool, you can select your shipping preferences and charges will be calculated. We may charge additional fees for orders below a certain value or for unique requirements.
            </p>
          </motion.section>

          {/* Section 3: Exceptions & Delays */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><AlertTriangle size={24} /></div>
              <h2 className="text-2xl font-bold">Timeline Exceptions & Delays</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/10 rounded-r-lg mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Liability for Delays</h3>
                <p>Once the shipment process is initiated and picked up on time, any subsequent delay is beyond our control. NeonSignCreator.com has no liability for delays due to unforeseen reasons or acts of God, and will not issue refunds for the sign, shipping charges, taxes, or fees.</p>
              </div>
              <p><strong>Situations that impact delivery:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Large products:</strong> Signs over 45 inches may increase transit time.</li>
                <li><strong>Complex designs:</strong> Signs with over 30 characters extend production by 5–8 days.</li>
                <li><strong>Bulk orders:</strong> Orders of more than 2 pieces require additional production time.</li>
                <li><strong>Seasonal delays:</strong> Slight delays during holidays or contingent events.</li>
                <li><strong>Unforeseen circumstances:</strong> Climatic disruptions causing transit increases.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4: Address Modifications */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><MapPin size={24} /></div>
              <h2 className="text-2xl font-bold">Modifying Your Address</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Before Shipment:</strong> You can request a change in shipping address before the sign is shipped. Please verify details carefully, as changes may incur extra fees and cause delays.</p>
              <p><strong>After Shipment Label Generation:</strong> Once the label is generated or the order is picked up, our ability to modify information is restricted. We bear no responsibility or liability for consequences if a change or delay is requested after shipment.</p>
            </div>
          </motion.section>

          {/* Section 5: Damages, Missing, Lost */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><PackageX size={24} /></div>
              <h2 className="text-2xl font-bold">Damaged, Missing & Lost Packages</h2>
            </div>
            <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Damaged or Missing Items</h3>
                <p>Damage must be reported within <strong>7 days of delivery</strong>. To claim transit damage or missing items, you must provide:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>An unboxing video</li>
                  <li>Clear photos of the damage to the sign</li>
                  <li>Clear photos of the box (from multiple directions)</li>
                  <li>Clear photos of the shipping label</li>
                </ul>
                <p className="mt-2 text-xs italic">Failure to comply with these requests and timeframes will void our obligations.</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Lost or Stolen Packages</h3>
                <p>We take mandatory measures for secured delivery, and our partner may require a signature. If you opt out of the signature requirement, we take no responsibility for lost or stolen parcels marked as "delivered."</p>
                <p className="mt-2">If the order is lost in transit, we will provide a free replacement at absolutely no cost. Modified designs or address changes for the replacement may incur extra charges.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Reshipment */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><Truck size={24} /></div>
              <h2 className="text-2xl font-bold">Reshipment Clause</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Failed Delivery Attempts:</strong> If a customer is unavailable to accept delivery after 2-3 attempts by our logistics partner, delivery shall be considered completed, the sale finalized, and you shall be responsible for full payment.</p>
              <p><strong>Reshipment Responsibility:</strong> In such circumstances, the customer is responsible for any reshipment charges, taxes, and fees incurred.</p>
              <p>We encourage customers to closely monitor tracking information. You can also leave a note with specific delivery instructions when placing your order.</p>
            </div>
          </motion.section>

          {/* Contact Footer */}
          <motion.section variants={fadeUpVariant} className="text-center pt-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Need help with your delivery?</h2>
            <div className="inline-flex items-center justify-center gap-3 bg-[#00BFFF] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1">
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