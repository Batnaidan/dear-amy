"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [letterAbove, setLetterAbove] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(() => setShowLetter(true), 600)
    setTimeout(() => setLetterAbove(true), 600)
  }

  return (
    <div className="relative z-10 flex flex-col items-center">
      {/* Label on envelope */}
      <div className="h-10 mb-4 flex items-center justify-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.p
              className="font-caveat text-xl md:text-2xl text-amy-deep/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
            >
              tap to open
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={!isOpen ? { scale: 1.03, y: -3 } : {}}
        style={{ perspective: 800 }}
      >
        <div
          className="relative w-75 h-50 md:w-95 md:h-60"
          style={{ filter: "drop-shadow(3px 6px 12px rgba(134,117,169,0.3))" }}
        >
          {/* === LAYER 0: Envelope back wall === */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{ zIndex: 0, backgroundColor: "#E8DCCE" }}
          />

          {/* === LAYER 1: Inner flaps (visible when top flap opens) === */}
          <div
            className="absolute inset-0 overflow-hidden rounded-sm"
            style={{ zIndex: 100 }}
          >
            {/* Left inner flap — triangle from left edge to center */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 380 240"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 0,240 170,120" fill="#FFF8F0" />
              <line
                x1="0"
                y1="0"
                x2="170"
                y2="120"
                stroke="#CABBA8"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="240"
                x2="170"
                y2="120"
                stroke="#CABBA8"
                strokeWidth="1"
              />
            </svg>
            {/* Right inner flap — triangle from right edge to center */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 380 240"
              preserveAspectRatio="none"
            >
              <polygon points="380,0 380,240 210,120" fill="#FFF8F0" />
              <line
                x1="380"
                y1="0"
                x2="210"
                y2="120"
                stroke="#CABBA8"
                strokeWidth="1"
              />
              <line
                x1="380"
                y1="240"
                x2="210"
                y2="120"
                stroke="#CABBA8"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* === LAYER 2: Letter that slides up === */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                className="absolute left-2 right-2 md:left-3 md:right-3 bg-white rounded-sm border border-amy-purple/20 p-6 md:p-8"
                style={{
                  zIndex: letterAbove ? 7 : 1,
                  filter: "drop-shadow(0 2px 8px rgba(134,117,169,0.15))",
                  bottom: "20%",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -180, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="font-caveat text-3xl md:text-4xl text-amy-deep mb-2 text-center">
                  Dear Amy 🌸
                </h1>
                <p className="font-caveat text-xl md:text-xl text-amy-text/70 text-center mb-4">
                  I made you a little something...
                </p>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/choose")
                  }}
                  className="block mx-auto font-caveat text-lg md:text-xl px-6 py-2 bg-amy-deep text-white rounded-lg cursor-pointer hover:bg-amy-deep/90 transition-colors"
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See what&apos;s inside ✨
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* === LAYER 3: Front face — bottom triangle flap pointing UP === */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 380 240"
            preserveAspectRatio="none"
            style={{ zIndex: 100 }}
          >
            <polygon
              points="0,240 380,240 190,80"
              fill="#FFF8F0"
              stroke="#C3AED6"
              strokeWidth="1.5"
            />
            {/* Subtle fold lines from bottom corners to peak */}
            <line
              x1="0"
              y1="240"
              x2="190"
              y2="80"
              stroke="#E8DFF0"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <line
              x1="380"
              y1="240"
              x2="190"
              y2="80"
              stroke="#E8DFF0"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </svg>

          {/* "To: Amy" text on front face */}
          <div
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2"
            style={{ zIndex: 100 }}
          >
            <p className="font-caveat text-lg text-amy-deep/40 whitespace-nowrap">
              To: Amy
            </p>
          </div>

          {/* === LAYER 5: Wax seal === */}
          {!isOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 102, top: "54%" }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22,2 C24,5 28,4 30,2 C32,5 35,7 38,6 C37,9 40,12 42,13 C40,15 40,19 42,21 C40,23 39,26 40,29 C37,29 34,31 33,34 C30,33 27,34 25,36 C23,34 20,33 17,34 C15,32 12,31 9,32 C9,29 7,26 4,25 C6,23 6,19 4,17 C6,15 7,12 6,9 C9,9 11,7 12,4 C15,5 18,4 19,2 C20,3 21,3 22,2 Z"
                  fill="#8675A9"
                  stroke="#6B5A8E"
                  strokeWidth="0.5"
                />
                <circle
                  cx="22"
                  cy="19"
                  r="11"
                  fill="none"
                  stroke="#9B87BF"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <text
                  x="22"
                  y="24"
                  textAnchor="middle"
                  fontFamily="serif"
                  fontSize="16"
                  fontWeight="bold"
                  fill="#E8DFF0"
                >
                  B
                </text>
              </svg>
            </div>
          )}

          {/* === LAYER 4: Top flap (opens with 3D rotation) === */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{
              zIndex: isOpen ? 0 : 101,
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 380 140"
              className="w-full"
              preserveAspectRatio="none"
            >
              {/* Flap — triangle pointing down */}
              <polygon
                points="0,0 380,0 190,130"
                fill="#FFF8F0"
                stroke="#C3AED6"
                strokeWidth="1.5"
              />
              {/* Fold lines */}
              <line
                x1="0"
                y1="0"
                x2="190"
                y2="130"
                stroke="#E8DFF0"
                strokeWidth="0.5"
                opacity="0.6"
              />
              <line
                x1="380"
                y1="0"
                x2="190"
                y2="130"
                stroke="#E8DFF0"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          {/* Outer border */}
          <div
            className="absolute inset-0 rounded-sm border-2 border-amy-purple/30 pointer-events-none"
            style={{ zIndex: 6 }}
          />
        </div>
      </motion.div>
    </div>
  )
}
