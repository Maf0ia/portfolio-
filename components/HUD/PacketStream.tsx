"use client";

import React, { useEffect, useRef } from 'react';

const PROTOCOLS = ['TCP', 'UDP', 'HTTP', 'SSH', 'FTP', 'TLSv1.2', 'ICMP', 'DNS'];
const HEX = '0123456789ABCDEF';

export const PacketStream = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const packets: { x: number; y: number; text: string; speed: number; opacity: number }[] = [];

        const createPacket = () => {
            const x = Math.random() * canvas.width;
            const speed = 1 + Math.random() * 3;
            const protocol = PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)];
            const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
            const hex = [...Array(4)].map(() => HEX[Math.floor(Math.random() * 16)]).join('');

            return {
                x,
                y: -20,
                text: `[${protocol}] ${ip} :: ${hex}`,
                speed,
                opacity: 0.1 + Math.random() * 0.4
            };
        };

        // Initialize some packets
        for (let i = 0; i < 30; i++) {
            const p = createPacket();
            p.y = Math.random() * canvas.height;
            packets.push(p);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.font = '10px Courier New';

            packets.forEach((p, idx) => {
                ctx.fillStyle = `rgba(0, 243, 255, ${p.opacity})`;
                ctx.fillText(p.text, p.x, p.y);

                p.y += p.speed;

                if (p.y > canvas.height) {
                    packets[idx] = createPacket();
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener('resize', setCanvasSize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        />
    );
};
