"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Zap, Image as ImageIcon, ShieldAlert, Cpu, Eye } from 'lucide-react';
import { ProjectModal, type ProjectDetail } from './ProjectModal';

const FORGE_TOOLS: ProjectDetail[] = [
    {
        title: "V-Crypt C#",
        category: "VIRTUALIZING ENCRYPTOR",
        desc: "Advanced C# encryption engine utilizing virtualization techniques to obfuscate code logic. Protects sensitive algorithms by transforming them into a custom bytecode format executed by a secure virtual machine.",
        tags: ["C#", ".NET", "Virtualization", "Obfuscation", "Security"],
        details: [
            "Converts IL code into custom virtual instructions",
            "Embedded VM for real-time bytecode execution",
            "Anti-tamper and anti-debugging protection layers",
            "Polymorphic engine for unique binary generation",
            "Integration with existing C# projects via MSBuild tasks",
            "Protects against deobfuscators like de4dot and dnSpy"
        ],
        status: "DEPLOYED",
        color: "neon-cyan"
    },
    {
        title: "V-Crypt Py",
        category: "VIRTUALIZING ENCRYPTOR",
        desc: "Currently developing a Python-based equivalent of the C# virtualization engine. Aiming to bring high-level obfuscation to interpreted scripts through a lightweight VM architecture.",
        tags: ["Python", "Bytecode", "Research", "Security", "Development"],
        details: [
            "Mapping Python bytecode to custom instruction sets",
            "Developing a lightweight Python-based virtual machine",
            "Focus on cross-platform compatibility (Windows/Linux)",
            "Implementing anti-static analysis routines",
            "Researching efficient bytecode transformation techniques",
            "Integration with PyInstaller for bundled protection"
        ],
        status: "DEVELOPMENT",
        color: "neon-cyan"
    },
    {
        title: "OpticBind",
        category: "PAYLOAD BINDER",
        desc: "Advanced steganography and binding tool that merges executable payloads into images. The output file looks like a normal image but executes the hidden payload when opened.",
        tags: ["C++", "WinAPI", "Steganography", "PE Injection"],
        details: [
            "Merges .exe payloads into image files (PNG, JPG, BMP)",
            "Output file retains original image appearance and opens normally",
            "Hidden payload executes silently in the background on open",
            "PE header manipulation for seamless embedding",
            "Anti-detection: polymorphic stub generation",
            "Configurable execution delay and persistence options"
        ],
        status: "DEPLOYED",
        color: "neon-cyan"
    }
];

export const TheForge = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <section className="border-b border-neon-cyan/20 pb-4">
                <h2 className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                    <Hammer className="text-neon-cyan" size={22} /> THE_FORGE.bin
                </h2>
                <p className="text-sm text-gray-400 font-bold tracking-widest mt-2 uppercase">CRAFTING ADVANCED PAYLOADS & C2 INFRASTRUCTURE</p>
                <p className="text-xs text-neon-cyan/60 mt-1 font-bold tracking-wider">
                    ▸ CLICK ANY PROJECT TO VIEW FULL INTEL
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {FORGE_TOOLS.map((tool, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        onClick={() => setSelectedProject(tool)}
                        className="project-card group relative border border-hud bg-black/60 p-8 hover:bg-neon-cyan/5 transition-all flex flex-col justify-between h-full"
                    >
                        <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
                            <span className="text-[9px] font-bold px-2 py-0.5 border border-neon-cyan/30 text-neon-cyan">{tool.status}</span>
                            <Eye className="text-neon-cyan/20 group-hover:text-neon-cyan transition-colors" size={14} />
                        </div>

                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-neon-cyan tracking-[0.2em] uppercase">{tool.category}</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">{tool.title}</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                {tool.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {tool.tags.map((tag, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 border border-white/10 text-gray-500 font-bold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Config Sliders */}
                        <div className="mt-8 space-y-3 bg-black/40 p-4 border border-hud/20">
                            <div className="text-[9px] text-gray-500 font-bold tracking-widest uppercase mb-1">PAYLOAD_CONFIG</div>
                            <Slider label="ENCRYPTION_STRENGTH" val="0.85" />
                            <Slider label="STEALTH_LEVEL" val="0.92" />
                            <Slider label="PERSISTENCE" val="0.78" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Assembly Preview */}
            <div className="bg-black/80 border border-hud p-4 font-matrix text-xs text-gray-600 space-y-1">
                <div className="text-neon-cyan/40 border-b border-white/5 pb-2 mb-2">DEBUG_CONSOLE: CORE_DUMP_ANALYSIS</div>
                <p>0x00401000:  55                      PUSH EBP</p>
                <p>0x00401001:  89 E5                   MOV EBP, ESP</p>
                <p>0x00401003:  83 EC 18                SUB ESP, 0x18</p>
                <p>0x00401006:  C7 44 24 04 00 20 40 00 MOV DWORD PTR [ESP+4], 0x00402000</p>
                <p>0x0040100E:  E8 F1 00 00 00          CALL 0x00401104</p>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};

const Slider = ({ label, val }: { label: string, val: string }) => {
    const percentage = parseFloat(val) * 100;
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center text-[8px] font-bold text-gray-500 tracking-widest">
                <span>{label}</span>
                <span className="text-neon-cyan">{percentage}%</span>
            </div>
            <div className="h-1.5 bg-white/5 w-full relative overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-neon-cyan/60"
                />
            </div>
        </div>
    );
};
