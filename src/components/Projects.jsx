import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaFolderOpen, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Neo-Commerce",
    tag: "Luxury Retail",
    color: "from-blue-600 to-indigo-900",
    description: "High-end e-commerce store with immersive 3D viewing, instant checkout, and custom UI transitions.",
  },
  {
    id: 2,
    title: "Pulse Analytics",
    tag: "SaaS Dashboard",
    color: "from-purple-600 to-pink-900",
    description: "Sleek dark dashboard utilizing real-time web sockets, canvas data visualization, and customized exports.",
  },
  {
    id: 3,
    title: "Aether Protocol",
    tag: "Web3 Defi",
    color: "from-emerald-600 to-teal-900",
    description: "Futuristic decentralized swap interface built with ethers, wallet connections, and fully audited contracts.",
  },
  {
    id: 4,
    title: "Vesper Studio",
    tag: "Creative Agency",
    color: "from-amber-600 to-rose-900",
    description: "Awwwards-winning minimal architecture showcase using horizontal web animations and WebGL galleries.",
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Desktop 3D Folder Explosion Animation
    if (window.innerWidth < 1024) return; // Only run on desktop

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
        }
      });

      // 1. Folder flap opening animation (hinged at bottom center, rotates outward)
      tl.to(folderFrontRef.current, {
        rotationX: -130,
        transformOrigin: "bottom center",
        ease: "power2.inOut",
        duration: 1,
      });

      // 2. Cards rise and explode outward from the folder container
      // Card coordinates for exploded state:
      const explodeTransforms = [
        { x: -340, y: -240, rotate: -8, scale: 1 },  // Top-Left
        { x: 340, y: -240, rotate: 8, scale: 1 },   // Top-Right
        { x: -340, y: 140, rotate: -4, scale: 1 },  // Bottom-Left
        { x: 340, y: 140, rotate: 6, scale: 1 },    // Bottom-Right
      ];

      cardsRef.current.forEach((card, idx) => {
        tl.to(card, {
          y: explodeTransforms[idx].y,
          x: explodeTransforms[idx].x,
          rotation: explodeTransforms[idx].rotate,
          scale: explodeTransforms[idx].scale,
          opacity: 1,
          ease: "back.out(1.2)",
          duration: 1.5,
        }, 0.3); // Staggers right after opening starts
      });

      // Add a small hover float timeline trigger
      tl.to({}, { duration: 0.5 }); // Hold at full explosion
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative min-h-[150vh] lg:min-h-[220vh] w-full bg-[#f7f6f2] text-zinc-900 py-24 overflow-hidden"
    >
      {/* Background Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none z-0">
        <h2 className="text-[22vw] font-black uppercase text-zinc-800 tracking-tighter">
          My Work
        </h2>
      </div>

      {/* Ambient glowing background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#f4c400]/10 blur-[120px] pointer-events-none z-0"></div>

      {/* DESKTOP 3D FOLDER VIEW */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center flex-col z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-xl">
          <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs">Showcase</span>
          <h3 className="text-5xl font-black uppercase tracking-tight mt-1 text-zinc-950">
            Featured Projects
          </h3>
        </div>

        {/* 3D Scene Root */}
        <div 
          className="relative w-[500px] h-[340px]"
          style={{ perspective: "2000px" }}
        >
          {/* FOLDER BACK PANEL */}
          <div className="absolute inset-0 bg-yellow-400 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-2 border-yellow-500/20 z-0 flex items-end justify-center pb-6 overflow-hidden">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="text-center z-10">
              <FaFolderOpen size={44} className="mx-auto text-zinc-950/60 mb-2" />
              <span className="text-xs uppercase tracking-widest font-black text-zinc-950/50">ARCHIVE FOLDER</span>
            </div>
          </div>

          {/* PROJECT CARDS (Exploding from inside folder) */}
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              ref={addCardRef}
              className="project-card absolute top-4 left-6 right-6 h-[260px] bg-zinc-950 border border-white/10 rounded-[28px] p-6 text-white shadow-2xl opacity-0 transform translate-y-10 scale-90 transition-all duration-300 z-5 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:border-yellow-400/50 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-white/10 group-hover:bg-yellow-400 group-hover:text-black transition-all px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold text-white/70">
                    {project.tag}
                  </span>
                  <FaExternalLinkAlt className="text-white/40 group-hover:text-yellow-400 group-hover:scale-110 transition-all text-sm" />
                </div>
                <h4 className="text-2xl font-black mb-2 tracking-tight group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-white/60 text-xs leading-relaxed max-w-[90%]">
                  {project.description}
                </p>
              </div>

              {/* Card visual background color gradient block */}
              <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${project.color} mt-4`}></div>
            </div>
          ))}

          {/* FOLDER FRONT PANEL (Hinged at bottom, opens downward) */}
          <div
            ref={folderFrontRef}
            className="absolute inset-0 bg-[#e3b500] rounded-3xl z-20 border-t border-yellow-300 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] origin-bottom flex items-center justify-center cursor-pointer select-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="text-center" style={{ transform: "translateZ(30px)" }}>
              <h4 className="text-2xl font-black uppercase tracking-wider text-zinc-950">
                Lema Portfolio
              </h4>
              <p className="text-zinc-950/60 text-xs font-bold uppercase tracking-widest mt-1">
                Scroll to Open
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SNAP CAROUSEL VIEW */}
      <div className="lg:hidden w-full flex flex-col items-center px-6 z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs">Showcase</span>
          <h3 className="text-4xl font-black uppercase tracking-tight mt-1 text-zinc-950">
            Featured Projects
          </h3>
        </div>

        {/* Snap Slider container */}
        <div className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="shrink-0 w-[85vw] snap-center bg-zinc-950 border border-white/10 rounded-[28px] p-6 text-white shadow-xl flex flex-col justify-between h-[360px]"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold">
                    {project.tag}
                  </span>
                  <FaExternalLinkAlt className="text-yellow-400 text-sm" />
                </div>
                <h4 className="text-3xl font-black mb-3 tracking-tight">
                  {project.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-xs uppercase tracking-widest font-bold text-white/40 flex items-center gap-2">
                  Explore Project <FaArrowRight className="text-yellow-400 animate-pulse" />
                </span>
                <div className={`h-8 w-8 rounded-full bg-gradient-to-tr ${project.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Helper pagination label */}
        <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold mt-2 animate-pulse">
          ← Swipe to view more →
        </div>
      </div>
    </section>
  );
}
