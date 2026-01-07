
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {

  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { clipPath: "inset(0 100% 0 0)" },   // hidden
      {
        clipPath: "inset(0 0% 0 0)",       // fully revealed
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",     // when text enters viewport
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return (
<section className="min-h-screen bg-gray-50 flex items-center justify-center px-8 md:px-24 py-24 relative overflow-hidden">
  {/* Optional background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-200 -z-10"></div>

  <div ref={textRef} className="max-w-4xl space-y-5">
    {/* Heading */}
    <h2 className="about-line flex ml-60 text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 opacity-40 leading-tight tracking-tight">
      About Me
    </h2>

    {/* Paragraphs */}
    <p className="about-line font-serif text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed">
      I’m <span className="font-semibold text-gray-900">Muhammed Nabhan</span>, a self-taught frontend developer focused on creating <span className="text-gray-800 font-semibold">clean UI</span> and <span className="text-gray-800 font-semibold">smooth animations</span> that engage users.
    </p>

    <p className="about-line text-xl font-serif md:text-2xl lg:text-3xl text-gray-700 leading-relaxed">
      I work mainly with <span className="font-semibold text-gray-900">React.js,Next.js</span>, <span className="font-semibold text-gray-900">GSAP</span>, and <span className="font-semibold text-gray-900">Tailwind CSS</span> to craft responsive, interactive, and high-performance web experiences.
    </p>

    <p className="about-line text-xl font-serif md:text-2xl lg:text-3xl text-gray-700 leading-relaxed">
      I love building <span className="font-semibold text-gray-900">interactive experiences</span>, learning new technologies, and pushing the boundaries of what’s possible on the web.
    </p>
  </div>
</section>

  );
}



