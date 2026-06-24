import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import ClientsSection from "@/components/ClientsSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PageFrameLines from "@/components/PageFrameLines";
import PrincipleSection from "@/components/PrincipleSection";
import ServicesSection from "@/components/ServicesSection";
import StoryStepper from "@/components/StoryStepper";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-paper text-primary">
      <PageFrameLines />
      <Navbar />

      <HeroSection />

      <PrincipleSection />

      <AboutSection />

      <StoryStepper />

      <ClientsSection />

      <ServicesSection />

      <ApproachSection />

      <FooterSection />
    </main>
  );
}
