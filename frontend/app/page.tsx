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
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg text-black dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pb-24">
        
        {/* Intro Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <p className="text-neon-pink text-lg md:text-xl font-medium leading-relaxed">
            Neonsigncreator takes great pride in our ability to craft one-of-a-kind neon signs that truly reflect your personal style. With a wide range of colors and design options, we can create the perfect neon sign for your business or home. Trust us to provide you with a high-quality, custom neon sign that will stand the test of time.
          </p>
        </section>

        {/* Showcase Grid Section */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-purple-600 dark:text-purple-400 uppercase tracking-wide transition-colors duration-300">
            Some of the neons we did
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Showcase Boxes */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 dark:bg-black aspect-[4/3] rounded-md overflow-hidden relative border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <span className="text-sm">Image {item} Placeholder</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto mt-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-14 text-neon-pink uppercase tracking-wide">
            What customers say about us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {testimonials.map((review) => (
              <div key={review.id} className="flex flex-col">
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed transition-colors duration-300">
                  {review.text} 
                  <span className="text-[#FFB800] ml-1">★★★★★</span>
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0 transition-colors duration-300"></div>
                  <div>
                    <p className="text-sky-500 font-medium text-sm">{review.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-300">{review.location}</p>
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