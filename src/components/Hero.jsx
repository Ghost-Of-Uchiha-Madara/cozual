import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import assets from "../assets/assets";

const Hero = () => {
  const floatingAssets = [
    { el: assets.game_one?.coinDollar ? (
        <img src={assets.game_one.coinDollar} alt="Gold Coin $" className="w-10 h-10 md:w-14 md:h-14 float-anim drop-shadow-2xl" />
      ) : (<span className="text-yellow-400 text-3xl md:text-5xl float-anim">🪙</span>),
      delay: 0.1, top: "20%", left: "5%" 
    },
    { el: assets.game_one?.crateRed ? (
        <img src={assets.game_one.crateRed} alt="Red Crate" className="w-8 h-8 md:w-12 md:h-12 float-anim drop-shadow-xl" />
      ) : (<span className="text-red-500 text-2xl md:text-4xl float-anim">📦</span>),
      delay: 0.3, top: "40%", left: "8%" 
    },
    { el: assets.game_one?.globeYellow ? (
        <img src={assets.game_one.globeYellow} alt="Yellow Globe" className="w-12 h-12 md:w-16 md:h-16 float-anim drop-shadow-2xl" />
      ) : (<span className="text-yellow-400 text-4xl md:text-6xl float-anim">🌍</span>),
      delay: 0.5, top: "60%", left: "3%" 
    },
    { el: assets.game_one?.bunnyPink ? (
        <img src={assets.game_one.bunnyPink} alt="Pink Bunny" className="w-8 h-8 md:w-10 md:h-10 float-anim drop-shadow-lg" />
      ) : (<span className="text-pink-400 text-2xl md:text-3xl float-anim">🐰</span>),
      delay: 0.7, top: "75%", left: "12%" 
    },
    { el: assets.game_one?.coinGold ? (
        <img src={assets.game_one.coinGold} alt="Gold Coin" className="w-10 h-10 md:w-14 md:h-14 float-anim drop-shadow-2xl" />
      ) : (<span className="text-yellow-400 text-3xl md:text-5xl float-anim">🪙</span>),
      delay: 0.2, top: "10%", right: "15%" 
    },
    { el: assets.game_one?.gemHexPurple ? (
        <img src={assets.game_one.gemHexPurple} alt="Purple Gem" className="w-6 h-6 md:w-8 md:h-8 float-anim drop-shadow-lg" />
      ) : (<span className="text-purple-400 text-xl md:text-2xl float-anim">💎</span>),
      delay: 0.4, top: "25%", right: "5%" 
    },
    { el: assets.game_one?.archerBlue ? (
        <img src={assets.game_one.archerBlue} alt="Blue Archer" className="w-12 h-12 md:w-16 md:h-16 float-anim drop-shadow-2xl" />
      ) : (<span className="text-cyan-400 text-4xl md:text-6xl float-anim">🏹</span>),
      delay: 0.6, top: "35%", right: "10%" 
    },
    { el: assets.game_one?.gemHexPurple2 ? (
        <img src={assets.game_one.gemHexPurple2} alt="Purple Gem 2" className="w-6 h-6 md:w-8 md:h-8 float-anim drop-shadow-lg" />
      ) : (<span className="text-purple-400 text-xl md:text-2xl float-anim">💎</span>),
      delay: 0.8, top: "50%", right: "8%" 
    },
    { el: assets.game_one?.heartPink ? (
        <img src={assets.game_one.heartPink} alt="Pink Heart" className="w-6 h-6 md:w-8 md:h-8 float-anim drop-shadow-lg" />
      ) : (<span className="text-pink-400 text-xl md:text-2xl float-anim">💖</span>),
      delay: 1.0, top: "65%", right: "12%" 
    },
    { el: assets.game_one?.coinGold2 ? (
        <img src={assets.game_one.coinGold2} alt="Gold Coin 2" className="w-10 h-10 md:w-14 md:h-14 float-anim drop-shadow-2xl" />
      ) : (<span className="text-yellow-400 text-3xl md:text-5xl float-anim">🪙</span>),
      delay: 0.9, top: "80%", right: "20%" 
    },
    { el: assets.game_one?.inkpayCard ? (
        <img src={assets.game_one.inkpayCard} alt="InkPay Card" className="w-16 h-10 md:w-20 md:h-12 float-anim drop-shadow-xl" />
      ) : (<span className="text-green-400 text-2xl md:text-3xl float-anim">💳</span>),
      delay: 1.1, top: "85%", left: "50%", transform: "translateX(-50%)" 
    }
  ];

  const kingdomImageSrc = assets.game_one?.kingdomPreview || '/assets/game_one/kingdom-preview.jpg';

  return (
    <section
      id="studio"
      className="relative flex flex-col justify-center items-center w-full text-center overflow-hidden bg-black text-white"
      style={{
        height: "100dvh", // ✅ ensures true viewport height on all devices (Mac, PC, iOS)
        minHeight: "100vh",
      }}
    >
      {/* Floating Assets */}
      <div className="absolute inset-0 pointer-events-none">
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          .float-anim { 
            animation: float 4s ease-in-out infinite; 
            animation-delay: calc(var(--delay, 0s));
          }
        `}</style>

        {floatingAssets.map((asset, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: asset.delay }}
            className="absolute float-anim"
            style={{ 
              top: asset.top || 'auto',
              left: asset.left || 'auto',
              right: asset.right || 'auto',
              transform: asset.transform || 'none',
              '--delay': `${(Math.random() * 2).toFixed(1)}s`
            }}
          >
            {asset.el}
          </motion.div>
        ))}
      </div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: -10 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-10 max-w-4xl w-full text-center"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] font-bold leading-none tracking-tight flex flex-col items-center mx-auto">
          <span className="text-white">JOIN THE</span>
          <span className="text-white mt-[-5px] sm:mt-[-8px] md:mt-[-12px]">NEW ERA OF</span>
          <span className="text-white mt-[-5px] sm:mt-[-8px] md:mt-[-15px]">GAMING</span>
        </h1>
      </motion.div>

      {/* Tilt Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: true }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[80vw] max-w-[28rem] aspect-[16/9] md:w-[70vw] lg:w-[50vw] mx-auto top-[58%]" // ✅ aspect ratio keeps card consistent across screens
      >
        <TiltCard
          className="w-full h-full rounded-lg overflow-hidden shadow-2xl"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent blur-sm" />
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
};

export default Hero;
