"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Binary, Terminal, Radio, Eye } from 'lucide-react';
import { ProjectModal, type ProjectDetail } from './ProjectModal';

const SECURITY_INTEL: ProjectDetail[] = [
    {
        title: "xWorm RAT — Reversed",
        category: "REVERSE ENGINEERING",
        desc: "Fully reversed the xWorm remote administration tool. Decompiled the .NET binary, mapped its C2 protocol, and documented every command handler and persistence mechanism.",
        tags: ["C#", ".NET", "dnSpy", "RE"],
        details: [
            "Decompiled the entire xWorm binary using dnSpy and ILSpy",
            "Mapped out the Command & Control protocol and packet structure",
            "Identified persistence mechanisms: registry keys, scheduled tasks, startup folders",
            "Documented keylogger, screen capture, and file exfiltration modules",
            "Published full technical analysis of obfuscation techniques used"
        ],
        status: "COMPLETED",
        color: "neon-red"
    },
    {
        title: "Cypher RAT — Cracked",
        category: "CRACKING / ANALYSIS",
        desc: "Cracked the Cypher RAT Android builder. Bypassed license validation, reverse-engineered the APK generation pipeline, and analyzed the payload injection chain.",
        tags: ["Java", "Android", "APK", "Cracking"],
        details: [
            "Bypassed the license validation system using binary patching",
            "Reverse-engineered the APK builder and payload injection pipeline",
            "Analyzed the Android accessibility service abuse for persistence",
            "Documented SMS interception and call recording capabilities",
            "Identified encrypted C2 communication channels and key exchange"
        ],
        status: "CRACKED",
        color: "neon-red"
    },
    {
        title: "Android Trojan — Custom Build",
        category: "OFFENSIVE DEVELOPMENT",
        desc: "Built a custom Android Trojan from scratch with stealth capabilities, encrypted C2 communications, and modular payload architecture for research purposes.",
        tags: ["Java", "Android SDK", "Encryption", "C2"],
        details: [
            "Custom-built Android RAT with encrypted reverse shell",
            "Implemented dynamic payload loading via reflection",
            "Stealth module: hides app icon, survives reboots, anti-uninstall",
            "Remote features: camera, microphone, GPS, file manager, keylogger",
            "AES-256 encrypted C2 channel with domain-fronting support"
        ],
        status: "ACTIVE_DEV",
        color: "neon-red"
    },
    {
        title: "Mafia Nuker (Python)",
        category: "DISCORD TOOLING",
        desc: "High-performance Discord server nuking tool built in Python. Mass-ban, mass-channel creation, role manipulation, and webhook flooding.",
        tags: ["Python", "Discord API", "AsyncIO"],
        details: [
            "Mass-ban all members with configurable delays to avoid rate limits",
            "Mass-create channels and roles with custom spam messages",
            "Webhook flooding and server icon/name manipulation",
            "Token-based authentication with multi-account support",
            "Built-in anti-detection with randomized request patterns"
        ],
        status: "DEPLOYED",
        color: "neon-red"
    },
    {
        title: "Mafia Nuker (C#)",
        category: "DISCORD TOOLING",
        desc: "C# rewrite of Mafia Nuker with a native Windows GUI, faster execution, and multi-threaded operations for maximum destruction speed.",
        tags: ["C#", ".NET", "Discord API", "Windows"],
        details: [
            "Full C# rewrite with native Windows Forms interface",
            "Multi-threaded nuke operations for maximum speed",
            "Same feature set as Python version with improved performance",
            "Built-in token manager and server selector",
            "One-click nuke with configurable attack vectors"
        ],
        status: "DEPLOYED",
        color: "neon-red"
    }
];

export const SecurityNode = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

    return (
        <div className="relative h-full animate-in fade-in slide-in-from-top-5 duration-700">
            {/* Background Code Scroll */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none select-none">
                <div className="flex flex-col gap-1 font-matrix text-[8px] text-neon-red whitespace-nowrap animate-pulse">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <span>0x{Math.random().toString(16).slice(2, 10)}</span>
                            <span>MOV EAX, [ESP+{Math.floor(Math.random() * 100)}]</span>
                            <span>PUSH EBX</span>
                            <span>INT 0x80</span>
                            <span>RET</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 space-y-10">
                <section className="border-b border-neon-red/20 pb-6">
                    <h2 className="text-3xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                        <ShieldAlert className="text-neon-red px-1" size={32} /> SECURITY_PROTOCOLS.intel
                    </h2>
                    <p className="text-sm text-gray-400 font-medium tracking-widest mt-2 uppercase">
                        REVERSE ENGINEERING / MALWARE ANALYSIS / OFFENSIVE RESEARCH
                    </p>
                    <p className="text-xs text-neon-red/60 mt-1 font-bold tracking-wider">
                        ▸ CLICK ANY PROJECT TO VIEW FULL INTEL
                    </p>
                </section>

                <div className="space-y-5">
                    {SECURITY_INTEL.map((intel, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedProject(intel)}
                            className="project-card bg-black/60 border-l-4 border-neon-red p-6 hover:bg-neon-red/5 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-neon-red tracking-[0.2em] uppercase">{intel.category}</span>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{intel.title}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    {intel.status && (
                                        <span className="text-[9px] px-2 py-0.5 border border-neon-red/40 text-neon-red font-bold">{intel.status}</span>
                                    )}
                                    <Eye className="text-neon-red/20 group-hover:text-neon-red transition-colors" size={16} />
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-3xl mb-4">
                                {intel.desc}
                            </p>

                            <div className="flex gap-2">
                                {intel.tags.map((tag, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 border border-neon-red/30 text-neon-red font-bold uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};
