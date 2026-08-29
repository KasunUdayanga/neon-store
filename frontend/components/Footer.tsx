import Link from 'next/link';
import Image from 'next/image'; 
import { FaYelp, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
{/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            
            {/* Replaced text bubble with Image */}
            <div className="relative w-32 h-32">
              <Image 
                src="/image/footerlogo.PNG" /* Ensure this matches the path you used in Navbar */
                alt="Neon Sign Creator Logo" 
                fill
                className="object-contain"
                sizes="128px" 
                priority
              />
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 italic text-sm mt-4">
              Bring your vision to life<br/>with custom LED neon<br/>signs.
            </p>
          </div>

          {/* Column 2: Custom Neon Signs */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg font-serif mb-2">Custom Neon Signs</h3>
            <Link href="/create" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Create Your Neon</Link>
            <Link href="/upload" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Upload Your Design</Link>
            <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">All Neons</Link>
          </div>

          {/* Column 3: Collections */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg font-serif mb-2">Collections</h3>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Neon Signs for Business</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Wedding Neon Signs</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Birthday Neon Signs</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Father’s Day Neon Signs</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Mother’s Day Neon Signs</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Bar & Bat Mitzvah Signs</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Extreme Neon Signs</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Divorce Neon Signs</Link>
          </div>

          {/* Column 4: Policies */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg font-serif mb-2">Policies & More</h3>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">About Us</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Contact Us</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Shipping Policy</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Privacy Policy</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Terms and Conditions</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Refund & Cancellation Policy</Link>
            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-pink dark:hover:text-neon-pink text-sm transition">Warranty</Link>
          </div>
        </div>

        {/* Bottom Bar */}
       <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-500 text-sm">
          <p>Copyright © 2026 | neonsigncreator.com</p>
          
          {/* Updated Social Icons */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="cursor-pointer hover:text-neon-pink dark:hover:text-neon-pink transition-colors">
              <FaYelp size={20} />
            </a>
            <a href="#" className="cursor-pointer hover:text-neon-pink dark:hover:text-neon-pink transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="cursor-pointer hover:text-neon-pink dark:hover:text-neon-pink transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="cursor-pointer hover:text-neon-pink dark:hover:text-neon-pink transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}