"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion, Variants } from "framer-motion";
import { Shield, Eye, Database, Cookie, Scale, Mail } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-neon-pink dark:[text-shadow:0_0_15px_#FF1493]">Policy</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            How NeonSignCreator.com collects, uses, and protects your information.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          
          {/* Introduction */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This Privacy Policy describes how NeonSignCreator.com (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.
            </p>
          </motion.section>

          {/* Collecting Personal Information */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl"><Database size={24} /></div>
              <h2 className="text-2xl font-bold">Collecting Personal Information</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
            </p>
            
            <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Device Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Collected:</strong> Version of web browser, IP address, time zone, cookie information, sites or products viewed, search terms, and interaction metrics.</li>
                  <li><strong>Purpose:</strong> To load the Site accurately and perform analytics to optimize our Site.</li>
                  <li><strong>Source:</strong> Collected automatically using cookies, log files, web beacons, tags, or pixels.</li>
                  <li><strong>Disclosure:</strong> Shared with e-commerce platforms, payment gateways, sales channels, shipping companies, and third-party apps.</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Order Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Collected:</strong> Name, billing/shipping address, payment info (credit card numbers & wallet IDs), email address, and phone number.</li>
                  <li><strong>Purpose:</strong> To fulfill our contract, process payments, arrange shipping, provide invoices/confirmations, screen for fraud, and provide marketing relating to our products.</li>
                  <li><strong>Source:</strong> Collected directly from you.</li>
                  <li><strong>Disclosure:</strong> Shared with e-commerce platforms, resellers, manufacturing partners, payment gateways, and shipping companies.</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Customer Support Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Collected:</strong> Name, billing/shipping address, payment info, email, phone number, order ID & shipping IDs.</li>
                  <li><strong>Purpose:</strong> To provide customer support.</li>
                  <li><strong>Source:</strong> Collected directly from you.</li>
                  <li><strong>Disclosure:</strong> Shared with e-commerce platforms, Stripe, DHL, FedEx, and customer support apps.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Sharing & Behavioral Advertising */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neon-pink/10 text-neon-pink rounded-xl"><Eye size={24} /></div>
              <h2 className="text-2xl font-bold">Sharing & Advertising</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              <p>We share your Personal Information with service providers to help us provide our services and fulfill contracts with you. We may also share it to comply with applicable laws and regulations, respond to lawful requests, or protect our rights.</p>
              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-4">Behavioral Advertising</h3>
              <p>We use your Personal Information to provide targeted advertisements or marketing communications. For example, we use Google Analytics to help us understand how our customers use the Site. You can opt-out of Google Analytics at <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#00BFFF] hover:underline" target="_blank" rel="noreferrer">tools.google.com/dlpage/gaoptout</a>.</p>
              <p>We share information about your use of the Site, purchases, and interaction with our ads on other websites with our advertising partners.</p>
            </div>
          </motion.section>

          {/* GDPR, CCPA, and Rights */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Scale size={24} /></div>
              <h2 className="text-2xl font-bold">Lawful Basis & Your Rights</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              <p>Pursuant to the GDPR, if you are a resident of the European Economic Area (EEA), we process your personal information under lawful bases including your consent, contract performance, legal compliance, vital interests, public interest tasks, and legitimate interests.</p>
              <p><strong>GDPR & CCPA Rights:</strong> If you are a resident of the EEA or California, you have the right to access the Personal Information we hold about you (Right to Know), port it to a new service, and ask that it be corrected, updated, or erased. To exercise these rights, or to designate an authorized agent, please contact us.</p>
              <p><strong>Retention:</strong> When you place an order, we retain your Personal Information for our records unless you ask us to erase it.</p>
              <p><strong>Minors:</strong> The Site is not intended for individuals under the age of 13. We do not intentionally collect Personal Information from children. Parents or guardians may contact us to request deletion.</p>
            </div>
          </motion.section>

          {/* Cookies & DNT */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><Cookie size={24} /></div>
              <h2 className="text-2xl font-bold">Cookies & Do Not Track</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              <p>A cookie is a small amount of information downloaded to your device. Cookies make your browsing experience better by remembering your actions and preferences (such as login and region selection). Most of our cookies are persistent and expire between 30 minutes and two years from the date downloaded.</p>
              <p>You can control cookies through your browser controls. Removing or blocking cookies can negatively impact your user experience. Blocking cookies may not completely prevent how we share information with third parties.</p>
              <p><strong>Do Not Track:</strong> Because there is no consistent industry understanding of how to respond to “Do Not Track” signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.</p>
            </div>
          </motion.section>

          {/* Contact Footer */}
          <motion.section variants={fadeUpVariant} className="text-center pt-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Questions about our Privacy Policy?</h2>
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