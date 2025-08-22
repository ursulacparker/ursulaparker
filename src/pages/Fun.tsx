"use client";

import { useRef, useState } from "react";
import Terminal from "../components/Terminal";
import HexBoard from "../components/HexBoard";
import nodesData from "../data/funFacts";
import { motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Fun() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleHexClick = (id: number) => {
    if (expandedId === id) {
      if (flippedId) setFlippedId(null);
      else setExpandedId(null);
    } else {
      setFlippedId(null);
      setExpandedId(id);
    }
  };

  const handleFlip = (id: number) => {
    if (flippedId === id) setFlippedId(null);
    else setFlippedId(id);
  };

  const handleClickOutside = () => {
    if (flippedId !== null) {
      setTimeout(() => setExpandedId(null), 300);
      setFlippedId(null);
    } else {
      setExpandedId(null);
    }
  };
    const wrapperRef = useRef<any>(null);
    const softBounds = 100; // how far user can drag past screen edges before we gently pull back
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundImage: "url('/circuit-bg.png')", backgroundSize: "cover", background: "linear-gradient(to bottom right, #007a728c, #0026248c)", backdropFilter: "blur(1px)"}}
      onClick={handleClickOutside}
    >
      {/* Toggle Chevron */}
      <button
        onClick={(e) => {
          setIsPanelOpen(!isPanelOpen);
          e.stopPropagation();
          e.currentTarget.blur();
        }}
        className={`fixed top-[13.7vh] right-0 h-[calc(100%)] [@media(min-width:950px)]:w-[50px] w-[8vw] bg-black/60 hover:bg-black/70 z-40 flex items-center justify-center transition-transform duration-300 ${
          isPanelOpen ? "[@media(min-width:950px)]:translate-x-[-40vw] translate-x-[-80vw]" : ""
        }`}
      >
        <img
          src="/chevron-left.png"
          alt="Toggle Panel"
          className={`[@media(min-width:950px)]:w-[40px] w-[5vw] [@media(min-width:950px)]:h-[40px] h-[5vw] transition-transform duration-300 ${
            isPanelOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Terminal Panel */}
      <div
        className={`fixed top-[13.7vh] right-0 h-[calc(100%)] [@media(min-width:950px)]:w-[40vw] w-[80vw] z-[9999] bg-[rgba(20,20,20,0.85)] text-white font-mono backdrop-blur-sm border-l border-gray-700 z-100 transition-transform duration-300 ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full p-4 flex flex-col overflow-hidden z-[100]">
          <h2 className="text-[var(--accent-blue)] text-xl mb-2 pb-[20px]">
            Terminal Mode
          </h2>
          <div className="flex-1 min-h-0 overflow-hidden">
            <Terminal isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
          </div>
        </div>
      </div>

      {/* Hex Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <TransformWrapper
          minScale={1}
          maxScale={1} // disable zoom
          velocityAnimation={{ disabled: true }}
          panning={{ velocityDisabled: true }}
          doubleClick={{ disabled: true }}
          pinch={{ disabled: true }}
          limitToBounds={false}
          onPanningStop={(ref) => {
          // ✅ Soft bounds logic
          const state = ref.state;
          const x = state.positionX;
          const y = state.positionY;

          const maxX = window.innerWidth / 2 + softBounds;
          const minX = -window.innerWidth / 2 - softBounds;
          const maxY = window.innerHeight / 2 + softBounds;
          const minY = -window.innerHeight / 2 - softBounds;

          let newX = x;
          let newY = y;

          if (x > maxX) newX = maxX;
          if (x < minX) newX = minX;
          if (y > maxY) newY = maxY;
          if (y < minY) newY = minY;

          // Animate gently back if needed
          if (newX !== x || newY !== y) {
            ref.setTransform(newX, newY, 1, 200, "easeOutQuad");
          }
        }}
        >
          <TransformComponent
            wrapperClass="absolute inset-0 w-[400vw] h-[400vh] cursor-grab active:cursor-grabbing"
            contentClass="min-w-[100vw] min-h-screen w-[400vw] h-[400vh] flex items-center justify-center"
          >
            <HexBoard
              nodes={nodesData}
              expandedId={expandedId}
              flippedId={flippedId}
              onHexClick={handleHexClick}
              onFlipClick={handleFlip}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

    </div>
  );
}
