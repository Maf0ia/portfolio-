"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Globe, Database, Terminal, Zap, Star, Eye, Brain, Shield, Smartphone, Cpu } from 'lucide-react';
import { ProjectModal, type ProjectDetail } from './ProjectModal';

const ECOSYSTEM: ProjectDetail[] = [
    {
        title: "AI Neural Network — PyTorch",
        category: "MACHINE LEARNING ENGINE",
        desc: "Custom artificial intelligence model built with PyTorch library in Python. Features deep learning architecture with neural network training, data preprocessing, and inference capabilities.",
        tags: ["Python", "PyTorch", "NumPy", "Deep Learning", "Neural Networks"],
        details: [
            "Custom neural network architecture designed from scratch",
            "PyTorch-based training pipeline with GPU acceleration",
            "Data preprocessing and augmentation pipelines",
            "Model validation and testing frameworks",
            "Hyperparameter tuning and optimization",
            "Inference engine for real-time predictions",
            "Custom loss functions and activation layers",
            "Training metrics visualization and logging"
        ],
        status: "PRODUCTION",
        color: "neon-cyan"
    },
    {
        title: "Discord Nuker — Multi-Language",
        category: "ADVANCED DISCORD TOOLING",
        desc: "High-performance Discord automation tool with custom multi-language architecture. Rust network layer for ultra-fast packet sending, C++ Shield DLL for file protection, and C# core interface.",
        tags: ["C#", "Rust", "C++", "Network DLL", "Shield DLL", "Packet Injection"],
        details: [
            "C# core application with modern UI and control panel",
            "Rust Network DLL: Ultra-fast packet sending engine (10x faster than C#)",
            "C++ Shield DLL: Advanced file protection and anti-tamper system",
            "Multi-threaded operation for maximum performance",
            "Real-time Discord API interaction",
            "Custom packet crafting and manipulation",
            "Memory protection and code obfuscation",
            "Automated task execution with queue management"
        ],
        status: "ACTIVE",
        color: "neon-red"
    },
    {
        title: "Discord Token Utility — Cross-Platform",
        category: "CROSS-PLATFORM MOBILE & WEB APP",
        desc: "Full-featured Discord token management application available as web app, iOS app, and Android app. Built with responsive design and native mobile capabilities.",
        tags: ["React Native", "Flutter", "Web App", "iOS", "Android", "Cross-Platform"],
        details: [
            "Web application with responsive design for all browsers",
            "Native iOS app with Apple App Store optimization",
            "Native Android app with Google Play integration",
            "Real-time token validation and management",
            "Cross-platform synchronization via cloud backend",
            "Mobile-optimized UI with touch gestures",
            "Push notifications for token status updates",
            "Offline mode with local storage",
            "Biometric authentication (FaceID/TouchID)",
            "Secure encrypted token storage"
        ],
        status: "PRODUCTION",
        color: "neon-green"
    },
    {
        title: "Nexus — Discord Bot Ecosystem",
        category: "PREMIUM DISCORD BOT",
        desc: "Enterprise-grade Discord bot with advanced AutoMod, ticket system, economy, leveling, anti-nuke protection, and comprehensive web dashboard with OAuth2.",
        tags: ["Python", "discord.py", "FastAPI", "React", "PostgreSQL", "Redis"],
        details: [
            "Advanced AutoMod with native Discord AutoMod synchronization",
            "Custom ticket system with transcripts and categories",
            "Full economy and leveling system with leaderboards",
            "Custom command builder with variable support",
            "React web dashboard with real-time WebSocket sync",
            "OAuth2 authentication flow with Discord",
            "Redis caching for high-performance handling",
            "Anti-nuke protection with automatic restoration",
            "Multi-server support with sharding",
            "Advanced permission system"
        ],
        status: "PRODUCTION",
        color: "neon-cyan"
    },
    {
        title: "Mafia Raider — API Backend",
        category: "HIGH-PERFORMANCE API",
        desc: "Backend API powering Mafia Raider. Handles concurrent requests for bot management, proxy rotation, credential validation, and real-time task orchestration.",
        tags: ["FastAPI", "Python", "AsyncIO", "JWT", "Redis"],
        details: [
            "AsyncIO-powered request handling for maximum concurrency",
            "JWT authentication with role-based access control",
            "Proxy management: scraping, validation, and rotation engine",
            "Real-time task queue with WebSocket broadcasting",
            "Auto-generated API documentation with Swagger/OpenAPI",
            "Rate limiter with sliding window algorithm",
            "Database connection pooling and optimization",
            "Health monitoring and alerting system"
        ],
        status: "ACTIVE",
        color: "neon-amber"
    },
    {
        title: "Portfolio — Cybersecurity HUD",
        category: "INTERACTIVE WEB EXPERIENCE",
        desc: "This portfolio: A fully immersive cybersecurity-themed HUD with real-time threat visualization, animated transitions, matrix boot sequence, and interactive node orchestration.",
        tags: ["Next.js", "TypeScript", "GSAP", "Framer Motion", "Canvas API", "TailwindCSS"],
        details: [
            "Matrix rain boot sequence with cinematic transitions",
            "Real-time threat map with canvas rendering",
            "Node orchestration dashboard with live statistics",
            "GSAP and Framer Motion animations throughout",
            "Interactive packet sniffer visualization",
            "Responsive design for all devices",
            "Production-ready with Docker support",
            "Enterprise-grade security headers and middleware"
        ],
        status: "PRODUCTION",
        color: "neon-cyan"
    }
];

export const FullStackProjects = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <section className="border-b border-neon-cyan/20 pb-4">
                <h2 className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                    <Bot className="text-neon-cyan" size={22} /> FULLSTACK_PROJECTS.log
                </h2>
                <p className="text-sm text-gray-400 font-bold tracking-widest mt-2 uppercase">ENGINEERING SCALABLE WEB ECOSYSTEMS & DISCORD TOOLING</p>
                <p className="text-xs text-neon-cyan/60 mt-1 font-bold tracking-wider">
                    ▸ CLICK ANY PROJECT TO VIEW FULL INTEL
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {ECOSYSTEM.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setSelectedProject(project)}
                        className="project-card group relative border border-hud bg-black/60 p-6 md:p-8 flex flex-col h-full hover:bg-neon-cyan/5 transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 bg-${project.color}/10 border border-${project.color}/20`}>
                                {project.category.includes('MACHINE LEARNING') ? <Brain size={24} className={`text-${project.color}`} /> :
                                 project.category.includes('DISCORD NUKER') ? <Shield size={24} className={`text-${project.color}`} /> :
                                 project.category.includes('MOBILE') ? <Smartphone size={24} className={`text-${project.color}`} /> :
                                 project.category.includes('CYBERSECURITY') ? <Cpu size={24} className={`text-${project.color}`} /> :
                                 <Globe size={24} className={`text-${project.color}`} />}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-bold px-2 py-0.5 border border-${project.color}/30 text-${project.color}`}>{project.status}</span>
                                <Eye className="text-neon-cyan/20 group-hover:text-neon-cyan transition-colors" size={14} />
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">{project.category}</span>
                            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{project.title}</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                {project.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tags.slice(0, 4).map((feat, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 bg-black/40 border border-white/5 text-neon-cyan/60 font-bold">
                                        {feat}
                                    </span>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className="text-[10px] px-2 py-0.5 bg-black/40 border border-white/5 text-neon-cyan/60 font-bold">
                                        +{project.tags.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 w-full py-2 border border-neon-cyan/20 text-[11px] font-bold text-neon-cyan uppercase tracking-widest text-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan transition-all">
                            VIEW_FULL_INTEL
                        </div>
                    </motion.div>
                ))}
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};
