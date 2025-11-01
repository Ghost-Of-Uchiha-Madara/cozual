import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const ContactUs = ({ theme }) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "d0803d60-0b6d-48ec-a680-a0a05ebc7d66");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for contacting us!");
        event.target.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const floatingAssets = [
    { el: "🪙", color: "text-yellow-400/90", size: "text-6xl", top: "12%", left: "8%", delay: 0.2 },
    { el: "💎", color: "text-cyan-400/90", size: "text-7xl", top: "18%", right: "12%", delay: 0.4 },
    { el: "💖", color: "text-pink-400/90", size: "text-6xl", bottom: "25%", left: "10%", delay: 0.6 },
    { el: "⭐", color: "text-blue-400/90", size: "text-5xl", bottom: "12%", right: "18%", delay: 0.8 },
    { el: "✨", color: "text-purple-400/80", size: "text-5xl", top: "45%", left: "45%", delay: 1.0 },
    { el: "🌙", color: "text-indigo-400/80", size: "text-6xl", bottom: "40%", right: "45%", delay: 1.2 },
  ];

  return (
    <motion.div
      id="contact"
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.2 }}
      viewport={{ once: true }}
      className="relative flex flex-col justify-center items-center gap-12 min-h-screen px-4 sm:px-12 lg:px-24 xl:px-40 py-20 overflow-hidden bg-[#000000] text-white"
    >
      {/* FLOATING ELEMENTS (Behind Form) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.9; }
            50% { transform: translateY(-15px) rotate(3deg); opacity: 1; }
          }
          .float-anim {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>

        {floatingAssets.map((a, i) => (
          <motion.span
            key={i}
            className={`absolute ${a.color} ${a.size} float-anim drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]`}
            style={{
              top: a.top || "auto",
              bottom: a.bottom || "auto",
              left: a.left || "auto",
              right: a.right || "auto",
              animationDelay: `${a.delay}s`,
              opacity: 0.8,
            }}
          >
            {a.el}
          </motion.span>
        ))}
      </div>

      {/* TITLE */}
      <Title
        title="Reach out to us"
        desc="We’d love to hear from you! Whether you have questions, feedback, or just want to say hello — your thoughts help us create better experiences for everyone."
      />

      {/* GLASS CONTACT FORM */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="relative z-10 grid sm:grid-cols-2 gap-5 max-w-2xl w-full p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl bg-white/10"
        style={{
          boxShadow: "0 8px 40px rgba(255,255,255,0.08)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div>
          <p className="mb-2 text-sm font-medium">Your name</p>
          <div className="flex items-center pl-3 rounded-lg border border-white/20 bg-white/10">
            <img src={assets.person_icon} alt="" className="w-5 opacity-80" />
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 text-sm outline-none bg-transparent text-white placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Email address</p>
          <div className="flex items-center pl-3 rounded-lg border border-white/20 bg-white/10">
            <img src={assets.email_icon} alt="" className="w-5 opacity-80" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm outline-none bg-transparent text-white placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium">Message</p>
          <textarea
            name="message"
            rows={6}
            placeholder="Enter your message"
            className="w-full p-3 text-sm outline-none rounded-lg border border-white/20 bg-white/10 resize-none text-white placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="sm:col-span-2 mx-auto flex items-center gap-2 bg-secondary text-black text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-[1.03] transition-transform duration-300 font-bold shadow-md"
        >
          Submit
          <img src={assets.arrow_icon} alt="" className="w-4 filter grayscale brightness-0" />
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;
