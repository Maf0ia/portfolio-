"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';

interface LogEntry {
    type: 'CMD' | 'SYS' | 'ERR';
    text: string;
}

export const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<LogEntry[]>([
        { type: 'SYS', text: 'DECOMPILED REALITY OS [Version 4.0.0]' },
        { type: 'SYS', text: 'SECURE_SHELL ESTABLISHED. WELCOME AGENT_MAFIA.' },
        { type: 'SYS', text: 'TYPE "help" FOR LIST OF COMMANDS.' },
    ]);
    const { setActiveNode } = useSystem();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.toLowerCase().trim();
        const newHistory: LogEntry[] = [...history, { type: 'CMD', text: input }];

        switch (cmd) {
            case 'help':
                newHistory.push({ type: 'SYS', text: 'AVAILABLE COMMANDS: identity, networking, c2, forge, kernel, fullstack, operations, ls -a, run exploit, whoami, clear, help' });
                break;
            case 'ls -a':
                newHistory.push({ type: 'SYS', text: 'LISTING SYSTEM_NODES...' });
                newHistory.push({ type: 'SYS', text: 'drwxr-xr-x  IDENTITY_CORE' });
                newHistory.push({ type: 'SYS', text: 'drwxr-xr-x  NETWORKING_HUB' });
                newHistory.push({ type: 'SYS', text: 'drwxr-xr-x  C2_DASHBOARD' });
                newHistory.push({ type: 'SYS', text: 'drwxr-xr-x  THE_FORGE' });
                newHistory.push({ type: 'SYS', text: 'drwxr-xr-x  KERNEL_MODS' });
                newHistory.push({ type: 'SYS', text: 'drwxr-xr-x  FULLSTACK_LOGS' });
                newHistory.push({ type: 'SYS', text: '-r--r--r--  .hidden_exploit' });
                break;
            case 'run exploit':
                newHistory.push({ type: 'ERR', text: 'INITIATING BYPASS SEQUENCE...' });
                newHistory.push({ type: 'ERR', text: '[!] INJECTING PAYLOAD...' });
                newHistory.push({ type: 'ERR', text: '[!] KERNEL PANIC EMULATED.' });
                newHistory.push({ type: 'SYS', text: 'EXPLOIT_SUCCESS: ACCESS_ELEVATED' });
                break;
            case 'neofetch':
                newHistory.push({ type: 'SYS', text: '       _..._' });
                newHistory.push({ type: 'SYS', text: '     .\'     \'.' });
                newHistory.push({ type: 'SYS', text: '    /  MAFIA  \\' });
                newHistory.push({ type: 'SYS', text: '   |  ARCHITEC  |  OS: DECOMPILED_REALITY v4.0.0' });
                newHistory.push({ type: 'SYS', text: '    \\  _..._  /   KERNEL: MAFIA_MODE_v4' });
                newHistory.push({ type: 'SYS', text: '     \'._   _.\'    SHELL: MAFIA_SH' });
                newHistory.push({ type: 'SYS', text: '        ```       CPU: AMD RYZEN 9 @ 4.9GHz' });
                newHistory.push({ type: 'SYS', text: '                  RAM: 64GB DDR5 [====----]' });
                break;
            case 'top':
                newHistory.push({ type: 'SYS', text: 'PID  USER   PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND' });
                newHistory.push({ type: 'SYS', text: '1    root   20   0   12.4G   1.2G  84.5M R   8.4   1.9   0:12.45 next-worker' });
                newHistory.push({ type: 'SYS', text: '445  mafia  20   0    2.5G   442M  12.4M S   4.2   0.7   0:04.12 tailwind-jit' });
                newHistory.push({ type: 'SYS', text: '1024 mafia  20   0    824M    84M   4.5M S   2.1   0.1   0:01.88 packet-stream' });
                newHistory.push({ type: 'SYS', text: '99   root   20   0   44.2M   4.2M   1.2M S   0.1   0.0   0:00.04 ambient-drone' });
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'identity':
                setActiveNode('IDENTITY');
                break;
            case 'networking':
                setActiveNode('NETWORKING');
                break;
            case 'c2':
                setActiveNode('C2');
                break;
            case 'forge':
                setActiveNode('FORGE');
                break;
            case 'kernel':
                setActiveNode('KERNEL');
                break;
            case 'fullstack':
                setActiveNode('FULLSTACK');
                break;
            case 'operations':
                setActiveNode('OPERATIONS');
                break;
            case 'security':
                setActiveNode('SECURITY');
                newHistory.push({ type: 'SYS', text: 'LOADING SECURITY_PROTOCOLS...' });
                break;
            case 'whoami':
                newHistory.push({ type: 'SYS', text: 'SUBJECT: MAFIA | UID: 0 | ROLE: ARCHITECT | STATUS: POWER_MODE' });
                newHistory.push({ type: 'SYS', text: 'LOCATION: EGYPT/CAIRO | UPTIME: 7_YEARS_DEV' });
                break;
            default:
                newHistory.push({ type: 'ERR', text: `COMMAND NOT RECOGNIZED: ${cmd}` });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div className="h-full flex flex-col font-matrix text-xs p-4 bg-black/40">
            <div className="flex-1 overflow-auto scrollbar-hide space-y-1 mb-2">
                {history.map((entry, i) => (
                    <div key={i} className={`flex gap-2 ${entry.type === 'ERR' ? 'text-neon-red' : entry.type === 'CMD' ? 'text-white' : 'text-neon-cyan/80'}`}>
                        <span className="shrink-0">{entry.type === 'CMD' ? '>' : entry.type === 'ERR' ? '!' : '#'}</span>
                        <span className="leading-relaxed">{entry.text}</span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleCommand} className="flex gap-2 items-center border-t border-neon-cyan/10 pt-2 bg-black/40">
                <span className="text-neon-cyan shrink-0 animate-pulse">MAFIA@NETWORK:~$</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-white font-matrix caret-neon-cyan selection:bg-neon-cyan selection:text-black"
                />
            </form>
        </div>
    );
};
