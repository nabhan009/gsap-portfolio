"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function CinematicJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Create particles
  const createParticles = () => {
    if (!particlesRef.current) return;
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-[2px] h-[2px] bg-[#c4ff0e] rounded-full";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particlesRef.current.appendChild(particle);
      particles.push(particle);
    }
    return particles;
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const section = sectionRef.current;
    const textContainer = textRef.current;
    const bg = bgRef.current;

    if (!cursor || !section || !textContainer || !bg) return;

    // Create floating particles
    const particles = createParticles();

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      
      gsap.to(bg, {
        x: -x,
        y: -y,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(textContainer, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1,
        ease: "power2.out"
      });

      // Animate particles
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            x: x * 0.1 * (i % 3),
            y: y * 0.1 * (i % 3),
            duration: 1,
            ease: "power2.out"
          });
        });
      }
    };

    // Enhanced cursor animation
    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Cursor trail effect
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.2,
        ease: "power2.out",
        onStart: () => {
          gsap.to(cursor, {
            scale: 1.2,
            duration: 0.1,
            yoyo: true,
            repeat: 1
          });
        }
      });
    };

    // Text reveal animation with staggered delay
    const animateText = () => {
      const heading = textContainer.querySelector("h2");
      const paragraphs = textContainer.querySelectorAll("p");

      // Reset initial state
      gsap.set([heading, ...paragraphs], { opacity: 0, y: 50 });

      // Animate heading with typing effect
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        onStart: () => {
          if (heading) {
            const originalText = heading.textContent || "";
            heading.textContent = "";
            gsap.to(heading, {
              text: originalText,
              duration: 2,
              ease: "none"
            });
          }
        }
      });

      // Animate paragraphs with stagger
      gsap.to(paragraphs, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        delay: 1,
        ease: "power2.out"
      });

      // Background scale animation
      gsap.to(bg, {
        scale: 1.1,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });

      // Floating animation for text
      gsap.to(textContainer, {
        y: "+=20",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    };

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: animateText,
      onEnterBack: animateText
    });

    // Hover effect on section
    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
      window.addEventListener("mousemove", handleMouseMove);
      
      // Cursor pulse animation
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        repeat: -1,
        yoyo: true
      });
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      window.removeEventListener("mousemove", handleMouseMove);
      
      // Reset cursor
      gsap.killTweensOf(cursor);
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    // Event listeners
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", moveCursor);

    // Initial animation on mount
    const timeline = gsap.timeline();
    timeline
      .from(bg, {
        scale: 1.3,
        duration: 2,
        ease: "power3.out"
      })
      .from(section, {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=1");

    return () => {
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", moveCursor);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up particles
      if (particlesRef.current) {
        particlesRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden cursor-none"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-6 h-6 rounded-full bg-[#c4ff0e]/20 opacity-0 z-[9999] transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#c4ff0e] mix-blend-difference"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c4ff0e] to-[#a8e000] animate-pulse"></div>
      </div>

      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden"></div>

      {/* Full-screen Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/hero img.png')" }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg mb-6">
          My Coding Journey
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mt-4 max-w-2xl leading-relaxed">
          From my first line of code to building interactive web experiences, every challenge has been a memory, every project a lesson.
        </p>
        <p className="text-lg md:text-xl text-white/80 mt-6 max-w-2xl leading-relaxed">
          These memories shape who I am as a developer — reminding me that growth is earned step by step.
        </p>
        
        {/* Animated underline for heading */}
        <div className="w-0 h-1 bg-gradient-to-r from-transparent via-[#c4ff0e] to-transparent mt-6 overflow-hidden">
          <div className="w-full h-full bg-[#c4ff0e] animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>

      {/* Floating code elements */}
      <div className="absolute top-10 left-10 text-[#c4ff0e] font-mono text-sm opacity-20">
        {"<Code />"}
      </div>
      <div className="absolute bottom-10 right-10 text-[#c4ff0e] font-mono text-sm opacity-20">
        {"{ developer }"}
      </div>
    </section>
  );
}

