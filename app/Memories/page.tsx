'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface HelmetItem {
  id: number;
  name: string;
  year: string;
  defaultImage: string;
  hoverImage: string;
}

const helmets: HelmetItem[] = [
  {
    id: 1,
    name: 'Season',
    year: '2025',
    defaultImage: '/hero img.png',
    hoverImage: '/late.jpeg',
  },
  {
    id: 2,
    name: 'Falcon',
    year: '2025',
    defaultImage: '/ecommerce.png',
    hoverImage: '/ecommerce 1.png',
  },
];

interface HelmetCardProps {
  helmet: HelmetItem;
}

const HelmetCard: React.FC<HelmetCardProps> = ({ helmet }) => {
  const defaultImageRef = useRef<HTMLImageElement | null>(null);
  const hoverImageRef = useRef<HTMLImageElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (!defaultImageRef.current || !hoverImageRef.current || !labelRef.current) return;

    gsap.to(defaultImageRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.to(hoverImageRef.current, {
      opacity: 1,
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.to(labelRef.current, {
      y: -5,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!defaultImageRef.current || !hoverImageRef.current || !labelRef.current) return;

    gsap.to(defaultImageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.to(hoverImageRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.5,
      ease: 'power3.out',
    });

    gsap.to(labelRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-xl border-2 border-[#333] bg-black transition-all duration-300 cursor-pointer p-3"
      style={{ aspectRatio: '1/1' }}
    >
      <div className="absolute top-2 left-2 right-2 flex justify-between z-10">
        <span className="text-white text-sm font-bold">
          {helmet.name}
        </span>
      </div>

      <div className="w-full h-full overflow-hidden relative rounded-lg">
        <img
          ref={defaultImageRef}
          src={helmet.defaultImage}
          alt={`${helmet.name} ${helmet.year}`}
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />

        <img
          ref={hoverImageRef}
          src={helmet.hoverImage}
          alt={`${helmet.name} ${helmet.year} hover`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
      </div>

      <div
        ref={labelRef}
        className="absolute bottom-2 right-2 px-3 py-1 rounded-md bg-black/50 backdrop-blur text-white text-xs font-semibold"
      >
        VIEW MORE
      </div>
    </div>
  );
};

export default function HelmetGallery() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-white text-3xl font-bold text-center mb-10">
          PROJECTS
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
          {helmets.map((helmet) => (
            <Link key={helmet.id} href={`/projects/${helmet.id}`} className="w-[500px]">
              <HelmetCard helmet={helmet} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
