"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function Custom404() {
  const [boom, setBoom] = useState(false);
  const router = useRouter();

  const handleSelfDestruct = () => {
    setBoom(true);

    // Launch confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Optional: Remove boom message after a few seconds
    setTimeout(() => setBoom(false), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[85vh] flex bg-[var(--dark-gray)] opacity-80 relative mt-[14.3vh]">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-[100px] text-[var(--accent-blue)] mb-[20px]"
      >
        <FaRobot />
      </motion.div>

      <h1 className="text-[40px] font-medium text-[var(--light-gray)] mb-[10px]">Sorry, I couldn’t find this page.</h1>
      <h1 className="text-[30px] font-light text-[var(--light-gray)] mb-[80px]">If this is a bug, please contact Ursula!</h1>
      <p className="text-[25px] font-medium text-[var(--light-gray)] mb-[20px]">What would you like to do?</p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => router.push("/")}
          className="bg-[var(--accent-blue)] text-[var(--dark-gray)] rounded-lg px-6 py-2 text-lg font-medium"
        >
          Go Home
        </button>
        <button
          onClick={handleSelfDestruct}
          className="bg-[var(--accent-blue)] text-[var(--dark-gray)] rounded-lg px-6 py-2 text-lg font-medium"
        >
          Self-Destruct
        </button>
      </div>

      {boom && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-8 text-2xl shake"
        >
          💥 BOOM! Just kidding! Here’s a cat 😸
        </motion.div>
      )}
    </div>
  );
}
