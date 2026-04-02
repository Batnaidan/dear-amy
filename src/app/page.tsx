"use client"

import dynamic from "next/dynamic"

const LandingScene = dynamic(() => import("@/components/LandingScene"), {
  ssr: false,
})

const Envelope = dynamic(() => import("@/components/Envelope"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center paper-texture overflow-hidden">
      <LandingScene />
      <Envelope />
    </main>
  )
}
