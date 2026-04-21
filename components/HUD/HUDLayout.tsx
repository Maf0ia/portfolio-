"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { Terminal as TerminalIcon, Shield, Database, User, Menu, Network, Cpu, Hammer, Bot, Activity } from 'lucide-react';
import { PacketStream } from './PacketStream';
import { SystemMonitoring } from './SystemMonitoring';

export const HUDLayout = ({ children, terminal }: { children: React.ReactNode, terminal: React.ReactNode }) => {
    const { isBooted, activeNode, setActiveNode } = useSystem();

    if (!isBooted) return null;

    return (
        <div className="relative h-screen w-full bg-background overflow-hidden crt flex flex-col p-4 gap-4">
            <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Background Packet Stream */}
            <PacketStream />

            {/* Global Glitch Filter Overlay (Stabilized) */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-white blend-overlay" />

            {/* HUD Header */}
            <header className="h-14 border-hud bg-black/80 flex items-center justify-between px-6 shrink-0 z-20 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-green/5" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent animate-pulse" />
                
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-neon-cyan animate-pulse rounded-full shadow-[0_0_12px_#00f3ff]" />
                        <h1 className="text-sm md:text-base font-black tracking-[0.5em] glow-cyan uppercase select-none">DECOMPILED_REALITY v4.2.0</h1>
                    </div>
                    
                    <div className="hidden xl:flex items-center gap-3 border-l border-white/10 pl-6">
                        <span className="text-[11px] font-bold text-gray-400 tracking-[0.2em]">THREAT_LEVEL:</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        opacity: i < 3 ? [0.4, 1, 0.4] : 0.2,
                                        backgroundColor: i < 3 ? '#00f3ff' : '#333'
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-4 h-2 skew-x-[-20deg]"
                                />
                            ))}
                        </div>
                        <span className="text-[11px] font-bold text-neon-cyan animate-pulse ml-2">ELEVATED</span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center h-full">
                    <SystemMonitoring />
                </div>

                <div className="flex gap-10 text-[11px] items-center text-neon-cyan/80 font-bold tracking-widest hidden md:flex">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-gray-400">PING</span>
                        <span className="animate-pulse">12MS</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-gray-400">PACKETS</span>
                        <span className="text-neon-green">STABLE</span>
                    </div>
                    <div className="flex items-center gap-3 bg-neon-green/10 border border-neon-green/30 px-3 py-1.5">
                        <div className="w-2.5 h-2.5 bg-neon-green rounded-full live-pulse" />
                        <span className="tracking-[0.2em] text-neon-green">UPLINK_STABLE</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex gap-4 overflow-hidden z-20">
                {/* Sidebar Menu */}
                <aside className="w-16 md:w-64 border-hud bg-black/40 flex flex-col items-center md:items-stretch py-4 gap-2 shrink-0 overflow-y-auto scrollbar-hide backdrop-blur-sm relative">
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent" />
                    <MenuButton icon={<User size={18} />} label="IDENTITY_CORE" shortcut="1" isActive={activeNode === 'IDENTITY'} onClick={() => setActiveNode('IDENTITY')} />
                    <MenuButton icon={<Database size={18} />} label="OPERATIONS" shortcut="2" isActive={activeNode === 'OPERATIONS'} onClick={() => setActiveNode('OPERATIONS')} />
                    <MenuButton icon={<Activity size={18} />} label="SECURITY_LABS" shortcut="3" isActive={activeNode === 'SECURITY'} onClick={() => setActiveNode('SECURITY')} />
                    <MenuButton icon={<Network size={18} />} label="NETWORKING_HUB" shortcut="4" isActive={activeNode === 'NETWORKING'} onClick={() => setActiveNode('NETWORKING')} />
                    <MenuButton icon={<Cpu size={18} />} label="C2_DASHBOARD" shortcut="5" isActive={activeNode === 'C2'} onClick={() => setActiveNode('C2')} />
                    <MenuButton icon={<Hammer size={18} />} label="THE_FORGE" shortcut="6" isActive={activeNode === 'FORGE'} onClick={() => setActiveNode('FORGE')} />
                    <MenuButton icon={<Bot size={18} />} label="FULLSTACK_LOGS" shortcut="7" isActive={activeNode === 'FULLSTACK'} onClick={() => setActiveNode('FULLSTACK')} />
                    <MenuButton icon={<Shield size={18} />} label="KERNEL_MODS" shortcut="8" isActive={activeNode === 'KERNEL'} onClick={() => setActiveNode('KERNEL')} />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 border-hud bg-black/60 relative overflow-hidden flex flex-col backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/3 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
                    <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-neon-cyan/20 via-neon-cyan/40 to-neon-cyan/20" />
                    <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-neon-cyan/20 via-neon-cyan/40 to-neon-cyan/20" />

                    <div className="flex-1 overflow-auto p-8 relative z-10 scrollbar-hide">
                        {children}
                    </div>

                    {/* Decorative Corner Accents */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-neon-cyan/60" />
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-neon-cyan/60" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-neon-cyan/30" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-neon-cyan/30" />
                    <div className="absolute top-4 right-4 w-2 h-2 bg-neon-cyan/40 rounded-full animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-neon-green/40 rounded-full animate-pulse" />
                </main>
            </div>

            {/* Terminal Footer */}
            <footer className="h-44 border-hud bg-terminal-bg/80 shrink-0 z-20">
                {terminal}
            </footer>

            {/* Background Ambience */}
            <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="border-r border-neon-cyan/10 h-full" />
                    ))}
                </div>
            </div>
        </div>
    );
};

const MenuButton = ({ icon, label, shortcut, isActive, onClick }: { icon: any, label: string, shortcut: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`group flex items-center gap-3 px-4 py-3 transition-all duration-300 border-l-2 relative ${isActive ? 'bg-neon-cyan/10 border-neon-cyan text-white shadow-[inset_10px_0_15px_-10px_rgba(0,243,255,0.3)]' : 'border-transparent text-neon-cyan/40 hover:text-neon-cyan/80 hover:bg-white/5'}`}
    >
        <div className={`${isActive ? 'glow-cyan' : ''} transition-transform group-hover:scale-110`}>{icon}</div>
        <span className="hidden md:block text-[11px] font-bold tracking-[0.15em] flex-1 text-left">{label}</span>
        <span className={`hidden md:block text-[9px] font-bold tracking-wider px-2 py-0.5 border ${isActive ? 'border-neon-cyan/40 text-neon-cyan' : 'border-white/10 text-white/20 group-hover:text-neon-cyan/40 group-hover:border-neon-cyan/20'} transition-colors`}>{shortcut}</span>
    </button>
);
