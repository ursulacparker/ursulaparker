"use client";
import { useEffect, useRef, useState } from "react";
import { Rajdhani } from 'next/font/google';
import Link from "next/link";

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside of side navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Background Blur (Glassmorphism Effect) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[4px] transition-all duration-120 z-50"
          // no need to close here — handled by outside click detection
        ></div>
      )}

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full px-[24px] py-[2.016vh] bg-[var(--med-gray)] flex justify-between items-center z-50 border-b-2 border-[var(--dark-gray)] opacity-90 shadow-lg transition-all duration-120 ${isOpen ? "blur-[2px]" : ""}`}>
        {/* Title */}
        <div className={`${rajdhani.className} text-[var(--accent-blue)] font-medium text-[6.3vh] drop-shadow-xl`}>
          <p className="[text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]"><a href="/">Ursula Parker __</a></p>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="z-50 transition-all duration-300"
        >
          <img src="Menu.png" className="w-[5.04vh] h-[5.04vh]" />
        </button>
      </nav>

      {/* Side Navbar */}
      <aside
        ref={asideRef}
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--med-gray)] font-regular shadow-lg shadow-black/30 p-6 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4"
        >
          <img src="X.png" width={40} height={40} className="mt-[18px]" />
        </button>

        {/* Nav Links */}
        <div className="flex flex-col space-y-6 text-[var(--light-gray)] text-[30px] text-right mt-12">
          <br />
          <Link href="/" className="hover:text-[var(--accent-blue)]" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <br />
          <Link href="/Experience" className="hover:text-[var(--accent-blue)]" onClick={() => setIsOpen(false)}>
            Experience
          </Link>
          <Link href="/Projects" className="hover:text-[var(--accent-blue)]" onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <Link href="/Fun" className="hover:text-[var(--accent-blue)]" onClick={() => setIsOpen(false)}>
            Fun
          </Link>
        </div>

        {/* Social Icons */}
        <div className="absolute bottom-6 right-6 flex space-x-6">
          <Link href="resume.pdf" target="_blank" rel="noopener noreferrer" className="relative w-10 h-10 group">
            <img src="Download.svg" alt="Download" className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
            <img src="Download-blue.svg" alt="Download Hover" className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </Link>
          <Link href="mailto:ursula.c.parker@gmail.com" className="relative w-10 h-10 group">
            <img src="Mail.svg" alt="Mail" className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
            <img src="Mail-blue.svg" alt="Mail Hover" className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </Link>
          <Link href="https://www.linkedin.com/in/ursula-parker/" target="_blank" className="relative w-10 h-10 group">
            <img src="Linkedin.svg" alt="LinkedIn" className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
            <img src="Linkedin-blue.svg" alt="LinkedIn Hover" className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
