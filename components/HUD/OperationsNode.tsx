"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Gamepad2, AppWindow, Eye, Globe, Bug, Shield } from 'lucide-react';
import { ProjectModal, type ProjectDetail } from './ProjectModal';

const WINDOWS_TOOLS: ProjectDetail[] = [
    {
        title: "Mafia Raider (Python)",
        category: "DISCORD AUTOMATION SUITE",
        desc: "All-in-one Discord raiding and automation toolkit. Mass-DM, token management, proxy rotation, and server reconnaissance.",
        tags: ["Python", "AsyncIO", "Proxy"],
        details: ["Mass-DM engine with configurable delays", "Token checker, joiner, leaver with proxy rotation", "Server recon: scrapes members, roles, channels", "Friend bomber and reaction spammer", "Integrated proxy scraper with auto-validation"],
        status: "ACTIVE", color: "neon-cyan"
    },
    {
        title: "Mafia Raider (C#)",
        category: "DISCORD AUTOMATION SUITE",
        desc: "C# rewrite with native Windows GUI, improved performance, and multi-threaded request handling.",
        tags: ["C#", ".NET", "WinForms"],
        details: ["Full C# rewrite with native Windows Forms UI", "Multi-threaded request engine", "Same feature set with better performance", "Built-in settings persistence"],
        status: "ACTIVE", color: "neon-cyan"
    },
    {
        title: "Mafia Nuker (Python)",
        category: "DISCORD DESTRUCTION SUITE",
        desc: "High-performance Discord server nuking tool. Mass-ban, mass-channel creation, role manipulation, and webhook flooding.",
        tags: ["Python", "Discord API", "AsyncIO"],
        details: ["Mass-ban with configurable rate limit delays", "Mass-create channels and roles with spam", "Webhook flooding and server manipulation", "Token-based multi-account support"],
        status: "DEPLOYED", color: "neon-red"
    },
    {
        title: "Mafia Nuker (C#)",
        category: "DISCORD DESTRUCTION SUITE",
        desc: "C# rewrite with native Windows GUI, faster execution, and multi-threaded nuke operations.",
        tags: ["C#", ".NET", "Discord API"],
        details: ["Full C# rewrite with Windows Forms interface", "Multi-threaded operations for max speed", "Built-in token manager and server selector", "One-click nuke with configurable vectors"],
        status: "DEPLOYED", color: "neon-red"
    },
    {
        title: "Discord Server Cloner",
        category: "DISCORD TOOLING",
        desc: "Clones an entire Discord server — channels, roles, permissions, categories, and emojis — into a new server with one click.",
        tags: ["Python", "Discord API"],
        details: ["Clones all channels, categories, and roles", "Preserves permission overwrites", "Emoji and sticker duplication", "Server settings and icon cloning"],
        status: "ACTIVE", color: "neon-cyan"
    },
    {
        title: "Discord Account Creator",
        category: "AUTOMATION TOOL",
        desc: "Automated Discord account creation tool with captcha solving, proxy support, and email verification bypass.",
        tags: ["Python", "Automation", "Proxy"],
        details: ["Automated account registration pipeline", "Captcha solving integration", "Proxy rotation for mass creation", "Email verification handling"],
        status: "ACTIVE", color: "neon-cyan"
    },
    {
        title: "Gmail Account Creator",
        category: "AUTOMATION TOOL",
        desc: "Automated Gmail account creation with phone verification handling. Supports proxy rotation and bulk generation.",
        tags: ["Python", "Selenium", "Proxy"],
        details: ["Automated Gmail registration flow", "Phone verification handling", "Proxy rotation for bulk creation", "Account data export and management"],
        status: "ACTIVE", color: "neon-cyan"
    },
    {
        title: "Keyboard Randomizer Virus",
        category: "MALWARE RESEARCH",
        desc: "Research virus that randomizes every keystroke typed on the victim's keyboard. Replaces typed characters with random ones in real-time.",
        tags: ["Python", "WinAPI", "Keylogger"],
        details: ["Hooks into keyboard input at OS level", "Replaces every typed character with a random letter", "Runs silently in background with persistence", "Stealth: hidden process, auto-start on boot"],
        status: "RESEARCH", color: "neon-red"
    },
    {
        title: "Token Checker",
        category: "DISCORD UTILITY",
        desc: "Bulk Discord token validation tool. Checks token validity, account info, Nitro status, and billing details at high speed.",
        tags: ["Python", "AsyncIO", "Discord API"],
        details: ["Mass token validation with async requests", "Returns account info: username, email, phone", "Nitro and billing status detection", "Proxy support for high-volume checking"],
        status: "ACTIVE", color: "neon-cyan"
    },
];

const MOBILE_TOOLS: ProjectDetail[] = [
    {
        title: "Mafia Quest Solver",
        category: "MOBILE / FLUTTER",
        desc: "Cross-platform Discord quest automation app. Detects and completes quests automatically with optimized speed and real-time progress tracking.",
        tags: ["Flutter", "Dart", "Cross-Platform"],
        details: [
            "Automated quest detection and completion pipeline",
            "Cross-platform: Android, iOS, Desktop",
            "Real-time progress tracking with Material 3 UI",
            "Token-based auth with secure storage",
            "Configurable speed and quest priority filters"
        ],
        status: "LIVE",
        color: "neon-green"
    },
    {
        title: "Trojan APK Builder",
        category: "MALWARE CREATION TOOL",
        desc: "Tool that generates custom Android Trojan APKs with configurable payloads, persistence mechanisms, and encrypted C2 communication.",
        tags: ["Java", "Android SDK", "APK", "Encryption"],
        details: [
            "Generates ready-to-deploy Android Trojan APKs",
            "Configurable payload: camera, mic, GPS, file manager, keylogger",
            "Persistence: survives reboots, auto-start, anti-uninstall",
            "AES-256 encrypted C2 communication channel",
            "APK obfuscation and icon spoofing for stealth",
            "Built-in payload signing with custom certificates"
        ],
        status: "ACTIVE_DEV",
        color: "neon-red"
    },
    {
        title: "8 Ball Pool — Cheto Mod Menu",
        category: "GAME HACKING / ANDROID",
        desc: "Custom mod menu for 8 Ball Pool using C++ and Java. Features aim assist, guideline extensions, and real-time memory manipulation.",
        tags: ["C++", "Java", "JNI", "Android NDK"],
        details: [
            "Native C++ hook injected via JNI into the game process",
            "Real-time memory scanning and pointer chain resolution",
            "Guideline extension: renders extended cue trajectory via OpenGL overlay",
            "Aim assist with auto-angle calculation for pocket positions",
            "Anti-ban: randomized delays, spoofed device fingerprints",
            "Custom overlay UI via Android WindowManager"
        ],
        status: "DEPLOYED",
        color: "neon-amber"
    },
    {
        title: "Discord Token Utility — Web App",
        category: "WEB-BASED UTILITY",
        desc: "Web-based utility that helps users retrieve their own Discord token on mobile devices. Clean, simple interface — log in and get your token instantly.",
        tags: ["HTML/CSS", "JavaScript", "Web", "Discord API"],
        details: [
            "Simple web UI for users to retrieve their own Discord token",
            "Works on mobile browsers where dev tools aren't available",
            "Clean, user-friendly login interface",
            "Instant token display after authentication",
            "No data stored — token shown client-side only",
            "Responsive design for all screen sizes"
        ],
        status: "LIVE",
        color: "neon-green"
    }
];

export const OperationsNode = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-5 duration-700">
            <section className="border-b border-neon-cyan/20 pb-6">
                <h2 className="text-3xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                    <AppWindow className="text-neon-cyan" size={24} /> ACTIVE_OPERATIONS.log
                </h2>
                <p className="text-sm text-gray-400 font-medium tracking-widest mt-2 uppercase">WINDOWS TOOLS, DISCORD SUITE, MOBILE, GAME HACKING & AUTOMATION</p>
                <p className="text-xs text-neon-cyan/60 mt-1 font-bold tracking-wider">
                    ▸ CLICK ANY PROJECT TO VIEW FULL INTEL — {WINDOWS_TOOLS.length + MOBILE_TOOLS.length} TOOLS DEPLOYED
                </p>
            </section>

            {/* Windows / Desktop Tools Section */}
            <div>
                <h3 className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                    <Shield size={14} /> WINDOWS_&_DESKTOP_TOOLS ({WINDOWS_TOOLS.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {WINDOWS_TOOLS.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} onClick={() => setSelectedProject(project)} />
                    ))}
                </div>
            </div>

            {/* Mobile & Web Section */}
            <div>
                <h3 className="text-sm font-bold text-neon-green tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                    <Smartphone size={14} /> MOBILE_&_WEB_TOOLS
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                    {MOBILE_TOOLS.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} onClick={() => setSelectedProject(project)} />
                    ))}
                </div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};

const ProjectCard = ({ project, index, onClick }: { project: ProjectDetail, index: number, onClick: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        onClick={onClick}
        className="project-card group relative bg-black/40 border border-hud overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-transparent group-hover:from-neon-cyan/10 transition-all" />
        <div className="relative p-6 bg-black/60 space-y-3 h-full flex flex-col">
            <div className="flex justify-between items-start">
                <div className="p-2 border border-neon-cyan/20 bg-neon-cyan/5">
                    {project.category.includes('GAME') ? <Gamepad2 size={18} className="text-neon-amber" /> :
                        project.category.includes('WEB') ? <Globe size={18} className="text-neon-red" /> :
                            project.category.includes('MALWARE') ? <Bug size={18} className="text-neon-red" /> :
                                <Smartphone size={18} className="text-neon-cyan" />}
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 border ${project.status === 'ACTIVE' || project.status === 'LIVE' ? 'border-neon-green/40 text-neon-green' :
                        project.status === 'DEPLOYED' ? 'border-neon-cyan/40 text-neon-cyan' :
                            'border-neon-amber/40 text-neon-amber'
                        }`}>{project.status}</span>
                    <Eye className="text-white/20 group-hover:text-neon-cyan transition-colors" size={14} />
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
                <span className="text-[10px] text-neon-cyan font-bold tracking-widest uppercase">{project.category}</span>
                <p className="text-sm text-gray-400 font-light leading-relaxed mt-2">{project.desc}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {project.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 border border-neon-cyan/20 text-neon-cyan/70 font-bold">{tag}</span>
                ))}
            </div>
        </div>
    </motion.div>
);
