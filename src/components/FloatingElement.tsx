"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FloatingElementProps {
  src?: string;
  text?: string;
  size: number;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  rotate?: number;
}

export default function FloatingElement({
  src,
  text,
  size,
  x,
  y,
  delay = 0,
  duration = 7,
  rotate = 5,
}: FloatingElementProps) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, filter: "drop-shadow(2px 4px 6px rgba(134,117,169,0.2))" }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 5, -10, 0],
        x: [0, 8, -5, 6, 0],
        rotate: [-rotate, rotate, -rotate / 2, rotate / 2, -rotate],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {src ? (
        <Image src={src} alt="" width={size} height={size} className="w-auto h-auto" />
      ) : text ? (
        <div
          className="bg-amy-card px-3 py-2 rounded shadow-sm border border-amy-purple/30 font-caveat text-amy-deep"
          style={{ fontSize: size * 0.3 }}
        >
          {text}
        </div>
      ) : null}
    </motion.div>
  );
}
