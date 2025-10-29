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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // ✅ Pinning section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom+=100% top",
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
      });

      // ✅ Text fade in
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
            start: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ✅ Floating + Parallax for each card
      floatingCards.forEach((card, i) => {
        const wrapper = document.getElementById(`card-wrap-${i}`);
        const img = document.getElementById(`card-${i}`);
        if (!wrapper || !img) return;

        gsap.set(wrapper, { willChange: "transform", force3D: true });
        gsap.set(img, { willChange: "transform", force3D: true });

        // 🔹 Scroll-based parallax on wrapper
        gsap.to(wrapper, {
          y: i % 2 === 0 ? 150 : -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom+=100% top",
            scrub: true,
          },
        });

        // 🔹 Fade in
        gsap.fromTo(
          wrapper,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: card.delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 🔹 Infinite idle float animation on img
        const floatY = 15 + Math.random() * 10;
        const floatX = (Math.random() - 0.5) * 20;
        const duration = 3 + Math.random() * 2;

        gsap.to(img, {
          y: `+=${floatY}`,
          x: `+=${floatX}`,
          duration,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // 🔹 Hover tilt on img
        const handleMouseMove = (e) => {
          const rect = img.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const tiltX = (y / rect.height) * 25;
          const tiltY = -(x / rect.width) * 25;

          gsap.to(img, {
            rotationX: tiltX,
            rotationY: tiltY,
            z: 40,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(img, {
            rotationX: 0,
            rotationY: 0,
            z: 0,
            scale: 1,
            rotation: card.rotate,
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
        overflow-hidden bg-primary text-white
      "
      style={{
        perspective: "1200px",
        transform: "translateZ(0)",
      }}
    >
      {/* Floating Card Wrappers */}
      {floatingCards.map((card, i) => (
        <div
          key={i}
          id={`card-wrap-${i}`}
          className={`
            absolute
            ${card.position === "top-left" ? "top-[8%] left-[5%]" : ""}
            ${card.position === "top-right" ? "top-[8%] right-[5%]" : ""}
            ${card.position === "bottom-left" ? "bottom-[8%] left-[5%]" : ""}
            ${card.position === "bottom-right" ? "bottom-[8%] right-[5%]" : ""}
          `}
        >
          <img
            id={`card-${i}`}
            src={card.src}
            alt=""
            className="w-32 sm:w-40 md:w-48 lg:w-56 object-contain drop-shadow-2xl select-none origin-center pointer-events-auto"
            style={{
              transform: `rotate(${card.rotate}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      ))}

      {/* Text Content */}
      <div
        ref={titleRef}
        className="relative z-10 text-center space-y-6 max-w-5xl mx-auto"
        style={{ willChange: "transform, opacity" }}
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
            transition-shadow duration-300
          "
        >
          Explore
        </button>
      </div>
    </section>
  );
};

export default About;
