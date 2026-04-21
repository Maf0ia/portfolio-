"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface CinematicTransitionProps {
  isComplete: boolean;
  onComplete: () => void;
}

export const CinematicTransition = ({ isComplete, onComplete }: CinematicTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isComplete && containerRef.current && mapRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 500);
        }
      });

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.in'
      })
      .fromTo(mapRef.current, {
        scale: 8,
        opacity: 0,
        rotationX: 45
      }, {
        scale: 1,
        opacity: 1,
        rotationX: 0,
        duration: 2,
        ease: 'power4.inOut'
      }, '-=0.2')
      .to('.map-grid-line', {
        opacity: 0.3,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=1')
      .to('.map-node', {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      .to('.hud-overlay', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3')
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }, '+=0.5');
    }
  }, [isComplete, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] bg-black flex items-center justify-center overflow-hidden"
      style={{ opacity: 0, perspective: '2000px' }}
    >
      <div
        ref={mapRef}
        className="relative w-full h-full"
        style={{ opacity: 0, transform: 'scale(8) rotateX(45deg)' }}
      >
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="500" cy="250" r="200" fill="url(#centerGlow)" />

          <path
            d="M150,180 Q200,120 280,140 T400,160 T500,130 T600,150 T700,140 T800,160 T900,180 L880,240 L750,260 L600,240 L450,260 L300,240 L200,220 Z"
            fill="none"
            stroke="#00f3ff"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#glow)"
            className="map-grid-line"
            style={{ opacity: 0 }}
          />
          <path
            d="M280,240 L250,300 L280,360 L320,340 L350,300 L320,260 Z"
            fill="none"
            stroke="#00f3ff"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#glow)"
            className="map-grid-line"
            style={{ opacity: 0 }}
          />
          <path
            d="M600,140 L640,100 L680,120 L720,150 L680,180 L640,160 Z"
            fill="none"
            stroke="#00f3ff"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#glow)"
            className="map-grid-line"
            style={{ opacity: 0 }}
          />
          <path
            d="M720,240 L760,210 L800,240 L840,270 L800,300 L760,280 Z"
            fill="none"
            stroke="#00f3ff"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#glow)"
            className="map-grid-line"
            style={{ opacity: 0 }}
          />

          {[
            { x: '20%', y: '25%' },
            { x: '25%', y: '30%' },
            { x: '48%', y: '45%' },
            { x: '52%', y: '42%' },
            { x: '65%', y: '35%' },
            { x: '68%', y: '38%' },
            { x: '75%', y: '55%' },
            { x: '78%', y: '52%' },
            { x: '82%', y: '40%' },
            { x: '85%', y: '37%' },
            { x: '30%', y: '60%' },
            { x: '35%', y: '65%' },
            { x: '50%', y: '20%' },
            { x: '55%', y: '22%' }
          ].map((pos, i) => (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r="4"
              fill="#00f3ff"
              className="map-node"
              style={{ opacity: 0, transform: 'scale(0)' }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 10}%`}
                x2="100%"
                y2={`${i * 10}%`}
                stroke="#00f3ff"
                strokeWidth="0.5"
                className="map-grid-line"
                style={{ opacity: 0 }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${i * 5}%`}
                y1="0"
                x2={`${i * 5}%`}
                y2="100%"
                stroke="#00f3ff"
                strokeWidth="0.5"
                className="map-grid-line"
                style={{ opacity: 0 }}
              />
            ))}
          </svg>
        </div>

        <div className="hud-overlay absolute top-8 left-8" style={{ opacity: 0, y: 20 }}>
          <div className="text-2xl font-bold text-neon-cyan tracking-[0.3em]">GLOBAL_PRESENCE.map</div>
          <div className="text-sm text-gray-400 mt-2">INITIALIZING WORLD DOMINANCE PROTOCOL</div>
        </div>

        <div className="hud-overlay absolute top-8 right-8 text-right" style={{ opacity: 0, y: 20 }}>
          <div className="text-sm text-neon-green font-bold">NODES ONLINE: 968</div>
          <div className="text-sm text-neon-cyan font-bold">REGIONS: 47</div>
        </div>

        <div className="hud-overlay absolute bottom-8 left-1/2 transform -translate-x-1/2" style={{ opacity: 0, y: 20 }}>
          <div className="text-lg text-neon-cyan font-bold tracking-[0.2em] animate-pulse">
            ACCESS GRANTED - ESTABLISHING SECURE CONNECTION
          </div>
        </div>
      </div>
    </div>
  );
};
