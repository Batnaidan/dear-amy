"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

const LandingScene = dynamic(() => import("@/components/LandingScene"), {
  ssr: false,
})

const Envelope = dynamic(() => import("@/components/Envelope"), {
  ssr: false,
})

const BirthdayCake = dynamic(() => import("@/components/BirthdayCake"), {
  ssr: false,
})

export default function Home() {
  const [candlesBlown, setCandlesBlown] = useState(false)

  return (
    <main className="relative min-h-screen flex items-center justify-center paper-texture overflow-hidden">
      <LandingScene />
      {candlesBlown ? (
        <Envelope />
      ) : (
        <BirthdayCake onComplete={() => setCandlesBlown(true)} />
      )}
    </main>
  )
}
