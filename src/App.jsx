import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Games from "./components/Games";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollSmoother);

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });
    return () => smoother.kill();
  }, []);

  // Custom cursor
  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.1;
      pos.y += (mouse.y - pos.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x - 6}px, ${
          mouse.y - 6
        }px, 0)`;
        outlineRef.current.style.transform = `translate3d(${pos.x - 20}px, ${
          pos.y - 20
        }px, 0)`;
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="dark:bg-black relative">
      <Toaster />

      {/* 🧷 Navbar OUTSIDE ScrollSmoother → stays fixed forever */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* ✅ ScrollSmoother content */}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <section id="studio">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="games">
            <Games />
          </section>

          <section id="contact">
            <ContactUs />
          </section>

          <Footer theme={theme} />
        </div>
      </div>

      {/* Cursor outline */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary dark:border-white pointer-events-none z-[9999]"
        style={{ transition: "transform 0.1s ease-out" }}
      />

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primary dark:bg-white pointer-events-none z-[9999]"
      />
    </div>
  );
};

export default App;
