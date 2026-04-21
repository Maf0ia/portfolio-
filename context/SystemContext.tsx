"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

export type NodeID = 'IDENTITY' | 'NETWORKING' | 'C2' | 'FORGE' | 'KERNEL' | 'FULLSTACK' | 'OPERATIONS' | 'SECURITY';

interface SystemContextType {
    activeNode: NodeID;
    isBooted: boolean;
    isMuted: boolean;
    setActiveNode: (node: NodeID) => void;
    bootSystem: () => void;
    toggleMute: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: ReactNode }) => {
    const [activeNode, setActiveNode] = useState<NodeID>('IDENTITY');
    const [isBooted, setIsBooted] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const bgAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (isBooted && !isMuted) {
            if (!bgAudioRef.current) {
                bgAudioRef.current = new Audio('/ambient_bg.mp3'); // Ambient drone
                bgAudioRef.current.loop = true;
                bgAudioRef.current.volume = 0.15;
            }
            bgAudioRef.current.play().catch(() => console.log('Audio autoplay blocked'));
        } else if (bgAudioRef.current) {
            bgAudioRef.current.pause();
        }
    }, [isBooted, isMuted]);

    const bootSystem = () => setIsBooted(true);
    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <SystemContext.Provider value={{
            activeNode,
            isBooted,
            isMuted,
            setActiveNode,
            bootSystem,
            toggleMute,
        }}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystem = () => {
    const context = useContext(SystemContext);
    if (context === undefined) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
};
