"use client"

import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import GiftCard from "./GiftCard"

interface ActionLog {
  action: "select" | "deselect"
  type: "gift" | "date"
  label: string
  time: string
}

const gifts = [
  { id: "cranes", label: "365 Origami Cranes", emoji: "🐦" },
  { id: "plushie", label: "Plushie", emoji: "🧸" },
  { id: "beer", label: "Altangobi Beer", emoji: "🍺" },
  { id: "flower", label: "Flower", emoji: "🌼" },
  { id: "potion", label: "Eternal Youth Potion", emoji: "💅🧪" },
  { id: "money", label: "999,000,000₮", emoji: "💰", isEasterEgg: true },
]

const dates = [
  { id: "cafe", label: "Cafe Hopping", emoji: "☕" },
  { id: "gallery", label: "Visit an Art Gallery", emoji: "🎨" },
  { id: "dinner", label: "Dinner", emoji: "🍽️" },
]

export default function SelectionGrid() {
  const [selectedGifts, setSelectedGifts] = useState<Set<string>>(new Set())
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPetals, setShowPetals] = useState(false)
  const [stage, setStage] = useState(0) // 0=initial, 1=need 2 gifts, 2=just kidding choose all
  const [stageMessage, setStageMessage] = useState("")
  const actionLog = useRef<ActionLog[]>([])

  const petals = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${(i * 4.1 + 7) % 100}%`,
        top: `${-5 - ((i * 3.7) % 15)}%`,
        duration: `${2.5 + (i % 5) * 0.6}s`,
        delay: `${(i * 0.15) % 2.5}s`,
        size: 16 + (i % 4) * 6,
      })),
    [],
  )

  const logAction = (
    action: "select" | "deselect",
    type: "gift" | "date",
    id: string,
  ) => {
    const items = type === "gift" ? gifts : dates
    const label = items.find((i) => i.id === id)?.label ?? id
    actionLog.current.push({
      action,
      type,
      label,
      time: new Date().toLocaleTimeString(),
    })
  }

  const toggleGift = (id: string) => {
    const isSelected = selectedGifts.has(id)
    logAction(isSelected ? "deselect" : "select", "gift", id)
    setSelectedGifts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleDate = (id: string) => {
    const isSelected = selectedDates.has(id)
    logAction(isSelected ? "deselect" : "select", "date", id)
    setSelectedDates((prev) => {
      if (prev.has(id)) return new Set()
      return new Set([id])
    })
  }

  const realGiftCount = [...selectedGifts].filter(
    (id) => !gifts.find((g) => g.id === id)?.isEasterEgg,
  ).length

  const handleSubmit = async () => {
    if (realGiftCount === 0 || selectedDates.size === 0) return

    // Stage 0: needs at least 1 gift + 1 date, then ask for 2 gifts
    if (stage === 0) {
      setStage(1)
      setStageMessage("You have to choose at least 2 gifts 🤔")
      return
    }

    // Stage 1: needs 2+ gifts, then say just kidding choose all
    if (stage === 1) {
      if (realGiftCount < 2) return
      setStage(2)
      setStageMessage("Just kidding... choose ALL the gifts 😈")
      return
    }

    // Stage 2: needs all gifts selected
    const allRealGifts = gifts.filter((g) => !g.isEasterEgg)
    if (realGiftCount < allRealGifts.length) return

    setIsSubmitting(true)
    try {
      const giftLabels = [...selectedGifts]
        .filter((id) => !gifts.find((g) => g.id === id)?.isEasterEgg)
        .map((id) => gifts.find((g) => g.id === id)?.label ?? id)
      const dateLabels = [...selectedDates].map(
        (id) => dates.find((d) => d.id === id)?.label ?? id,
      )

      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gifts: giftLabels,
          dates: dateLabels,
          log: actionLog.current,
        }),
      })

      setIsSubmitted(true)
      setShowPetals(true)
    } catch {
      alert("Something went wrong, please try again!")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Sakura petal confetti */}
        {showPetals &&
          petals.map((p) => (
            <div
              key={p.id}
              className="petal fixed pointer-events-none"
              style={{
                left: p.left,
                top: p.top,
                fontSize: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            >
              🌸
            </div>
          ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6"
        >
          {/* <div className="text-6xl mb-6">🌸</div> */}
          <h2 className="font-caveat text-4xl md:text-5xl text-amy-deep mb-2">
            It&apos;s gonna be
          </h2>
          <motion.h2
            className="font-caveat text-5xl md:text-7xl text-amy-deep mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            Legen — wait for it —
          </motion.h2>
          <motion.h2
            className="font-caveat text-5xl md:text-7xl text-amy-deep mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, type: "spring", stiffness: 200 }}
          >
            DARY! 👱🏽‍♂️
          </motion.h2>
          {/* <motion.p
            className="font-quicksand text-amy-text/70 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            I can&apos;t wait to make these happen when you&apos;re here
          </motion.p> */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            className="bg-amy-card border-2 border-dashed border-amy-purple/40 rounded-lg px-6 py-4 inline-block"
          >
            <p className="font-quicksand text-amy-text/50 text-sm mb-1">
              Your redeem code
            </p>
            <p className="font-caveat text-3xl md:text-4xl text-amy-deep tracking-wide mb-2">
              Heisenberg
            </p>
            <p className="font-quicksand text-amy-text/40 text-xs">
              Remember this code! You&apos;ll need it to redeem your gifts
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  const allRealGifts = gifts.filter((g) => !g.isEasterEgg)
  const canSubmit =
    stage === 0
      ? realGiftCount >= 1 && selectedDates.size >= 1
      : stage === 1
        ? realGiftCount >= 2 && selectedDates.size >= 1
        : realGiftCount >= allRealGifts.length && selectedDates.size >= 1

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-12">
      {/* Dates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-caveat text-2xl md:text-3xl text-amy-deep mb-4 text-center">
          Pick our date
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {dates.map((date) => (
            <GiftCard
              key={date.id}
              id={date.id}
              label={date.label}
              emoji={date.emoji}
              selected={selectedDates.has(date.id)}
              onToggle={toggleDate}
            />
          ))}
        </div>
      </motion.div>

      {/* Gifts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-caveat text-2xl md:text-3xl text-amy-deep mb-4 text-center">
          Pick 1 gift 🎁
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {gifts.map((gift) => (
            <GiftCard
              key={gift.id}
              id={gift.id}
              label={gift.label}
              emoji={gift.emoji}
              selected={selectedGifts.has(gift.id)}
              onToggle={toggleGift}
              isEasterEgg={gift.isEasterEgg}
            />
          ))}
        </div>
      </motion.div>

      {/* Stage message */}
      {stageMessage && (
        <motion.p
          key={stageMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-caveat text-xl md:text-2xl text-amy-deep mb-4"
        >
          {stageMessage}
        </motion.p>
      )}

      {/* Submit Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`font-caveat text-xl md:text-2xl px-8 py-3 rounded-lg shadow-md transition-all ${
            canSubmit
              ? "bg-amy-deep text-white hover:bg-amy-deep/90 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={canSubmit ? { scale: 1.05 } : {}}
          whileTap={canSubmit ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? "Sending..." : "I've made my choices! 🌸"}
        </motion.button>
      </motion.div>
    </div>
  )
}
