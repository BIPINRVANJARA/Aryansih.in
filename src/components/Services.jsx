import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLaptopCode, FaChartBar, FaShoppingCart, FaServer, FaPaintBrush, FaRedo } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: 1,
    title: "Business Website",
    tag: "Corporate",
    color: "#648c11",
    description: "Corporate websites optimized for conversion, organic reach, and premium branding.",
    icon: <FaLaptopCode size={32} />
  },
  {
    id: 2,
    title: "Admin Dashboard",
    tag: "SaaS",
    color: "#ff4500",
    description: "Advanced dashboards with real-time analytics, charts, and clean data visualization.",
    icon: <FaChartBar size={32} />
  },
  {
    id: 3,
    title: "E-Commerce Store",
    tag: "Retail",
    color: "#000080",
    description: "Luxury online shopping experiences with seamless product checkout and catalog filters.",
    icon: <FaShoppingCart size={32} />
  },
  {
    id: 4,
    title: "Full Stack Web App",
    tag: "App",
    color: "#ff0000",
    description: "Scalable web applications with secure user login, databases, and api systems.",
    icon: <FaServer size={32} />
  },
  {
    id: 5,
    title: "Portfolio Website",
    tag: "Creative",
    color: "#c5a300", // Darker gold/yellow
    description: "High-end interactive portfolios for creators, builders, and creative agencies.",
    icon: <FaPaintBrush size={32} />
  },
  {
    id: 6,
    title: "Website Redesign",
    tag: "Design",
    color: "#4f4f4f",
    description: "Modern redesigns incorporating immersive animations, fresh typography, and modern UI.",
    icon: <FaRedo size={32} />
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [bgGlowColor, setBgGlowColor] = useState(SERVICES_DATA[0].color);
  const [activeIdx, setActiveIdx] = useState(0);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const cards = cardRefs.current;
    if (cards.length === 0) return;

    // Radius & angle spacing for half-circle path
    const radius = 600;
    const angleSpacing = 0.45; // rads (approx 26 degrees)

    const scrollObject = { progress: 0 };

    const updateCards = () => {
      const prog = scrollObject.progress; // 0 to 1
      const centerIndex = prog * (cards.length - 1);
      const roundedCenterIdx = Math.round(centerIndex);

      setActiveIdx(roundedCenterIdx);
      setBgGlowColor(SERVICES_DATA[roundedCenterIdx]?.color || SERVICES_DATA[0].color);

      cards.forEach((card, i) => {
        const offset = i - centerIndex;
        const angle = offset * angleSpacing;

        // Curved 3D positioning formulas:
        const x = Math.sin(angle) * radius;
        const y = radius - Math.cos(angle) * radius;
        const z = -Math.abs(offset) * 80;
        
        const rotationZ = angle * (180 / Math.PI); // Angle to degrees
        const scale = 1 - Math.abs(offset) * 0.15;
        const opacity = 1 - Math.abs(offset) * 0.3;

        gsap.set(card, {
          x: x,
          y: y + 80, // Offset down a bit for aesthetics
          z: z,
          rotationZ: rotationZ,
          scale: scale,
          opacity: opacity > 0 ? opacity : 0,
          transformPerspective: 1000,
        });
      });
    };

    // ScrollTrigger to scrub the progress variable
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=400%", // 500% total scroll length
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        scrollObject.progress = self.progress;
        updateCards();
      }
    });

    // Initial positioning call
    updateCards();

    return () => {
      trigger.kill();
    };
  }, []);

  // Handle mobile active card on scroll
  const handleMobileScroll = (e) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.8;
    const index = Math.round(scrollLeft / (cardWidth + 24)); // 24 is gap size
    if (index >= 0 && index < SERVICES_DATA.length) {
      setActiveIdx(index);
      setBgGlowColor(SERVICES_DATA[index].color);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col justify-center items-center select-none"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${bgGlowColor}25 0%, #09090b 80%)`,
        transition: "background 0.8s ease",
      }}
    >
      {/* Background Noise Texture */}
      <div className="noise-overlay"></div>

      {/* Massive Outlined Watermark Title */}
      <div className="absolute top-1/4 left-0 w-full flex justify-center items-center pointer-events-none select-none z-0">
        <h2 className="text-[18vw] font-black tracking-widest text-white/5 text-stroke uppercase font-sans">
          SERVICES
        </h2>
      </div>

      {/* DESKTOP 3D CURVE CAROUSEL VIEW */}
      <div className="hidden lg:flex relative w-full h-[600px] items-center justify-center z-10">
        <div className="absolute flex justify-center items-center w-full">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              ref={addToRefs}
              className="absolute w-[420px] h-[520px] bg-zinc-900/40 border border-white/5 rounded-[30px] p-10 backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-yellow-400/30 transition-colors duration-300"
              style={{
                boxShadow: `0 20px 40px -15px ${service.color}15`,
              }}
            >
              <div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-black transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: service.color }}
                >
                  {service.icon}
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-1">
                  {service.tag}
                </span>
                <h4 className="text-3xl font-black mb-4 tracking-tight">
                  {service.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Dynamic bottom index indicator */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
                  Service 0{service.id}
                </span>
                <span 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: service.color }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE SNAP CAROUSEL VIEW */}
      <div className="lg:hidden w-full flex flex-col items-center z-10">
        {/* Header */}
        <div className="text-center mb-8 px-6">
          <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Expertise</span>
          <h3 className="text-4xl font-black uppercase mt-1 text-white">
            What I Provide
          </h3>
        </div>

        {/* Snap-scroll list */}
        <div
          onScroll={handleMobileScroll}
          className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-8 pb-8"
        >
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className={`shrink-0 w-[80vw] snap-center bg-zinc-900/60 border border-white/10 rounded-[30px] p-8 text-white shadow-xl flex flex-col justify-between h-[420px] transition-all duration-500 ${
                activeIdx === idx ? "scale-100 opacity-100 border-white/20" : "scale-90 opacity-40"
              }`}
            >
              <div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-black"
                  style={{ backgroundColor: service.color }}
                >
                  {service.icon}
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-1">
                  {service.tag}
                </span>
                <h4 className="text-2xl font-black mb-3 tracking-tight">
                  {service.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
                  Service 0{service.id}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: service.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicator Dots */}
        <div className="flex gap-2 mt-2">
          {SERVICES_DATA.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === idx ? "w-6 bg-yellow-400" : "w-1.5 bg-white/20"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
