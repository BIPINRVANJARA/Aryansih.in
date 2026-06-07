import React from "react";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const marqueeText = "CREATIVE DEVELOPER * ARYANSINH.IN * AWWWARDS INSPIRED * DESIGNER * FREELANCE * FRONTEND *";

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#f4c400] text-zinc-900 py-16 overflow-hidden flex flex-col justify-center items-center select-none z-20"
    >
      {/* 1. LAYERED SCROLLING BACKGROUND MARQUEES (4 rows alternating) */}
      <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-10 select-none z-0">
        {/* Row 1 - Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950">
          <div className="flex gap-8 animate-marquee-left">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
        {/* Row 2 - Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950 text-stroke">
          <div className="flex gap-8 animate-marquee-right">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
        {/* Row 3 - Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950 text-stroke">
          <div className="flex gap-8 animate-marquee-left">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
        {/* Row 4 - Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter leading-none text-zinc-950">
          <div className="flex gap-8 animate-marquee-right">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* FOOTER CORE CONTENT */}
      <div className="max-w-5xl w-full flex flex-col items-center z-10 px-6 text-center">
        
        {/* PROFILE SHOWCASE */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-zinc-950/10 rounded-full blur-xl scale-95 transition-all group-hover:scale-105 pointer-events-none"></div>
          <div className="w-40 h-40 md:w-44 md:h-44 overflow-hidden rounded-full border-4 border-zinc-950 shadow-2xl relative transition-transform duration-500 hover:scale-110">
            <img
              src="/images/photo2.jpg"
              alt="Aryansinh Portrait"
              className="w-full h-full object-cover object-top scale-110"
            />
          </div>
          {/* Subtle design handle */}
          <span className="absolute -bottom-2 -right-2 bg-zinc-950 text-yellow-400 font-black text-[10px] px-2.5 py-1 rounded-full border border-yellow-400 uppercase tracking-widest animate-bounce">
            ARYAN
          </span>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {/* Blue Follow Button */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-2xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-[1.05] active:scale-95 transition-all duration-300 shadow-lg"
          >
            <FaLinkedinIn /> Follow
          </a>

          {/* White Message Button */}
          <button
            onClick={() => handleScrollTo("contact")}
            className="bg-white hover:bg-zinc-100 text-zinc-950 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-2xl flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300"
          >
            Message
          </button>
        </div>

        {/* LUXURY BRANDING */}
        <div className="mb-10">
          <h4 className="text-4xl md:text-5xl font-black tracking-wider text-zinc-950 flex items-center justify-center select-none group">
            Aryansinh<span className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">.in</span>
          </h4>
          <p className="text-zinc-950/70 text-xs font-semibold uppercase tracking-[0.25em] mt-2">
            Immersive Digital Solutions & Visual Design
          </p>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex flex-wrap gap-6 md:gap-10 justify-center mb-10 text-zinc-950 font-bold text-xs uppercase tracking-[0.18em]">
          {["Home", "About", "Portfolio", "Service", "Contact"].map((link) => (
            <button
              key={link}
              onClick={() => handleScrollTo(link.toLowerCase() === "service" ? "services" : link.toLowerCase())}
              className="hover:text-white transition-colors duration-300 relative py-1 group"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-zinc-900 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* DIVIDER LINE */}
        <div className="w-full h-[1px] bg-zinc-950/15 rounded-full mb-8"></div>

        {/* COPYRIGHT SECTION */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-950/50 uppercase tracking-widest">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Aryansinh.in. Developed by <a href="https://instagram.com/kyvraone" target="_blank" rel="noopener noreferrer" className="text-zinc-950 hover:underline">@Kyvraone</a>
          </p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-zinc-950 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-950 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
