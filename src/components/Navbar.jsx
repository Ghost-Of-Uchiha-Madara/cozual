import React, { useState } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "motion/react"

const Navbar = ({ theme, setTheme }) => {
  const [siderbarOpen, setSidebarOpen] = useState(false);

  return (
    <motion.div 

      initial={{opacity:0, y:-50}}
      animate={{opacity:1, y:0}}
      transition={{duration: 0.6, ease: 'easeOut'}}

      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20
    backdrop-blur-xl font-medium bg-white/50 dark:bg-black"
    >
      <img
        src={theme === "dark" ? assets.logo_dark : assets.logo}
        className="w-32 sm:w-40"
        alt=""
      />

      <div
        className={`text-gray-700 dark:text-white sm:text-sm ${
          !siderbarOpen
            ? "max-sm:w-0 overflow-hidden"
            : "max-sm:w-60 max-sm:pl-10"
        } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />

        <a
          onClick={() => setSidebarOpen(false)}
          href="#studio"
          className={`relative group block font-medium px-5 py-2 
          ${theme === "light" ? "text-black" : "text-white"}`}
        >
          <span
            className={`absolute inset-0 rounded-md border opacity-0 scale-90
                transition-all duration-300 ease-out
                group-hover:opacity-100 group-hover:scale-100 
                ${theme === "light" ? "border-black" : "border-white"}`}
            aria-hidden="true"
          ></span>

          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              Studio
            </span>
            <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Studio
            </span>
          </span>
        </a>

        <a
          onClick={() => setSidebarOpen(false)}
          href="#about"
          className={`relative group block font-medium px-5 py-2 
          ${theme === "light" ? "text-black" : "text-white"}`}
        >
          <span
            className={`absolute inset-0 rounded-md border opacity-0 scale-90
                transition-all duration-300 ease-out
                group-hover:opacity-100 group-hover:scale-100 
                ${theme === "light" ? "border-black" : "border-white"}`}
            aria-hidden="true"
          ></span>

          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              About
            </span>
            <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              About
            </span>
          </span>
        </a>

        <a
          onClick={() => setSidebarOpen(false)}
          href="#games"
          className={`relative group block font-medium px-5 py-2 
          ${theme === "light" ? "text-black" : "text-white"}`}
        >
          <span
            className={`absolute inset-0 rounded-md border opacity-0 scale-90
                transition-all duration-300 ease-out
                group-hover:opacity-100 group-hover:scale-100 
                ${theme === "light" ? "border-black" : "border-white"}`}
            aria-hidden="true"
          ></span>

          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              Games
            </span>
            <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Games
            </span>
          </span>
        </a>

        <a
          onClick={() => setSidebarOpen(false)}
          href="#contact"
          className={`relative group block font-medium px-5 py-2 
          ${theme === "light" ? "text-black" : "text-white"}`}
        >
          <span
            className={`absolute inset-0 rounded-md border opacity-0 scale-90
                transition-all duration-300 ease-out
                group-hover:opacity-100 group-hover:scale-100 
                ${theme === "light" ? "border-black" : "border-white"}`}
            aria-hidden="true"
          ></span>

          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              Contact
            </span>
            <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              Contact
            </span>
          </span>
        </a>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme == "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt=""
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden"
        />

        <a
          href="#contact"
          className="text-sm max-sm:hidden flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Connect <img src={assets.arrow_icon} width={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default Navbar;
