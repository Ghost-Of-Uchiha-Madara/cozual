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
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.2 }}
      viewport={{ once: true }}
      id="games"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Games"
        desc="Dive into cozy, inviting worlds with simple yet captivating gameplay.
        Each title offers fun, relaxing adventures for players of all ages."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {gameData.map((game, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="hover:scale-102 duration-500 transition-all cursor-pointer"
          >
            <img src={game.image} className="w-full rounded-xl" />
            <h3 className="mt-3 mb-2 text-lg font-semibold">{game.title}</h3>
            <p className="text-sm opacity-60 w-5/6">{game.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Games;
