"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, Layers, Disc, AlertTriangle, Eye, Lock } from 'lucide-react';
import { ProjectModal, type ProjectDetail } from './ProjectModal';

const KERNEL_SPECS: ProjectDetail[] = [
    {
        title: "Custom PC RAT",
        category: "REMOTE ACCESS TROJAN",
        desc: "Fully custom-built Remote Access Trojan with advanced persistence, keylogging, screen capture, file exfiltration, and remote shell capabilities. Designed for maximum stealth and AV evasion.",
        tags: ["C++", "Windows API", "Socket Programming", "Encryption", "Process Injection"],
        details: [
            "Custom protocol for C2 communication with encrypted channels",
            "Advanced persistence mechanisms: Registry, Scheduled Tasks, WMI events",
            "Real-time keylogger with clipboard monitoring and screenshot capture",
            "File manager with upload/download/execute capabilities",
            "Remote shell with privilege escalation support",
            "Process hollowing and DLL injection for stealth execution",
            "Anti-debugging and VM detection evasion techniques",
            "Modular plugin architecture for extensible payloads"
        ],
        status: "CLASSIFIED",
        color: "neon-red"
    },
    {
        title: "C++ Nuker Tool",
        category: "NETWORK DISRUPTION UTILITY",
        desc: "High-performance C++ network stress testing and disruption tool. Features multi-threaded attack vectors, protocol exploitation, and bandwidth saturation capabilities.",
        tags: ["C++", "Multithreading", "Raw Sockets", "HTTP Flood", "DDoS Simulation"],
        details: [
            "Multi-threaded engine capable of generating massive traffic volumes",
            "Supports HTTP/HTTPS, TCP, UDP, and ICMP flood attacks",
            "Advanced payload obfuscation and randomization",
            "Proxy chain support for distributed attack simulation",
            "Real-time statistics dashboard with live bandwidth monitoring",
            "Custom packet crafting with header manipulation",
            "Rate limiting bypass techniques and connection pooling",
            "Layer 7 application-layer attack simulation"
        ],
        status: "CLASSIFIED",
        color: "neon-red"
    },
    {
        title: "ShadowVM — Virtualizer",
        category: "CODE VIRTUALIZATION PROTECTION",
        desc: "Advanced C# code virtualization tool that transforms .NET bytecode into custom VM instructions. Converts protected assemblies into opaque binary format with custom virtual machine interpreter.",
        tags: ["C#", ".NET", "IL Manipulation", "Bytecode VM", "Binary Obfuscation"],
        details: [
            "Custom bytecode instruction set with 200+ virtual opcodes",
            "IL-to-bytecode transformation engine with control flow flattening",
            "String encryption with runtime decryption stubs",
            "Anti-tamper protection with integrity checksums",
            "Custom VM interpreter written in native code",
            "Metadata stripping and dummy injection",
            "API call hiding via dynamic resolution",
            "Output: Fully virtualized binary with custom loader"
        ],
        status: "ACTIVE",
        color: "neon-amber"
    },
    {
        title: "Ring 0 Rootkit",
        category: "KERNEL-LEVEL ROOTKIT",
        desc: "Advanced kernel-mode rootkit operating at Ring 0 with direct kernel object manipulation (DKOM), SSDT hooking, and complete system visibility evasion. Provides undetectable persistence and privilege escalation.",
        tags: ["C", "Kernel Mode", "Windows Driver", "DKOM", "SSDT Hooking"],
        details: [
            "Ring 0 kernel driver with signed certificate spoofing",
            "Direct Kernel Object Manipulation (DKOM) for process hiding",
            "SSDT/IDT hooking for system call interception",
            "File and registry operations completely invisible to user-mode",
            "Network connection hiding via TDI/NDIS filter drivers",
            "Advanced rootkit detection countermeasures (PatchGuard bypass)",
            "Memory-resident payload with no disk footprint",
            "Hardware breakpoint manipulation for anti-analysis"
        ],
        status: "CLASSIFIED",
        color: "neon-red"
    },
    {
        title: "BlackArch OS Hardening",
        category: "OS SECURITY CUSTOMIZATION",
        desc: "Implementing custom security policies and optimized driver support for real-time packet processing on BlackArch Linux.",
        tags: ["Linux Kernel", "BlackArch", "Security Policies", "Network Stack"],
        details: [
            "Custom security policies and optimized driver support",
            "Real-time packet processing optimization",
            "Hardened kernel configuration with attack surface reduction",
            "Performance: +15% throughput, -8ms latency"
        ],
        status: "ACTIVE",
        color: "neon-cyan"
    },
    {
        title: "Custom Parrot Kernel",
        category: "EMBEDDED SECURITY KERNEL",
        desc: "Compiled a minimal Linux kernel tailored for embedded security research. Removed telemetry and unnecessary modules.",
        tags: ["Linux Kernel", "Parrot OS", "Embedded Systems", "Minimal Config"],
        details: [
            "Minimal kernel build at 42MB with 2.4s boot time",
            "Telemetry and unnecessary modules stripped",
            "Optimized for embedded security research workloads",
            "Custom module loading and hardware abstraction layer"
        ],
        status: "COMPLETE",
        color: "neon-cyan"
    },
    {
        title: "Module: GhostPipe",
        category: "KERNEL IPC MODULE",
        desc: "Experimental kernel module for stealthy inter-process communication via unused DMA buffers.",
        tags: ["Kernel Module", "DMA", "IPC", "Stealth Communication"],
        details: [
            "Stealthy IPC via unused DMA buffer channels",
            "Operating at Ring 0 with high stealth rating",
            "Bypasses standard monitoring and detection tools",
            "Experimental proof-of-concept for advanced research"
        ],
        status: "EXPERIMENTAL",
        color: "neon-amber"
    }
];

export const KernelMods = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-5 duration-700">
            <section className="border-b border-neon-cyan/20 pb-4">
                <h2 className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                    <Cpu className="text-neon-cyan" size={20} /> KERNEL_MODS.sys
                </h2>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-2 uppercase">OFFENSIVE SECURITY TOOLS & LOW-LEVEL ARCHITECTURE</p>
                <p className="text-xs text-neon-red/60 mt-1 font-bold tracking-wider">
                    ▸ CLASSIFIED PROJECTS — CLICK FOR FULL INTEL
                </p>
            </section>

            <div className="space-y-6">
                {KERNEL_SPECS.map((spec, i) => {
                    const isClassified = spec.status === "CLASSIFIED";
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedProject(spec)}
                            className={`border bg-black/60 p-6 flex flex-col md:flex-row gap-8 items-center hover:bg-neon-cyan/5 transition-all cursor-pointer group ${
                                isClassified 
                                    ? 'border-neon-red/30 hover:border-neon-red/60' 
                                    : 'border-hud hover:border-neon-cyan/40'
                            }`}
                        >
                            <div className={`w-16 h-16 shrink-0 border flex items-center justify-center ${
                                isClassified 
                                    ? 'bg-neon-red/10 border-neon-red/20' 
                                    : 'bg-neon-cyan/10 border-neon-cyan/20'
                            }`}>
                                {isClassified ? (
                                    <AlertTriangle size={32} className="text-neon-red opacity-60" />
                                ) : (
                                    <Disc size={32} className="text-neon-cyan opacity-40 animate-spin-slow" />
                                )}
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className={`text-lg font-bold tracking-tight underline underline-offset-4 ${
                                        isClassified ? 'text-white decoration-neon-red/40' : 'text-white decoration-neon-cyan/40'
                                    }`}>{spec.title}</h3>
                                    <span className={`text-[8px] px-1.5 py-0.5 border font-bold ${
                                        isClassified 
                                            ? 'border-neon-red/40 text-neon-red' 
                                            : 'border-neon-cyan/40 text-neon-cyan'
                                    }`}>
                                        {spec.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-2xl">
                                    {spec.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {spec.tags.slice(0, 4).map((tag, j) => (
                                        <span key={j} className="text-[9px] px-2 py-0.5 bg-black/40 border border-white/5 text-neon-cyan/60 font-bold">
                                            {tag}
                                        </span>
                                    ))}
                                    {spec.tags.length > 4 && (
                                        <span className="text-[9px] px-2 py-0.5 text-gray-500 font-bold">+{spec.tags.length - 4}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                                <Eye className="text-neon-cyan/20 group-hover:text-neon-cyan transition-colors" size={16} />
                                <span className="text-[9px] text-gray-500 font-bold uppercase">VIEW INTEL</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Decorative System Map */}
            <div className="relative h-32 border border-hud bg-black/40 overflow-hidden opacity-40">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="text-neon-cyan animate-pulse" size={64} />
                </div>
                <div className="absolute inset-0 grid grid-cols-8 h-full">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="border-r border-white/5 h-full" />
                    ))}
                </div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};
