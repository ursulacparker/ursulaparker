import { useEffect, useRef, useState } from "react";
import MatrixRain from "./MatrixRain";
import confetti from "canvas-confetti";

// 🎲 Random response pools
const FUNFACTS = [
  "Ursula prefers doing her work/studying on the floor.",
  "Ursula uses ChatGPT as her diligent personal assistant.",
  "Ursula has plans to leash-train a kitten.",
];

const QUOTES = [
  `"Life is too short to listen on half volume"`,
  `"100 bad days makes 100 good stories. 100 good stories makes you interesting at parties."`,
  `"Live like every moment is your last. Because one day you'll be right."`,
  `"Love is the meaning of life. That, or 42."`,
  `"Life is a big cosmic joke, and you are the punchline."`,
];

const JOKES = [
  "Why did the coder cross the road? Because the chicken's class was abstract.",
  "There are 10 kinds of people in the world. Those who understand binary and those who don't.",
  "Why do programmers hate the wilderness? It has too many bugs.",
];

// 🧠 Command map
const COMMANDS = {
  "--help": "Available commands: funfact, hobbies, quote, joke, clear, exit, exploit, help",
  funfact: "__RANDOM_FUNFACT__",
  hobbies: "Acting, Violin, Cooking, Googling, and more!",
  quote: "__RANDOM_QUOTE__",
  joke: "__RANDOM_JOKE__",
  exploit: "Attempting to hack the mainframe... Access denied. Try again later.",
  exit: "Exiting terminal...",
} as const;

type CommandKey = keyof typeof COMMANDS;

export default function Terminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(true);
  const [isHacking, setIsHacking] = useState(false);
  const [hackLines, setHackLines] = useState<string[]>([]);
  const [showAccessGranted, setShowAccessGranted] = useState(false);

  const handleCommand = (command: string) => {
    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "exit") {
      setHistory((prev) => [...prev, `>> ${command}`, COMMANDS.exit]);
      setTimeout(() => {
        setHistory([]);
        onClose();
      }, 500);
      return;
    }

    if (command === "sudo exploit") {
      setIsHacking(true);
      setInput("");
      setHistory((prev) => [...prev, `>> ${command}`]);
      setHackLines([]); // reset logs at start
      setShowAccessGranted(false); // just in case
    
      const FAKE_HACK_LOGS = [
        "HACKING THE MAINFRAME!!!",
        "Authorizing root access...",
        "Loading XOR encryption keys...",
        "Establishing handshake with node #AF2D9C...",
        "Bypassing firewall...",
        "Injecting payload into kernel memory...",
        "Decrypting mainframe...",
        "Disabling security protocols...",
        "Routing through onion layers...",
        "Terminal breach successful.",
        "Uploading glitter bomb...",
        "💥 Boom.",
      ];
    
      let index = 0;
    
      const interval = setInterval(() => {
        setHackLines((prev) => [...prev, FAKE_HACK_LOGS[index]]);
        index++;
    
        if (index === FAKE_HACK_LOGS.length) {
          clearInterval(interval);
    
          // 🎉 Show ACCESS GRANTED after final log
          setTimeout(() => {
            setShowAccessGranted(true);
            confetti({
              particleCount: 200,
              spread: 80,
              origin: { x: 0.8, y: 0.8 },
              colors: ["#00ff00", "#39ff14", "#b6ff00", "#ffffff"],
            });
    
            // ✅ End hack mode after showing ACCESS GRANTED
            setTimeout(() => {
              setIsHacking(false);
              setHackLines([]);
              setShowAccessGranted(false);
            }, 2500); // how long to show ACCESS GRANTED
          }, 400); // delay after last log
        }
      }, 300); // speed per line
    
      return;
    }

    if (command in COMMANDS) {
      const typedCommand = command as CommandKey;
      let response: string = COMMANDS[typedCommand];

      // 🎲 Handle randomized responses
      if (response === "__RANDOM_FUNFACT__") {
        response = FUNFACTS[Math.floor(Math.random() * FUNFACTS.length)];
      }
      if (response === "__RANDOM_QUOTE__") {
        response = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      }
      if (response === "__RANDOM_JOKE__") {
        response = JOKES[Math.floor(Math.random() * JOKES.length)];
      }

      setHistory((prev) => [...prev, `>> ${command}`, response]);
    } else {
      setHistory((prev) => [
        ...prev,
        `>> ${command}`,
        `Command not found: ${command}`,
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (booting || isHacking) return;

    if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      handleCommand(input.trim());
      setInput("");
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      setInput((prev) => prev + e.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, booting, isHacking]);

  // Auto-scroll when history or input changes
  useEffect(() => {
    if (!containerRef.current) return;
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [history, input, hackLines]);

  useEffect(() => {
    if (!isOpen) return;

    setBooting(true);
    setInput("");
    setHistory(["Starting up the terminal..."]);

    const timer = setTimeout(() => {
      setHistory([
        "SOME USEFUL COMMANDS:",
        "--help: show available commands",
        "clear: clear the screen",
        "exit: exit and clear the terminal",
        "funfact: get a random fun fact about Ursula",
        "hobbies: see a list of Ursula’s fun hobbies",
        "quote: get a random quote from Ursula",
        "joke: get a random joke from Ursula",
        "exploit: hack the mainframe",
        "",
      ]);
      setBooting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-scroll h-full font-mono text-green-400 whitespace-pre-wrap relative z-[100] p-1 pb-[100px] scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-black"
    >
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      {!booting && !isHacking && (
        <div className="mt-2 flex">
          <div className="pr-1 w-[30px] text-left inline-block">{">>"}</div>
          <span>{input}</span>
          <span className="blinking-cursor" />
        </div>
      )}

      {isHacking && (
        <>
          <MatrixRain fadeOut={!hackLines.length} />
          {showAccessGranted && (
            <div className="absolute top-[500px] left-1/2 z-[70] -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-green-400 text-4xl md:text-6xl font-bold animate-access-granted text-center">
                ACCESS GRANTED
              </h1>
            </div>
          )}
          <div className="absolute inset-0 z-[60] bg-black/70 text-green-400 font-mono p-6 overflow-y-auto animate-fade-in">
            {hackLines.map((line, idx) => (
              <div key={idx} className="animate-pulse-fast">{line}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}