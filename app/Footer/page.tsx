"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import HoverText from "@/app/components/HoverEffect";

const logos = [
  { name: "Tailwind", src: "/Tailwind.webp" },
  { name: "JS", src: "/js.png" },
  { name: "HTML", src: "/html.jpg" },
  { name: "TypeScript", src: "/ts.png" },
  { name: "Next.js", src: "/next.jpg" },
  { name: "React", src: "/react.png" },
  { name: "Redux", src: "/redux.jpg" },
  { name: "GSAP", src: "/gsap.png" },
  { name: "Three.js", src: "/three.webp" },
];

export default function Footer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef1 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);
  // NABHAN Animated Logo
  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const lines = svgRef.current.querySelectorAll<SVGPathElement>(".line");
    lines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
    });

    gsap.to(lines, {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.35,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);
    useLayoutEffect(():any =>{
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
          duration: 1.5,
          ease: "power4.inOut",
        });
  
      return () => tl.kill();
    }, []);
  // Horizontal Logo Marquee
  useLayoutEffect(() => {
    if (!marqueeRef.current) return;
    const container = marqueeRef.current;
    const totalWidth = container.scrollWidth / 2;
    gsap.to(container, {
      x: -totalWidth,
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white text-black">
      {/* Logo Marquee at top */}


      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center w-full min-h-screen py-16 space-y-20">
              <div className="relative w-full overflow-hidden bg-white py-8">
        <div ref={marqueeRef} className="flex w-max space-x-16">
          {[...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center w-12 h-12">
              <img 
                src={logo.src} 
                alt={logo.name} 
                className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          ))}
        </div>
      </div>
    <div className="w-full flex items-center justify-center overflow-hidden bg-white">
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
          <div className="mt-2 text-center">
            <p className="text-sm font-light tracking-widest text-gray-600">WEB DEVELOPER & DESIGNER</p>
          </div>

        {/* Navigation sections */}
        <div className="flex flex-col md:flex-row justify-center w-full px-6 md:px-20 gap-16 md:gap-32">
          <nav className="flex flex-col items-center">
            <h1 className="mb-6 font-serif text-sm tracking-widest text-gray-500">PAGES</h1>
            <div className="flex flex-col items-center gap-4">
              <HoverText linkTo="/">HOME</HoverText>
              <HoverText linkTo="/about">ABOUT</HoverText>
              <HoverText linkTo="/Memories">PROJECTS</HoverText>
              <HoverText linkTo="/text">JOURNEY</HoverText>
            </div>
          </nav>

          <div className="h-px md:h-auto md:w-px bg-gray-300" />

          <nav className="flex flex-col items-center">
            <h1 className="mb-6 font-serif text-sm tracking-widest text-gray-500">FOLLOW</h1>
            <div className="flex flex-col items-center gap-4">
              <HoverText linkTo="https://www.linkedin.com/in/muhammed-nabhan-tv/">LINKEDIN</HoverText>
              <HoverText linkTo="https://www.instagram.com/nabhuuhhh/?__pwa=1#">INSTAGRAM</HoverText>
              <HoverText linkTo="https://github.com/nabhan009">GITHUB</HoverText>
              <HoverText linkTo="https://wa.me/916238692051">WHATSAPP</HoverText>
            </div>
          </nav>
        </div>

        {/* Footer bottom */}
        <div className="absolute bottom-8 w-full text-center">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} NABHAN. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}