"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";

interface SkillsPassionsProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function SkillsPassions({ scrollContainerRef }: SkillsPassionsProps) {
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

      const startOffset = containerHeight * 0;
      const endOffset = containerHeight * 0;

      const start = sectionTop - containerHeight + startOffset;
      const end = sectionTop + sectionHeight - endOffset;

      const rawProgress = (containerTop - start) / (end - start);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      scrollProgress.set(clamped);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainerRef]);

  const skills = [
    {
      title: "Project Management",
      subtitle: "I strategically lead teams with a servant-leadership mindset, fostering collaboration, efficiency, and enthusiasm.",
      icon: "Git.png",
    },
    {
      title: "Architecture",
      subtitle: "I create innovative and robust systems that balance scalability, maintainability, and practicality.",
      icon: "Layers.png",
    },
    {
      title: "AI-Assisted Software Development",
      subtitle: "I write clean, efficient code, using AI to streamline the repetitive parts of the development process.",
      icon: "Code.png",
    },
    {
      title: "UI/UX Design",
      subtitle: "I create sleek, intuitive interfaces that prioritize user experience while allowing for customization.",
      icon: "Layout.png",
    },
  ];

  const textX = useSpring(useTransform(scrollProgress, [0, 1], [50, -50]), {
    stiffness: 100,
    damping: 30,
  });

  const iconX = useSpring(useTransform(scrollProgress, [0, 1], [-50, 50]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      id="skills-passions"
      ref={sectionRef}
      className="min-h-[85vh] justify-center flex flex-col [@media(min-width:950px)]:py-[0px] py-[2.125vw] [@media(min-width:950px)]:pl-[calc(5vw+150px)] pl-[10vw] pr-[4vw] bg-gradient-to-tr from-[#292B2B] to-[#10BBB1] opacity-90"
    >
      <div className="[@media(min-width:950px)]:w-[1024px] w-[100vw] px-[2vw] [@media(min-width:950px)]:space-y-[10px] space-y-[1.0625vw] [@media(min-width:950px)]:pt-[5px] pt-[0.53125vw]">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-start space-x-[10vw] [@media(min-width:950px)]:py-[10px] py-[1.0625vw]">
              {/* Skill Text */}
              <motion.div className="" style={{ x: textX }}>
                <h2 className="[@media(min-width:950px)]:text-[40px] text-[4.25vw] text-[var(--light-gray)] font-regular [text-shadow:1px_2px_1px_rgba(0,0,0,0.1)] w-[55vw]">
                  {skill.title}
                </h2>
                <p className="[@media(min-width:950px)]:text-[20px] text-[2.125vw] text-[var(--light-gray)] font-light w-[55vw]">
                  {skill.subtitle}
                </p>
              </motion.div>

              {/* Skill Icon */}
              <motion.div className="flex-shrink-0" style={{ x: iconX }}>
                <img
                  src={skill.icon}
                  alt={skill.title}
                  className="[@media(min-width:950px)]:w-[100px] w-[10.625vw] [@media(min-width:950px)]:h-[100px] h-[10.625vw] object-contain"
                />
              </motion.div>
            </div>

            {/* Accent Blue Divider Line */}
            {index < skills.length - 1 && (
              <hr className="[@media(min-width:950px)]:border-t-[1px] border-t-[0.10625vw] border-[var(--accent-blue)] [@media(min-width:950px)]:mt-[10px] mt-[1.0625vw] w-[72vw]" />
            )}
          </div>
        ))}

        {/* Back to Top Button */}
        <div
          className="fixed bottom-[1vh] right-[1vh] pt-[10px] flex flex-col items-center cursor-pointer z-50"
          onClick={() =>
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          <img
            src="Arrow-up.png"
            alt="Back to Top"
            className="[@media(min-width:950px)]:w-[40px] w-[4.25vw] [@media(min-width:950px)]:h-[40px] w-[4.25vw] [@media(min-width:950px)]:mb-[4px] mb-[0.425]"
          />
          <p className="[@media(min-width:950px)]:text-[12px] text-[1.275vw] text-[var(--light-gray)]">Back to Top</p>
        </div>
      </div>
    </section>
  );
}
