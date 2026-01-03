"use client"; // Ensure client-side rendering

import { useState } from "react";
import { motion } from "framer-motion";
import projects from "@/data/projectData";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="h-[85vh] flex items-center justify-center [@media(min-width:950px)]:py-[48px] py-[5.1vw] bg-gradient-to-tr from-[#292B2B] to-[#10BBB1] opacity-90 relative mt-[calc(14.2vh)]">
      {/* Carousel Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-[2%] [@media(min-width:950px)]:w-[50px] w-[5.3125vw]"
      >
        <img
              src="chevron-left.png"
              alt="Previous"
              className="w-full h-auto cursor-pointer hover:scale-110 transition-transform"
            />
      </button>
      
      {/* Project Display */}
      <div className="flex w-[80%] [@media(min-width:950px)]:w-[1152px] w-[122.4vw] items-center">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <p className="ml-[5vw] md:ml-[10vw] xl:ml-[2px] [@media(min-width:950px)]:text-[25px] text-[2.656vw] text-[var(--light-gray-transparent)] font-light leading-none">
            {projects[activeIndex].year}
          </p>
          <h1 className="ml-[5vw] md:ml-[10vw] xl:ml-[2px] [@media(min-width:950px)]:text-[55px] text-[5.84375vw] text-[var(--light-gray)] font-medium [text-shadow:1px_2px_1px_rgba(0,0,0,0.1)]">
            {projects[activeIndex].title}
          </h1>
          <div className="ml-[5vw] md:ml-[10vw] xl:ml-[2px] [@media(min-width:1250px)]:w-[550px] w-[70vw] [@media(min-width:950px)]:text-[23px] text-[2.44375vw] text-[var(--light-gray)] font-light [@media(min-width:950px)]:mt-[8px] mt-[0.85vw] [@media(min-width:950px)]:space-y-[14px] space-y-[1.4875vw]">
            {projects[activeIndex].description}
          </div>

        </motion.div>

        <motion.div
          key={projects[activeIndex].image}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden [@media(min-width:1250px)]:block flex-1 ml-[60px] flex justify-center"
        >
          <img src={projects[activeIndex].image} alt={projects[activeIndex].title} className="max-h-[500px] max-w-[500px] object-contain rounded-xl shadow-lg" />
        </motion.div>

        <div className="hidden [@media(min-width:1250px)]:block w-[1px] bg-[var(--light-gray)] h-[570px] self-stretch fixed right-[50vw] bottom-[10vh]"></div>
        
      </div>
      
      {/* Carousel Controls */}
      <button
        onClick={handleNext}
        className="absolute [@media(min-width:950px)]:right-[40px] right-[4.25vw] [@media(min-width:950px)]:w-[50px] w-[5.3125vw]"
      >
        <img
              src="chevron-right.png"
              alt="Previous"
              className="w-full h-auto cursor-pointer hover:scale-110 transition-transform"
            />
      </button>

      {/* Page Indicators */}
      <div className="flex [@media(min-width:950px)]:space-x-[8px] space-x-[0.85vw] [@media(min-width:950px)]:mt-[24px] mt-[2.55vw] absolute [@media(min-width:950px)]:bottom-[25px] bottom-[2.65625vw]">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`[@media(min-width:950px)]:mt-[20px] mt-[2.125vw] [@media(min-width:950px)]:w-[10px] w-[1.0625vw] [@media(min-width:950px)]:h-[10px] h-[1.0625vw] rounded-full transition-all duration-300 ${
              activeIndex === i ? "bg-[var(--accent-blue)] scale-125" : "bg-[#E1E1E180]"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
