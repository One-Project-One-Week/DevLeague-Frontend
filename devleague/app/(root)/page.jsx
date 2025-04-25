import HeroSection from "@/components/herosection";
import About from "@/components/about";
import HackathonList from "@/components/hackthon";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HackathonList />
      <About />
      <Footer />
    </div>
  );
}

// bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#33425b] via-[#87dfd6] to-[#38817a]

// origin - bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%