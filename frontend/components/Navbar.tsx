import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Left: Logo Area */}
        <div className="flex items-center">
          <Link href="/">
            {/* Replace this div with your actual circular logo image later */}
            <div className="w-16 h-16 bg-black rounded-full border-2 border-cyan-400 flex items-center justify-center text-[10px] text-white font-bold text-center leading-tight">
              NEON<br/>SIGN<br/><span className="text-neon-pink">CREATOR</span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/create" className="hover:text-neon-pink transition">Create Your Neon</Link>
          <Link href="/upload" className="hover:text-neon-pink transition">Upload Your Design</Link>
          <Link href="/products" className="hover:text-neon-pink transition">All Neons</Link>
        </nav>

        {/* Right: Cart and Profile */}
        <div className="flex items-center gap-4 text-neon-pink font-semibold">
          <span>$0.00</span>
          
          {/* Cart Icon with Badge */}
          <div className="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </div>

          {/* User Profile Icon */}
          <div className="cursor-pointer text-black hover:text-neon-pink transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

      </div>
    </header>
  );
}