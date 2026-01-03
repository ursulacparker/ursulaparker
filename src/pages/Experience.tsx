"use client"; // Ensure client-side rendering

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import experiences from "@/data/experienceData";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <section id="timeline-container" className="flex flex-col items-center py-12 bg-gradient-to-tr from-[#292B2B] to-[#10BBB1] opacity-90 relative overflow-x-hidden max-w-full">
      <h1 className="[@media(min-width:950px)]:mt-[90px] mt-[9.5625vw] [@media(min-width:950px)]:text-[60px] text-[6.375vw] text-white font-semibold mb-8 [text-shadow:1px_2px_1px_rgba(0,0,0,0.2)]">My Experience</h1>
      <hr className="[@media(min-width:950px)]:border-t-[1px] border-t-[0.10625vw] border-[var(--accent-blue)] w-[80vw] mb-8 drop-shadow-l" />

      <div className="relative [@media(min-width:950px)]:w-[896px] w-[95.2vw] [@media(min-width:950px)]:ml-[150px] ml-[15.9375vw]">
        <div className="absolute [@media(min-width:950px)]:left-[142px] left-[25vw] transform h-full w-[0.31875vw] bg-[var(--light-gray)] z-[-1]"></div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => { if (el) itemRefs.current[index] = el; }}
            className="flex items-start [@media(min-width:950px)]:mb-[20px] mb-[2.125vw] cursor-pointer [@media(min-width:950px)]:pt-[15px] pt-[1.59375vw]"
            onClick={() => handleClick(index)}
          >
            <div className="flex flex-col items-end [@media(min-width:950px)]:w-[200px] w-[21.25vw] [@media(min-width:950px)]:ml-[-150px] ml-[-6vw] [@media(min-width:950px)]:mr-[20px] mr-[2vw]">
              <p className={`[@media(min-width:950px)]:text-[35px] text-[3.71875vw] text-right [@media(min-width:950px)]:translate-x-[0vw] translate-x-[4vw] ${index === activeIndex ? "text-[var(--accent-blue)]" : "text-[var(--light-gray)]"} font-medium`}>
                {exp.startDate}
              </p>
              {index === activeIndex && exp.endDate && (
                <p className="[@media(min-width:950px)]:text-[20px] text-[2.125vw] [@media(min-width:950px)]:translate-x-[0vw] translate-x-[3.5vw] font-normal text-[var(--light-gray)] [@media(min-width:950px)]:mt-[2px] mt-[0.2125vw] transition-opacity duration-300 ease-in-out">
                  - {exp.endDate}
                </p>
              )}
            </div>

            <div className={`rounded-full flex items-center justify-center ${index === activeIndex ? "bg-[var(--accent-blue)] [@media(min-width:950px)]:w-[50px] w-[5.3125vw] [@media(min-width:950px)]:h-[50px] h-[5.3125vw] [@media(min-width:950px)]:ml-[49px] ml-[5.20625vw]" : "bg-[var(--light-gray)] [@media(min-width:950px)]:w-[40px] w-[4.25vw] [@media(min-width:950px)]:h-[40px] h-[4.25vw] [@media(min-width:950px)]:ml-[53px] ml-[5.63125vw]"}`}>
              <img src={exp.logo} alt={`${exp.title} logo`} className={`object-contain ${index === activeIndex ? "[@media(min-width:950px)]:w-[40px] w-[4.25vw] [@media(min-width:950px)]:h-[40px] h-[4.25vw]" : "[@media(min-width:950px)]:w-[30px] w-[3.1875vw] [@media(min-width:950px)]:h-[30px] h-[3.1875vw]"}`} />
            </div>

            <motion.div
              className="flex-1 [@media(min-width:950px)]:pl-[40px] pl-[4.25vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="[@media(min-width:950px)]:text-[30px] text-[3.1875vw] text-[var(--light-gray)] font-semibold [@media(min-width:950px)]:mt-[2px] mt-[0.2125vw]">
                {exp.title}
              </h2>
              {index === activeIndex && exp.description && (
                <p className="[@media(min-width:950px)]:w-[620px] w-[60vw] [@media(min-width:950px)]:text-[18px] text-[1.9125vw] text-[var(--light-gray)] font-light [@media(min-width:950px)]:mt-[8px] mt-[0.85vw] [@media(min-width:950px)]:mb-[10px] mb-[1.0625vw]">
                  {exp.description}
                </p>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
