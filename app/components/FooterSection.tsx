"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from "lucide-react";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const EMAIL = "saurabhsraghuvanshi@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`;

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/saurabhraghuvanshii",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/saurabhraghuvanshii",
    icon: Linkedin,
  },
  {
    name: "X",
    url: "https://x.com/saurabhksinghr",
    icon: null,
  },
  {
    name: "Email",
    url: GMAIL_COMPOSE_URL,
    icon: Mail,
  },
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Glass effect state for the bottom navbar
  const [isBarHovered, setIsBarHovered] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const update = () => {
      if (glowRef.current && isBarHovered) {
        const x = smoothX.get();
        const y = smoothY.get();
        glowRef.current.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.06) 40%, transparent 70%)`;
      }
    };
    const unsubX = smoothX.on("change", update);
    const unsubY = smoothY.on("change", update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY, isBarHovered]);

  return (
    <footer id="contact" className="relative w-full py-20 md:py-32" ref={ref}>
      <div className="section-container">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            LET&apos;S BUILD{" "}
            <span className="text-gradient-orange">SOMETHING GREAT</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mb-10 text-center">
            Got an idea? Let&apos;s collaborate and create something that defies expectations.
            I&apos;m always open to exciting new projects and opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-orange hover:bg-orange-light text-black font-bold px-8 sm:px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] text-base sm:text-lg"
            >
              <span className="w-2 h-2 rounded-full bg-black inline-block" />
              GET IN TOUCH
              <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/saurabhraghuvanshii"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gray-700 hover:border-orange hover:text-orange text-white px-8 py-4 rounded-full transition-all duration-300"
            >
              <Github size={18} />
              VIEW GITHUB
            </a>
          </div>
        </motion.div>

        {/* Bottom navbar with glass effect */}
        <div
          ref={barRef}
          onMouseMove={handleBarMouseMove}
          onMouseEnter={() => setIsBarHovered(true)}
          onMouseLeave={() => setIsBarHovered(false)}
          className={`relative overflow-hidden rounded-full border bg-black/40 backdrop-blur-xl px-6 py-6 md:px-8 md:py-6 max-w-4xl mx-auto transition-all duration-500 ${isBarHovered
            ? "border-orange/40 shadow-[0_0_30px_rgba(255,107,0,0.12)]"
            : "border-gray-800/50"
            }`}
          style={{
            transform: isBarHovered ? "scale(1.01)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >

          {/* Glass spotlight glow that follows cursor */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none z-0 rounded-full transition-opacity duration-300"
            style={{ opacity: isBarHovered ? 1 : 0 }}
          />

          {/* Subtle glass shine edge */}
          <div
            className="absolute inset-0 pointer-events-none z-0 rounded-full transition-opacity duration-500"
            style={{
              opacity: isBarHovered ? 0.7 : 0,
              background:
                "linear-gradient(135deg, rgba(255,107,0,0.04) 0%, transparent 50%, rgba(255,107,0,0.02) 100%)",
            }}
          />

          {/* Footer content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#hero"
                className="text-2xl font-black text-white hover:text-orange transition-colors duration-300"
              >
                SAURABH<span className="text-orange">.</span>
              </a>
            </motion.div>

            {/* Nav links */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-orange hover:scale-110 transition-all duration-300 inline-block"
                >
                  {link.name}
                </a>
              ))}
            </motion.nav>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:border-orange hover:bg-orange hover:text-black hover:scale-110 transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon ? <link.icon size={16} /> : <XIcon size={16} />}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Saurabh Raghuvanshi.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
