"use client";

import { useCallback, useRef } from 'react';

const SOUNDS = {
    click: '/click.mp3',
    door: '/door.mp3',
} as const;

export const useHUDStore = () => {
    const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

    const playHUDClick = useCallback(() => {
        const soundName = 'click';
        if (!audioRefs.current[soundName]) {
            audioRefs.current[soundName] = new Audio(SOUNDS[soundName]);
        }
        const audio = audioRefs.current[soundName];
        audio.currentTime = 0;
        audio.volume = 0.2;
        audio.play().catch(() => { });
    }, []);

    return { playHUDClick };
};
