"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Text from "./text/page";
import AboutSection from "./about/page";
import CinematicSection from "./Photo/page";
import HelmetGallery from "./Memories/page";
import Footer from "./Footer/page";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textWrapperRef = useRef(null);
  const textmainWrapperRef = useRef(null);
  const text = useRef(null);
  const head = useRef(null);
  const logo = useRef(null);
  const para = useRef(null);
  // Horizontal section refs
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      //// Text and logo animations
      gsap.from(text.current, { opacity: 0, y: -30, duration: 1,delay:2.1 });
      gsap.from(para.current, { opacity: 0, x: 40, duration: 1,delay:2.1 });

      gsap.to(textWrapperRef.current, {
        x: "-50%",
        repeat: -1,
        ease: "none",
        duration: 25,
      });
      gsap.to(textmainWrapperRef.current, {
        x: "50%",
        repeat: -1,
        ease: "none",
        duration: 25,
      });

      // Image scroll animation
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "100%",
          scrub: true,
          pin: true,
        },
      })
   .to(imageRef.current, {
          scale: 0.6,
          yPercent: 25,
          ease: "none",
          duration: 1,
        })
        .to(
          imageRef.current,
          {
            opacity: 0.80,
            ease: "none",
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(head.current, { opacity: 0, y: -20, duration: 1 })
        .from(logo.current, {
          opacity: 0,
          y: 10,
          scale: 0.9,
          rotation: -2,
          duration: 2,
          ease: "elastic.out(1, 1)",
        });

      // Horizontal scroll after text section
      const horizontalContainer = horizontalRef.current;
      const panels = horizontalContainer?.querySelectorAll(".panel");
      if (horizontalContainer && panels) {
        const totalPanels = panels.length;

        // Smooth background color change during horizontal scroll


        gsap.to(panels, {
      xPercent: -100 * (totalPanels - 1),
          ease: "power1.out",         // SMOOTH MOVEMENT
          scrub: 1.2,         
          scrollTrigger: {
            trigger: horizontalContainer,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () =>
              `+=${horizontalContainer.offsetWidth - window.innerWidth}`,
            anticipatePin: 1,
          },
        });
      }
    }, containerRef);
    
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div className=" overflow-x-hidden ">
      {/* Hero / Text Section */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-x-hidden relative bg-white"
      >
        <div ref={head}>
          <h1 className="fixed mt-3 font-serif text-6xl tracking-tighter left-0 whitespace-nowrap text-[30px] font-bold text-black opacity-80 pointer-events-none">
            nabuuuhh.
          </h1>
        </div>

        {/* MOVING BACKGROUND TEXT */}
        <div
          ref={textmainWrapperRef}
          className="absolute top-1/2 right-0 whitespace-nowrap text-[130px] font-bold text-black opacity-20 pointer-events-none"
          style={{ transform: "translateY(-50%)" }}
        >
          MUHAMMED NABHAN MUHAMMED NABHAN MUHAMMED NABHAN
        </div>
        <div
          ref={textWrapperRef}
          className="absolute top-1/2 left-0 whitespace-nowrap text-[75px] font-bold text-black opacity-60 pointer-events-none"
          style={{ transform: "translateY(30%)" }}
        >
          NABHAN'S PORTFOLIO NABHAN'S PORTFOLIO NABHAN'S PORTFOLIO
        </div>

        {/* Logo */}
        <div
          ref={logo}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 z-0"
        >
          <svg
            viewBox="0 0 300 150"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[150px] h-auto"
          >
            <rect width="300" height="150" fill="white" />
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
            <text
              x="150"
              y="120"
              fontFamily="Arial, sans-serif"
              fontSize="16"
              fontWeight="bold"
              fill="black"
              textAnchor="middle"
              letterSpacing="2"
            >
              WELCOME GUYS
            </text>
          </svg>
        </div>

        {/* Hero Image */}
        <div
          ref={imageRef}
          className="w-full h-screen flex items-center justify-center bg-gray-200 relative"
          style={{ transformOrigin: "center top" }}
        >
          <div className="w-1/2 h-full flex items-center justify-center overflow-hidden relative">
            <img
              src="/hero img.png"
              className="w-full h-full object-cover grayscale opacity-100"
              alt="Portfolio Headshot"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/10 to-gray-100"></div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center px-12">
            <h1
              ref={text}
              className="text-neutral-900 text-[55px] md:text-[75px] font-semibold leading-tight opacity-70"
            >
              Front-End
              <br />
              Developer
            </h1>
            <p
              ref={para}
              className="text-neutral-900 mt-6 text-lg md:text-xl max-w-md opacity-100"
            >
              I craft clean, modern, and high-performance websites using React,
              Next.js, Tailwind, and GSAP.
            </p>
          </div>
        </div>
      </div>
      {/* Extra vertical section after horizontal */}
      <div className="w-screen h-screen flex items-center overflow-y-hidden justify-center bg-white">
        <Text />
      </div>
{/* Horizontal Scroll Section */}
<div ref={horizontalRef} className="flex h-screen w-[200vw] "> {/* 2 panels example */}

  {/* Section 1 */}
  <section className="panel w-screen h-screen flex-shrink-0  bg-white flex items-center justify-center p-12">
    <div className="max-w-6xl w-full h-full grid grid-cols-12 grid-rows-12 gap-4 relative">

      {/* Text above large image */}
<div className=" col-span-4 col-start-4 text-center">
  <p className="font-serif text-6xl tracking-tighter text-left left-0 whitespace-nowrap text-[15px] font-bold text-black opacity-90 pointer-events-none leading-snug mb-2">
    <span className="text-gray-600">I started my coding journey </span>
    <span className="text-gray-400 font-semibold">on July 2</span>
    <br />
    <span className="text-gray-600">with </span>
    <span className="text-gray-400 font-semibold">zero prior</span>
    <span className="text-gray-600"> coding knowledge.</span>
    <br />
    <span className="text-gray-600">Everything I’ve learned comes from </span>
    <span className="text-gray-400 font-semibold">practice and passion.</span>
  </p>
</div>


      {/* Large center image */}
      <div className="col-span-8 row-span-10 col-start-3  row-start-4 flex items-center justify-center">
        <div className="w-[400px] h-[350px] relative">
        <h1 className="font-bold text-black opacity-20 text-[10px] mb-2">Never Give Up</h1>
          <img src="/pic1.jpg" alt="Large" className="w-full h-full object-cover shadow-lg opacity-50" />
        </div>
      </div>

      {/* Small image - top left */}
      <div className="col-span-2 row-span-4 col-start-1 row-start-1 flex items-center justify-center">
        <div className="w-[200px] h-[200px] relative">
        <h1 className="text-black font-serif opacity-40 text-[10px] mb-2">Joined at -2025</h1>

          <img src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSypKqIJLChNLoNtMeC_SJXgwpJ5hSDbqi26-wK_BBEmz2HKShtfKQk3nmynVhaaUz5Igf_cfrT63yX8eTDXsDZWk2gID_YjVCVN_5vkAoxLGeeIGkHoue7sr8-NBaa-3mZ1YsP3=s1360-w1360-h1020-rw" alt="" className="w-full h-full object-cover opacity-70" />
        </div>
      </div>

      {/* Small image - top right */}
      <div className="col-span-3 row-span-2 col-start-9 row-start-2 flex items-center justify-center">
        <div className="w-[175px] h-[175px] relative">
        <h1 className=" text-black font-serif opacity-40 text-[10px] mb-2">Small Clone -2025</h1>

          <img src="/w3.png" alt="" className="w-full h-full object-cover opacity-60" />
        </div>
      </div>

      {/* Small image - bottom left */}
      <div className="col-span-2 row-span-6 col-start-2 row-start-8 flex items-center justify-center">
        <div className="w-[175px] h-[175px] relative">
                  <h1 className=" text-black font-serif opacity-20 text-[10px] mb-2">First Main Clone Project -2025</h1>

          <img src="/ixigo.png" alt="" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>

      {/* Small image - bottom right */}
      <div className="col-span-2 row-span-2 col-start-11 row-start-9 flex items-center justify-center">
        <div className="w-[175px] h-[175px] relative">
            <h1 className="font-serif text-black opacity-20 text-[10px] mb-2">Late night work -2025</h1>
          <img src="/late.jpeg" alt="" className="w-full h-full object-cover opacity-60" />
        </div>
      </div>
    </div>
  </section>
  <section className="panel w-screen h-screen flex-shrink-0 bg-white flex items-center justify-center p-12">
    <div className="max-w-6xl w-full h-full grid grid-cols-12 grid-rows-12 gap-4 relative">

      {/* Text below large image */}
      <div className="col-span-4 col-start-5 row-start-11 text-center mb-20">
        <p className="font-serif text-6xl tracking-tighter left-0 whitespace-nowrap text-[25px] font-bold text-black opacity-90 pointer-events-none leading-snug mb-2">
          <span className="text-gray-900">It doesn't matter </span>
          <span className="text-gray-500 font-semibold">where</span>
          <br />
          <span className="text-gray-900">you start, it's </span>
          <span className="text-gray-500 font-semibold">how</span>
          <span className="text-gray-900"> you</span>
          <br />
          <span className="text-gray-900">progress from there.</span>
        </p>
</div>

      {/* Large center image */}
      <div className="col-span-8 row-span-8 col-start-4  row-start-1 flex items-center justify-center">
        <div className="w-[400px] h-[350px] relative">
          <img src="/pic2.jpeg" alt="Large" className="w-full h-full object-cover shadow-lg opacity-80" />
        </div>
        
      </div>

      {/* Small image - top left */}
      <div className="col-span-3 row-span-2 col-start-1 row-start-2 flex items-center justify-center">
        <div className="w-[250px] h-[150px] relative">
        <h1 className="font-bold text-black opacity-20 text-[10px] mb-2">E-Commerce -2025</h1>

          <img src="/ecommerce.png" alt="" className="w-full h-full object-cover opacity-50" />        </div>
      </div>

      {/* Small image - top right */}
      <div className="col-span-3 row-span-2 col-start-13 row-start-3 flex items-center justify-center">
        <div className="w-[150px] h-[150px] relative">
        <h1 className="font-bold text-black opacity-20 text-[10px] mb-2">Work Hard</h1>

          <img src="/pic3.jpeg" alt="" className="w-full h-full object-cover opacity-40" />
        </div>
      </div>

      {/* Small image - bottom left */}
      <div className="col-span-2 row-span-6 col-start-1 row-start-8 flex items-center justify-center">
        <div className="w-[150px] h-[150px] relative">
                  <h1 className="font-serif text-black opacity-20 text-[10px] mb-2">The Journey</h1>

          <img src="/pic4.png" alt="" className="w-full h-full object-cover " />
        </div>
      </div>

      {/* Small image - bottom right */}
      <div className="col-span-6 row-span-2 col-start-11 row-start-9 flex items-center justify-center">
        <div className="w-[250px] h-[150px] relative">
                  <h1 className="font-bold text-black opacity-20 text-[10px] mb-2">Gsap Portfolio -2025</h1>
          <img src="/portfolio.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</div>
        <AboutSection />
        <CinematicSection />
        <HelmetGallery />
        <Footer />
    </div>
  );
}
