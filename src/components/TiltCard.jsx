import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import assets from "../assets/assets";

// rotation sensitivity
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  // --- Desktop mouse movement
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;

    const mouseX = (e.clientX - left) * ROTATION_RANGE;
    const mouseY = (e.clientY - top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  // --- Touch movement for mobile
  const handleTouchMove = (e) => {
    if (!ref.current) return;
    const touch = e.touches[0];
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;

    const touchX = (touch.clientX - left) * ROTATION_RANGE;
    const touchY = (touch.clientY - top) * ROTATION_RANGE;

    const rX = (touchY / height - HALF_ROTATION_RANGE) * -1;
    const rY = touchX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="
        relative
        rounded-2xl 
        bg-gradient-to-br from-indigo-300 to-violet-300
        transition-transform duration-300 ease-out
        mx-auto
        w-[90vw] max-w-[320px] sm:max-w-[400px] md:max-w-[680px]
        h-[60vw] max-h-[200px] sm:max-h-[240px] md:max-h-[480px]
      "
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-3 rounded-xl bg-white shadow-lg overflow-hidden"
      >
        <img
          src={assets.hero_img}
          alt="Hero image"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>
    </motion.div>
  );
};

export default TiltCard;
