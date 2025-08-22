"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function MyStory({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const pages = [
    <>
      I’ve always been <span className="font-semibold">curious</span> about the world, constantly googling or creating something.
      But it wasn’t until 12, when I learned Java to code my own
      <span className="font-semibold"> Minecraft mod</span>, that I discovered I 
      <span className="font-semibold"> truly loved code</span>.
    </>,
    <>
      In 10th grade, I learned <span className="font-semibold">Swift</span> by following Youtube tutorials
      and released my first app to the <span className="font-semibold">Apple App Store</span>.
      I also created a basic project board with <span className="font-semibold">"sprints"</span> before I even knew what Scrum was.
    </>,
    <>
      In 11th grade, I discovered <span className="font-semibold">web dev</span>, with full-stack development
      and UI creation using tools like <span className="font-semibold">Figma</span>. My curiosity led me to
      <span className="font-semibold"> cybersecurity</span>, when I became an ethical hacker through <span className="font-semibold">HackerOne</span>.
    </>,
    <>
      At <span className="font-semibold">RIT</span>, I discovered my true passion: <span className="font-semibold">architecting systems</span>,
      <span className="font-semibold"> managing projects</span>, and <span className="font-semibold">designing solutions</span>.
      Whatever I’m working on, I’m always driven by my <span className="font-semibold">love for software</span>, the perfect blend of creativity and logic.
    </>
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const start = sectionTop - containerHeight;
      const end = sectionTop + sectionHeight;

      const rawProgress = (containerTop - start) / (end - start);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      scrollProgress.set(clamped);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const imageX = useSpring(useTransform(scrollProgress, [0, 1], [200, -300]), { stiffness: 100, damping: 30 });
  const textX = useSpring(useTransform(scrollProgress, [0, 1], [-200, 300]), { stiffness: 100, damping: 30 });

  const handleNext = () => setPageIndex((prev) => (prev + 1) % pages.length);
  const handlePrev = () => setPageIndex((prev) => (prev - 1 + pages.length) % pages.length);

  return (
    <section
      ref={sectionRef}
      className="h-[85vh] flex items-center justify-center py-12 bg-gradient-to-tr from-[#10BBB1] to-[#292B2B] opacity-90"
    >
      <motion.img
        src="computer_avatar.png"
        alt="Ursula Parker's Avatar"
        className="hidden [@media(min-width:1250px)]:block w-[21.5vw] ml-[18vw] filter drop-shadow-[0_0_80px_#B2FFFA]"
        style={{ x: imageX }}
      />

      <motion.div
        className="pl-[2vw] pr-[12vw] [@media(min-width:950px)]:pl-[200px] [@media(min-width:950px)]:pr-[100px] flex flex-col items-left"
        style={{ x: textX }}
      >
        <div className="flex items-center justify-center space-x-[2.55vw] [@media(min-width:950px)]:space-x-[24px] w-full">
          <button
            onClick={handlePrev}
            className={`${pageIndex === 4 ? "mt-[76px]" : "mt-[0px]"} flex-shrink-0 w-[5.3125vw] [@media(min-width:950px)]:w-[50px]`}
          >
            <img
              src="chevron-left.png"
              alt="Previous"
              className="w-full h-auto cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          <div className="text-left w-[53.125vw] [@media(min-width:950px)]:w-[450px] flex-grow">
            <h1 className="text-[7.4375vw] [@media(min-width:950px)]:text-[70px] text-[var(--light-gray)] font-medium mt-[1.0625vw] [@media(min-width:950px)]:mt-[10px] [text-shadow:1px_2px_1px_rgba(0,0,0,0.2)]">
              My Story
            </h1>
            <p className="text-[2.7625vw] [@media(min-width:950px)]:text-[26px] text-[var(--light-gray)] font-light mt-[1.7vw] [@media(min-width:950px)]:mt-[16px]">
              {pages[pageIndex]}
            </p>
          </div>

          <button
            onClick={handleNext}
            className={`${pageIndex === 4 ? "mt-[76px]" : "mt-[0px]"} flex-shrink-0 w-[5.3125vw] [@media(min-width:950px)]:w-[50px]`}
          >
            <img
              src="chevron-right.png"
              alt="Next"
              className="w-full h-auto cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
        </div>

        {pageIndex === pages.length - 1 && (
          <div className="[@media(min-width:950px)]:mt-[24px] mt-[2.55vw]">
            <button
              onClick={() =>
                document
                  .getElementById("skills-passions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="appearance-none inline-flex items-center justify-center bg-[var(--accent-blue)] text-[var(--dark-gray)] rounded-lg px-[2.125vw] py-[1.275vw] [@media(min-width:950px)]:px-[20px] [@media(min-width:950px)]:py-[12px] text-[1.9125vw] [@media(min-width:950px)]:text-[18px] font-medium gap-[0.85vw] [@media(min-width:950px)]:gap-[8px] leading-none ml-[8.075vw] [@media(min-width:950px)]:ml-[76px]"
            >
              <img
                src="Arrow-down.png"
                alt="Next"
                className="block w-[2.125vw] h-[2.125vw] [@media(min-width:950px)]:w-[20px] [@media(min-width:950px)]:h-[20px] object-contain shrink-0"
              />
              Next
            </button>
          </div>

        )}

        <div className="flex [@media(min-width:950px)]:space-x-[8px] space-x-[0.85vw] mt-6">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPageIndex(i)}
              className={`[@media(min-width:950px)]:ml-[250px] ml-[26.5625vw] [@media(min-width:950px)]:mt-[20px] mt-[2.125vw] [@media(min-width:950px)]:w-[10px] w-[1.0625vw] [@media(min-width:950px)]:h-[10px] h-[1.0625vw] rounded-full transition-all duration-300 ${
                pageIndex === i ? "bg-[var(--accent-blue)] scale-125" : "bg-[#E1E1E180]"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

      </motion.div>
    </section>
  );
}
