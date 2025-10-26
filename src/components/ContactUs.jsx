import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const ContactUs = () => {
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

  return (
    <motion.div
      id="contact"
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.2 }}
      viewport={{ once: true }}
      className="relative flex flex-col justify-center items-center gap-12 min-h-screen px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-700 dark:text-white bg-white dark:bg-black overflow-hidden"
    >
      {/* Background element (optional) */}
      <img
        src={assets.bgImage4}
        alt=""
        className="absolute -bottom-40 -left-40 sm:-bottom-60 sm:-left-60 -z-10 opacity-40 dark:hidden"
      />

      {/* Title section */}
      <Title
        title="Reach out to us"
        desc="We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out. Your thoughts help us create better experiences for everyone."
      />

      {/* Contact form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="grid sm:grid-cols-2 gap-5 max-w-2xl w-full bg-white/10 dark:bg-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-md"
      >
        <div>
          <p className="mb-2 text-sm font-medium">Your name</p>
          <div className="flex items-center pl-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/20 dark:bg-black/20">
            <img src={assets.person_icon} alt="" className="w-5 opacity-80" />
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 text-sm outline-none bg-transparent"
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Email address</p>
          <div className="flex items-center pl-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/20 dark:bg-black/20">
            <img src={assets.email_icon} alt="" className="w-5 opacity-80" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm outline-none bg-transparent"
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
            className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white/20 dark:bg-black/20 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="sm:col-span-2 mx-auto flex items-center gap-2 bg-[#4d8cea] text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-[1.03] transition-transform duration-300"
        >
          Submit
          <img src={assets.arrow_icon} alt="" className="w-4" />
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;
