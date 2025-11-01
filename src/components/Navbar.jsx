import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const yMotion = useMotionValue(0);
  const ySpring = useSpring(yMotion, { stiffness: 20, damping: 8 });

  useEffect(() => {
    let direction = 1;
    const floatInterval = setInterval(() => {
      yMotion.set(direction * 6);
      direction *= -1;
    }, 2000);
    return () => clearInterval(floatInterval);
  }, [yMotion]);

  const handleSmoothScroll = (e, target) => {
  e.preventDefault();
  const smoother = ScrollSmoother.get();
  const section = document.querySelector(`#${target}`);
  if (!section) return;

  const navbarHeight = document.querySelector("nav")?.offsetHeight - 90 || 100;
  if (smoother) {
    // Use GSAP's offset method for precise internal position
    const y = smoother.offset(section, "top") - navbarHeight;
    smoother.scrollTo(y, true);
  } else {
    // fallback for when smoother isn't active
    const y = section.offsetTop - navbarHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  setSidebarOpen(false);
};


  return (
    <motion.nav
      style={{ y: ySpring }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[1000]
        w-[90%] sm:w-[80%] lg:w-[65%]
        flex justify-between items-center px-6 py-4
        backdrop-blur-3xl font-medium rounded-2xl shadow-2xl border border-white/10
        transition-all duration-300
        ${
          theme === "light"
            ? "bg-white/40 text-black"
            : "bg-[#111]/60 text-white"
        }
      `}
    >
      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_dark : assets.logo}
        className="w-28 sm:w-36 cursor-pointer select-none"
        alt="Logo"
        onClick={(e) => handleSmoothScroll(e, "studio")}
      />

      {/* Desktop & Sidebar Links */}
      <div
        className={`text-gray-700 dark:text-white sm:text-sm
          ${
            !sidebarOpen
              ? "max-sm:w-0 overflow-hidden"
              : "max-sm:w-60 max-sm:pl-10"
          }
          max-sm:fixed top-0 bottom-0 right-0 
          max-sm:min-h-screen max-sm:h-full max-sm:flex-col 
          max-sm:bg-primary max-sm:text-white max-sm:pt-20
          flex sm:items-center gap-5 transition-all duration-300 ease-in-out
        `}
      >
        <img
          src={assets.close_icon}
          alt="Close"
          className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />

        {["Studio", "About", "Games", "Contact"].map((item) => {
          const id = item.toLowerCase();
          return (
            <a
              key={item}
              href={`#${id}`}
              onClick={(e) => handleSmoothScroll(e, id)}
              className={`relative group block font-medium px-5 py-2 
                transition-all duration-300 ease-out
                ${theme === "light" ? "text-black" : "text-white"}
              `}
            >
              <span
                className={`absolute inset-0 rounded-md border opacity-0 scale-90
                  transition-all duration-300 ease-out
                  group-hover:opacity-100 group-hover:scale-100
                  ${theme === "light" ? "border-black" : "border-white"}
                `}
              />
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {item}
                </span>
                <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  {item}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />
        <img
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt="Menu"
          onClick={() => setSidebarOpen(true)}
          className="w-7 sm:hidden cursor-pointer"
        />
        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, "contact")}
          className="text-sm max-sm:hidden flex font-bold items-center gap-2 
          bg-secondary text-black px-6 py-2 rounded-full cursor-pointer 
          hover:scale-105 transition-all shadow-md"
        >
          Connect{" "}
          <img
            src={assets.arrow_icon}
            width={14}
            className="w-4 filter grayscale brightness-0"
            alt="arrow"
          />
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
