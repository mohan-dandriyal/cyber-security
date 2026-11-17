import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQsSection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flow-root">
        <HeroSection />

        <AboutSection />

        <ServicesSection />

        <WhyChooseUsSection />

        <TestimonialsSection />

        <FAQSection />

        <ContactSection />

      </main>
      <Footer />
    </>
  );
}
