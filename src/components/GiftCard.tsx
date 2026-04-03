"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GiftCardProps {
  id: string;
  label: string;
  emoji: string;
  selected: boolean;
  onToggle: (id: string) => void;
  isEasterEgg?: boolean;
}

export default function GiftCard({
  id,
  label,
  emoji,
  selected,
  onToggle,
  isEasterEgg = false,
}: GiftCardProps) {
  const [showJoke, setShowJoke] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (isEasterEgg) {
      setIsShaking(true);
      setShowJoke(true);
      setTimeout(() => setIsShaking(false), 600);
      setTimeout(() => setShowJoke(false), 3000);
      return;
    }
    onToggle(id);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={`relative w-full h-full p-5 rounded-lg cursor-pointer transition-colors duration-200 ${
          selected
            ? "bg-amy-purple/20 border-2 border-amy-deep shadow-lg"
            : "bg-amy-card border-2 border-amy-purple/20 hover:border-amy-purple/50"
        }`}
        style={{ filter: "drop-shadow(2px 3px 5px rgba(134,117,169,0.15))" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={isShaking ? { x: [-5, 5, -5, 5, -3, 3, 0], transition: { duration: 0.5 } } : {}}
      >
        {/* Tape decoration */}
        <div className="tape" />

        <div className="relative z-10 flex flex-col items-center gap-3 pt-2">
          <span className="text-4xl">{emoji}</span>
          <span className="font-quicksand font-semibold text-amy-text text-sm text-center">
            {label}
          </span>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-amy-deep rounded-full flex items-center justify-center"
            >
              <span className="text-white text-xs">✓</span>
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* Easter egg popup */}
      {showJoke && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-amy-deep text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-50 font-quicksand font-semibold text-sm"
        >
          Ямар шуналтаймбээ xD
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-amy-deep rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
