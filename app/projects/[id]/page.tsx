'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

const helmets = [
  {
    id: '1',
    name: 'Season',
    year: '2025',
    video: '/hero img.png',
    description: 'Short description of the Season project.',
  },
  {
    id: '2',
    name: 'Falcon',
    year: '2025',
    video: '/falcon.mp4',
    description: `🛠️ Tech Stack Used
⚛️ React.js — for building a dynamic and component-based UI
🎨 Tailwind CSS — for fast, responsive, utility-first styling
🗂️ db.json — for simulating a backend & managing product data
✨ AOS (Animate On Scroll) — for smooth scroll-based animations
🔥 Project Features
This project is not only visually appealing, but also fully functional:
✅ Add to Cart & Remove from Cart functionality
 ✅ Wishlist system to save favorite products
 ✅ Real-time UI updates when cart or wishlist changes
 ✅ Local storage support — data persists even after refreshing
 ✅ Product list rendered dynamically from db.json
 ✅ Modern, clean, responsive UI across devices
 ✅ Smooth scroll animations for a better user experience using AOS
 ✅ Reusable components & clean folder structuring
🌟 What I Learned & Improved
- This project helped me strengthen:
- Component-based architecture in React
- Props & state handling
- Managing app-level data using JSON
- Tailwind CSS best practices
- Enhancing UX with subtle & smooth animations`,
  },
];

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id as string;

  const helmet = helmets.find(h => h.id === id);

  if (!helmet) {
    return (
      <div className="text-white text-center p-10">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center gap-6 py-10">
      <h1 className="text-3xl font-bold text-white">{helmet.name}</h1>

<video
  src={helmet.video}
  controls
  className="rounded-xl w-[500px] h-auto"
  autoPlay
  loop
  muted
/>

      <p className="text-gray-300 max-w-xl text-center">
        {helmet.description}
      </p>
    </div>
  );
}
