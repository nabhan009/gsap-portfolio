"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    slug: "falcon-grocery",
    title: "Falcon – Grocery Platform",
    img: "/ecommerce.png",
    desc: "A modern grocery e-commerce platform with smooth UI and thoughtful interactions.",
    tech: ["React.js", "Redux", "Tailwind"],
    live: "https://falconc.vercel.app/",
  },
  {
    id: "02",
    slug: "gsap-portfolio",
    title: "GSAP Portfolio",
    img: "/portfolio.png",
    desc: "A cinematic portfolio experience driven by scroll-based animations.",
    tech: ["Next.js", "GSAP", "Tailwind"],
    live: "https://nabhan-portfolio.vercel.app/",
  },
];

export default function ProjectsShowcase() {
  const router = useRouter();
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading animation
    gsap.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });

    // Rows animation on scroll
    rowsRef.current.forEach((row) => {
      const image = row.querySelector("img");
      const text = row.querySelector(".text-block");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
        },
      });

      tl.from(row, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          image,
          {
            scale: 1.15,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          text?.children || [],
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    });
  }, []);

  return (
    <section className="min-h-screen bg-[#f7f6f2] px-12 py-15">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Center Heading */}
        <div
          ref={headingRef}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black leading-[0.95]">
            <span className="italic font-serif font-medium text-gray-500">
              Projects
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A curated selection of my work focused on clean interfaces,
            thoughtful motion, and meaningful user experiences.
          </p>
        </div>

        {/* Project Rows */}
        <div className="space-y-20">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => el && (rowsRef.current[i] = el)}
              className="group grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center cursor-pointer"
              onClick={() => router.push(`/projects/${p.slug}`)}
              onMouseEnter={() =>
                gsap.to(rowsRef.current[i], {
                  y: -6,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
              onMouseLeave={() =>
                gsap.to(rowsRef.current[i], {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="text-block space-y-4">
                <span className="font-mono text-sm tracking-widest text-gray-500">
                  {p.id}
                </span>

                <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
                  {p.title}
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-black/10 text-sm text-gray-700 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => {
    e.stopPropagation(); // prevents row click navigation
    window.open(p.live, "_blank");
  }}
                  className="cta group relative mt-8 inline-flex items-center gap-3 px-7 py-3 rounded-full
             border border-black/20 overflow-hidden font-medium text-black
             transition-colors duration-300"
                >
                  {/* Sliding background */}
                  <span
                    className="absolute inset-0 bg-black translate-y-full
               group-hover:translate-y-0 transition-transform duration-300 ease-out"
                  />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                    View Project
                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
