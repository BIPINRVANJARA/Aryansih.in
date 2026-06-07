import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "Creative Director",
    message: "Aryanish's work is absolutely top-tier. The animations are fluid, the code is spotless, and the performance is incredible.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    verified: true,
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Product Manager at SaaSify",
    message: "Delivered a gorgeous dashboard UI that wowed our investors. An exceptionally skilled developer with a great eye for design.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia",
    verified: true,
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Founder, Neocreative",
    message: "Incredible attention to detail. The 3D interactions and smooth scrolling feel so premium. Highly recommended!",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus",
    verified: true,
  },
  {
    id: 4,
    name: "Emma Johnson",
    role: "Marketing Lead",
    message: "Our redesign boosted engagement by 45%. The cinematic scrolling tells our brand story perfectly.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    verified: true,
  },
  {
    id: 5,
    name: "David Miller",
    role: "Tech Lead",
    message: "One of the most talented front-end developers I've worked with. GSAP animations are handled beautifully and efficiently.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David",
    verified: true,
  },
  {
    id: 6,
    name: "Liam O'Connor",
    role: "CEO at Dublin Lab",
    message: "Outstanding quality and responsive delivery. The interactive features on our landing page exceeded expectations.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam",
    verified: true,
  }
];

export default function Welcome() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const zoomImageRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const welcomeSubtitleRef = useRef(null);
  const testimonialContainerRef = useRef(null);

  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  // Load testimonials
  const loadTestimonials = () => {
    const custom = JSON.parse(localStorage.getItem("custom_testimonials") || "[]");
    setTestimonials([...custom, ...DEFAULT_TESTIMONIALS]);
  };

  useEffect(() => {
    loadTestimonials();

    // Listen for form submissions from Navbar feedback modal
    window.addEventListener("testimonialsUpdated", loadTestimonials);
    return () => window.removeEventListener("testimonialsUpdated", loadTestimonials);
  }, []);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    // Is mobile?
    const isMobile = window.innerWidth < 768;
    const targetScale = isMobile ? 2.8 : 3.8;

    const ctx = gsap.context(() => {
      // 1. Scroll-synced cinematic scaling & transition timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      // Part A: Image scales up, welcome text fades in and rises
      tl.to(zoomImageRef.current, {
        scale: targetScale,
        yPercent: -15,
        opacity: 0.1,
        ease: "none",
      }, 0);

      tl.fromTo(welcomeTextRef.current,
        { scale: 0.8, opacity: 0, y: 100 },
        { scale: 1, opacity: 0.15, y: 0, ease: "power2.out" },
        0
      );

      tl.fromTo(welcomeSubtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.3
      );

      // Part B: Transition to testimonials screen
      // Fade out Welcome screen components
      tl.to(welcomeTextRef.current, { opacity: 0, y: -100, ease: "none" }, 1);
      tl.to(welcomeSubtitleRef.current, { opacity: 0, y: -50, ease: "none" }, 1);
      tl.to(zoomImageRef.current, { opacity: 0, ease: "none" }, 1);

      // Fade in testimonials container
      tl.fromTo(testimonialContainerRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "power2.out" },
        1
      );
      
      // Let it stay on screen
      tl.to({}, { duration: 0.5 }); // Hold testimonials on screen before scroll ends
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split testimonials into two rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, midPoint);
  const secondRow = testimonials.slice(midPoint);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative h-[200vh] w-full bg-zinc-950 text-white"
    >
      {/* Pinned Sticky Box */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-soft-gradient"
      >
        {/* Background Noise Texture */}
        <div className="noise-overlay"></div>

        {/* SCREEN 1: TRANSITION PHOTO ZOOM */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            ref={zoomImageRef}
            src="/images/photo2.jpg"
            alt="Seamless Morph Portrait"
            className="w-[300px] h-[400px] object-cover rounded-3xl opacity-75 shadow-[0_0_50px_rgba(0,0,0,0.5)] origin-top transform"
          />
        </div>

        {/* SCREEN 1: MASSIVE WELCOME TYPOGRAPHY */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10 text-center px-4">
          <h2
            ref={welcomeTextRef}
            className="text-[20vw] md:text-[28vw] font-black tracking-tighter leading-none text-white opacity-0"
          >
            WELCOME
          </h2>
          <p
            ref={welcomeSubtitleRef}
            className="text-yellow-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm md:text-base opacity-0 -mt-2 md:-mt-8"
          >
            To my creative space
          </p>
        </div>

        {/* SCREEN 2: TESTIMONIALS MARQUEE SCREEN */}
        <div
          ref={testimonialContainerRef}
          className="absolute inset-0 w-full flex flex-col justify-center items-center z-20 opacity-0 pointer-events-auto px-6 md:px-12"
        >
          {/* Header */}
          <div className="text-center mb-12 max-w-xl">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Client Love</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1 text-white">
              What people are saying
            </h3>
          </div>

          {/* Marquee Row 1 - Left to Right */}
          <div className="w-full overflow-hidden flex relative py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-zinc-950 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-zinc-950 after:to-transparent after:z-10">
            <div className="flex gap-6 animate-marquee-left whitespace-nowrap">
              {/* Duplicate row for infinite looping effect */}
              {[...firstRow, ...firstRow].map((card, idx) => (
                <div
                  key={`${card.id}-row1-${idx}`}
                  className="inline-block w-[300px] md:w-[380px] bg-zinc-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md hover:border-yellow-400/30 hover:bg-zinc-900/60 transition-all duration-300 shadow-lg group select-none whitespace-normal"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={card.avatar}
                      alt={card.name}
                      className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                        {card.name}
                        {card.verified && (
                          <FaCheckCircle className="text-yellow-400 text-xs shrink-0" title="Verified review" />
                        )}
                      </h4>
                      <p className="text-white/40 text-xs truncate">{card.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm italic leading-relaxed relative">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-white/5 text-3xl pointer-events-none" />
                    "{card.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 - Right to Left */}
          <div className="w-full overflow-hidden flex relative py-4 mt-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-zinc-950 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-zinc-950 after:to-transparent after:z-10">
            <div className="flex gap-6 animate-marquee-right whitespace-nowrap">
              {[...secondRow, ...secondRow].map((card, idx) => (
                <div
                  key={`${card.id}-row2-${idx}`}
                  className="inline-block w-[300px] md:w-[380px] bg-zinc-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md hover:border-yellow-400/30 hover:bg-zinc-900/60 transition-all duration-300 shadow-lg group select-none whitespace-normal"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={card.avatar}
                      alt={card.name}
                      className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                        {card.name}
                        {card.verified && (
                          <FaCheckCircle className="text-yellow-400 text-xs shrink-0" title="Verified review" />
                        )}
                      </h4>
                      <p className="text-white/40 text-xs truncate">{card.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm italic leading-relaxed relative">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-white/5 text-3xl pointer-events-none" />
                    "{card.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
