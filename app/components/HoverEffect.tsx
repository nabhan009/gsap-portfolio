// components/HoverText.tsx
"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface HoverTextProps {
  children: string; // The text content to display
  linkTo: string;   // The destination link (e.g., "/store")
}

export default function HoverText({ children, linkTo }: HoverTextProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  
  // Use GSAP's useGSAP hook for animation logic
  useGSAP(() => {
    // Target the inner elements using specific data attributes or classes
    const defaultText = containerRef.current?.querySelector('[data-type="default"]');
    const hoverText = containerRef.current?.querySelector('[data-type="hover"]');

    if (!defaultText || !hoverText) return;

    // --- Animation Setup ---
    const enterTimeline = gsap.timeline({ paused: true });
    
    // Animation IN
    enterTimeline
      // Default Text slides UP and OUT
      .to(defaultText, { y: '-100%', duration: 1, ease: 'power3.out' }, 0) 
      // Hover Text slides IN from bottom (100%)
      .fromTo(hoverText, 
        { y: '100%', opacity: 0 }, // Start state
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, 0); // End state
    
    // Animation OUT: Reverses the enter timeline
    const leaveTimeline = enterTimeline.reverse();

    // --- Event Handlers (using direct element manipulation for simplicity) ---
    const handleMouseEnter = () => enterTimeline.play();
    const handleMouseLeave = () => leaveTimeline.timeScale(1.5).reverse();

    containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    // Clean-up function provided by useGSAP
    return () => {
        containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    }

  }, { scope: containerRef }); // Scope ensures only elements inside the ref are targeted

  return (
    <a 
      ref={containerRef}
      href={linkTo} 
      // Tailwind Classes for the container:
      className="relative inline-block cursor-pointer overflow-hidden text-xl font-extrabold uppercase text-black hover:text-black transition duration-300"
      style={{ lineHeight: 1.2 }} // Fine-tune line-height if needed
    >
      {/* Default Text Element */}
      <span 
        data-type="default" 
        className="block will-change-transform" // will-change-transform for GSAP performance
      >
        {children}
      </span>
      
      {/* Hover Text Element */}
      <span 
        data-type="hover" 
        // Tailwind Classes: Absolute positioning on top of default text
        className="absolute top-0 left-0 block will-change-transform" // Tailwind color on hover
      >
        {children}
      </span>
    </a>
  );
}