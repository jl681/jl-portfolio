import FeaturedWork from "./components/FeaturedWork";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import NowStream from "./components/NowStream";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="space-y-12">
        <HeroSection />

        <div id="now-stream" className="scroll-mt-28">
          <NowStream />
        </div>

        <div id="featured-work" className="scroll-mt-28">
          <FeaturedWork />
        </div>
      </main>

      <Footer />

    </div>
  );
}