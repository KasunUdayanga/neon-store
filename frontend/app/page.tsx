import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const testimonials = [
    {
      id: 1,
      text: "We've ordered from Neonsigncreator multiple times, and it's always a pleasure to work with them. We're obsessed with all the neons we've received and can't wait to order more. They're top-notch quality, and everyone can't stop complimenting them. Highly recommended to all my friends.",
      name: "Liam V.",
      location: "New York, NY",
    },
    {
      id: 2,
      text: "I am very happy with our order. Fast service, no fuss. We like that. Thanks for the support. We will be ordering again once we get our funding approved. Thank you for all your support. Excellent product!",
      name: "Franck B.",
      location: "Paris, France",
    },
    {
      id: 3,
      text: "The product is just as expected and doing its job in our business. Major success.",
      name: "Noah T.",
      location: "Chicago, IL",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
      
      {/* 1. Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-pink/10 dark:bg-neon-pink/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />
      
    <main className="flex-grow pt-28 pb-24 z-10">
        
        {/* Intro Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
            Crafting Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-600 dark:drop-shadow-[0_0_15px_rgba(255,20,147,0.4)]">Personal Style</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
            Neonsigncreator takes great pride in our ability to craft one-of-a-kind neon signs that truly reflect your personal style. With a wide range of colors and design options, we can create the perfect neon sign for your business or home. Trust us to provide you with a high-quality, custom neon sign that will stand the test of time.
          </p>
        </section>

        {/* Showcase Grid Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto relative">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-purple-600 dark:text-purple-400 uppercase tracking-wider transition-colors duration-300">
            Some of the neons we did
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Showcase Boxes with Interactive Glow */}
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="group relative bg-white dark:bg-black aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.3)] dark:hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] dark:hover:border-purple-500/50 flex items-center justify-center text-gray-400 cursor-pointer"
              >
                {/* Glow Overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/0 to-transparent group-hover:from-purple-500/10 dark:group-hover:from-purple-500/20 transition-all duration-500" />
                
                <span className="text-sm font-medium z-10">Image {item} Placeholder</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto mt-8 relative">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-neon-pink uppercase tracking-wider dark:drop-shadow-[0_0_10px_rgba(255,20,147,0.3)]">
            What customers say about us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((review) => (
              <div 
                key={review.id} 
                className="flex flex-col p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] dark:hover:border-neon-pink/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="text-[#FFB800] text-lg mb-4 tracking-widest">
                  ★★★★★
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed flex-grow">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 flex-shrink-0 border border-gray-100 dark:border-zinc-700" />
                  <div>
                    <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}