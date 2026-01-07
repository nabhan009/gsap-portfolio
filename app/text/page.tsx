"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Text() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current || !blockRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Initial states
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(blockRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

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
        "-=0.2"  
      )
      .to(blockRef.current, { 
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center px-10 overflow-hidden">
      <div
        ref={containerRef}
        className="relative inline-block overflow-hidden"
      >
        {/* REVEAL BLOCK */}
        <span
          ref={blockRef}
          className="absolute inset-0 bg-black  z-20"
        />

        {/* TEXT */}
        <h1
          ref={textRef}
          className="
            relative
            text-neutral-700
            text-4xl md:text-6xl
            font-serif
            font-bold
            leading-tight
            tracking-tight
            text-center
            max-w-4xl
          "
        >
          <span className="text-black">ONE DAY</span> YOU WILL TELL YOUR STORY OF HOW YOU{" "}
          <span className="text-black">OVERCAME</span> WHAT YOU WENT THROUGH, AND IT WILL BE SOMEONE ELSE&apos;S{" "}
          <span className="text-black">SURVIVAL GUIDE.</span>
        </h1>
      </div>
    </div>
  );
}
