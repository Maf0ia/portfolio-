"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Database, Terminal, Server, Activity } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  status: 'ACTIVE' | 'STEALTH' | 'DEPLOYED' | 'HIDDEN';
  type: string;
  infections: number;
  load: string;
  lang: string;
  uptime: string;
  region: string;
  bandwidth: string;
}

const NODE_DATA: Node[] = [
  { id: '1', name: 'v-crypt_c2.srv', status: 'ACTIVE', type: 'VIRTUALIZED_HUB', infections: 432, load: '42%', lang: 'C# / .NET', uptime: '14d 2h', region: 'US-EAST', bandwidth: '1.2GB/s' },
  { id: '2', name: 'phantom_v4.py', status: 'STEALTH', type: 'POLYMORPHIC_RAT', infections: 124, load: '12%', lang: 'Python', uptime: '8d 5h', region: 'EU-WEST', bandwidth: '845MB/s' },
  { id: '3', name: 'optic_binder.exe', status: 'DEPLOYED', type: 'PAYLOAD_DIST', infections: 89, load: '5%', lang: 'C++', uptime: '2d 1h', region: 'ASIA-PAC', bandwidth: '423MB/s' },
  { id: '4', name: 'shadow_vm.elf', status: 'ACTIVE', type: 'VIRTUALIZATION', infections: 267, load: '38%', lang: 'Rust', uptime: '21d 14h', region: 'GLOBAL', bandwidth: '2.1GB/s' },
  { id: '5', name: 'ring0_rootkit.sys', status: 'HIDDEN', type: 'KERNEL_ROOTKIT', infections: 56, load: '3%', lang: 'C', uptime: '45d 8h', region: 'CLASSIFIED', bandwidth: 'N/A' },
];

export const GlobalPresenceMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>(NODE_DATA);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo('.map-container', {
        opacity: 0,
        scale: 0.95
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      });
      gsap.fromTo('.hud-element', {
        opacity: 0,
        y: 15
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.3
      });
      gsap.fromTo('.node-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        load: `${Math.min(100, Math.max(5, parseInt(node.load) + (Math.random() - 0.5) * 10))}%`
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-neon-green border-neon-green';
      case 'HIDDEN': return 'text-neon-red border-neon-red';
      case 'STEALTH': return 'text-neon-cyan border-neon-cyan';
      case 'DEPLOYED': return 'text-neon-amber border-neon-amber';
      default: return 'text-neon-cyan border-neon-cyan';
    }
  };

  return (
    <div ref={containerRef} className="map-container border border-hud bg-black/60 relative overflow-hidden h-[400px] p-6">
      <div className="hud-element flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Database size={20} className="text-neon-cyan" />
          <span className="text-[13px] font-bold text-neon-cyan tracking-[0.2em]">NODE_ORCHESTRATION</span>
        </div>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">TOTAL: {nodes.length} ACTIVE NODES</span>
      </div>

      <div className="space-y-3 overflow-y-auto scrollbar-hide" style={{ maxHeight: '320px' }}>
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className="node-item border border-hud bg-black/40 p-4 flex justify-between items-center gap-4 group hover:border-neon-cyan/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 border ${getStatusColor(node.status)} ${node.status === 'ACTIVE' ? 'border-neon-green/30' : node.status === 'HIDDEN' ? 'border-neon-red/30' : 'border-neon-amber/30'}`}>
                <Terminal size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-3">
                  {node.name}
                  <span className={`text-[9px] px-2 py-0.5 border ${getStatusColor(node.status)}`}>
                    {node.status}
                  </span>
                </h4>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{node.type} | {node.lang}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[8px] px-1.5 py-0.5 bg-white/5 text-neon-cyan/60">{node.region}</span>
                  <span className="text-[8px] px-1.5 py-0.5 bg-white/5 text-neon-green/60">{node.bandwidth}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 text-center items-center">
              <div className="space-y-0.5">
                <span className="block text-[8px] font-bold text-gray-500 tracking-widest">UPTIME</span>
                <span className="text-xs font-bold text-neon-cyan glow-cyan-sm">{node.uptime}</span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-[8px] font-bold text-gray-500 tracking-widest">CLIENTS</span>
                <span className="text-xs font-bold text-neon-cyan glow-cyan-sm">{node.infections}</span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-[8px] font-bold text-gray-500 tracking-widest">LOAD</span>
                <span className="text-xs font-bold text-neon-cyan glow-cyan-sm">{node.load}</span>
              </div>
            </div>

            <button className="px-4 py-2 bg-neon-cyan/5 border border-neon-cyan/30 text-[10px] font-bold text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all">
              ORCHESTRATE
            </button>
          </div>
        ))}
      </div>

      <div className="hud-element absolute bottom-4 right-4 text-[9px] text-gray-500 font-mono text-right bg-black/60 p-2 backdrop-blur-sm">
        <p className="text-neon-green">TOTAL_INFECTIONS: {nodes.reduce((sum, n) => sum + n.infections, 0)}</p>
        <p className="text-neon-cyan">ACTIVE_OPERATIONS: {nodes.filter(n => n.status === 'ACTIVE').length}</p>
      </div>
    </div>
  );
};
