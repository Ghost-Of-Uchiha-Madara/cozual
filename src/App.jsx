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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  // ✅ Scroll smoother setup
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });
    return () => smoother.kill();
  }, []);

  // ✅ Detect touch devices
  useEffect(() => {
    const checkTouch = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(checkTouch());
  }, []);

  // ✅ Custom cursor (desktop only)
  useEffect(() => {
    if (isTouchDevice) return;

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let cursorVisible = false;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // ✨ Fade in cursor on first movement
      if (!cursorVisible) {
        cursorVisible = true;
        gsap.to([dotRef.current, outlineRef.current], {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
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
  }, [isTouchDevice]);

  return (
    <div className="dark:bg-black relative">
      <Toaster />

      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Scroll content */}
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

      {/* ✅ Cursor only on desktop */}
      {!isTouchDevice && (
        <>
          {/* Outline */}
          <div
            ref={outlineRef}
            className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary dark:border-white pointer-events-none z-[9999]"
            style={{
              opacity: 0,
              transition: "transform 0.1s ease-out",
            }}
          />

          {/* Dot */}
          <div
            ref={dotRef}
            className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primary dark:bg-white pointer-events-none z-[9999]"
            style={{ opacity: 0 }}
          />
        </>
      )}
    </div>
  );
};

export default App;
