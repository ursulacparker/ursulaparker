"use client"; // Ensure client-side rendering

import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "This Site",
    description: (
      <>
        <p className="mt-[14px]"><a href="/" target="_blank" className="text-[var(--accent-blue)] underline">This site</a> is my personal website. I wanted it to be more than just a portfolio: it’s a fun, interactive way to get to know me and the work I love to do! </p>
        <p className="mt-[14px]">Built with Next.js, it features smooth animations powered by Framer Motion and cohesive CSS using Tailwind. The UI was planned in Figma before development, creating a layout that reflects both my technical skills and creative style.</p> 
        <p className="mt-[14px]">P.S. There is an easter egg 🐣 somewhere on this site! Can you find it?</p>
      </>
    ),
    image: "/projects/ThisSite.png",
  },
  {
    title: "Prompt Engineering",
    description: (
      <>
        <p className="mt-[14px]">I'm currently researching prompt engineering, exploring how LLMs can be integrated into the software development process. AI is great at handling manual tasks like code generation, but when using AI, we must shift the main burden onto architectural and UI design.</p> 
        <p className="mt-[14px]">This has led me to the idea that AI implementations shouldn't just be human-in-the-loop, but rather human-in-the-center. I plan to expand on this concept in my graduate school thesis!</p>
      </>
    ),
    image: "/projects/PromptEngineering.png",
  },
  {
    title: "ClubHub",
    description: (
      <>
        <p className="mt-[14px]">ClubHub is a website designed to streamline club coordination and communication on college campuses. Built with React and Node.js with PostgreSQL, the site allows students to easily discover and engage with clubs.</p> 
        <p className="mt-[14px]">With seamless integration for scheduling and notifications, ClubHub aims to enhance the college club experience. (This project is indev.)</p>
      </>
    ),
    image: "/projects/ClubHub.png",
  },
  {
    title: "PictionaryU",
    description: (
      <>
        <p className="mt-[14px]"> PictionaryU is a multiplayer Pictionary game I built in Swift to play with my friends at RIT.</p> 
        <p className="mt-[14px]">It uses the GameCenter API for matchmaking and features custom word sets filled with college-specific terms and inside jokes. I wanted to make a fun, personalized way for us to connect over the things that make our school unique!</p>
      </>
    ),
    image: "/projects/RITPictionary.png",
  },
  {
    title: "Sorority Websites",
    description: (
      <>
        <p className="mt-[14px]">I designed and built my sorority’s websites, including our main <a href="https://deltaphiepsilonrit.github.io/" target="_blank" className="text-[var(--accent-blue)] underline">PR site</a> and a dedicated invite site for our 30-year reunion.</p> 
        <p className="mt-[14px]">I started by meticulously crafting the designs in Figma before coding them in HTML/CSS. For the PR site, my goal was to make it easy for potential members to learn about us, while the invite site provided a sleek way to keep all event details together.</p>
      </>
    ),
    image: "/projects/DPhiE.png",
  },
  {
    title: "Shaken, Not Stirred",
    description: (
      <>
        <p className="mt-[14px]">Shaken, Not Stirred was a mock e-store website we created for a class project. Built with Angular and Flask, the site focused on a cocktail-and-mocktail-making experience. We went above and beyond to design a sleek, polished UI.</p> 
        <p className="mt-[14px]">As the PM of this project, It was a formative experience balancing leadership, development, and design to bring the project to life!</p>
      </>
    ),
    image: "/projects/CocktailSite.png",
  },
  {
    title: "ASL Alphabet Model",
    description: (
      <>
        <p className="mt-[14px]">I taught my computer to recognize the ASL alphabet by systematically collecting data for each letter and training a model using Swift’s ML hand gesture recognition framework. After refining the process, I ended up with a model that achieved around 80% accuracy, making it a fun and rewarding machine learning project.</p>
      </>
    ),
    image: "/projects/ASL.png",
  },
  {
    title: "BabyBot",
    description: (
      <>
        <p className="mt-[14px]">BabyBot is a conceptual robot designed to follow you around and engage in full conversations.</p>  
        <p className="mt-[14px]">It would be integrated with an LLM, math engine, Google Translate, and a memory system. You could teach it custom responses and actions, and it could ask questions about things it doesn’t understand, remembering your answers for the future.</p> 
        <p className="mt-[14px]">The goal is to create an interactive, intelligent companion that adapts and grows with you! </p>
      </>
    ),
    image: "/projects/BabyBot.png",
  },
  {
    title: "CollegeAlg",
    description: (
      <>
        <p className="mt-[14px]">When people ask me how I chose RIT (and as a tour guide, I get asked a lot), I always say I didn’t; my computer did!</p> 
        <p className="mt-[14px]">During COVID, when in-person tours weren’t an option, I created a Java algorithm to help me decide. I put all the colleges into a CSV, factoring in Niche ratings, Forbes rankings, and post-grad salary. The algorithm weighed each category and scored each school from 1-10. RIT came out on top, so that’s where I went!</p>
      </>
    ),
    image: "/projects/CollegeAlg.png",
  },
  {
    title: "Smartlink",
    description: (
      <>
      <p className="mt-[14px]">During high school, the college admissions process was chaotic due to COVID, and the usual advice (reaching out to alumni) wasn’t always easy. To help solve this problem, I created Smartlink: a social media site to connect high school students with alumni in college.</p>
      <p className="mt-[14px]">I originally built it in PHP but later refactored it to EJS and Node.js for better performance and scalability.</p>
      </>
    ),
    image: "/projects/Smartlink.png",
  },
  {
    title: "Tech Support",
    description: (
      <>
        <p className="mt-[14px]">I started a <a href="https://www.youtube.com/@techsupport7900" target="_blank" className="text-[var(--accent-blue)] underline">YouTube channel</a> under the name Tech Support when many of my high school classmates asked how I got started with ethical hacking.</p>
        <p className="mt-[14px]">Since I had learned my foundational coding and pen-testing skills from YouTube before ever taking formal classes, I decided to give back by creating my own YouTube channel! I focused on using Kali Linux, and explaining vulnerabilities and malware, making it easier for beginners to dive into cybersecurity.</p>
      </>
    ),
    image: "/projects/Youtube.png",
  },
  {
    title: "Life Expector",
    description: (
      <>
        <p className="mt-[14px]">For a class project, I built a life expectancy visualizer site using API data and a visualization tool. I handled API interaction, data cleaning, and usability.</p>
        <p className="mt-[14px]">Navigating documentation and refining the visualization made it a great hands-on experience in working with real-world data. I incorporated a global impact component, where users could click on a country to see the top preventable causes of death, and find ways to donate/help.</p>
      </>
    ),
    image: "/projects/LifeExpector.png",
  },
  {
    title: "Cyber Aware",
    description: (
      <>
        <p className="mt-[14px]">For a hackathon, I created Let's Be Cyber Aware, a quiz-based site designed to teach cybersecurity awareness. It presents real-world security scenarios and asks users to choose the best course of action.</p>
        <p className="mt-[14px]">This site teaches users (especially the less technically experienced) key cybersecurity principles and how to protect themselves from potential threats. The site recieved the hackaton's Judges' Choice Award!</p>
      </>
    ),
    image: "/projects/CyberAware.png",
  },
  {
    title: "Iris",
    description: (
      <>
        <p className="mt-[14px]">Iris is a 3D game I created in Unity as a calming, stress-relieving experience during COVID. Players can explore a mystical world, interacting with their surroundings and completing quests. They can immerse themselves in a peaceful and engaging environment designed to offer a sense of escape and relaxation.</p>
        <p className="mt-[14px]">Originally developed as a multiplatform PC game, it was later ported to Meta Quest for a more interactive and immersive experience.</p>
      </>
    ),
    image: "/projects/Iris.png",
  },
  {
    title: "HackerChallenge",
    description: (
      <>
        <p className="mt-[14px]">I created a HackerChallenge, a CTF site with fun "hack the mainframe"-style graphics, featuring challenges from basic to difficult.</p> 
        <p className="mt-[14px]">Built as a friendly competition for my friends and I, it let us race for high scores while sharpening our pentesting and cybersecurity skills! The site itself was fully integrated with OAuth and Firebase for account management, making it both secure and engaging.</p>
      </>
    ),
    image: "/projects/HackerChallenge.png",
  },
  {
    title: "EDMaker",
    description: (
      <>
        <p className="mt-[14px]">I created EDMaker because I love listening to EDM while coding. Originally a class project, I expanded it into a Java-based program that generates random songs based on musical patterns. Users can customize the output by adjusting various preferences, allowing for unique compositions.</p>
        <p className="mt-[14px]">In the future, I hope to integrate an AI model into the project to make the generated music more dynamic and sophisticated.</p>
      </>
    ),
    image: "/projects/EDMaker.png",
  },
  {
    title: "Infinirun3D",
    description: (
      <>
        <p className="mt-[14px]">Infinirun3D is a 3D runner game I built in Swift using the macOS SceneKit framework in Xcode. Players control a rolling ball that must avoid cones of different colors while earning points by "eating" cones that match its color, and every so often, the ball changes color. </p>
        <p className="mt-[14px]">With movement controlled by A/D or arrow keys and jumping using the spacebar, players must navigate around or over obstacles to keep the run going.</p>
      </>
    ),
    image: "/projects/Infinirun.png",
  },
  {
    title: "MandelbrotFire",
    description: (
      <>
        <p className="mt-[14px]">MandelbrotFire is a Mandelbrot set visualizer I built in Java using JavaFX for a class project. It allows users to zoom in, zoom out, and drag to explore different parts of the fractal. To enhance the visual appeal, I designed it with a fire-themed color scheme!</p>
      </>
    ),
    image: "/projects/MandelbrotFire.png",
  },
  {
    title: "A Little Bored Game",
    description: (
      <>
        <p className="mt-[14px]">A Little Bored Game is a simple terminal-based Python runner game I made to pass the time while waiting for lengthy code to run (like Project Euler problems).</p>
        <p className="mt-[14px]">The game features an underscore as the ground, "X" as obstacles, and a dot as the player, giving it a minimal, yet functional design. It’s reminiscent of Chrome’s "No Internet" game and serves the same purpose: something quick and entertaining to play in moments of downtime.</p>
      </>
    ),
    image: "/projects/BoredGame.png",
  },
  {
    title: "aMAZEing",
    description: (
      <>
        <p className="mt-[14px]">aMAZEing was the game that made me fall in love with software development! It was the first app I released to the Apple App Store in 10th grade, and seeing my classmates compete for high scores made me realize my true passion: creating software that brings joy to others.</p>
        <p className="mt-[14px]">The game itself was a maze challenge where players used the iPhone accelerometer to navigate it, avoiding spikes and racing against the clock to earn points and stay alive.</p>
      </>
    ),
    image: "/projects/aMAZEing.png",
  },
  {
    title: "MineAlg",
    description: (
      <>
        <p className="mt-[14px]">This was one of the first projects I ever coded, in 7th grade! </p>
        <p className="mt-[14px]">While building large cities in Minecraft, I struggled with evenly spacing windows on long walls. To solve this, I created an algorithm that calculates the best window layouts, ensuring consistent spacing with at least one block between them. If multiple options exist, it provides them all, making my builds faster and more efficient while keeping the design flexible.</p>
      </>
    ),
    image: "/projects/MineAlg.png",
  },
];


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
          <h1 className="[@media(min-width:1250px)]:ml-[10px] ml-[15vw] [@media(min-width:950px)]:text-[55px] text-[5.84375vw] text-[var(--light-gray)] font-medium [text-shadow:1px_2px_1px_rgba(0,0,0,0.1)]">
            {projects[activeIndex].title}
          </h1>
          <div className="[@media(min-width:1250px)]:ml-[10px] ml-[15vw] [@media(min-width:1250px)]:w-[550px] w-[70vw] [@media(min-width:950px)]:text-[23px] text-[2.44375vw] text-[var(--light-gray)] font-light [@media(min-width:950px)]:mt-[8px] mt-[0.85vw] [@media(min-width:950px)]:space-y-[14px] space-y-[1.4875vw]">
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
