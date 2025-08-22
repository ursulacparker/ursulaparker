"use client"; // Ensure client-side rendering

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const experiences = [
  { startDate: "Aug 2025", endDate: "Present", title: "Lead Project Manager", logo: "/logos/ALL.png", description: "At Accessible Learning Labs, I oversee cross-functional teams totaling 12+ developers, designers, and researchers. I coordinate day-to-day operations, manage customer communication, ensure requirements are met, and drive alignment across teams to keep our product on track and production-ready.", isActive: true},
  { startDate: "May 2025", endDate: "Present", title: "Head Project Manager & Lead Architect", logo: "/logos/cogbiasAI.png", description: "At CogBiasAI, I work under the CTO to lead product development, overseeing the system architecture, roadmap, and team execution. I am currently leading cross-functional teams across the backend, frontend, and internal AI API integration. I architected the full system from the ground up, designed scalable infrastructure, wrote user stories, and defined sprints; I serve as Scrum Master to ensure timely delivery. I also created and am maintaining the product roadmap, acting as both Product Manager and Owner.", isActive: true},
  { startDate: "Feb 2025", endDate: "May 2025", title: "Architect Consultant", logo: "/logos/cogbiasAI.png", description: "I was an architect consultant for CogBias AI. I helped them devise an architecture for their product based on their requirements; I was responsible for creating architecture diagrams, deciding on technologies, and creating initial user stories.", isActive: false},
  { startDate: "Jan 2025", endDate: "May 2025", title: "Team Lead", logo: "/logos/ALL.png", description: "I lead the Imagine 2025 project for Accessible Learning Labs at RIT, overseeing software development and execution while ensuring smooth collaboration across the team. As the Scrum Master, I managed the scrum board, assigned tasks, and facilitated agile workflows to keep the team aligned and productive. In addition to project coordination, I designed the software architecture, helping to integrate the backend, frontend, and external libraries for a cohesive and scalable system. I also contributed to UI/UX design, ensuring an intuitive and engaging user experience. The outcome was a record-breaking response rate and high-quality data for long-term analysis.", isActive: false},
  { startDate: "Sep 2024", endDate: "May 2025", title: "Cybersecurity Researcher", logo: "/logos/cybercorps.png", description: "I conducted vulnerability research under the SFS CyberCorps grant using NIST data to identify patterns and develop datasets within the vast repository of CVEs. My research focused on analyzing this data in order to uncover trends and correlations. I worked with RIT's supercomputing cluster, and integrated LLM tools into my research methodology in order to analyze the vast data efficiently.", isActive: false},
  { startDate: "Aug 2024", endDate: "Dec 2024", title: "Teaching Assistant", logo: "/logos/RIT.png", description: "I worked as a teaching assistant in a Process and Project Management class at RIT. I graded assignments, held office hours, assisted the professor in creating a course structure, and gave a guest lecture on the use of AI in the software industry.", isActive: false},
  { startDate: "May 2024", endDate: "Aug 2024", title: "Product Manager Co-op", logo: "/logos/sorenson.png", description: "At Sorenson Communications, I worked on various projects related to AI and mobile/app development. I coordinated with development teams and product managers to ensure products were built to the correct specifications. I did market research and created multiple project proposals. I additionally worked on creating wireframes, making user stories, and doing QA testing. The outcome of the main project, a translation app, was a high-quality product that attracted many customers at a conference.", isActive: false},
  { startDate: "May 2023", endDate: "Aug 2023", title: "Full-Stack Dev Co-op", logo: "/logos/lightriver.png", description: "At Lightriver Software, I worked on full-stack web development, where my main responsibilities were to create a language-agnostic Kafka messaging system and display it using a UI. In order to complete this, I devised an architecture, finding an efficient way to connect the different parts of the system. I then coded the backend and ran unit tests, then created a frontend based on UI schematics I designed. Finally, I ensured proper integration and did QA testing, leading to the outcome of a lightweight messaging system that was integrated into many products.", isActive: false},
  { startDate: "May 2022", endDate: "Aug 2022", title: "Web Engineer Co-op", logo: "/logos/vuzix.png", description: "At Vuzix, I was a mainly front-end web developer. My primary responsibilities were to create/debug the front-end part of a website and connect it with an Android mobile app running on AR glasses for the main purpose of authentication. In order to achieve this goal, I helped code some of the backend, working with various APIs and OAuth, and I helped code the authentication display on the mobile application. Finally, I integrated the site with the app, leading to the outcome of a smooth, natural user experience.", isActive: false},
  { startDate: "Jul 2021", endDate: "Jul 2021", title: "Coding Instructor", logo: "/logos/speyer.png", description: "I taught Python to middle schoolers at the Speyer Legacy School. I helped devise a curriculum, and guided the students through the process of debugging. My main teaching philosophy was to not only teach them programming basics, but also teach them how to be resourceful and find the answers to their coding problems by leveraging documentation and various sites.", isActive: false},
  { startDate: "Feb 2021", endDate: "May 2021", title: "Project Manager", logo: "/logos/trinity.png", description: "In 12th grade at the Trinity School, I was appointed software project manager for the development of our community cookbook site, a project commissioned by the parents association. I led the development process, mentoring underclassmen while ensuring the site was functional and user-friendly. The final product allowed people to upload and share multicultural recipes, creating a digital space where food became a way to celebrate different cultures and traditions.", isActive: false},
  { startDate: "Jul 2019", endDate: "Jul 2019", title: "Game Design Intern", logo: "/logos/musegames.png", description: "I was a level design intern and beta tester at Muse Games. My main responsibilities were to create levels in Unity for the game Embr, creating a fun and engaging user experience. I also did beta testing on the game Hamsterdam, ensuring smooth gameplay and a bug-free experience.", isActive: false},
  { startDate: "May 2019", endDate: "Aug 2022", title: "Ethical Hacker", logo: "/logos/hackerone.png", description: "I was an ethical hacker who worked through HackerOne. I pen-tested various comapnies' software, running Kali Linux and using tools such as Nmap for network scanning, and Metasploit for conducting security assesments.", isActive: false},
  { startDate: "Apr 2018", endDate: "Present", title: "Company Founder", logo: "/logos/UPtech.png", description: "I founded my company, UPtech, under which I create software. I originally created this software company to house my personal projects, but I have hopes to turn it into a successful B-corp in the future. My goal is to align the future of UPtech with my own dream: to change the world for the better through software.", isActive: true},
];

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