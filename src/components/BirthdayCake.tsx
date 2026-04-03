"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"

interface BirthdayCakeProps {
  onComplete: () => void
}

const CANDLE_COUNT = 5
const BLOW_THRESHOLD = 0.15

export default function BirthdayCake({ onComplete }: BirthdayCakeProps) {
  const [litCandles, setLitCandles] = useState<Set<number>>(
    () => new Set(Array.from({ length: CANDLE_COUNT }, (_, i) => i)),
  )
  const [useMic, setUseMic] = useState<boolean | null>(null) // null = not yet decided
  const [showHint, setShowHint] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number>(0)
  const streamRef = useRef<MediaStream | null>(null)

  const blowOut = useCallback(
    (count: number) => {
      setLitCandles((prev) => {
        const arr = [...prev]
        // Shuffle and pick random candles to blow out
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        const toRemove = new Set(arr.slice(0, count))
        const next = new Set(arr.filter((c) => !toRemove.has(c)))
        if (next.size === 0 && toRemove.size > 0) {
          setTimeout(onComplete, 800)
        }
        return next
      })
    },
    [onComplete],
  )

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const ctx = new AudioContext()
      audioContextRef.current = ctx
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser
      setUseMic(true)
      setShowHint(true)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      let blowing = false

      const detect = () => {
        analyser.getByteFrequencyData(dataArray)
        // Average volume level
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255

        if (avg > BLOW_THRESHOLD && !blowing) {
          blowing = true
          blowOut(Math.ceil(Math.random() * 2))
        } else if (avg < BLOW_THRESHOLD * 0.5) {
          blowing = false
        }

        animFrameRef.current = requestAnimationFrame(detect)
      }
      detect()
    } catch {
      // Permission denied or no mic
      setUseMic(false)
      setShowHint(true)
    }
  }, [blowOut])

  useEffect(() => {
    if (useMic === null) {
      startMic()
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [useMic, startMic])

  const handleCandleTap = (index: number) => {
    if (!useMic && litCandles.has(index)) {
      const next = new Set(litCandles)
      next.delete(index)
      setLitCandles(next)
      if (next.size === 0) {
        setTimeout(onComplete, 800)
      }
    }
  }

  // Candle positions spread evenly across the cake top tier (x=40 to x=200 in SVG, mapped to px)
  const candlePositions = Array.from({ length: CANDLE_COUNT }, (_, i) => {
    const padding = 20
    const tierWidth = 160 - padding * 2
    return 40 + padding + (tierWidth / (CANDLE_COUNT - 1)) * i
  })

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h1
        className="font-caveat text-3xl md:text-4xl text-amy-deep mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Make a wish! 🎂
      </motion.h1>

      {/* Cake container */}
      <div className="relative" style={{ width: 240, height: 220 }}>
        {/* Candles */}
        {candlePositions.map((xOffset, i) => (
          <div
            key={i}
            className={`absolute ${!useMic && litCandles.has(i) ? "cursor-pointer" : ""}`}
            style={{
              left: `${(xOffset / 240) * 100}%`,
              bottom: 110,
              transform: "translateX(-50%)",
              padding: "8px",
            }}
            onClick={() => handleCandleTap(i)}
          >
            {/* Candle stick */}
            <div
              className="w-2.5 h-12 rounded-sm mx-auto"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(to bottom, #FFB7C5, #FF8FA3)"
                    : "linear-gradient(to bottom, #C3AED6, #8675A9)",
              }}
            />
            {/* Flame */}
            <AnimatePresence>
              {litCandles.has(i) && (
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2"
                  initial={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-3 h-5 rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse at bottom, #FFD700, #FF8C00, #FF4500)",
                      filter: "blur(0.5px)",
                    }}
                    animate={{
                      scaleX: [1, 1.2, 0.9, 1.1, 1],
                      scaleY: [1, 0.9, 1.1, 0.95, 1],
                      x: [-0.5, 0.5, -0.3, 0.3, 0],
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Glow */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,200,0,0.3), transparent)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Cake body */}
        <svg
          viewBox="0 0 240 140"
          className="absolute bottom-0 w-full"
          style={{ filter: "drop-shadow(2px 4px 8px rgba(134,117,169,0.25))" }}
        >
          {/* Bottom tier */}
          <rect x="20" y="60" width="200" height="80" rx="8" fill="#FFF0E6" />
          <rect x="20" y="60" width="200" height="80" rx="8" fill="url(#cakePattern)" />
          {/* Top tier */}
          <rect x="40" y="30" width="160" height="50" rx="6" fill="#FFE4D6" />
          {/* Frosting drip */}
          <path
            d="M40,30 Q50,30 55,42 Q60,30 70,30 Q75,30 80,38 Q85,30 95,30 Q100,30 105,40 Q110,30 120,30 Q125,30 130,42 Q135,30 145,30 Q150,30 155,38 Q160,30 170,30 Q175,30 180,42 Q185,30 195,30 L200,30 L200,30 L40,30 Z"
            fill="#FFF8F0"
          />
          {/* Decoration dots */}
          {[60, 90, 120, 150, 180].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy={100}
              r="4"
              fill={i % 2 === 0 ? "#FFB7C5" : "#C3AED6"}
            />
          ))}
          {/* Plate */}
          <ellipse cx="120" cy="140" rx="115" ry="8" fill="#F5EFE6" />
          <defs>
            <pattern
              id="cakePattern"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
            >
              <circle cx="10" cy="10" r="1.5" fill="#FFB7C5" opacity="0.3" />
            </pattern>
          </defs>
        </svg>
      </div>

      {/* Hint text */}
      <AnimatePresence>
        {showHint && litCandles.size > 0 && (
          <motion.p
            className="font-caveat text-lg md:text-xl text-amy-deep/60 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {useMic
              ? "Blow into your microphone to blow out the candles 🌬️"
              : "Tap each candle to blow it out 🌬️"}
          </motion.p>
        )}
      </AnimatePresence>

      {/* All blown out message */}
      <AnimatePresence>
        {litCandles.size === 0 && (
          <motion.p
            className="font-caveat text-2xl md:text-3xl text-amy-deep mt-4 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Happy Birthday! 🎉
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
