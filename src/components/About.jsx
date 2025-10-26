import React from "react";
import assets from "../assets/assets";
import Title from "./Title";
import AboutCard from "./AboutCard";
import { motion } from "motion/react";

const About = () => {
  const aboutData = [
    {
      title: "Our Mission",
      description:
        "At Cozual, we craft immersive, joy-filled gaming adventures that captivate players worldwide.",
      icon: assets.our_mission_icon,
    },
    {
      title: "Our Story",
      description:
        "Founded in 2025, Cozual started as a tight-knit crew of gamers and developers dreaming up unique gaming experiences.",
      icon: assets.story_icon,
    },
    {
      title: "Game Genre",
      description:
        "We create casual games that are a breeze to jump into, packed with depth and replayability.",
      icon: assets.casual_icon,
    },
    {
      title: "Game Theme",
      description:
        "Cozual games wrap you in warm, inviting themes with charming characters and beautiful, relaxing worlds.",
      icon: assets.cozy_icon,
    },
  ];

  return (
    <motion.div
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      className="relative flex flex-col justify-center items-center gap-12 min-h-screen px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-700 dark:text-white bg-white dark:bg-black overflow-hidden"
    >
      {/* Background image */}
      <img
        src={assets.bgImage2}
        alt=""
        className="absolute -top-40 -left-40 sm:-top-60 sm:-left-60 -z-10 dark:hidden opacity-60"
      />

      {/* Title section */}
      <Title
        title="What is Cozual?"
        desc="Hey friend! Our cozy game studio crafts warm, inviting worlds just for you. Kick back and jump into chill adventures made to spark joy."
      />

      {/* Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {aboutData.map((about, index) => (
          <AboutCard key={index} about={about} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default About;
