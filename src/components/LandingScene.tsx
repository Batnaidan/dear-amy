"use client"

import FloatingElement from "./FloatingElement"
import FlyingBird from "./FlyingBird"

export default function LandingScene() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none scale-90 md:scale-100 origin-center">
      {/* Edelweiss flowers */}
      <FloatingElement
        src="/images/edelweiss.svg"
        size={70}
        x="8%"
        y="15%"
        delay={0}
        duration={8}
      />
      <FloatingElement
        src="/images/edelweiss.svg"
        size={50}
        x="82%"
        y="60%"
        delay={1.5}
        duration={9}
        rotate={8}
      />
      <FloatingElement
        src="/images/edelweiss.svg"
        size={40}
        x="70%"
        y="12%"
        delay={2.8}
        duration={7}
      />

      {/* Sakura blossoms */}
      <FloatingElement
        src="/images/sakura.svg"
        size={55}
        x="20%"
        y="70%"
        delay={0.5}
        duration={7.5}
        rotate={6}
      />
      <FloatingElement
        src="/images/sakura.svg"
        size={45}
        x="88%"
        y="35%"
        delay={2}
        duration={8.5}
      />

      {/* Music notes */}
      <FloatingElement
        src="/images/music-note.svg"
        size={40}
        x="5%"
        y="55%"
        delay={1}
        duration={6.5}
        rotate={10}
      />
      <FloatingElement
        src="/images/music-note.svg"
        size={35}
        x="75%"
        y="88%"
        delay={3}
        duration={7}
      />

      {/* Pink Floyd prism */}
      <FloatingElement
        src="/images/prism.svg"
        size={90}
        x="65%"
        y="75%"
        delay={1.8}
        duration={10}
        rotate={3}
      />

      {/* TV show quotes as paper tags */}
      <FloatingElement
        text={`"That's what she said" 😏`}
        size={60}
        x="12%"
        y="85%"
        delay={2.5}
        duration={9}
        rotate={4}
      />
      <FloatingElement
        text="🌸"
        size={80}
        x="45%"
        y="8%"
        delay={1.2}
        duration={7}
        rotate={2}
      />
      <FloatingElement
        text="Bazinga! 💥"
        size={50}
        x="5%"
        y="8%"
        delay={3.2}
        duration={8.5}
        rotate={6}
      />

      {/* Flying birds */}
      <FlyingBird
        startY="12%"
        duration={16}
        delay={0}
        size={35}
        direction="right"
      />
      <FlyingBird
        startY="25%"
        duration={22}
        delay={3}
        size={24}
        direction="left"
      />
      <FlyingBird
        startY="40%"
        duration={20}
        delay={7}
        size={28}
        direction="left"
      />
      <FlyingBird
        startY="55%"
        duration={17}
        delay={1}
        size={32}
        direction="right"
      />
      <FlyingBird
        startY="70%"
        duration={19}
        delay={9}
        size={26}
        direction="right"
      />
      <FlyingBird
        startY="82%"
        duration={21}
        delay={4}
        size={30}
        direction="left"
      />
    </div>
  )
}
