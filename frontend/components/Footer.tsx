import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="w-32 h-32 bg-black rounded-full border-2 border-cyan-400 flex items-center justify-center text-sm font-bold text-center leading-tight">
              NEON<br/>SIGN<br/><span className="text-neon-pink">CREATOR</span>
            </div>
            <p className="text-gray-400 italic text-sm mt-4">
              Bring your vision to life<br/>with custom LED neon<br/>signs.
            </p>
          </div>

          {/* Column 2: Custom Neon Signs */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg font-serif mb-2">Custom Neon Signs</h3>
            <Link href="/create" className="text-gray-400 hover:text-neon-pink text-sm">Create Your Neon</Link>
            <Link href="/upload" className="text-gray-400 hover:text-neon-pink text-sm">Upload Your Design</Link>
            <Link href="/products" className="text-gray-400 hover:text-neon-pink text-sm">All Neons</Link>
          </div>

          {/* Column 3: Collections */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg font-serif mb-2">Collections</h3>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">Neon Signs for Business</Link>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">Wedding Neon Signs</Link>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">Birthday Neon Signs</Link>
            {/* Add the rest of your links here */}
          </div>

          {/* Column 4: Policies */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg font-serif mb-2">Policies & More</h3>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">About Us</Link>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">Contact Us</Link>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">Shipping Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-neon-pink text-sm">Privacy Policy</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>Copyright © 2026 | neonsigncreator.com</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Placeholder for social icons */}
            <span className="cursor-pointer hover:text-white">Yelp</span>
            <span className="cursor-pointer hover:text-white">FB</span>
            <span className="cursor-pointer hover:text-white">TW</span>
            <span className="cursor-pointer hover:text-white">IG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}