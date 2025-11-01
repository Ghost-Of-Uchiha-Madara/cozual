import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const AboutCard = ({ about }) => {
  const cardRef = useRef(null);

  // Mouse position normalized
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Softer spring for smooth floating effect
  const springConfig = { damping: 30, stiffness: 70 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Rotation mapping
  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  // Glow position
  const glowX = useTransform(x, (val) => val * 280 - 140);
  const glowY = useTransform(y, (val) => val * 380 - 190);

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const posX = (e.clientX - bounds.left) / bounds.width;
    const posY = (e.clientY - bounds.top) / bounds.height;
    mouseX.set(posX);
    mouseY.set(posY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-[280px] h-[380px] m-4 rounded-2xl cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      {/* Tilt wrapper */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-gray-700"
        style={{
          rotateX,
          rotateY,
          scale: hovered ? 1.05 : 1,
          transformStyle: "preserve-3d",
          transition: "scale 0.4s ease",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Back overlay / shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            background: hovered
              ? "rgba(0,0,0,0.06) dark:rgba(255,255,255,0.18)"
              : "transparent",
            boxShadow: hovered
              ? "0 25px 50px rgba(0,0,0,0.2), 0 0 60px rgba(0,0,0,0.1) dark:0 25px 50px rgba(255,255,255,0.3)"
              : "0 10px 20px rgba(0,0,0,0.1) dark:0 10px 20px rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        />

        {/* Moving glow */}
        <motion.div
          className="absolute w-[280px] h-[380px] rounded-full blur-3xl opacity-50 mix-blend-lighten pointer-events-none bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"
          style={{
            top: glowY,
            left: glowX,
          }}
          animate={{
            opacity: hovered ? 0.7 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        />

        {/* Card content */}
        <div className="relative flex flex-col items-center text-center p-6 gap-4 h-full justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4">
            <img src={about.icon} alt="" className="w-16 h-16 object-contain" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            {about.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {about.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutCard;
