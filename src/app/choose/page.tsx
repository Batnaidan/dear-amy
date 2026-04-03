"use client"

import { motion } from "framer-motion"
import SelectionGrid from "@/components/SelectionGrid"

export default function ChoosePage() {
  return (
    <main className="min-h-screen paper-texture py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-4"
      >
        <h1 className="font-caveat text-4xl md:text-5xl text-amy-deep mb-2">
          Pick your gift & date, Amy 🌸
        </h1>
        <p className="font-quicksand text-amy-text/60 text-base md:text-lg">
          Choose whatever you like — you can redeem them when you&apos;re here
          🩵
        </p>
      </motion.div>

      <SelectionGrid />

      <footer className="text-center py-8 font-quicksand text-xs text-amy-text/30">
        Made with 🩵
      </footer>
    </main>
  )
}
