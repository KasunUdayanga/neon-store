"use client";

import { useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle, AlertCircle, X } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  size: string;
  message: string;
}

export default function UploadDesignPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    size: "",
    message: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorMessage("");

    const file = e.target.files?.[0];

    if (!file) {
      setFileName(null);
      return;
    }

    // Maximum 10 MB
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrorMessage("File size must be less than 10 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFileName(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
      "application/postscript",
    ];

    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".pdf",
      ".ai",
      ".eps",
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(extension)
    ) {
      setErrorMessage(
        "Invalid file type. Allowed: JPG, JPEG, PNG, WEBP, GIF, PDF, AI, EPS."
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFileName(null);
      return;
    }

    setFileName(file.name);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!fileInputRef.current?.files?.[0]) {
      setErrorMessage("Please upload your design file.");
      return;
    }

    setIsSubmitting(true);

    try {
      const file = fileInputRef.current.files[0];

      const data = new FormData();

      // These names MUST match req.body in the backend
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim());
      data.append("phone", formData.phone.trim());
      data.append("size", formData.size.trim());
      data.append("message", formData.message.trim());

      // This name MUST match upload.single("design")
      data.append("design", file);

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!backendUrl) {
        throw new Error(
          "Backend URL is not configured."
        );
      }

      const response = await fetch(
        `${backendUrl}/api/design-requests`,
        {
          method: "POST",
          body: data,
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "Invalid response received from the server."
        );
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to submit design request."
        );
      }

      if (!result.success) {
        throw new Error(
          result?.message ||
            "Failed to submit design request."
        );
      }

      // Success
      setIsSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        size: "",
        message: "",
      });

      setFileName(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(
        "Design request submission error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeSelectedFile = () => {
    setFileName(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">

      {/* Background Glows */}
      <div className="fixed top-20 left-0 w-[500px] h-[500px] bg-neon-pink/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#00BFFF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 z-10 px-6 max-w-[1400px] mx-auto w-full">

        {/* Page Header */}
        <div className="text-center mb-16">

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white"
          >
            Upload Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-[#00BFFF]">
              Design
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Have a custom logo or specific artwork?
            Upload it below, and our team will provide
            a free quote and mockup within 24 hours.
          </motion.p>
        </div>

        {/* Main Layout */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="flex flex-col lg:flex-row gap-12 items-start"
        >

          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800">

            <Image
              src="/background/1.jpg"
              alt="Custom Neon Sign Design"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                Bring your vision to life
              </h3>

              <p className="text-gray-200 text-sm font-medium">
                From sketches to vector files, we transform
                any idea into stunning LED neon.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-zinc-900/80 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-zinc-800 backdrop-blur-sm relative">

            {/* Success */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle
                  size={64}
                  className="text-[#00BFFF] mb-6"
                />

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Request Sent!
                </h3>

                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Thank you for uploading your design.
                  Our team will review it and get back
                  to you with a quote within 24 hours.
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400"
                >
                  <AlertCircle
                    size={20}
                    className="mt-0.5 flex-shrink-0"
                  />

                  <p className="text-sm font-medium">
                    {errorMessage}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setErrorMessage("")
                    }
                    className="ml-auto"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition-all disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition-all disabled:opacity-60"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition-all disabled:opacity-60"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Approximate Size in Inches
                  <span className="font-normal text-gray-500">
                    {" "}
                    (Width × Height)
                  </span>
                </label>

                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  placeholder="e.g. 36 x 24"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition-all disabled:opacity-60"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Upload Image
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp,.gif,.pdf,.ai,.eps"
                  disabled={isSubmitting}
                />

                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-dashed border-gray-300 dark:border-zinc-600 bg-gray-50 dark:bg-zinc-950 cursor-pointer hover:border-[#00BFFF] transition-all group"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-sm truncate pr-4">
                    {fileName
                      ? fileName
                      : "No file chosen"}
                  </span>

                  <div className="flex items-center gap-2 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-md text-sm font-bold group-hover:bg-[#00BFFF] group-hover:text-white transition-colors">
                    <UploadCloud size={16} />
                    Choose File
                  </div>
                </label>

                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    JPG, PNG, WEBP, GIF, PDF, AI, EPS
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Max 10 MB
                  </p>
                </div>

                {fileName && (
                  <button
                    type="button"
                    onClick={removeSelectedFile}
                    disabled={isSubmitting}
                    className="mt-2 text-xs text-red-500 hover:text-red-600"
                  >
                    Remove selected file
                  </button>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your message{" "}
                  <span className="font-normal text-gray-500">
                    (optional)
                  </span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  disabled={isSubmitting}
                  placeholder="Tell us about your design..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition-all resize-y disabled:opacity-60"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-[#00BFFF] hover:bg-blue-400 text-white font-black tracking-wide text-lg rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,191,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,191,255,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>

                    SUBMITTING...
                  </>
                ) : (
                  "SUBMIT"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}