"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  RefObject,
  useRef,
  useEffect,
} from "react";

export default function Welcome({
  scrollContainerRef,
}: {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0); // our fake scrollYProgress

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
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      scrollProgress.set(clampedProgress);
    };

    container.addEventListener("scroll", handleScroll);

    let animationFrame: number;
    let attempts = 0;

    const runWhenReady = () => {
      if (container.scrollTop === 0 && attempts < 10) {
        attempts++;
        animationFrame = requestAnimationFrame(runWhenReady);
      } else {
        handleScroll();
      }
    };

    runWhenReady();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [scrollContainerRef]);

  const textX = useTransform(scrollProgress, [0, 1], [200, -300]);
  const imageX = useTransform(scrollProgress, [0, 1], [-200, 300]);

  const smoothTextX = useSpring(textX, { stiffness: 100, damping: 30 });
  const smoothImageX = useSpring(imageX, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      className="h-[85vh] items-center flex py-12 bg-gradient-to-tr from-[#292B2B] to-[#10BBB1] opacity-90"
    >
      <motion.div
        className="px-6 pl-[23vw] [@media(min-width:950px)]:pl-[300px] [@media(min-width:950px)]:pr-[14vw] min-w-0"
        style={{ x: smoothTextX }}
      >
        <h1 className="whitespace-nowrap text-[3.4vw] [@media(min-width:950px)]:text-[32px] text-[var(--light-gray)] font-light mt-[10px] [@media(min-width:950px)]:mb-[3px] mb-[0.318vh] [text-shadow:1px_2px_1px_rgba(0,0,0,0.2)]">
          Hi! I'm
        </h1>
        <h1 className="whitespace-nowrap text-[9vw] [@media(min-width:950px)]:text-[85px] text-[var(--accent-blue)] font-medium [@media(min-width:950px)]:leading-[60px] leading-[6.35vh] [@media(min-width:950px)]:mb-[35px] mb-[3.7vh] [text-shadow:1px_3px_1px_rgba(0,0,0,0.2)]">
          Ursula Parker
        </h1>
        <h1 className="whitespace-nowrap text-[3.7vw] [@media(min-width:950px)]:text-[35px] text-[var(--light-gray)] font-light mb-[0px] [@media(min-width:950px)]:leading-[35px] leading-[3.7vw]">
          Project manager & architect
        </h1>
        <h1 className="whitespace-nowrap text-[3.7vw] [@media(min-width:950px)]:text-[35px] text-[var(--light-gray)] font-light mb-[0px] [@media(min-width:950px)]:leading-[35px] leading-[3.7vw]">
          Changing the world through code
        </h1>

        <div className="inline-flex space-x-[1.275vw] [@media(min-width:950px)]:space-x-[12px] mt-[10.625vw] [@media(min-width:950px)]:mt-[100px]">
          <button
            onClick={() =>
              document.getElementById("my-story")?.scrollIntoView({ behavior: "smooth" })
            }
            className="appearance-none inline-flex items-center justify-center bg-[var(--accent-blue)] text-[var(--dark-gray)] rounded-lg px-[2.125vw] py-[1.275vw] text-[1.9125vw] leading-none [@media(min-width:950px)]:px-[20px] [@media(min-width:950px)]:py-[12px] [@media(min-width:950px)]:text-[18px] font-medium gap-[0.85vw] [@media(min-width:950px)]:gap-[8px]"
          >
            <img
              src="Arrow-down.png"
              alt="Next"
              className="block w-[2.125vw] h-[2.125vw] [@media(min-width:950px)]:w-[20px] [@media(min-width:950px)]:h-[20px] object-contain shrink-0"
            />
            Next
          </button>

          <a
            href="/Experience"
            rel="noopener noreferrer"
            className="appearance-none inline-flex items-center justify-center bg-[var(--accent-blue)] text-[var(--dark-gray)] rounded-lg px-[2.125vw] py-[1.275vw] text-[1.9125vw] leading-none [@media(min-width:950px)]:px-[20px] [@media(min-width:950px)]:py-[12px] [@media(min-width:950px)]:text-[18px] font-medium"
          >
            Experience
          </a>

          <a
            href="/Projects"
            rel="noopener noreferrer"
            className="appearance-none inline-flex items-center justify-center bg-[var(--accent-blue)] text-[var(--dark-gray)] rounded-lg px-[2.125vw] py-[1.275vw] text-[1.9125vw] leading-none [@media(min-width:950px)]:px-[20px] [@media(min-width:950px)]:py-[12px] [@media(min-width:950px)]:text-[18px] font-medium"
          >
            Projects
          </a>
        </div>

      </motion.div>

      <motion.img
        src="Avatar.png"
        alt="Ursula Parker's Avatar"
        className="hidden [@media(min-width:1250px)]:block w-[16vw] mr-[180px] filter drop-shadow-[0_0_80px_#B2FFFA]"
        style={{ x: smoothImageX }}
      />
    </section>
  );
}
