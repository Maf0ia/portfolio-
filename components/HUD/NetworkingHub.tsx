"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Network, Activity, Globe, Wifi, Shield, AlertTriangle } from 'lucide-react';
import { InteractiveThreatMap } from './InteractiveThreatMap';
import { gsap } from 'gsap';

const PACKET_DATA = [
    { time: '0.000', source: '192.168.1.1', dest: '192.168.1.105', protocol: 'TCP', info: '[SYN] Port 443 -> 55231' },
    { time: '0.001', source: '192.168.1.105', dest: '192.168.1.1', protocol: 'TCP', info: '[SYN, ACK] Port 55231 -> 443' },
    { time: '0.002', source: '192.168.1.1', dest: '192.168.1.105', protocol: 'TCP', info: '[ACK] Port 443 -> 55231' },
    { time: '0.015', source: '192.168.1.105', dest: '93.184.216.34', protocol: 'TLSv1.2', info: 'Client Hello' },
];

export const NetworkingHub = () => {
    const [activePackets, setActivePackets] = useState(PACKET_DATA);
    const [geoData, setGeoData] = useState<{ ip: string; city: string; country: string; lat: number; lon: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [threatCount, setThreatCount] = useState(0);

    // Fetch real user location
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(r => r.json())
            .then(data => setGeoData({ ip: data.ip, city: data.city, country: data.country_code, lat: data.latitude, lon: data.longitude }))
            .catch(() => setGeoData({ ip: '?.?.?.?', city: 'UNKNOWN', country: '??', lat: 30.04, lon: 31.23 }));
    }, []);

    // GSAP entrance animations
    useEffect(() => {
        if (containerRef.current) {
            const tl = gsap.timeline();
            tl.fromTo('.network-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
              .fromTo('.threat-map-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3')
              .fromTo('.packet-feed', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
              .fromTo('.tool-card', { opacity: 0, y: 20, stagger: 0.1 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const srcIp = geoData?.ip || '192.168.1.1';
            const protocols = ['HTTP', 'SSH', 'TLSv1.3', 'DNS', 'ICMP', 'TCP', 'UDP'];
            const infos = [
                'GET /api/v1/telemetry',
                'POST /payload/upload',
                'DNS A record query',
                'Echo Request',
                'Client Hello',
                '[SYN] Port 8080',
                'TLSv1.3 Handshake',
                'SSH-2.0-OpenSSH_8.9'
            ];
            
            const newPacket = {
                time: (Math.random() * 1).toFixed(3),
                source: srcIp,
                dest: `104.26.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                protocol: protocols[Math.floor(Math.random() * protocols.length)],
                info: infos[Math.floor(Math.random() * infos.length)]
            };
            setActivePackets(prev => [newPacket, ...prev.slice(0, 12)]);
            setThreatCount(prev => prev + 1);
        }, 1500);
        return () => clearInterval(interval);
    }, [geoData]);

    return (
        <div ref={containerRef} className="space-y-8 h-full flex flex-col">
            <section className="network-header border-b border-neon-cyan/20 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-white flex items-center gap-3">
                    <Network className="text-neon-cyan" size={24} /> NETWORKING_HUB.eth0
                </h2>
                <div className="flex gap-4 mt-2 flex-wrap">
                    <span className="text-[11px] text-neon-green font-bold flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-neon-green rounded-full live-pulse" />
                        [ONLINE] PACKET_SNIFFER
                    </span>
                    <span className="text-[11px] text-gray-400 font-bold">[OFFLINE] BGP_HIJACKER</span>
                    <span className="text-[11px] text-neon-red font-bold flex items-center gap-2">
                        <AlertTriangle size={14} className="animate-pulse" />
                        THREATS: {threatCount}
                    </span>
                </div>
            </section>

            {/* Real Interactive Threat Map */}
            <div className="threat-map-container border border-hud bg-black/65 overflow-hidden flex flex-col relative" style={{ height: 380 }}>
                <div className="bg-neon-red/10 px-4 py-2.5 flex justify-between items-center border-b border-hud">
                    <span className="text-[11px] font-bold text-neon-red tracking-widest uppercase flex items-center gap-2">
                        <Shield size={16} className="animate-pulse" />
                        INTERACTIVE_THREAT_MAP
                    </span>
                    <span className="text-[11px] text-neon-red/60 animate-pulse font-bold">LIVE_INTRUSIONS_DETECTED</span>
                </div>

                <div className="flex-1 relative">
                    <InteractiveThreatMap />
                    
                    {/* User Location Overlay */}
                    <div className="absolute top-4 left-4 w-48 bg-black/90 border border-neon-cyan/30 p-3 space-y-2 backdrop-blur-sm">
                        <div className="text-[9px] text-gray-300 font-bold border-b border-white/10 pb-1">YOUR_LOCATION</div>
                        <div className="text-[11px] text-neon-cyan font-bold">{geoData ? `${geoData.city.toUpperCase()}, ${geoData.country}` : 'DETECTING...'}</div>
                        <div className="text-[10px] text-neon-green font-bold font-mono">{geoData?.ip || '...'}</div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2.5 h-2.5 bg-neon-green rounded-full live-pulse" />
                            <span className="text-[9px] text-neon-green">MONITORING ACTIVE</span>
                        </div>
                    </div>

                    {/* Threat Stats Overlay */}
                    <div className="absolute top-4 right-4 w-48 bg-black/90 border border-neon-red/30 p-3 space-y-2 backdrop-blur-sm">
                        <div className="text-[9px] text-gray-300 font-bold border-b border-white/10 pb-1">THREAT_INTEL</div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-300">CRITICAL</span>
                                <span className="text-[10px] text-neon-red font-bold animate-pulse">{Math.floor(threatCount * 0.15)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-300">HIGH</span>
                                <span className="text-[10px] text-neon-amber font-bold">{Math.floor(threatCount * 0.25)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-300">MEDIUM</span>
                                <span className="text-[10px] text-neon-cyan font-bold">{Math.floor(threatCount * 0.35)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-300">LOW</span>
                                <span className="text-[10px] text-neon-green font-bold">{Math.floor(threatCount * 0.25)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packet Sniffer View (Wireshark Clone) */}
            <div className="packet-feed flex-1 bg-black/60 border border-hud overflow-hidden flex flex-col">
                <div className="bg-neon-cyan/10 px-4 py-2.5 flex justify-between items-center border-b border-hud">
                    <span className="text-[11px] font-bold text-neon-cyan tracking-widest uppercase flex items-center gap-2">
                        <Activity size={16} className="animate-pulse" />
                        LIVE_TRAFFIC_FEED
                    </span>
                    <span className="text-[10px] text-neon-cyan/60 font-bold">{activePackets.length} PACKETS CAPTURED</span>
                </div>
                <div className="flex-1 overflow-auto p-4 font-matrix text-[11px] space-y-1 scrollbar-hide">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 border-b border-white/5">
                                <th className="py-2 font-bold">TIME</th>
                                <th className="py-2 font-bold">SOURCE</th>
                                <th className="py-2 font-bold">DESTINATION</th>
                                <th className="py-2 font-bold">PROTO</th>
                                <th className="py-2 font-bold">INFO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activePackets.map((p, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`${i === 0 ? 'text-neon-cyan bg-neon-cyan/5' : 'text-neon-cyan/80'} hover:bg-neon-cyan/5 border-b border-white/5 cursor-crosshair transition-colors`}
                                >
                                    <td className="py-2">{p.time}</td>
                                    <td className="py-2 font-bold">{p.source}</td>
                                    <td className="py-2">{p.dest}</td>
                                    <td className="py-2 text-neon-amber font-bold">{p.protocol}</td>
                                    <td className="py-2 text-gray-300 italic truncate max-w-[200px]">{p.info}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Port Exploit Suite */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ToolCard
                    icon={<Globe size={18} />}
                    title="PORT_SCANNER"
                    desc="Synchronous TCP/UDP port discovery suite with fingerprinting capabilities."
                />
                <ToolCard
                    icon={<Wifi size={18} />}
                    title="MITM_STATION"
                    desc="Automated ARP spoofing and DNS poisoning module for local networks."
                />
                <ToolCard
                    icon={<Activity size={18} />}
                    title="LOAD_GEN"
                    desc="Stress-testing utility for validating infrastructure resiliency under load."
                />
            </div>
        </div>
    );
};

const ToolCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                y: -4,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="tool-card border border-hud bg-black/40 p-5 hover:border-neon-cyan/60 transition-all group cursor-pointer"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="text-neon-cyan group-hover:scale-110 transition-transform">{icon}</div>
                <h3 className="text-[11px] font-bold tracking-widest text-white">{title}</h3>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed font-medium">
                {desc}
            </p>
        </div>
    );
};
