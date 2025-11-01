import React from "react";
import assets from "../assets/assets";
import { motion } from "motion/react";

const Footer = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-secondary/40 pt-10 sm:pt-10 px-4 sm:px-10 lg:px-24 xl:px-40 overflow-x-hidden"
    >
      {/* footer top */}
      <div className="flex justify-between lg:items-center max-lg:flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5 text-sm text-gray-700 dark:text-gray-400"
        >
          <img
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            className="w-32 sm:w-44"
            alt="Cozual Studio Logo"
          />
          <p className="max-w-md">
            Dive into cozy, inviting worlds with simple yet captivating
            gameplay. Each title offers fun, relaxing adventures for players of
            all ages.
          </p>

          <ul className="flex gap-8 flex-wrap">
            <li>
              <a className="hover:text-primary transition-colors" href="#studio">
                Studio
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#games">
                Games
              </a>
            </li>
            <li>
              <a
                className="hover:text-primary transition-colors"
                href="#contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400"
        >
          <h3 className="font-semibold">Subscribe to our newsletter</h3>
          <p className="text-sm mt-2 mb-6">
            Sign up for fun news and exclusive sneak peeks delivered to your
            inbox.
          </p>
          <div className="flex gap-2 text-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm outline-none rounded dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-500"
            />
            <button className="bg-primary text-white rounded px-6 hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-300 dark:border-gray-600 my-6" />

      {/* footer bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap"
      >
        <p>Copyright 2025 © Cozual Studio - All Rights Reserved</p>
        <div className="flex items-center justify-between gap-4">
          <img src={assets.facebook_icon} alt="Facebook" />
          <img src={assets.twitter_icon} alt="Twitter" />
          <img src={assets.instagram_icon} alt="Instagram" />
          <img src={assets.linkedin_icon} alt="LinkedIn" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
