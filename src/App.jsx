import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing to keep scrolling and animations synchronized
    gsap.ticker.lagSmoothing(0);

    // 3. Initialize AOS (Animate on Scroll)
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    // Cleanup scrolling handlers
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
      {/* Dynamic Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Global Navbar */}
      <Navbar />

      {/* 
        Section 1: Portfolio (Sticky base layer)
        Creates the premium cinematic overlap effect where the Hero page (white background)
        slides up and overlays the Portfolio screen.
      */}
      <div className="w-full relative z-0">
        <Portfolio />
      </div>

      {/* 
        Remaining Sections (Scrollable content layers overlaying Portfolio)
      */}
      <div className="relative z-10 shadow-[0_-30px_100px_rgba(9,9,11,0.85)]">
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Welcome & Testimonials */}
        <Welcome />

        {/* Section 4: Projects Showcase */}
        <Projects />

        {/* Section 5: Services Carousel */}
        <Services />

        {/* Section 6: Contact Form */}
        <Contact />

        {/* Section 7: Footer */}
        <Footer />
      </div>
    </div>
  );
}
