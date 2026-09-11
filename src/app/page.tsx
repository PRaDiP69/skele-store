import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Philosophy from "./components/Philosophy";
import InstagramFeed from "./components/InstagramFeed";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <Hero />
      <ProductGrid />
      <Philosophy />
      <InstagramFeed />
      <Footer />
    </main>
  );
}