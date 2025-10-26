import React, { useState } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion, useSpring, useMotionValue } from "framer-motion";

const Navbar = ({ theme, setTheme }) => {
  const [siderbarOpen, setSidebarOpen] = useState(false);

  // Smooth floating motion using spring
  const yMotion = useMotionValue(0);
  const ySpring = useSpring(yMotion, { stiffness: 20, damping: 8 });
  React.useEffect(() => {
    let direction = 1;
    const floatInterval = setInterval(() => {
      yMotion.set(direction * 6);
      direction *= -1;
    }, 2000);
    return () => clearInterval(floatInterval);
  }, [yMotion]);

  return (
    <motion.div
      style={{ y: ySpring }}
      className={`w-[65%] mx-auto flex justify-between items-center px-6 py-4 
        sticky top-4 z-50 backdrop-blur-3xl font-medium rounded-2xl
        ${theme === "light" ? "bg-white/40" : "bg-secondary/50 "} shadow-xl`}
    >
      <img
        src={theme === "dark" ? assets.logo_dark : assets.logo}
        className="w-32 sm:w-40"
        alt="Logo"
      />

      {/* Sidebar / nav links */}
      <div
        className={`text-gray-700 dark:text-white sm:text-sm ${
          !siderbarOpen
            ? "max-sm:w-0 overflow-hidden"
            : "max-sm:w-60 max-sm:pl-10"
        } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt="Close"
          className="w-5 absolute right-4 top-4 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />

        {["Studio", "About", "Games", "Contact"].map((item) => (
          <a
            key={item}
            onClick={() => setSidebarOpen(false)}
            href={`#${item.toLowerCase()}`}
            className={`relative group block font-medium px-5 py-2 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
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
                {item}
              </span>
              <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                {item}
              </span>
            </span>
          </a>
        ))}
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt="Menu"
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden"
        />

        <a
          href="#contact"
          className="text-sm max-sm:hidden flex font-bold items-center gap-2 bg-secondary text-black px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Connect <img src={assets.arrow_icon} width={14} className="w-4 filter grayscale brightness-0" />
        </a>
      </div>
    </motion.div>
  );
};

export default Navbar;
