import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import hero2 from "../assets/hero2.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! (Demo)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      className="bg-white min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />

      <motion.div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${hero2})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

        <div className="relative text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Have questions about scholarships or our AI system? We’re here to help.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <h2 className="text-2xl font-bold text-[#0080FF] mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0080FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Send Message
            </button>

          </form>
        </motion.div>

        <motion.div variants={item}>
          <h2 className="text-2xl font-bold text-[#0080FF] mb-6">
            Contact Information
          </h2>

          <div className="space-y-6 text-gray-700">

            <div>
              <h4 className="font-semibold">Email</h4>
              <p>support@scholarai.com</p>
            </div>

            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>+91 99999 99999</p>
            </div>

            <div>
              <h4 className="font-semibold">Address</h4>
              <p>
                ScholarAI Headquarters<br />
                Patiala, India
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Working Hours</h4>
              <p>Monday – Friday: 9 AM – 6 PM</p>
            </div>

          </div>

          <div className="mt-10">
            <h4 className="font-semibold mb-4 text-[#0080FF]">
              Connect With Us
            </h4>
            <div className="flex space-x-6 text-[#0080FF] font-medium">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
            </div>
          </div>

        </motion.div>
      </motion.div>

      <Footer />
    </motion.div>
  );
}