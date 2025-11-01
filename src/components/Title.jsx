import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

const Title = ({ title, desc }) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-7xl font-extrabold text-black dark:text-white text-center"
      >
        <BubbleText>{title}</BubbleText>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-lg text-center text-gray-500 dark:text-white/80 mb-6"
      >
        {desc}
      </motion.p>
    </>
  );
};

const BubbleText = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll("span");

    const handleEnter = (span) => {
      span.style.fontWeight = "900";
      span.style.color = "--color-secondary";

      const left = span.previousElementSibling;
      const right = span.nextElementSibling;

      if (left) {
        left.style.fontWeight = "500";
        left.style.color = "--color-secondary";
      }
      if (right) {
        right.style.fontWeight = "500";
        right.style.color = "--color-secondary";
      }
    };

    const handleLeave = (span) => {
      span.style.fontWeight = "800";
      span.style.color = "--color-secondary";

      const left = span.previousElementSibling;
      const right = span.nextElementSibling;

      if (left) {
        left.style.fontWeight = "800";
        left.style.color = "--color-secondary";
      }
      if (right) {
        right.style.fontWeight = "800";
        right.style.color = "--color-secondary";
      }
    };

    spans.forEach((span) => {
      const enter = () => handleEnter(span);
      const leave = () => handleLeave(span);
      span.addEventListener("mouseenter", enter);
      span.addEventListener("mouseleave", leave);

      // Cleanup when unmounting
      return () => {
        span.removeEventListener("mouseenter", enter);
        span.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  return (
    <span ref={containerRef} className="hover-text">
      {children.split("").map((char, idx) => (
        <span
          key={idx}
          style={{
            transition: "0.35s font-weight, 0.35s color",
            fontWeight: 800,
            color: "--color-secondary",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default Title;
