import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import assets from "../assets/assets";

const GameCard = ({ label, title, image, delay }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-neutral-900 to-neutral-800 cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.8, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="uppercase text-xs font-bold tracking-wider text-pink-500 mb-2">
          • {label}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const Games = () => {
  const gameData = [
    {
      label: "PLAY",
      title: "BUILD YOUR KINGDOM",
      image: assets.game_one,
      delay: 0.1,
    },
    {
      label: "WIN",
      title: "CRUSH YOUR OPPONENTS",
      image: assets.game_two,
      delay: 0.3,
    },
    {
      label: "EARN",
      title: "EARN REAL REWARDS",
      image: assets.game_three,
      delay: 0.5,
    },
  ];

  return (
    <section
      id="games"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0e0e0e] text-white overflow-hidden"
    >
      {/* Section Title */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-wider text-center mb-16"
      >
        PLAY. WIN. EARN.
      </motion.h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 sm:px-12 max-w-7xl">
        {gameData.map((game, i) => (
          <GameCard key={i} {...game} />
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-16 px-8 py-4 bg-white text-black font-bold rounded-full uppercase tracking-wide hover:bg-neutral-200 transition-all"
      >
        Create Your Ink ID
      </motion.button>

      {/* Smooth fade at bottom for transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent pointer-events-none" />
    </section>
  );
};

export default Games;
