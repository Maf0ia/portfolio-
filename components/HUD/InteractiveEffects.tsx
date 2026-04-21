"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Typing effect for node headers
export const TypeWriter = ({ text, speed = 30, className = '' }: { text: string, speed?: number, className?: string }) => {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <span className={className}>{displayed}<span className="animate-pulse text-neon-cyan">_</span></span>;
};

// Animated counter that counts up from 0
export const AnimatedCounter = ({ target, duration = 1.5, suffix = '', className = '' }: { target: number, duration?: number, suffix?: string, className?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = target / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [target, duration]);

    return <span className={className}>{count}{suffix}</span>;
};

// Glitch text effect on hover
export const GlitchText = ({ text, className = '' }: { text: string, className?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [glitchedText, setGlitchedText] = useState(text);

    useEffect(() => {
        if (!isHovered) { setGlitchedText(text); return; }
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01';
        let frame = 0;
        const maxFrames = 6;
        const timer = setInterval(() => {
            if (frame >= maxFrames) { setGlitchedText(text); clearInterval(timer); return; }
            setGlitchedText(text.split('').map((c, i) =>
                i < frame ? text[i] : (Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : c)
            ).join(''));
            frame++;
        }, 50);
        return () => clearInterval(timer);
    }, [isHovered, text]);

    return (
        <span
            className={`cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {glitchedText}
        </span>
    );
};
