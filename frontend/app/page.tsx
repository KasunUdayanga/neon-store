import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Intro Section */}
        <section className="py-20 px-4 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold mb-8">Home</h1>
          <p className="text-neon-pink text-lg md:text-xl font-semibold leading-relaxed">
            Neonsigncreator takes great pride in our ability to craft one-of-a-kind neon signs that truly reflect your personal style. With a wide range of colors and design options, we can create the perfect neon sign for your business or home. Trust us to provide you with a high-quality, custom neon sign that will stand the test of time.
          </p>
        </section>

        {/* We will add the Showcase Grid and Testimonials here next! */}

      </main>

      <Footer />
    </div>
  );
}