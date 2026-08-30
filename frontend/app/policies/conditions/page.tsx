"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion, Variants } from "framer-motion";
import { FileText, ShoppingCart, Shield, AlertOctagon, Scale, Gavel, Mail } from "lucide-react";

export default function TermsPage() {
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
            Terms and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-neon-pink dark:[text-shadow:0_0_15px_#FF1493]">Conditions</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Please read these terms carefully before using or purchasing from NeonSignCreator.com.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          
          {/* Section 1: Overview & Eligibility */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl"><FileText size={24} /></div>
              <h2 className="text-2xl font-bold">Overview & Eligibility</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>By visiting our site and/or purchasing something from us, you engage in our Service and agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the terms, then you may not access the Website or Service.</p>
              <p><strong>Eligibility:</strong> To be eligible to use this Website, you must be at least the age of majority in your state or province of residence. If you use NeonSignCreator.com on behalf of a company, entity, or organization, you must be an authorized representative with the authority to bind it to these Terms and Conditions.</p>
              <p><strong>General Conditions:</strong> We reserve the right to refuse service to anyone for any reason at any time. You may not use our products for any illegal or unauthorized purpose nor may you violate any laws in your jurisdiction.</p>
              <p><strong>Changes to Terms:</strong> We reserve the right to update, change, or replace any part of these Terms by posting updates to our Site. Your continued use of the Site following changes constitutes acceptance of those changes.</p>
            </div>
          </motion.section>

          {/* Section 2: Products, Purchases & Pricing */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neon-pink/10 text-neon-pink rounded-xl"><ShoppingCart size={24} /></div>
              <h2 className="text-2xl font-bold">Products, Purchases & Pricing</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Product Availability:</strong> Certain products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We cannot guarantee that your computer monitor’s display of any color will be accurate.</p>
              <p><strong>Pricing:</strong> Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service without notice at any time.</p>
              <p><strong>Purchases & Billing:</strong> You agree to provide current, complete, and accurate purchase and account information for all purchases. We reserve the right to refuse or cancel certain orders at our sole discretion, including limiting quantities purchased per person, per household, or per order.</p>
            </div>
          </motion.section>

          {/* Section 3: Intellectual Property & Content */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Shield size={24} /></div>
              <h2 className="text-2xl font-bold">Intellectual Property & Content</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Copyright and Trademarks:</strong> The content, trademarks, artwork, and LED neon signs for sale on NeonSignCreator.com are the exclusive property of NeonSignCreator.com. Copyright in all designs produced by us remains our property unless otherwise agreed in writing.</p>
              <p>By providing materials to us, you warrant that you have copyright in, or a license to authorize us to reproduce all materials supplied by you. You indemnify NeonSignCreator.com against all liability connected with any breach of copyright regarding materials supplied by you.</p>
              <p><strong>User Comments & Submissions:</strong> If you send creative ideas, suggestions, or other materials, you agree that we may edit, copy, publish, distribute, and otherwise use them without restriction. We take no responsibility and assume no liability for any comments posted by you or any third party.</p>
            </div>
          </motion.section>

          {/* Section 4: Prohibited Uses & Errors */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><AlertOctagon size={24} /></div>
              <h2 className="text-2xl font-bold">Prohibited Uses & Errors</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Errors & Omissions:</strong> Occasionally there may be information that contains typographical errors, inaccuracies, or omissions relating to product descriptions, pricing, promotions, and availability. We reserve the right to correct any errors and change information or cancel orders without prior notice.</p>
              <p><strong>Prohibited Uses:</strong> You are prohibited from using the site or its content:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts.</li>
                <li>To infringe upon our intellectual property rights or the rights of others.</li>
                <li>To harass, abuse, insult, harm, defame, slander, or discriminate.</li>
                <li>To submit false or misleading information, or upload viruses/malicious code.</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 5: Disclaimers & Limitation of Liability */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Scale size={24} /></div>
              <h2 className="text-2xl font-bold">Disclaimers & Liability</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Disclaimer of Warranties:</strong> We do not guarantee that your use of our service will be uninterrupted, timely, secure, or error-free. The service and all products are provided 'as is' and 'as available' without any warranties or conditions of any kind.</p>
              <p><strong>Limitation of Liability:</strong> In no case shall NeonSignCreator.com, our directors, officers, employees, affiliates, or suppliers be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including lost profits or data, arising from your use of the service or any products procured using the service, to the fullest extent permitted by law.</p>
              <p><strong>Indemnification:</strong> You agree to indemnify, defend and hold harmless NeonSignCreator.com and our affiliates from any claim or demand, including reasonable attorneys’ fees, made by any third party due to your breach of these Terms of Service.</p>
            </div>
          </motion.section>

          {/* Section 6: Termination & Governing Law */}
          <motion.section variants={fadeUpVariant} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><Gavel size={24} /></div>
              <h2 className="text-2xl font-bold">Agreement & Governing Law</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p><strong>Severability:</strong> If any provision of these Terms is determined to be unlawful, void, or unenforceable, the unenforceable portion shall be deemed severed from these Terms, and the validity of the remaining provisions shall not be affected.</p>
              <p><strong>Termination:</strong> These Terms are effective unless terminated by either you or us. If we suspect you have failed to comply with any term, we may terminate this agreement at any time without notice and deny you access to our Services.</p>
              <p><strong>Entire Agreement:</strong> These Terms of Service constitute the entire agreement and understanding between you and us, superseding any prior agreements or communications.</p>
              <p><strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with applicable laws in the jurisdiction where our business is established.</p>
            </div>
          </motion.section>

          {/* Contact Footer */}
          <motion.section variants={fadeUpVariant} className="text-center pt-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Questions about our Terms?</h2>
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