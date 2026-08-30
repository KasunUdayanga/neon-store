"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending the message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  // Animations
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-neon-pink" />,
      title: "Email Us",
      details: "support@neonsigncreator.com",
      subtext: "We aim to reply within 24 hours."
    },
    {
      icon: <Phone className="w-6 h-6 text-[#00BFFF]" />,
      title: "Call Us",
      details: "+1 (800) 123-4567",
      subtext: "Mon-Fri from 9am to 6pm EST."
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-500" />,
      title: "Our Studio",
      details: "123 Neon Avenue, Creative District",
      subtext: "New York, NY 10001 (Appointment Only)"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: "Business Hours",
      details: "Monday - Friday",
      subtext: "9:00 AM - 6:00 PM EST"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-20 left-1/4 w-[500px] h-[500px] bg-[#00BFFF]/10 dark:bg-[#00BFFF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[600px] h-[600px] bg-neon-pink/10 dark:bg-neon-pink/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 z-10 px-6 max-w-7xl mx-auto w-full">
        
        {/* Page Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-neon-pink dark:[text-shadow:0_0_15px_#FF1493]">Touch</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Have a question about a custom order, need help with shipping, or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Contact Information Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
          >
            {contactMethods.map((method, index) => (
              <motion.div 
                key={index}
                variants={fadeUpVariant}
                className="flex items-start p-6 bg-white dark:bg-zinc-900/60 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md dark:hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm group"
              >
                <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl mr-5 group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-zinc-800">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{method.title}</h3>
                  <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{method.details}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{method.subtext}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12 bg-white dark:bg-zinc-900/80 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm relative"
          >
            {/* Success Overlay */}
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle size={64} className="text-neon-pink mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. We have received your message and will get back to you shortly.</p>
              </motion.div>
            )}

            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neon-pink dark:focus:ring-neon-pink transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neon-pink dark:focus:ring-neon-pink transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neon-pink dark:focus:ring-neon-pink transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neon-pink dark:focus:ring-neon-pink transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-neon-pink hover:bg-pink-600 text-white font-black tracking-wide text-lg rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,20,147,0.39)] hover:shadow-[0_6px_20px_rgba(255,20,147,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND MESSAGE <Send size={20} />
                  </>
                )}
              </button>
            </form>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}