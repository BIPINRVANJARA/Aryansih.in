import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaBars, FaTimes, FaCommentAlt, FaPaperPlane } from "react-icons/fa";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  // Refs collection helper
  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // Hide/Show Navbar on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // GSAP Intro Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in logo from left
      gsap.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger nav links from top
      gsap.from(linksRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // If Lenis is active, let it handle the smooth scroll
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Form Submission for testimonials
  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const newTestimonial = {
      id: Date.now(),
      name,
      role: role || "Client",
      message,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
      verified: true,
    };

    // Save to localStorage so Welcome.jsx marquee can load it
    const existing = JSON.parse(localStorage.getItem("custom_testimonials") || "[]");
    localStorage.setItem("custom_testimonials", JSON.stringify([newTestimonial, ...existing]));

    // Dispatch a custom event to notify Welcome.jsx to update its list
    window.dispatchEvent(new Event("testimonialsUpdated"));

    setSubmitSuccess(true);
    setTimeout(() => {
      setName("");
      setRole("");
      setMessage("");
      setSubmitSuccess(false);
      setModalOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/5 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${
          lastScrollY > 50
            ? "bg-zinc-950/70 backdrop-blur-xl py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div
            ref={logoRef}
            onClick={() => handleScrollTo("home")}
            className="text-2xl font-black tracking-wider cursor-pointer select-none text-white hover:text-yellow-400 transition-colors duration-300 group"
          >
            Aryansinh<span className="text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">.in</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {["Home", "About", "Portfolio", "Service", "Contact"].map((link, idx) => (
              <button
                key={link}
                ref={addToRefs}
                onClick={() => handleScrollTo(link.toLowerCase() === "service" ? "services" : link.toLowerCase())}
                className="relative py-2 text-white/70 hover:text-white transition-colors duration-300 group text-sm uppercase tracking-widest"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            {/* Testimonial Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)]"
            >
              <FaCommentAlt /> Feedback
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-yellow-400 text-black p-2.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            >
              <FaCommentAlt size={14} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-400 p-2 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-3xl flex flex-col justify-center items-center gap-8 transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {["Home", "About", "Portfolio", "Service", "Contact"].map((link, idx) => (
            <button
              key={link}
              onClick={() => handleScrollTo(link.toLowerCase() === "service" ? "services" : link.toLowerCase())}
              className="text-4xl md:text-5xl font-black text-white hover:text-yellow-400 transition-all duration-300 uppercase tracking-wider hover:scale-110 active:scale-95"
              style={{
                transitionDelay: `${idx * 50}ms`
              }}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* FEEDBACK / ADD TESTIMONIAL MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            data-aos="zoom-in"
            className="w-full max-w-md bg-zinc-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-200"
            >
              <FaTimes size={20} />
            </button>

            <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <FaCommentAlt className="text-yellow-400" /> Add Testimonial
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Share your experience working with me. Your feedback will appear instantly in the marquee section!
            </p>

            {submitSuccess ? (
              <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
                <div className="bg-yellow-400/20 text-yellow-400 p-4 rounded-full animate-bounce">
                  <FaPaperPlane size={28} />
                </div>
                <h4 className="text-xl font-bold text-white">Thank you!</h4>
                <p className="text-white/60 text-sm">Your feedback was submitted and added dynamically.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                <div>
                  <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950/60 border border-white/10 focus:border-yellow-400 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Role / Company</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. CEO, Tech Lead"
                    className="w-full bg-zinc-950/60 border border-white/10 focus:border-yellow-400 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Feedback *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your review details..."
                    className="w-full bg-zinc-950/60 border border-white/10 focus:border-yellow-400 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none resize-none transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-xl font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(250,204,21,0.25)]"
                >
                  <FaPaperPlane /> Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
