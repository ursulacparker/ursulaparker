import { motion } from "framer-motion";
import HexTile from "./HexTile";

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
  nodes: NodeData[];
  expandedId: number | null;
  flippedId: number | null;
  onHexClick: (id: number) => void;
  onFlipClick: (id: number) => void;
}

export default function HexBoard({
  nodes,
  expandedId,
  flippedId,
  onHexClick,
  onFlipClick,
}: Props) {
  const columns = 5;
  const offset = 132;

  return (
    <motion.div
      layout
      className="grid justify-center pr-[150px]"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 180px)`,
        columnGap: "50px",
        rowGap: `40px`,
      }}
    >
      {nodes.map((node, index) => {
        const column = index % columns;
        return (
          <motion.div
            layout
            key={node.id}
            style={{
              transform: column % 2 === 1 ? `translateY(${offset}px)` : "none",
              zIndex: expandedId === node.id ? 10 : 1,
            }}
            transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
          >
            <HexTile
              node={node}
              isExpanded={expandedId === node.id}
              isFlipped={flippedId === node.id}
              onClick={() => onHexClick(node.id)}
              onFlip={() => onFlipClick(node.id)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
