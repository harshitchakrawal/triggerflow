import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#f0ede6]">
      <Navbar />
      <Hero />
    </main>
  );
}
