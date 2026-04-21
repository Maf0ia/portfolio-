"use client";

import React, { useState, useEffect, useCallback } from 'react';

export const SystemMonitoring = () => {
    const [cpu, setCpu] = useState<number[]>(() => Array.from({ length: 20 }, () => Math.random() * 40 + 20));
    const [ram, setRam] = useState<number[]>(() => Array.from({ length: 20 }, () => Math.random() * 10 + 60));
    const [net, setNet] = useState<number[]>(() => Array.from({ length: 20 }, () => Math.random() * 80));

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => [...prev.slice(1), Math.random() * 40 + 20]);
            setRam(prev => [...prev.slice(1), Math.random() * 10 + 60]);
            setNet(prev => [...prev.slice(1), Math.random() * 80]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-5 items-center h-full px-4 border-l border-r border-white/5 bg-black/20">
            <MiniGraph label="CPU" data={cpu} color="#00f3ff" />
            <MiniGraph label="RAM" data={ram} color="#ff003c" />
            <MiniGraph label="NET" data={net} color="#00ff41" />
        </div>
    );
};

const MiniGraph = ({ label, data, color }: { label: string, data: number[], color: string }) => {
    const width = 80;
    const height = 22;
    const max = 100;
    const step = width / (data.length - 1);

    const pathD = data.map((v, i) => {
        const x = i * step;
        const y = height - (v / max) * height;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');

    const fillD = `${pathD} L ${width} ${height} L 0 ${height} Z`;
    const currentVal = Math.round(data[data.length - 1]);

    return (
        <div className="flex flex-col gap-0.5 w-[90px]" data-tooltip={`${label}: ${currentVal}%`}>
            <div className="flex justify-between items-end">
                <span className="text-[8px] font-bold text-gray-500 tracking-tighter uppercase">{label}</span>
                <span className="text-[9px] font-mono text-white/80 font-bold">{currentVal}%</span>
            </div>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                {/* Fill area */}
                <path d={fillD} fill={color} fillOpacity="0.08" />
                {/* Line */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Current value dot */}
                <circle
                    cx={width}
                    cy={height - (data[data.length - 1] / max) * height}
                    r="2"
                    fill={color}
                    opacity="0.9"
                />
            </svg>
        </div>
    );
};
