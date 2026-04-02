"use client";

import { motion } from "framer-motion";

interface FlyingBirdProps {
  startY: string;
  duration?: number;
  delay?: number;
  size?: number;
  direction?: "left" | "right";
}

export default function FlyingBird({
  startY,
  duration = 18,
  delay = 0,
  size = 40,
  direction = "right",
}: FlyingBirdProps) {
  const isRight = direction === "right";

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: startY }}
      initial={{ x: isRight ? "-10vw" : "110vw", opacity: 0 }}
      animate={{
        x: isRight
          ? ["-10vw", "30vw", "60vw", "110vw"]
          : ["110vw", "70vw", "40vw", "-10vw"],
        y: ["0vh", "-4vh", "3vh", "-2vh"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        repeatDelay: 2,
      }}
    >
      <svg
        width={size}
        height={size * 0.5}
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
        style={isRight ? undefined : { transform: "scaleX(-1)" }}
      >
        <g fill="#8675A9">
          <ellipse cx="35" cy="25" rx="18" ry="8" />
          <circle cx="55" cy="20" r="7" />
          <polygon points="62,19 68,21 62,23" fill="#F7C948" />
          <path d="M30,25 Q20,8 38,18" fill="#C3AED6" className="wing" />
          <path d="M17,25 L8,18 L12,27 Z" fill="#C3AED6" />
        </g>
        <circle cx="57" cy="18" r="2" fill="white" />
        <circle cx="57.5" cy="17.5" r="1" fill="#333" />
      </svg>
    </motion.div>
  );
}
