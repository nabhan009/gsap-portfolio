"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards } from "./card";

gsap.registerPlugin(ScrollTrigger);

export default function StackingCards() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const elements = cardsRef.current;

    const lastCardST = ScrollTrigger.create({
      trigger: elements[elements.length - 1],
      start: "bottom bottom",
    });

    elements.forEach((card) => {
ScrollTrigger.create({
  trigger: card,
  start: "center center",
  end: () => lastCardST.start + 100,
  pin: true,
  pinSpacing: false,
  toggleActions: "restart none none reverse",
});

    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center py-40">
      
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          className={`card-wrapper mt-20 flex justify-center ${
            index % 3 === 0
              ? "rotate-0"
              : index % 2 === 0
              ? "rotate-3"
              : "-rotate-3"
          }`}
        >
          <div className="relative w-[300px] h-[550px] bg-black rounded-2xl shadow-xl overflow-hidden">
            
            {/* Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute top-0 left-0 w-full h-[80%] object-cover"
            />

            {/* Gradient + Text */}
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
              <h1 className="text-2xl font-bold">
                {card.title}
                <span className="ml-2 text-xs opacity-60">({card.year})</span>
              </h1>

              <div className="flex gap-2 mt-3 flex-wrap">
                {card.genres.map((genre, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase border border-white/70 px-2 py-1 rounded opacity-80"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Spacer */}
      <div className="h-screen" />
    </div>
  );
}
