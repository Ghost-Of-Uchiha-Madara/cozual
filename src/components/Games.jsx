import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import { motion } from "motion/react";

const Games = () => {
  const gameData = [
    {
      title: "Game One",
      description:
        "An exciting adventure game that takes you through magical lands.",
      image: assets.game_one,
    },
    {
      title: "Game Two",
      description: "A relaxing puzzle game to unwind and challenge your mind.",
      image: assets.game_two,
    },
    {
      title: "Game Three",
      description:
        "A fun-filled platformer with vibrant graphics and engaging gameplay.",
      image: assets.game_three,
    },
  ];

  return (
    <motion.div
      id="games"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      className="relative flex flex-col justify-center items-center gap-12 min-h-screen px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-700 dark:text-white bg-white dark:bg-black overflow-hidden"
    >
      {/* Background image (optional, remove if not needed) */}
      <img
        src={assets.bgImage3}
        alt=""
        className="absolute -top-40 -right-40 sm:-top-60 sm:-right-60 -z-10 opacity-50 dark:hidden"
      />

      {/* Section title */}
      <Title
        title="Games"
        desc="Dive into cozy, inviting worlds with simple yet captivating gameplay.
        Each title offers fun, relaxing adventures for players of all ages."
      />

      {/* Game cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {gameData.map((game, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="hover:scale-[1.03] transition-transform duration-500 cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl shadow-md">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h3 className="mt-4 mb-2 text-lg font-semibold">{game.title}</h3>
            <p className="text-sm opacity-70 w-5/6 mx-auto">{game.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Games;
