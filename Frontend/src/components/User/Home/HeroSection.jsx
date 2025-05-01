import React, { useState, useEffect } from "react";
import banner2 from "../../../assets/banner2.avif";
import banner1 from "../../../assets/banner1.avif";
import { motion, AnimatePresence } from "framer-motion";
export default function HeroSection() {
  const banners = [banner1, banner2];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col">
      <section className=" text-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={banners[index]}
            alt="Banner"
            className="absolute w-full h-full object-cover shadow-lg"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>{" "}
        <div
          style={{ fontFamily: "'Fraunces', serif" }}
          className="text-3xl  mt-4"
        >
          IT không bị Deadline dí
        </div>
        <div
          style={{ fontFamily: "'Fraunces', serif" }}
          className="text-3xl  mt-2"
        >
          Code nhanh như cưỡi ngựa phi
        </div>
      </section>
    </div>
  );
}
