import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import assets from "../assets/assets";

const Hero = () => {
  const floatingAssets = [
    {
      el: assets.game_one?.coinDollar ? (
        <img
          src={assets.game_one.coinDollar}
          alt="Gold Coin $"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 float-anim drop-shadow-2xl"
        />
      ) : (
        <span className="text-yellow-400 text-3xl md:text-5xl float-anim">🪙</span>
      ),
      delay: 0.1,
      top: "18%",
      left: "6%",
    },
    {
      el: assets.game_one?.crateRed ? (
        <img
          src={assets.game_one.crateRed}
          alt="Red Crate"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 float-anim drop-shadow-xl"
        />
      ) : (
        <span className="text-red-500 text-2xl md:text-4xl float-anim">📦</span>
      ),
      delay: 0.3,
      top: "42%",
      left: "10%",
    },
    {
      el: assets.game_one?.globeYellow ? (
        <img
          src={assets.game_one.globeYellow}
          alt="Yellow Globe"
          className="w-10 h-10 md:w-16 md:h-16 float-anim drop-shadow-2xl"
        />
      ) : (
        <span className="text-yellow-400 text-4xl md:text-6xl float-anim">🌍</span>
      ),
      delay: 0.5,
      top: "65%",
      left: "4%",
    },
    {
      el: assets.game_one?.bunnyPink ? (
        <img
          src={assets.game_one.bunnyPink}
          alt="Pink Bunny"
          className="w-7 h-7 md:w-10 md:h-10 float-anim drop-shadow-lg"
        />
      ) : (
        <span className="text-pink-400 text-2xl md:text-3xl float-anim">🐰</span>
      ),
      delay: 0.7,
      top: "78%",
      left: "14%",
    },
    {
      el: assets.game_one?.coinGold ? (
        <img
          src={assets.game_one.coinGold}
          alt="Gold Coin"
          className="w-8 h-8 md:w-12 md:h-12 float-anim drop-shadow-2xl"
        />
      ) : (
        <span className="text-yellow-400 text-3xl md:text-5xl float-anim">🪙</span>
      ),
      delay: 0.2,
      top: "12%",
      right: "16%",
    },
    {
      el: assets.game_one?.gemHexPurple ? (
        <img
          src={assets.game_one.gemHexPurple}
          alt="Purple Gem"
          className="w-6 h-6 md:w-8 md:h-8 float-anim drop-shadow-lg"
        />
      ) : (
        <span className="text-purple-400 text-xl md:text-2xl float-anim">💎</span>
      ),
      delay: 0.4,
      top: "25%",
      right: "7%",
    },
    {
      el: assets.game_one?.archerBlue ? (
        <img
          src={assets.game_one.archerBlue}
          alt="Blue Archer"
          className="w-12 h-12 md:w-16 md:h-16 float-anim drop-shadow-2xl"
        />
      ) : (
        <span className="text-cyan-400 text-4xl md:text-6xl float-anim">🏹</span>
      ),
      delay: 0.6,
      top: "38%",
      right: "10%",
    },
    {
      el: assets.game_one?.heartPink ? (
        <img
          src={assets.game_one.heartPink}
          alt="Pink Heart"
          className="w-6 h-6 md:w-8 md:h-8 float-anim drop-shadow-lg"
        />
      ) : (
        <span className="text-pink-400 text-xl md:text-2xl float-anim">💖</span>
      ),
      delay: 0.8,
      top: "65%",
      right: "13%",
    },
    {
      el: assets.game_one?.inkpayCard ? (
        <img
          src={assets.game_one.inkpayCard}
          alt="InkPay Card"
          className="w-14 h-10 md:w-20 md:h-12 float-anim drop-shadow-xl"
        />
      ) : (
        <span className="text-green-400 text-2xl md:text-3xl float-anim">💳</span>
      ),
      delay: 1.0,
      bottom: "5%",
      left: "50%",
      transform: "translateX(-50%)",
    },
  ];

  const kingdomImageSrc =
    assets.game_one?.kingdomPreview || "/assets/game_one/kingdom-preview.jpg";

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center w-full text-center overflow-hidden bg-black text-white"
      style={{
        height: "100dvh",
        minHeight: "100vh",
      }}
    >
      {/* --- FLOATING ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ✅ fixed: removed jsx attribute */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(3deg);
            }
          }
          .float-anim {
            animation: float 4s ease-in-out infinite;
            animation-delay: calc(var(--delay, 0s));
          }
        `}</style>

        {floatingAssets.map((asset, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: asset.delay }}
            className="absolute float-anim"
            style={{
              top: asset.top || "auto",
              bottom: asset.bottom || "auto",
              left: asset.left || "auto",
              right: asset.right || "auto",
              transform: asset.transform || "none",
              "--delay": `${(Math.random() * 2).toFixed(1)}s`,
            }}
          >
            {asset.el}
          </motion.div>
        ))}
      </div>

      {/* --- HEADLINE --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-10 text-center px-4 mt-[-18vh]"
      >
        <h1 className="text-8xl sm:text-6xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[12rem] font-extrabold leading-[0.85] tracking-[0.02em] flex flex-col items-center mx-auto">
          <span className="text-white">STEP INTO</span>
          <span className="text-white mt-[0.1em]">WORLDS MADE</span>
          <span className="text-white mt-[0.1em]">FOR YOU</span>
        </h1>
      </motion.div>

      {/* --- TILT CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10 w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] max-w-[30rem] aspect-[16/9]"
      >
        <TiltCard
          className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          tiltTransitionSpeed={0.5}
        >
          <div className="relative w-full h-full">
            <img
              src={kingdomImageSrc}
              alt="Kingdom Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent blur-[2px]" />
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
};

export default Hero;
