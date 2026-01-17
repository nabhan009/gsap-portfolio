// "use client";
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// export default function AboutSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const linesRef = useRef<HTMLDivElement[]>([]);
//   const imageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 70%",
//         },
//       });

//       tl.from(linesRef.current, {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.out",
//         stagger: 0.18,
//       }).from(
//         imageRef.current,
//         {
//           scale: 0.9,
//           opacity: 0,
//           duration: 1.2,
//           ease: "expo.out",
//         },
//         "-=0.7"
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-screen flex items-center px-6 md:px-24 py-28 relative overflow-hidden bg-neutral-50"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-100 to-neutral-200 -z-10" />

//       <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
//         {/* Text */}
//         <div className="text-center md:text-left space-y-8">
//           <div
//             ref={(el) => el && (linesRef.current[0] = el)}
//             className="overflow-hidden"
//           >
//             <span className="block text-sm tracking-[0.3em] uppercase text-neutral-500 ">
//               About
//             </span>
//           </div>

//           <div className="w-20 mb-10 h-px bg-neutral-300 mx-auto md:mx-0" />

//           {[
//             <>
//               I’m{" "}
//               <span className="font-medium text-neutral-900">
//                 Muhammed Nabhan
//               </span>
//               , a self-taught frontend developer focused on building{" "}
//               <span className="text-neutral-800 font-medium">
//                 clean interfaces
//               </span>{" "}
//               and{" "}
//               <span className="text-neutral-800 font-medium">
//                 smooth animations
//               </span>{" "}
//               that feel intentional.
//             </>,
//             <>
//               I work mainly with{" "}
//               <span className="font-medium text-neutral-900">
//                 React & Next.js
//               </span>
//               , <span className="font-medium text-neutral-900">GSAP</span>, and{" "}
//               <span className="font-medium text-neutral-900">Tailwind CSS</span>{" "}
//               to craft responsive, high-performance web experiences.
//             </>,
//             <>
//               I enjoy building{" "}
//               <span className="font-medium text-neutral-900">
//                 interactive products
//               </span>
//               , learning new technologies, and pushing the boundaries of what’s
//               possible on the web.
//             </>,
//           ].map((content, i) => (
//             <div
//               key={i}
//               ref={(el) => el && (linesRef.current[i + 1] = el)}
//               className="overflow-hidden"
//             >
//               <p className="text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed max-w-xl mx-auto md:mx-0">
//                 {content}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Photo */}
//         <div
//           ref={imageRef}
//           className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl"
//         >
//           <Image
//             src="/nabhan.jpeg"
//             alt="Profile"
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Text Stagger Animation
      tl.from(textRefs.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      // 2. Image Clip-Path Reveal Animation
      tl.fromTo(
        imageContainerRef.current,
        { clipPath: "inset(0 100% 0 0)" }, // Starts hidden from right
        {
          clipPath: "inset(0 0% 0 0)", // Reveals to full
          duration: 1.5,
          ease: "power3.inOut",
        },
        "-=1" // Overlap with text animation
      );

      // 3. Image Parallax (Scrub)
      gsap.to(imageRef.current, {
        y: -50, // Moves image up slightly inside container
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center py-24 px-6 md:px-24 overflow-hidden relative"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
        {/* LEFT COLUMN: Text Content (Span 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Label */}
          <div ref={addToRefs}>
            <span className="inline-block py-1 px-3 border border-zinc-700 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-400">
               About Me
            </span>
          </div>

          {/* Headline */}
          <div ref={addToRefs}>
            <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight">
              Designing with purpose, <br />
              <span className="text-zinc-500 italic font-light">
                building for performance.
              </span>
            </h2>
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            <p ref={addToRefs}>
              I’m{" "}
              <span className="text-white font-medium">Muhammed Nabhan T V</span>, a
              self-taught frontend developer from Kerala. I don't just write
              code; I craft
              <span className="text-indigo-400"> digital experiences</span>{" "}
              where design and engineering meet.
            </p>
            <p ref={addToRefs}>
              My stack involves{" "}
              <span className="text-white">React, Next.js,Three.js and GSAP</span>. I
              obsess over micro-interactions, clean component architecture, and
              ensuring that every pixel serves a purpose.
            </p>
            <p ref={addToRefs}>
              Currently, I'm pushing the boundaries of what's possible on the
              web—turning static concepts into fluid, interactive realities.
            </p>
          </div>

          {/* CTA / Signature Area */}
          <div ref={addToRefs} className="pt-4">
            <a href="/Muhammed Nabhan TV main1- Frontend Developer (1).pdf" download>
              <button className="group relative px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Image (Span 5 cols) */}
        <div className="lg:col-span-5 relative">
          <div
            ref={imageContainerRef}
            className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl"
          >
            {/* Image with slight scale for parallax room */}
            <Image
              ref={imageRef as any}
              src="/nabhan.jpeg"
              alt="Muhammed Nabhan"
              fill
              className="object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              priority
            />

            {/* Overlay Gradient for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Decorative Element behind image */}
          <div className="absolute -bottom-8 -left-8 w-24 h-24 border-l border-b border-zinc-700 -z-10" />
          <div className="absolute -top-8 -right-8 w-24 h-24 border-r border-t border-zinc-700 -z-10" />
        </div>
      </div>
    </section>
  );
}
