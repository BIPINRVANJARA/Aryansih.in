import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Portfolio() {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const [bgColor, setBgColor] = useState("#f4c400"); // Default yellow

  const colors = [
    { name: "red", hex: "#ef4444" },
    { name: "yellow", hex: "#f4c400" },
    { name: "green", hex: "#22c55e" },
    { name: "purple", hex: "#a855f7" },
    { name: "rose", hex: "#f43f5e" },
    { name: "orange", hex: "#f97316" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Default mask coordinates at center of screen
    gsap.set(container, {
      "--x": "50%",
      "--y": "50%",
    });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Animate the custom properties for smooth tracking
      gsap.to(container, {
        "--x": `${x}px`,
        "--y": `${y}px`,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden select-none cursor-crosshair transition-colors duration-700"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {/* 1. CLEAR CONTENT LAYER (Revealed by mask) */}
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
        style={{
          clipPath: "circle(140px at var(--x) var(--y))",
          WebkitClipPath: "circle(140px at var(--x) var(--y))",
          zIndex: 10,
        }}
      >
        {/* Fullscreen clean background text */}
        <div className="absolute inset-0 flex justify-center items-center opacity-30 select-none z-0">
          <h1 className="text-[18vw] font-black tracking-tight leading-none text-zinc-950 font-sans uppercase">
            P<span className="text-stroke-2 text-zinc-950">R</span>TF<span className="text-stroke-2 text-zinc-950">O</span>LIO
          </h1>
        </div>

        {/* Centered Portfolio Image Showcase */}
        <div className="relative w-[340px] h-[450px] md:w-[400px] md:h-[520px] flex items-center justify-center z-10">
          {/* Animated dashed crop frame with corner handles */}
          <div className="absolute inset-0 border-2 border-dashed border-blue-500/80 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-pulse">
            {/* Handles */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 border border-white"></span>
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 border border-white"></span>
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 border border-white"></span>
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 border border-white"></span>
          </div>

          <img
            src="/images/photo1.jpg"
            alt="Portfolio Highlight"
            className="w-[94%] h-[95%] object-cover rounded-xl grayscale-0 contrast-110 shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* 2. BLURRED OVERLAY LAYER (Static base layer) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-zinc-950/20 backdrop-blur-[6px] brightness-85 z-5 pointer-events-none">
        {/* Fullscreen blurred watermark text */}
        <div className="absolute inset-0 flex justify-center items-center opacity-15 select-none z-0">
          <h1 className="text-[18vw] font-black tracking-tight leading-none text-zinc-950 font-sans uppercase">
            P<span className="text-stroke-2 text-zinc-950">R</span>TF<span className="text-stroke-2 text-zinc-950">O</span>LIO
          </h1>
        </div>

        {/* Centered Showcase Image (Blurred) */}
        <div className="relative w-[340px] h-[450px] md:w-[400px] md:h-[520px] flex items-center justify-center z-10 opacity-70">
          {/* Static gray crop frame */}
          <div className="absolute inset-0 border border-dashed border-white/20 rounded-2xl"></div>
          <img
            src="/images/photo1.jpg"
            alt="Portfolio Highlight Blurred"
            className="w-[94%] h-[95%] object-cover rounded-xl blur-[4px] grayscale shadow-2xl"
          />
        </div>
      </div>

      {/* 3. DYNAMIC INTERACTIVE SCANNER EYE-CATCHER CURSOR */}
      <div
        className="absolute border border-white/40 rounded-full w-[280px] h-[280px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 select-none z-20 mix-blend-difference hidden md:block"
        style={{
          left: "var(--x)",
          top: "var(--y)",
        }}
      >
        <div className="absolute inset-0 border-2 border-white/10 rounded-full scale-95 animate-ping opacity-30"></div>
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/60"></div>
      </div>

      {/* 4. COLOR SELECTOR PANEL */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-zinc-950/80 backdrop-blur-xl border border-white/15 px-6 py-3 rounded-full shadow-2xl">
        <span className="text-xs uppercase tracking-widest text-white/50 mr-2 select-none font-bold">Theme</span>
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setBgColor(color.hex)}
            className={`w-6 h-6 rounded-full transition-transform hover:scale-125 duration-300 relative ${
              bgColor === color.hex ? "scale-125 ring-2 ring-white" : ""
            }`}
            style={{
              backgroundColor: color.hex,
            }}
            title={`Switch to ${color.name}`}
          >
            {bgColor === color.hex && (
              <span className="absolute inset-1 border border-zinc-950 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
