"use client";

import React, { useEffect, useRef } from 'react';
import { useSystem } from '@/context/SystemContext';
import { useHUDStore } from '@/hooks/useHUDStore';
import { HUDLayout } from './HUDLayout';
import { Terminal } from './Terminal';
import { IdentityNode } from './IdentityNode';
import { OperationsNode } from './OperationsNode';
import { SecurityNode } from './SecurityNode';
import { NetworkingHub } from './NetworkingHub';
import { C2Dashboard } from './C2Dashboard';
import { TheForge } from './TheForge';
import { KernelMods } from './KernelMods';
import { FullStackProjects } from './FullStackProjects';
import { AudioPlayer } from './AudioPlayer';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';

export const HUDSystem = () => {
    const { activeNode, setActiveNode } = useSystem();
    const { playHUDClick } = useHUDStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        playHUDClick();
        
        // GSAP entrance animation for content
        if (containerRef.current) {
            gsap.fromTo('.hud-content > *', 
                { opacity: 0, y: 20, stagger: 0.05 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05 }
            );
        }
    }, [activeNode, playHUDClick]);

    // Keyboard shortcuts: 1-8 for nodes
    useEffect(() => {
        const nodeMap: Record<string, typeof activeNode> = {
            '1': 'IDENTITY', '2': 'OPERATIONS', '3': 'SECURITY', '4': 'NETWORKING',
            '5': 'C2', '6': 'FORGE', '7': 'FULLSTACK', '8': 'KERNEL'
        };
        const handler = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            const node = nodeMap[e.key];
            if (node) { setActiveNode(node); playHUDClick(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [setActiveNode, playHUDClick]);

    const renderNode = () => {
        switch (activeNode) {
            case 'IDENTITY': return <IdentityNode />;
            case 'NETWORKING': return <NetworkingHub />;
            case 'C2': return <C2Dashboard />;
            case 'FORGE': return <TheForge />;
            case 'KERNEL': return <KernelMods />;
            case 'FULLSTACK': return <FullStackProjects />;
            case 'OPERATIONS': return <OperationsNode />;
            case 'SECURITY': return <SecurityNode />;
            default: return <IdentityNode />;
        }
    };

    return (
        <>
            <HUDLayout terminal={<Terminal />}>
                <AnimatePresence mode="wait">
                    <motion.div
                        ref={containerRef}
                        key={activeNode}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="hud-content h-full w-full overflow-y-auto scrollbar-hide"
                    >
                        {renderNode()}
                    </motion.div>
                </AnimatePresence>
            </HUDLayout>
            <AudioPlayer />
        </>
    );
};
