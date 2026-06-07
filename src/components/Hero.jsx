import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imageRef = useRef(null);
  const wordContainerRef = useRef(null);

  const words = ["Developer", "Freelancer", "Designer", "Creator", "Developer"];

  useEffect(() => {
    // 1. Text Rolling Animation
    const totalWords = words.length - 1;
    const wordHeight = 100 / (totalWords + 1);
    const tl = gsap.timeline({ repeat: -1 });

    for (let i = 1; i <= totalWords; i++) {
      tl.to(wordContainerRef.current, {
        yPercent: -i * wordHeight,
        duration: 0.8,
        delay: 1.5,
        ease: "power3.inOut",
      });
    }
    // Snap back to 0 at the end of the loop
    tl.set(wordContainerRef.current, { yPercent: 0 });

    // 2. GSAP ScrollTrigger for Parallax & Fade Effects
    const ctx = gsap.context(() => {
      // Left content movement on scroll
      gsap.to(leftRef.current, {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Right image parallax on scroll
      gsap.to(imageRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => {
      tl.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full bg-white text-zinc-950 flex items-center overflow-hidden py-24 px-6 md:px-12 z-10"
    >
      {/* Absolute outline watermarks */}
      <div className="absolute top-10 right-10 text-[10vw] font-black select-none pointer-events-none text-zinc-100 uppercase tracking-tight text-stroke">
        LEESHARK
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SECTION - TEXT CONTENT */}
        <div ref={leftRef} className="flex flex-col gap-6 text-left z-10">
          <div className="flex flex-col">
            <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm md:text-base mb-1">
              Creative Developer
            </span>
            <h1 className="text-[10vw] lg:text-[7vw] font-black leading-none uppercase tracking-tighter text-zinc-950">
              Hello, I'm
            </h1>
            <h1 className="text-[10vw] lg:text-[7vw] font-black leading-none uppercase tracking-tighter text-stroke text-zinc-950">
          Aryansinh
        </h1>
          </div>

          {/* Rolling Word Container */}
          <div className="h-16 md:h-24 overflow-hidden relative flex items-center">
            <div
              ref={wordContainerRef}
              className="flex flex-col text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase text-yellow-500"
            >
              {words.map((w, idx) => (
                <div key={idx} className="h-16 md:h-24 flex items-center">
                  {w}
                </div>
              ))}
            </div>
          </div>

          <p className="text-zinc-600 text-base md:text-lg max-w-lg leading-relaxed">
            Passionate Web Developer crafting modern, interactive, and premium digital experiences with creative UI animations and futuristic design aesthetics.
          </p>

          {/* Social Icons Section */}
          <div className="flex gap-4 mt-4">
            {[
              {
                name: "WhatsApp",
                icon: <FaWhatsapp size={20} />,
                color: "hover:bg-[#25D366] hover:text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]",
                link: "https://wa.me/919974185925",
              },
              {
                name: "Instagram",
                icon: <FaInstagram size={20} />,
                color: "hover:bg-[#E1306C] hover:text-white hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]",
                link: "https://www.instagram.com/aryansinh_rajput_53?igsh=MnFjbG13dndnemlo",
              },
              {
                name: "LinkedIn",
                icon: <FaLinkedinIn size={20} />,
                color: "hover:bg-[#0077B5] hover:text-white hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]",
                link: "https://linkedin.com",
              },
              {
                name: "GitHub",
                icon: <FaGithub size={20} />,
                color: "hover:bg-[#24292e] hover:text-white hover:shadow-[0_0_20px_rgba(36,41,46,0.4)]",
                link: "https://github.com",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-700 bg-white transition-all duration-300 scale-100 hover:scale-110 active:scale-95 ${social.color}`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - HERO IMAGE */}
        <div ref={rightRef} className="relative flex justify-center lg:justify-end z-5">
          <div className="relative w-[300px] h-[400px] sm:w-[360px] sm:h-[480px] lg:w-[420px] lg:h-[560px] overflow-hidden rounded-[40px] shadow-2xl bg-zinc-100">
            {/* Visual Backdrops */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
            <img
              ref={imageRef}
              src="/images/photo2.jpg"
              alt="Aryansinh Portrait"
              className="absolute w-full h-[120%] object-cover top-[-10%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
