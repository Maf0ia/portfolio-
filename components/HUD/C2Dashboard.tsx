"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Zap, ShieldAlert, Users, Server, Globe, Activity, Database, Lock, Radio, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { GlobalPresenceMap } from './GlobalPresenceMap';

const RAT_VARIANTS = [
    { name: 'v-crypt_c2.srv', status: 'ACTIVE', infections: 432, type: 'VIRTUALIZED_HUB', load: '42%', lang: 'C# / .NET', uptime: '14d 2h', region: 'US-EAST', bandwidth: '1.2GB/s' },
    { name: 'phantom_v4.py', status: 'STEALTH', infections: 124, type: 'POLYMORPHIC_RAT', load: '12%', lang: 'Python', uptime: '8d 5h', region: 'EU-WEST', bandwidth: '845MB/s' },
    { name: 'optic_binder.exe', status: 'DEPLOYED', infections: 89, type: 'PAYLOAD_DIST', load: '5%', lang: 'C++', uptime: '2d 1h', region: 'ASIA-PAC', bandwidth: '423MB/s' },
    { name: 'shadow_vm.elf', status: 'ACTIVE', infections: 267, type: 'VIRTUALIZATION', load: '38%', lang: 'Rust', uptime: '21d 14h', region: 'GLOBAL', bandwidth: '2.1GB/s' },
    { name: 'ring0_rootkit.sys', status: 'HIDDEN', infections: 56, type: 'KERNEL_ROOTKIT', load: '3%', lang: 'C', uptime: '45d 8h', region: 'CLASSIFIED', bandwidth: 'N/A' },
];

const LOG_ENTRIES = [
    "[14:22:01] INCOMING_CONNECTION: 192.168.1.104 -> AUTH_SUCCESS",
    "[14:22:05] PAYLOAD_DEPLOYED: phantom_v4.py -> target_0x42",
    "[14:22:12] ENCRYPTION_ROTATED: AES-256-GCM -> NEW_KEY_GENERATED",
    "[14:22:18] HEARTBEAT_RECEIVED: v-crypt_c2.srv -> NODE_STABLE",
    "[14:22:25] EXFILTRATION_START: database_dump.sql -> 1.4GB",
    "[14:22:30] SYSTEM_ALERT: AV_EVASION_TRIGGERED -> bypass_success",
    "[14:23:01] ROOTKIT_STATUS: ring0_rootkit.sys -> PERSISTENCE_CONFIRMED",
    "[14:23:15] VM_PROTECT: shadow_vm.elf -> BYTECODE_VIRTUALIZED",
    "[14:23:28] NUCER_ATTACK: 10.0.0.55 -> BANDWIDTH_SAT_10GBPS",
    "[14:23:42] C2_RELAY: MULTI_HOP_CHAIN -> ANONYMITY_LEVEL: MAX",
    "[14:24:03] KEYLOG_DATA: 2.4MB CAPTURED -> ENCRYPTED_STORAGE",
    "[14:24:19] DKOM_ACTIVE: PROCESS_HIDDEN -> PID_SPOOFED_8842",
];

export const C2Dashboard = () => {
    const [logs, setLogs] = useState(LOG_ENTRIES);
    const mapRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const newLog = `[${new Date().toLocaleTimeString()}] ${LOG_ENTRIES[Math.floor(Math.random() * LOG_ENTRIES.length)].split('] ')[1]}`;
                return [newLog, ...prev.slice(0, 5)];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (dashboardRef.current) {
            const tl = gsap.timeline();
            tl.fromTo('.c2-header', { opacity: 0, y: -30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' })
              .fromTo('.mini-stats', { opacity: 0, y: 20, stagger: 0.1 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
              .fromTo('.global-map', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, '-=0.3')
              .fromTo('.event-stream', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
              .fromTo('.resource-monitor', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
              .fromTo('.threat-intel', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
              .fromTo('.active-ops', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
              .fromTo('.node-item', { opacity: 0, y: 20, stagger: 0.1 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
        }
    }, []);

    return (
        <div ref={dashboardRef} className="space-y-8">
            {/* Header with Server Stats */}
            <section className="c2-header border-b border-neon-cyan/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                        <Server className="text-neon-cyan animate-pulse" size={24} /> C2_DASHBOARD.core
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-neon-green rounded-full live-pulse" />
                            <span className="text-[11px] text-gray-300 font-bold tracking-widest uppercase">NODE: STABLE</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                            <span className="text-[11px] text-neon-cyan font-bold tracking-widest uppercase">UPLINK: 4.2GBPS</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                            <AlertCircle size={14} className="text-neon-amber animate-pulse" />
                            <span className="text-[11px] text-neon-amber font-bold tracking-widest uppercase">THREAT_LEVEL: ELEVATED</span>
                        </div>
                    </div>
                </div>

                <div className="mini-stats grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                    <MiniStat label="ACTIVE_CLIENTS" value="1,432" icon={<Users size={14} />} color="text-neon-cyan" />
                    <MiniStat label="THREAT_LEVEL" value="ELEVATED" icon={<ShieldAlert size={14} />} color="text-neon-amber" />
                    <MiniStat label="TOTAL_BOTS" value="968" icon={<Zap size={14} />} color="text-neon-green" />
                    <MiniStat label="DATA_EXFIL" value="4.7TB" icon={<Database size={14} />} color="text-neon-red" />
                </div>
            </section>

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column: Network Map & Logs */}
                <div className="lg:col-span-2 space-y-6">
                    <GlobalPresenceMap />

                    {/* Live Event Stream */}
                    <div className="event-stream border border-hud bg-black/80 p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="flex items-center gap-2">
                                <Radio size={14} className="text-neon-amber animate-pulse" />
                                <span className="text-[11px] font-bold text-white tracking-[0.2em]">LIVE_EVENT_STREAM</span>
                            </div>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">REAL_TIME_OUTPUT</span>
                        </div>
                        <div className="space-y-2 font-matrix text-[11px]">
                            <AnimatePresence mode="popLayout">
                                {logs.map((log, i) => (
                                    <motion.p
                                        key={log}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`${i === 0 ? 'text-neon-cyan glow-cyan-sm' : 'text-gray-400'}`}
                                    >
                                        <span className="mr-2">▸</span> {log}
                                    </motion.p>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Column: Resource Monitor & Node Health */}
                <div className="space-y-6">
                    <div className="resource-monitor border border-hud bg-black/40 p-6 space-y-6">
                        <h3 className="text-[12px] font-bold text-white tracking-[0.3em] flex items-center gap-2 mb-4">
                            <Activity size={14} className="text-neon-green" /> SYSTEM_RESOURCE_MONITOR
                        </h3>
                        
                        <ResourceGauge label="CPU_LOAD" value={82} color="bg-neon-cyan" />
                        <ResourceGauge label="MEMORY_USAGE" value={45} color="bg-neon-amber" />
                        <ResourceGauge label="NETWORK_I/O" value={68} color="bg-neon-green" />
                        <ResourceGauge label="DISK_SPACE" value={91} color="bg-neon-red" />
                    </div>

                    {/* Threat Intelligence Panel */}
                    <div className="threat-intel border border-neon-red/30 bg-black/40 p-6 space-y-4">
                        <h3 className="text-[12px] font-bold text-white tracking-[0.3em] flex items-center gap-2 mb-4">
                            <ShieldAlert size={14} className="text-neon-red animate-pulse" /> THREAT_INTEL.feed
                        </h3>
                        <div className="space-y-3">
                            <ThreatAlert level="CRITICAL" title="AV_SIGNATURE_UPDATE" desc="New signatures detected for phantom_v4.py" />
                            <ThreatAlert level="HIGH" title="NETWORK_ANOMALY" desc="Unusual traffic pattern on node 0x42" />
                            <ThreatAlert level="MEDIUM" title="HONEYPOT_DETECTED" desc="Potential honeypot in target range 10.0.0.0/24" />
                        </div>
                    </div>

                    {/* Active Operations */}
                    <div className="active-ops border border-hud bg-black/40 p-6 space-y-4">
                        <h3 className="text-[12px] font-bold text-white tracking-[0.3em] flex items-center gap-2 mb-4">
                            <Zap size={14} className="text-neon-amber" /> ACTIVE_OPERATIONS.queue
                        </h3>
                        <div className="space-y-2">
                            <OperationItem name="OP_BLACKOUT" progress={78} status="EXFILTRATION" />
                            <OperationItem name="OP_PHANTOM" progress={45} status="RECONNAISSANCE" />
                            <OperationItem name="OP_SHADOW" progress={92} status="PERSISTENCE" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MiniStat = ({ label, value, icon, color }: { label: string, value: string, icon: any, color: string }) => (
    <div className="bg-black/40 border border-hud px-4 py-3 flex items-center gap-3 hover:border-neon-cyan/40 transition-all">
        <div className={color}>{icon}</div>
        <div>
            <span className="block text-[9px] text-gray-400 font-bold tracking-widest uppercase">{label}</span>
            <span className="text-sm font-bold text-white">{value}</span>
        </div>
    </div>
);

const ResourceGauge = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-300 tracking-widest">{label}</span>
            <span className={`text-[10px] font-bold ${value > 90 ? 'text-neon-red' : 'text-neon-cyan'}`}>{value}%</span>
        </div>
        <div className="h-1.5 bg-white/5 w-full relative overflow-hidden rounded-sm">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-full ${color} rounded-sm`}
            />
        </div>
    </div>
);

const StatBox = ({ label, value }: { label: string, value: string }) => (
    <div className="space-y-1">
        <span className="block text-[9px] font-bold text-gray-400 tracking-widest">{label}</span>
        <span className="text-sm font-bold text-neon-cyan glow-cyan-sm">{value}</span>
    </div>
);

const ThreatAlert = ({ level, title, desc }: { level: string, title: string, desc: string }) => {
    const colors = {
        CRITICAL: 'text-neon-red border-neon-red/30 bg-neon-red/5',
        HIGH: 'text-neon-amber border-neon-amber/30 bg-neon-amber/5',
        MEDIUM: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5'
    };
    
    return (
        <div className={`p-3 border ${colors[level as keyof typeof colors]} hover:scale-[1.02] transition-transform`}>
            <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] font-bold">{title}</span>
                <span className="text-[9px] font-bold">{level}</span>
            </div>
            <p className="text-[9px] text-gray-300">{desc}</p>
        </div>
    );
};

const OperationItem = ({ name, progress, status }: { name: string, progress: number, status: string }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-white">{name}</span>
            <span className="text-[9px] text-neon-cyan font-bold">{status}</span>
        </div>
        <div className="h-1.5 bg-white/5 w-full relative overflow-hidden rounded-sm">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-neon-cyan rounded-sm"
            />
        </div>
        <div className="text-[9px] text-gray-400 text-right">{progress}%</div>
    </div>
);

