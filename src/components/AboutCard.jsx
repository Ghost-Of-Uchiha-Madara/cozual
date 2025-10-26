import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const AboutCard = ({ about, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const diveRef = useRef(null);
  const handleMouseMove = (e) => {
    const bounds = diveRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.4 }}
      viewport={{ once: true }}
      className="relative flex overflow-hidden max-w-lg m-2 sm:m-4 rounded-xl border border-gray-200 dark:border-secondary/50 shadow-2x1 shdow-gray-100 dark:shadow-white/10"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={diveRef}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`pointer-events-none blur-2xl rounded-full bg-linear-to-r from-sec-bright via-sec-light to-sec-mild w-[300px] h-[300px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${
          visible ? "opacity-70" : "opacity-0"
        }`}
        style={{ top: position.y - 150, left: position.x - 150 }}
      />

      <div className="flex items-center gap-10 p-8 hover:p-7.5 hover:m-0.5 transition-all rounded-[10px] bg-white dark:bg-secondary/20 z-10 relative">
        <div className="bg-gray-100 dark:bg-green-800 rounded-full">
          <img
            src={about.icon}
            alt=""
            className="max-w-24 bg-white dark:bg-sec-soft rounded-full m-2"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-secondary">{about.title}</h3>
          <p className="text-sm mt-2">{about.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutCard;
