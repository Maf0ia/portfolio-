"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldAlert } from 'lucide-react';

export interface ProjectDetail {
    title: string;
    category: string;
    desc: string;
    tags: string[];
    details: string[];
    status?: string;
    color?: string;
}

export const ProjectModal = ({ project, onClose }: { project: ProjectDetail | null, onClose: () => void }) => {
    if (!project) return null;
    const accentColor = project.color || 'neon-cyan';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="modal-overlay"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-2xl mx-4 bg-black/95 border border-hud relative overflow-hidden max-h-[80vh] overflow-y-auto scrollbar-hide"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className={`p-6 border-b border-${accentColor}/20 flex justify-between items-start`}>
                        <div className="space-y-2">
                            <span className={`text-[10px] font-bold text-${accentColor} tracking-[0.3em] uppercase`}>{project.category}</span>
                            <h2 className="text-2xl font-bold text-white tracking-tight">{project.title}</h2>
                            {project.status && (
                                <span className={`inline-block text-[10px] px-2 py-0.5 border border-${accentColor}/40 text-${accentColor} font-bold`}>
                                    {project.status}
                                </span>
                            )}
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">
                        <p className="text-sm text-gray-300 leading-relaxed font-light">
                            {project.desc}
                        </p>

                        {/* Detail Bullets */}
                        <div className="space-y-3">
                            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">INTEL_DETAILS</span>
                            {project.details.map((detail, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-start gap-3 text-sm text-gray-400"
                                >
                                    <span className={`text-${accentColor} mt-1 shrink-0`}>▸</span>
                                    <span>{detail}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                            {project.tags.map((tag, j) => (
                                <span key={j} className={`text-[10px] px-3 py-1 border border-${accentColor}/30 text-${accentColor} font-bold uppercase tracking-wider`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-${accentColor}/40`} />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-${accentColor}/40`} />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
