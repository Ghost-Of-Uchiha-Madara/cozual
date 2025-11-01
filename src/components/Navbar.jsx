import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const yMotion = useMotionValue(0);
  const ySpring = useSpring(yMotion, { stiffness: 20, damping: 8 });

  // floating navbar motion
  useEffect(() => {
    let direction = 1;
    const floatInterval = setInterval(() => {
      yMotion.set(direction * 6);
      direction *= -1;
    }, 2000);
    return () => clearInterval(floatInterval);
  }, [yMotion]);

  // smooth scroll function
  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    const section = document.querySelector(`#${target}`);
    if (!section) return;

    const navbarHeight = document.querySelector("nav")?.offsetHeight - 99 || 100;
    if (smoother) {
      const y = smoother.offset(section, "top") - navbarHeight;
      smoother.scrollTo(y, true);
    } else {
      const y = section.offsetTop - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Floating Navbar */}
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

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-5 text-sm">
          {["Studio", "About", "Games", "Contact"].map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={(e) => handleSmoothScroll(e, id)}
                className={`relative group block font-medium px-3 py-1 transition-all duration-300 ease-out ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
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
          {/* Menu Icon (mobile) */}
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

      {/* Mobile Glass Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dimmed backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[999] sm:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Glass floating sidebar */}
            <motion.div
              initial={{ x: "100%", opacity: 0, rotateY: 15 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              exit={{ x: "100%", opacity: 0, rotateY: 15 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 0.6,
              }}
              className={`fixed top-0 right-0 bottom-0 w-64 z-[1000] sm:hidden
                flex flex-col justify-center items-start px-10 gap-8
                backdrop-blur-2xl shadow-2xl rounded-l-3xl border-l border-white/20
                ${
                  theme === "light"
                    ? "bg-white/20 text-black"
                    : "bg-[#0a0a0a]/60 text-white"
                }
              `}
            >
              <img
                src={assets.close_icon}
                alt="Close"
                className="w-5 absolute right-4 top-4 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                onClick={() => setSidebarOpen(false)}
              />
              {["Studio", "About", "Games", "Contact"].map((item, index) => {
                const id = item.toLowerCase();
                return (
                  <motion.a
                    key={item}
                    href={`#${id}`}
                    onClick={(e) => handleSmoothScroll(e, id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-lg font-semibold tracking-wide relative group"
                  >
                    {item}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ${
                        theme === "light" ? "bg-black" : "bg-white"
                      }`}
                    ></span>
                  </motion.a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
