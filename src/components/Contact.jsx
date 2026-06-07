import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const iconsRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(formRef.current, {
        y: 80, opacity: 0, duration: 1.2, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => { trigger.kill(); ctx.revert(); };
  }, []);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setErrorMsg("Name is required"); return; }
    if (!message.trim()) { setErrorMsg("Message is required"); return; }
    setErrorMsg("");
    setSending(true);

    try {
      const res = await fetch("https://formsubmit.co/ajax/rajputaryan54641@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email: email || "Not provided",
          message,
          _subject: `Portfolio Inquiry from ${name}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      const data = await res.json();
      if (data.success === "true" || data.success === true) {
        setSuccess(true);
        setName(""); setEmail(""); setMessage("");
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0a0a0a] text-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-center items-center py-24 px-6 md:px-12 select-none z-10"
    >
      <div className="noise-overlay"></div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
        <h2 className="text-[25vw] font-black uppercase text-white tracking-tight">CONNECT</h2>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center z-10 relative">
        {/* Heading */}
        <h3
          ref={headingRef}
          className="text-[10vw] md:text-[8vw] font-black uppercase tracking-tight text-white mb-2 leading-none"
        >
          Let's Talk
        </h3>
        <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest font-semibold mb-12">
          Open for freelance opportunities &amp; projects
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Social Panel */}
          <div className="md:col-span-4 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Social Links</h4>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Reach out via any channel. I'm active on WhatsApp and Instagram.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 text-white/60 text-xs font-mono">
              <a href="mailto:rajputaryan54641@gmail.com" className="hover:text-yellow-400 transition-colors truncate">
                rajputaryan54641@gmail.com
              </a>
              <a href="tel:+919974185925" className="hover:text-yellow-400 transition-colors">
                +91 99741 85925
              </a>
            </div>

            {/* Social Icons */}
            <div ref={iconsRef} className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[
                { name: "WhatsApp",  icon: <FaWhatsapp size={18} />,  link: "https://wa.me/919974185925" },
                { name: "Instagram", icon: <FaInstagram size={18} />, link: "https://www.instagram.com/aryansinh_rajput_53?igsh=MnFjbG13dndnemlo" },
                { name: "LinkedIn",  icon: <FaLinkedinIn size={18} />, link: "https://linkedin.com" },
                { name: "GitHub",    icon: <FaGithub size={18} />,    link: "https://github.com/BIPINRVANJARA" },
              ].map((p) => (
                <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-white/20 bg-transparent text-white transition-all duration-500 hover:scale-105 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                  title={p.name} aria-label={p.name}>
                  {p.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="md:col-span-8 w-full">
            {success ? (
              <div className="flex flex-col items-center justify-center gap-4 h-64 bg-zinc-900/30 border border-white/5 rounded-[30px] p-10 backdrop-blur-md">
                <FaCheckCircle size={48} className="text-yellow-400 animate-bounce" />
                <h4 className="text-2xl font-black text-white">Message Sent!</h4>
                <p className="text-white/50 text-sm text-center">
                  Thanks for reaching out. I'll get back to you shortly at{" "}
                  <span className="text-yellow-400">rajputaryan54641@gmail.com</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMsg} className="space-y-6 bg-zinc-900/30 border border-white/5 p-8 md:p-10 rounded-[30px] backdrop-blur-md">
                {errorMsg && (
                  <p className="text-red-400 text-xs uppercase tracking-widest font-bold bg-red-500/10 py-2.5 px-4 rounded-xl border border-red-500/20 text-center animate-pulse">
                    {errorMsg}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none transition-colors duration-300 focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none transition-colors duration-300 focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    required rows={5} value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none resize-none transition-colors duration-300 focus:border-white/40"
                  />
                </div>

                <button
                  type="submit" disabled={sending}
                  className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <><span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin"></span> Sending…</>
                  ) : (
                    <><FaPaperPlane size={12} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
