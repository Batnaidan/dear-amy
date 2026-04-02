"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const LandingScene = dynamic(() => import("@/components/LandingScene"), {
  ssr: false,
})

export default function Home() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen flex items-center justify-center paper-texture overflow-hidden">
      <LandingScene />

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.h1
          className="font-caveat text-5xl md:text-7xl text-amy-deep mb-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Dear Amy 🌸
        </motion.h1>

        <motion.p
          className="font-quicksand text-lg md:text-xl text-amy-text/70 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          I made you a little something...
        </motion.p>

        <motion.button
          onClick={() => router.push("/choose")}
          className="relative font-caveat text-2xl md:text-3xl px-8 py-4 bg-amy-card text-amy-deep rounded-lg cursor-pointer hover:bg-white transition-colors"
          style={{ filter: "drop-shadow(3px 4px 8px rgba(134,117,169,0.25))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="tape" />
          <span className="relative z-10">Open it ✨</span>
        </motion.button>
      </motion.div>
    </main>
  )
}
