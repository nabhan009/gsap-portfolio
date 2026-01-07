"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingLogo({ children }) {
  const logo = useRef(null);
  const loaderRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Timeline for loading animation
    const tl = gsap.timeline({
      onComplete: () => setLoading(false), // Hide loader after animation
    });

    tl.from(logo.current, {
      opacity: 0,
      scale: 0.6,
      y: 20,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)",
    })
      .to(logo.current, {
        scale: 1.1,
        duration: 0.4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
tl.to(loaderRef.current, {
  opacity: 0,
  duration: 0.6,
  ease: "power3.inOut",
  onComplete: () => {
    loaderRef.current.style.display = "none"; // remove completely
  }
});

  }, []);

  return (
    <>
      {/* Loader Overlay */}
      {loading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
        >
          <div ref={logo} className="w-[150px] h-auto">
            <svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <rect width="300" height="150" fill="white" />

              {/* M7 Logo */}
              <g transform="translate(150, 50)">
                <path
                  d="M -25 -15 L -25 15 L -18 15 L -18 0 L -10 12 L -2 0 L -2 15 L 5 15 L 5 -15 L -2 -15 L -10 0 L -18 -15 Z"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="2"
                />
                <path
                  d="M 10 -15 L 5 15 L 13 15 L 25 -10 L 25 15 L 33 15 L 33 -15 L 25 -15 L 13 10 L 18 -15 Z"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="2"
                />
              </g>

              {/* Text */}
              <text
                x="150"
                y="130"
                fontFamily="Arial, sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="black"
                textAnchor="middle"
                letterSpacing="2"
              >
                LOADING NABHAN
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
}
