"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Terminal, Zap, Globe, MessageCircle } from 'lucide-react';
import { TypeWriter, AnimatedCounter, GlitchText } from './InteractiveEffects';
import { gsap } from 'gsap';

export const IdentityNode = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const tl = gsap.timeline();
            tl.fromTo('.profile-section', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
              .fromTo('.stats-grid > *', { opacity: 0, y: 20, stagger: 0.1 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.4')
              .fromTo('.about-section', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
              .fromTo('.skills-grid > *', { opacity: 0, scale: 0.9, stagger: 0.08 }, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3');
        }
    }, []);

    return (
        <div ref={containerRef} className="space-y-12">
            {/* Profile Header */}
            <section className="profile-section flex flex-col md:flex-row gap-8 items-start">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-neon-cyan/20 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-48 h-48 bg-black border-2 border-neon-cyan/40 bg-[url('/profile.webp')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent bg-[length:100%_4px] animate-scanline pointer-events-none" />
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <span className="text-xs font-bold text-neon-cyan bg-neon-cyan/10 px-3 py-1 border-l-2 border-neon-cyan uppercase tracking-widest">AGENT: MAFIA</span>
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em]">STATUS: [OPERATIONAL]</span>

                        {/* 24/7 Discord Status */}
                        <div className="mt-2 flex items-center gap-2 bg-neon-green/5 border border-neon-green/20 px-3 py-1.5">
                            <div className="w-2 h-2 bg-neon-green rounded-full live-pulse" />
                            <MessageCircle size={12} className="text-neon-green" />
                            <span className="text-xs font-bold text-neon-green tracking-tight">24/7 ONLINE</span>
                        </div>
                        <div className="flex items-center gap-2 text-neon-cyan">
                            <Globe size={12} />
                            <span className="text-xs font-bold tracking-tight" data-tooltip="Click to copy: 1337x0_">Discord: 1337x0_</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                        <User className="text-neon-cyan" size={24} /> <TypeWriter text="AGENT_PROFILE.xml" speed={40} />
                    </h2>
                    <div className="stats-grid flex gap-6 mt-2 mb-4">
                        <div className="text-center border border-hud bg-black/40 px-4 py-2">
                            <AnimatedCounter target={7} duration={1} suffix="+" className="text-2xl font-bold text-neon-cyan glow-cyan" />
                            <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">YEARS_EXP</div>
                        </div>
                        <div className="text-center border border-hud bg-black/40 px-4 py-2">
                            <AnimatedCounter target={20} duration={1.5} suffix="+" className="text-2xl font-bold text-neon-cyan glow-cyan" />
                            <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">PROJECTS</div>
                        </div>
                        <div className="text-center border border-hud bg-black/40 px-4 py-2">
                            <AnimatedCounter target={9} duration={1} className="text-2xl font-bold text-neon-cyan glow-cyan" />
                            <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">LANGUAGES</div>
                        </div>
                    </div>
                    <div className="about-section space-y-4 text-gray-300 font-light leading-relaxed max-w-2xl text-[15px]">
                        <p>
                            I am <span className="text-neon-cyan font-bold">Mafia</span>, an 18-year-old Full-Stack Developer and Cybersecurity Researcher based in Egypt.
                            With 7 years of hands-on experience in the software industry, I've mastered the art of building, breaking, and securing digital environments.
                        </p>
                        <p>
                            I specialize in <span className="text-neon-red font-bold">reverse engineering</span>, <span className="text-neon-green font-bold">malware analysis</span>,
                            and building high-performance <span className="text-neon-amber font-bold">Discord tooling</span> and cross-platform applications.
                        </p>
                        <p className="text-neon-cyan font-bold text-base">
                            ⚡ Direct Communications: Discord @ 1337x0_ — Available 24/7
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Arsenal */}
            <section className="skills-grid grid md:grid-cols-2 gap-6">
                <ProfileStat
                    title="LANGUAGES.DB"
                    items={["Python", "C#", "C++", "Java", "Dart", "TypeScript", "JavaScript", "PHP", "HTML/CSS","Rust"]}
                    icon={<Terminal size={18} className="text-neon-cyan" />}
                    tooltip="Active programming languages"
                />
                <ProfileStat
                    title="FRAMEWORKS.SO"
                    items={["Flutter", "Node.js", "FastAPI", "Next.js", "React", "TailwindCSS"]}
                    icon={<Zap size={18} className="text-neon-amber" />}
                    tooltip="Frameworks and libraries"
                />
                <ProfileStat
                    title="CYBERSEC.EXP"
                    items={["Pentesting", "Reverse Engineering", "Malware Analysis", "RAT Development", "Exploit Research", "Cracking"]}
                    icon={<Shield size={18} className="text-neon-red" />}
                    tooltip="Offensive security expertise"
                />
                <ProfileStat
                    title="OPERATIONS.TYPE"
                    items={["Discord Tooling", "Android Modding", "Cross-Platform Mobile", "Game Hacking", "Trojan Dev"]}
                    icon={<Globe size={18} className="text-neon-green" />}
                    tooltip="Operational specialties"
                />
            </section>
        </div>
    );
};

const ProfileStat = ({ title, items, icon, tooltip }: { title: string, items: string[], icon: any, tooltip?: string }) => (
    <div className="border border-hud bg-white/5 p-6 hover:bg-white/10 transition-colors group" data-tooltip={tooltip}>
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 group-hover:text-neon-cyan transition-colors">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {items.map((item, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-black/40 border border-white/10 text-gray-300 font-medium tracking-tight hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors cursor-default">
                    {item}
                </span>
            ))}
        </div>
    </div>
);
