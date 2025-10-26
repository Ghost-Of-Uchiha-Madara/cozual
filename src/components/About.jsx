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
      description: `We create casual games that are a breeze to jump into, packed with depth and replayability.`,
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="about"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <img
        src={assets.bgImage2}
        alt=""
        className="absolute -top-110 -left-70 -z-1 dark-hidden"
      />

      <Title
        title="What is Cozual?"
        desc="Hey friend! Our cozy game studio crafts warm, inviting worlds just for you.
            Kick back and jump into chill adventures made to spark joy."
      />

      <div className="flex flex-col md:grid grid-cols-2">
        {aboutData.map((about, index) => (
          <AboutCard key={index} about={about} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default About;
