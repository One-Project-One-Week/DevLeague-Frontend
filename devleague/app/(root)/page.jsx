import HeroSection from "@/components/herosection";
import About from "@/components/about";
import HackathonList from "@/components/hackthon";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%">
      <HeroSection />
      <HackathonList />
      <About />
      <Footer />
    </div>
  );
}
