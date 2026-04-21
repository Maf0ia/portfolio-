"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Globe, Database, Terminal, Zap, Star, Eye } from 'lucide-react';
import { ProjectModal, type ProjectDetail } from './ProjectModal';

const ECOSYSTEM: ProjectDetail[] = [
    {
        title: "Nexus — Discord Bot",
        category: "DISCORD BOT ECOSYSTEM",
        desc: "A premium, feature-rich Discord bot with advanced AutoMod, ticket system, custom commands, economy, leveling, and a full web dashboard with OAuth2 integration.",
        tags: ["Python", "discord.py", "FastAPI", "React", "PostgreSQL"],
        details: [
            "Advanced AutoMod with native Discord AutoMod rule synchronization",
            "Custom ticket system with transcripts, categories, and staff roles",
            "Full economy and leveling system with leaderboards",
            "Custom command builder with variable support",
            "React web dashboard with real-time state sync via WebSockets",
            "OAuth2 authentication flow with Discord",
            "Redis caching for high-performance command handling",
            "Anti-nuke protection with automatic role/channel restoration"
        ],
        status: "PRODUCTION",
        color: "neon-cyan"
    },
    {
        title: "Mafia Raider — API Backend",
        category: "HIGH-PERFORMANCE API",
        desc: "The backend API powering Mafia Raider. Handles concurrent requests for bot management, proxy rotation, credential validation, and real-time task orchestration.",
        tags: ["FastAPI", "Python", "AsyncIO", "JWT", "Redis"],
        details: [
            "AsyncIO-powered request handling for maximum concurrency",
            "JWT authentication with role-based access control",
            "Proxy management: scraping, validation, and rotation engine",
            "Real-time task queue with WebSocket status broadcasting",
            "Auto-generated API documentation with Swagger/OpenAPI",
            "Rate limiter with sliding window algorithm"
        ],
        status: "ACTIVE",
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
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedProject(project)}
                        className="project-card group relative border border-hud bg-black/60 p-8 flex flex-col h-full hover:bg-neon-cyan/5 transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20">
                                <Globe size={24} className="text-neon-cyan" />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold px-2 py-0.5 border border-neon-cyan/30 text-neon-cyan">{project.status}</span>
                                <Eye className="text-neon-cyan/20 group-hover:text-neon-cyan transition-colors" size={14} />
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">{project.category}</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                {project.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tags.map((feat, j) => (
                                    <span key={j} className="text-[10px] px-2 py-0.5 bg-black/40 border border-white/5 text-neon-cyan/60 font-bold">
                                        {feat}
                                    </span>
                                ))}
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
