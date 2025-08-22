import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface NodeMoreInfo {
  type: "link" | "image";
  label: string;
  url: string;
}

interface NodeData {
  id: number;
  title: string;
  details: string;
  moreInfo?: NodeMoreInfo;
}

interface Props {
  node: NodeData;
  isExpanded: boolean;
  isFlipped: boolean;
  onClick: () => void;
  onFlip: () => void;
}

export default function HexTile({
  node,
  isExpanded,
  isFlipped,
  onClick,
  onFlip,
}: Props) {
  return (
    <div className="relative w-[240px] h-[208px]">
      {/* Glow Background */}
      <motion.div
        initial={false}
        animate={{
          scale: isExpanded ? 1.9 : 1.6,
          opacity: isExpanded ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/hexglow.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Main Hex Tile */}
      <motion.div
        layout
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`z-10 cursor-pointer w-full h-full flex items-center justify-center transform-gpu transition-transform duration-300 ${
          isExpanded ? "z-20 scale-[1.2]" : "hover:scale-105 z-10"
        } group`}
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          backgroundColor: "rgba(45, 45, 45, 0.8)",
        }}
      >
        <div className="relative w-full h-full p-3 flex flex-col items-center justify-center text-white overflow-hidden">
          {!isFlipped ? (
            <>
              {/* Title */}
              <motion.div
                initial={false}
                animate={{
                  top: isExpanded ? "20px" : "50%",
                  translateY: isExpanded ? "0%" : "-50%",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`absolute text-[18px] font-regular text-white w-full text-center ${
                  !isExpanded ? "drop-shadow-[0_0_2px_white]" : "text-white"
                }`}
              >
                {node.title}
              </motion.div>

              {/* Details */}
              <div className="absolute top-[60px] w-full pl-[40px] pr-[40px] text-center">
                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      key="details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-[12px] text-[var(--light-gray)] font-light"
                    >
                      {node.details}
                    </motion.p>
                  )}
                </AnimatePresence>

                {isExpanded && node.moreInfo && (
                  <motion.button
                    layout
                    onClick={(e) => {
                      e.stopPropagation();
                      onFlip();
                    }}
                    className="mt-2 text-xs underline text-[var(--accent-blue)]"
                  >
                    {node.moreInfo.label}
                  </motion.button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {node.moreInfo?.type === "link" && (
                <a
                  href={node.moreInfo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent-blue)] underline text-[20px]"
                >
                  {node.moreInfo.label}
                </a>
              )}
              {node.moreInfo?.type === "image" && (
                <Image
                  src={node.moreInfo.url}
                  alt={node.moreInfo.label}
                  width={160}
                  height={160}
                  className="rounded-[25px] drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
                />
              )}
              <button
                className="mt-2 text-xs text-white underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlip();
                }}
              >
                <img
                  src="chevron-left.png"
                  alt="Previous"
                  className="w-[20px] h-auto cursor-pointer hover:scale-110 transition-transform"
                />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
