"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { gsap } from 'gsap';

export const MatrixIntro = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { bootSystem, isBooted } = useSystem();
    const [loadingText, setLoadingText] = useState('INITIALIZING BOOT SECTOR...');

    useEffect(() => {
        if (isBooted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
        const assembly = ["MOV EAX, 1", "INT 0x80", "PUSH EBP", "SUB ESP, 0x40", "LEA ESI, [EAX+4]", "XOR EBX, EBX"];
        const characters = matrix.split("");

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00f3ff";
            ctx.font = fontSize + "px Courier New";

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.9 ? assembly[Math.floor(Math.random() * assembly.length)] : characters[Math.floor(Math.random() * characters.length)];
                ctx.fillStyle = Math.random() > 0.95 ? "#00ff41" : "#00f3ff";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        // GSAP enhanced text sequence
        const textSequence = [
            "DECOMPILING REALITY...",
            "BYPASSING KERNEL PROTECTION...",
            "MOUNTING INTELLIGENCE NODES...",
            "ACCESS GRANTED."
        ];

        let seqIdx = 0;
        const textInterval = setInterval(() => {
            if (seqIdx < textSequence.length) {
                setLoadingText(textSequence[seqIdx]);
                
                // GSAP glitch effect on text change
                gsap.fromTo('.loading-text', 
                    { opacity: 0, skewX: 20, x: -30, scaleX: 0.95 },
                    { opacity: 1, skewX: 0, x: 0, scaleX: 1, duration: 0.6, ease: 'power3.out' }
                );
                
                // Screen shake effect
                gsap.to('.matrix-intro', {
                    x: "random(-5, 5)",
                    y: "random(-3, 3)",
                    duration: 0.05,
                    repeat: 3,
                    yoyo: true,
                    ease: "power2.inOut"
                });
                
                seqIdx++;
            } else {
                clearInterval(textInterval);
                
                // GSAP exit animation
                gsap.timeline()
                    .to('.loading-text', { opacity: 0, y: -20, scale: 0.9, duration: 0.4 })
                    .to('.progress-bar', { scaleX: 1.1, opacity: 0, duration: 0.3 }, '-=0.2')
                    .to('.matrix-canvas', { opacity: 0, scale: 1.2, duration: 0.8, ease: 'power2.in' })
                    .then(() => {
                        setTimeout(bootSystem, 300);
                    });
            }
        }, 1200);

        // GSAP entrance animation
        gsap.fromTo('.loading-text', 
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
        );
        
        gsap.fromTo('.progress-container', 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, delay: 0.8, ease: 'back.out(1.7)' }
        );

        // Progress bar pulse animation
        gsap.to('.progress-bar', {
            boxShadow: '0 0 20px #00f3ff, 0 0 40px #00f3ff',
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        return () => {
            clearInterval(interval);
            clearInterval(textInterval);
        };
    }, [bootSystem, isBooted]);

    return (
        <AnimatePresence>
            {!isBooted && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1 }}
                    className="matrix-intro fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
                >
                    <canvas ref={canvasRef} className="matrix-canvas absolute inset-0 opacity-40 matrix-mask" />

                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="loading-text text-neon-cyan font-matrix text-xl md:text-2xl tracking-[0.3em] glow-cyan mb-4"
                        >
                            {loadingText}
                        </motion.div>
                        <div className="progress-container w-64 md:w-80 h-1.5 bg-gray-900 overflow-hidden rounded-full border border-neon-cyan/20">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 6, ease: "linear" }}
                                className="progress-bar h-full bg-gradient-to-r from-neon-cyan via-neon-cyan to-neon-green shadow-[0_0_10px_#00f3ff] origin-left rounded-full"
                            />
                        </div>
                        
                        {/* Decorative corner accents */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 border-t-2 border-l-2 border-neon-cyan/20 rounded-tl-3xl" />
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 border-b-2 border-r-2 border-neon-cyan/20 rounded-br-3xl" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
