"use client"; // Ensure this runs on the client side

import { useState, useEffect, useRef } from "react";
import Welcome from "../pages/subpages/Welcome";
import MyStory from "../pages/subpages/MyStory";
import SkillsPassions from "../pages/subpages/SkillsPassions";
import ScrollSpy from "@/components/ScrollSpy";

export default function Home() {
  const [activeSection, setActiveSection] = useState("welcome");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Reference to the scrollable container

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
    
      const sections = scrollContainer.querySelectorAll("section");
      let currentSection = "welcome"; // Default section
    
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
    
        // Adjust for navbar height (53px)
        if (rect.top <= containerRect.top + 53 && rect.bottom >= containerRect.top + 53) {
          currentSection = section.id;
        }
      });
    
      setActiveSection(currentSection);
    };
    

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative h-screen w-full overflow-y-scroll scrollbar-hide scroll-smooth snap-y snap-mandatory overflow-x-hidden">
      {/* Scroll Spy Navigation */}
      <div className="hidden [@media(min-width:950px)]:block">
        <ScrollSpy activeSection={activeSection} />
      </div>

      {/* Scrollable Sections */}
      <section className="h-screen w-full snap-start pt-[14.2vh]" id="welcome">
        <Welcome scrollContainerRef={scrollContainerRef} />
      </section>
      <section className="h-screen w-full snap-start pt-[14.2vh]" id="my-story">
        <MyStory scrollContainerRef={scrollContainerRef} />
      </section>
      <section className="h-screen w-full snap-start pt-[14.2vh]" id="skills-passions">
        <SkillsPassions scrollContainerRef={scrollContainerRef} />
      </section>
    </div>
  );
}
