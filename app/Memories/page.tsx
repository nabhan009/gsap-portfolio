'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from "next/link";
const helmets = [
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
    defaultImage:
      '/ecommerce.png',
    hoverImage:
      '/ecommerce 1.png',
  },
  // {
  //   id: 3,
  //   name: 'Dark Glitter',
  //   year: '2025',
  //   defaultImage:
  //     'https://images.unsplash.com/photo-1599056458450-4228c3e1b5c3?w=300&h=300&fit=crop',
  //   hoverImage:
  //     'https://images.unsplash.com/photo-1568389876664-df3e1b2e58b1?w=300&h=300&fit=crop',
  // },
  // {
  //   id: 4,
  //   name: 'Dark Glitter',
  //   year: '2025',
  //   defaultImage:
  //     'https://images.unsplash.com/photo-1599056458450-4228c3e1b5c3?w=300&h=300&fit=crop',
  //   hoverImage:
  //     'https://images.unsplash.com/photo-1568389876664-df3e1b2e58b1?w=300&h=300&fit=crop',
  // },
];

const HelmetCard = ({ helmet}) => {
  const cardRef = useRef(null);
  const defaultImageRef = useRef(null);
  const hoverImageRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const defaultImage = defaultImageRef.current;
    const hoverImage = hoverImageRef.current;
    const label = labelRef.current;

    gsap.set(hoverImage, { opacity: 0, scale: 1.2 });

    const handleMouseEnter = () => {
      gsap.to(defaultImage, {
        opacity: 0,
        scale: 1.2,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(hoverImage, {
        opacity: 1,
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(label, {
        y: -5,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(defaultImage, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(hoverImage, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: 'power3.out',
      });

      gsap.to(label, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl border-2 border-[#333] bg-black transition-all duration-300 cursor-pointer p-3"
      style={{ aspectRatio: '1/1' }}
    >
      {/* 🔹 TEXT AT TOP OF IMAGE */}
      <div className="absolute top-2 left-2 right-2 flex justify-between z-10">
        <span className="text-white text-sm font-bold">
          {helmet.name}
        </span>
      </div>

      {/* 🔹 IMAGE CONTAINER */}
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
        />
      </div>

      {/* 🔹 BOTTOM LABEL (optional — you can remove if not needed) */}
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

        {/* 🔹 GRID FIXED + GAPS ALL SIDES */}
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
