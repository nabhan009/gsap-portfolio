
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Data based on your video ---
const HISTORY_DATA = [
  {
    id: 1,
    company: "BRIDGEON",
    role: "Front End Developer Intern",
    date: "2025 JUN — PRESENT",
    type: "INTERNSHIP",
    description: "Operating within an Agile development team, I architect scalable and maintainable frontend applications using React and Next.js. My daily workflow involves translating complex product and UX requirements into performant, accessible user interfaces and reusable component systems. Beyond implementation, I actively participate in code reviews, collaborate closely with designers and backend teams, and manage build, deployment, and CI/CD workflows through GitHub Actions to ensure smooth and reliable frontend delivery.",
    deliverables: [
      {
        id: "01",
        title: "FALCON — GROCERIE E-COMMERCE WEBSITE",
        desc: "Designed and engineered an interactive grocerie  website with a fully responsive layout. Built modular UI components and added smooth UI interactions for a premium user experience.",
        tech: ["REACT.JS", "JAVASCRIPT", "TAILWIND CSS"]
      },
    ]
  }
];

export default function ProfessionalHistory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate the main Section Title
      gsap.from(".section-header", {
        scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate each history block
      const entries = gsap.utils.toArray('.history-entry');
      entries.forEach((entry: any) => {
        gsap.from(entry, {
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-black text-white py-20 px-4 md:px-12 font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* Section Header */}
      <div className="section-header mb-16 max-w-7xl mx-auto flex items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider uppercase text-gray-200">
          Professional History
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Vertical Timeline Line (Optional decorative element) */}
        <div className="absolute left-[8px] md:left-[260px] top-0 bottom-0 w-[1px] bg-gray-800 hidden md:block"></div>

        {HISTORY_DATA.map((item, index) => (
          <div key={item.id} className="history-entry flex flex-col md:flex-row gap-8 md:gap-16 mb-24 relative">
            
            {/* Left Column: Date & Badge */}
            <div className="md:w-64 flex-shrink-0 flex flex-col items-start md:text-right md:items-end pt-2">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-2">
                {item.date.split('—')[0]} <span className="text-gray-500 text-lg align-middle mx-1">—</span> {item.date.split('—')[1]}
              </h3>
              <span className="inline-block px-3 py-1 border border-[#E2FF31] text-[#E2FF31] text-xs font-bold rounded-full tracking-wider uppercase">
                {item.type}
              </span>
            </div>

            {/* Right Column: Content */}
            <div className="flex-1 pt-1">
              {/* Company Header */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
                  {item.company}
                </h1>
                <h4 className="text-xl text-gray-400 font-medium">
                  {item.role}
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed text-lg  max-w-3xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
