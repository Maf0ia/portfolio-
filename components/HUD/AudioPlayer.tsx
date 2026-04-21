"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { gsap } from 'gsap';

export const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioStarted = useRef(false);

    useEffect(() => {
        audioRef.current = new Audio('/war.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Try autoplay (will be blocked until user interaction)
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log('Autoplay blocked, waiting for user interaction');
            });
        }

        // Listen for user interaction to start audio (only once)
        const enableAudio = () => {
            if (audioRef.current && !audioStarted.current) {
                audioRef.current.play().catch(() => {});
                audioStarted.current = true;
                setHasInteracted(true);
                
                // Remove all event listeners after first interaction
                document.removeEventListener('click', enableAudio);
                document.removeEventListener('keydown', enableAudio);
                document.removeEventListener('touchstart', enableAudio);
            }
        };

        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
        document.addEventListener('touchstart', enableAudio);

        return () => {
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);

            // GSAP animation for button
            gsap.timeline()
                .to('.audio-toggle', { scale: 0.8, duration: 0.1, ease: 'power2.in' })
                .to('.audio-toggle', { scale: 1.2, duration: 0.15, ease: 'power2.out' })
                .to('.audio-toggle', { scale: 1, duration: 0.15, ease: 'back.out(1.7)' });
        }
    };

    return (
        <button
            onClick={toggleMute}
            className="audio-toggle fixed bottom-6 right-6 z-50 p-3 border border-neon-cyan/30 bg-black/80 backdrop-blur-sm hover:bg-neon-cyan/10 hover:border-neon-cyan/60 transition-all group"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
            {isMuted ? (
                <VolumeX size={20} className="text-neon-cyan/50 group-hover:text-neon-cyan transition-colors" />
            ) : (
                <Volume2 size={20} className="text-neon-cyan group-hover:animate-pulse" />
            )}
        </button>
    );
};
