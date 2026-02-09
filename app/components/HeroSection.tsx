"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

// const Football3DScene = dynamic(() => import("./Football3DScene"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-full flex items-center justify-center">
//       <div className="w-24 h-24 rounded-full border-2 border-orange/30 border-t-orange animate-spin" />
//     </div>
//   ),
// });

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const footballY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Glass effect mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!heroContentRef.current) return;
      const rect = heroContentRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const unsubX = smoothX.on("change", () => {
      if (glowRef.current && isHovered) {
        const x = smoothX.get();
        const y = smoothY.get();
        glowRef.current.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255,107,0,0.2) 0%, rgba(255,107,0,0.08) 40%, transparent 70%)`;
      }
    });
    const unsubY = smoothY.on("change", () => {
      if (glowRef.current && isHovered) {
        const x = smoothX.get();
        const y = smoothY.get();
        glowRef.current.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255,107,0,0.2) 0%, rgba(255,107,0,0.08) 40%, transparent 70%)`;
      }
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY, isHovered]);

  // Floating circles data
  const floatingCircles = [
    // Small circles
    { size: 8, x: "10%", y: "20%", delay: 0, duration: 4 },
    { size: 12, x: "85%", y: "15%", delay: 0.5, duration: 5 },
    { size: 10, x: "15%", y: "70%", delay: 1, duration: 4.5 },
    { size: 9, x: "90%", y: "60%", delay: 0.3, duration: 5.5 },
    { size: 11, x: "5%", y: "45%", delay: 0.7, duration: 4 },
    { size: 8, x: "75%", y: "80%", delay: 1.2, duration: 5 },
    // Medium circles
    { size: 20, x: "25%", y: "10%", delay: 0.2, duration: 6 },
    { size: 18, x: "70%", y: "30%", delay: 0.8, duration: 5.5 },
    { size: 22, x: "8%", y: "65%", delay: 0.4, duration: 6.5 },
    { size: 16, x: "92%", y: "75%", delay: 1.1, duration: 5 },
    { size: 19, x: "50%", y: "5%", delay: 0.6, duration: 6 },
    // Large circles
    { size: 35, x: "30%", y: "25%", delay: 0.3, duration: 7 },
    { size: 32, x: "65%", y: "50%", delay: 0.9, duration: 7.5 },
    { size: 38, x: "12%", y: "85%", delay: 0.5, duration: 8 },
    { size: 30, x: "88%", y: "20%", delay: 1.3, duration: 6.5 },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Floating circles */}
      {floatingCircles.map((circle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-orange/40 bg-orange/10 pointer-events-none z-[5]"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: circle.x,
            top: circle.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 25, 0],
          }}
          transition={{
            duration: circle.duration,
            delay: circle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content with glass effect */}
      <motion.div
        ref={heroContentRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center section-container rounded-3xl overflow-hidden transition-all duration-500"
      >
        {/* Glass spotlight glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none z-0 rounded-3xl transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Subtle glass shine edge */}
        <div
          className="absolute inset-0 pointer-events-none z-0 rounded-3xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.6 : 0,
            background:
              "linear-gradient(135deg, rgba(255,107,0,0.05) 0%, transparent 50%, rgba(255,107,0,0.03) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-30 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-orange inline-block" />
            <span className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 font-mono">
              Full-Stack Developer & Web3 Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] mb-6"
          >
            <span className="italic font-light text-gradient-orange">SAURABH<span className="text-orange">.</span></span>
            <br />
            <span className="font-black text-white">RAGHUVANSHI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed text-center"
          >
            I build performant web applications, craft Web3 solutions, and contribute to open source.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center items-center"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-orange hover:bg-orange-light text-black font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
            >
              <span className="w-2 h-2 rounded-full bg-black inline-block" />
              Get In Touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Football */}
      {/* <motion.div
        className="absolute right-[2%] sm:right-[5%] top-[10%] sm:top-[15%] w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] z-20 pointer-events-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        style={{ y: footballY }}
      > */}
      {/* <Football3DScene /> */}
      {/* </motion.div> */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-gray-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-orange rounded-full mt-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
