"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText() {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(():any => {
    if (!containerRef1.current || !textRef.current || !blockRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef1.current,
        start: "top 80%", // trigger when the heading is near the viewport
        toggleActions: "play none none reverse",
      },
    });

    // Initial states
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(blockRef.current, {
      scaleX: 1,
      duration: 0.7,
      ease: "power4.inOut",
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          duration: 0.01,
        },
        "-=0.2" // slightly overlap
      )
      .to(blockRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1,
        ease: "power4.inOut",
      });

    return () => tl.kill();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center px-10 overflow-hidden bg-white">
      <div ref={containerRef1} className="relative inline-block overflow-hidden">
        {/* Reveal block */}
        <span
          ref={blockRef}
          className="absolute inset-0 bg-black z-20"
        />

        {/* Text */}
        <h1
          ref={textRef}
          className="relative font-extrabold font-serif text-4xl md:text-6xl text-center opacity-88"
        >
          Dream big and dare to fail.
        </h1>
      </div>
    </div>
  );
}
