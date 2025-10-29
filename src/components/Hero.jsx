import React from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion";          // <-- correct import
import TiltCard from "./TiltCard";

const Hero = () => {
  return (
    /* --------------------------------------------------------------
       1. Full-screen wrapper – 100vh on desktop, min-h-screen on mobile
       -------------------------------------------------------------- */
    <section
      id="studio"
      className={`
        flex flex-col justify-center items-center gap-6
        /* desktop → full viewport height */
        md:h-screen
        /* mobile → keep the original min-height */
        min-h-screen
        px-4 sm:px-12 lg:px-24 xl:px-40
        text-center w-full
        overflow-hidden
        text-gray-700 dark:text-white
        relative
      `}
    >
      {/* --------------------------------------------------------------
         2. Title – same animation, responsive font sizes
         -------------------------------------------------------------- */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className={`
          text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[184px]
          xl:leading-[155px] max-w-5xl
        `}
      >
        STEP INTO{" "}
        <span className="bg-gradient-to-r from-secondary/90 to-secondary bg-clip-text text-transparent">
          WORLDS
        </span>{" "}
        MADE FOR YOU
      </motion.h1>

      {/* --------------------------------------------------------------
         3. TiltCard + decorative background image
         -------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="relative mt-6"
      >
        <TiltCard />
      </motion.div>
    </section>
  );
};

export default Hero;