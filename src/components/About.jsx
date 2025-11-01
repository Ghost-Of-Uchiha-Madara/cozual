import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import assets from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const floatingCards = [
  { src: assets.game_one, rotate: -12, delay: 0.2, position: "top-left" },
  { src: assets.game_one, rotate: 8, delay: 0.3, position: "top-right" },
  { src: assets.game_one, rotate: -6, delay: 0.4, position: "bottom-left" },
  { src: assets.game_one, rotate: 10, delay: 0.5, position: "bottom-right" },
];

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const wrapperRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✨ Text fade in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 🎴 Animate floating cards
      cardRefs.current.forEach((img, i) => {
        const wrapper = wrapperRefs.current[i];
        if (!img || !wrapper) return;

        // 👁️ Make sure each image supports 3D tilt
        gsap.set(img, { transformPerspective: 1000, transformStyle: "preserve-3d" });

        // 🌊 Idle floating motion
        gsap.to(img, {
          y: `+=${10 + Math.random() * 15}`,
          x: `+=${(Math.random() - 0.5) * 20}`,
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // 📜 Scroll parallax
        gsap.to(wrapper, {
          y: i % 2 === 0 ? 120 : -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        // 🌟 Fade in + scale up
        gsap.fromTo(
          wrapper,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            delay: floatingCards[i].delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 🖱️ Tilt interaction
        const handleMouseMove = (e) => {
          const rect = img.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const tiltX = (y / rect.height) * 12;
          const tiltY = -(x / rect.width) * 12;

          gsap.to(img, {
            rotationX: tiltX,
            rotationY: tiltY,
            rotationZ: floatingCards[i].rotate, // keeps base tilt
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(img, {
            rotationX: 0,
            rotationY: 0,
            rotationZ: floatingCards[i].rotate,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseleave", handleMouseLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative flex flex-col justify-center items-center
        md:h-screen min-h-screen
        px-4 sm:px-12 lg:px-24 xl:px-40
        overflow-hidden bg-black text-white
      "
      style={{
        perspective: "1200px",
        transform: "translateZ(0)",
      }}
    >
      {/* Floating Cards */}
      {floatingCards.map((card, i) => (
        <div
          key={i}
          ref={(el) => (wrapperRefs.current[i] = el)}
          className={`
            absolute
            ${card.position === "top-left" ? "top-[8%] left-[5%]" : ""}
            ${card.position === "top-right" ? "top-[8%] right-[5%]" : ""}
            ${card.position === "bottom-left" ? "bottom-[8%] left-[5%]" : ""}
            ${card.position === "bottom-right" ? "bottom-[8%] right-[5%]" : ""}
          `}
        >
          <img
            ref={(el) => (cardRefs.current[i] = el)}
            src={card.src}
            alt=""
            className="w-32 sm:w-40 md:w-48 lg:w-56 object-contain drop-shadow-2xl select-none origin-center pointer-events-auto"
            style={{
              transform: `rotate(${card.rotate}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.4s ease-out",
            }}
          />
        </div>
      ))}

      {/* Text Section */}
      <div
        ref={titleRef}
        className="relative z-10 text-center space-y-6 max-w-5xl mx-auto"
      >
        <p className="text-xs tracking-widest uppercase opacity-70">• COZUAL</p>
        <h1
          className="
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
            leading-none font-bold
          "
        >
          EXPLORE THE WORLD <br />
          OF <span className="text-sec-bright">COZY</span> KINGDOMS
        </h1>
        <button
          className="
            mt-8 px-8 py-3 bg-sec-bright text-primary
            font-semibold uppercase tracking-wider rounded-full
            shadow-lg hover:shadow-sec-bright/70
            transition-all duration-300 hover:scale-105
          "
        >
          Explore
        </button>
      </div>
    </section>
  );
};

export default About;
