"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Threat {
  id: string;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  actor: string;
  payload: string;
  cve: string;
  protocol: string;
  origin: string;
  target: string;
  timestamp: Date;
  status: 'blocked' | 'active';
  progress: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const APT_ACTORS = [
  'APT29 Cozy Bear', 'APT28 Fancy Bear', 'Lazarus Group', 'Equation Group',
  'Sandworm Team', 'Dragonfly', 'FinFisher Unit', 'Turla Snake',
  'Carbanak Gang', 'DarkHotel APT', 'Winnti Group', 'Stone Panda'
];

const MALWARE_PAYLOADS = [
  'SUNBURST Backdoor', 'DOUBLEPULSAR', 'Emotet Trojan', 'WannaCry Ransomware',
  'NotPetya Wiper', 'Stuxnet Worm', 'BlackEnergy RAT', 'Havex Trojan',
  'Industroyer Malware', 'Triton Malware', 'BadRabbit Ransom', 'Zerologon Exploit'
];

const CVE_NUMBERS = [
  'CVE-2024-1086', 'CVE-2023-46805', 'CVE-2023-34362', 'CVE-2024-21762',
  'CVE-2023-44487', 'CVE-2024-0519', 'CVE-2023-48795', 'CVE-2024-21413',
  'CVE-2023-36884', 'CVE-2024-1709', 'CVE-2023-4966', 'CVE-2024-3400'
];

const PROTOCOLS = ['TCP', 'UDP', 'HTTP/2', 'SSH', 'DNS', 'TLS 1.3', 'ICMP', 'SMB'];

const REGIONS = [
  { name: 'US-EAST', x: 0.22, y: 0.32 },
  { name: 'US-WEST', x: 0.15, y: 0.35 },
  { name: 'EU-WEST', x: 0.47, y: 0.28 },
  { name: 'EU-EAST', x: 0.55, y: 0.30 },
  { name: 'RUSSIA', x: 0.62, y: 0.22 },
  { name: 'ASIA-EAST', x: 0.75, y: 0.32 },
  { name: 'ASIA-SOUTH', x: 0.68, y: 0.42 },
  { name: 'MIDDLE-EAST', x: 0.58, y: 0.40 },
  { name: 'AFRICA', x: 0.52, y: 0.55 },
  { name: 'AUSTRALIA', x: 0.82, y: 0.65 },
  { name: 'SOUTH-AMERICA', x: 0.28, y: 0.62 },
  { name: 'JAPAN', x: 0.82, y: 0.30 }
];

export const InteractiveThreatMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [threatCount, setThreatCount] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [radarAngle, setRadarAngle] = useState(0);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff003c';
      case 'high': return '#ffaa00';
      case 'medium': return '#00f3ff';
      case 'low': return '#00ff41';
      default: return '#00f3ff';
    }
  };

  const createExplosion = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.5,
        color
      });
    }
    setParticles(prev => [...prev.slice(-100), ...newParticles]);
  }, []);

  const spawnThreat = useCallback(() => {
    const severities: Array<Threat['severity']> = ['critical', 'high', 'medium', 'low'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const fromRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    let toRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    while (toRegion.name === fromRegion.name) {
      toRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    }

    const newThreat: Threat = {
      id: Date.now().toString(),
      x: fromRegion.x,
      y: fromRegion.y,
      fromX: fromRegion.x,
      fromY: fromRegion.y,
      severity,
      actor: APT_ACTORS[Math.floor(Math.random() * APT_ACTORS.length)],
      payload: MALWARE_PAYLOADS[Math.floor(Math.random() * MALWARE_PAYLOADS.length)],
      cve: CVE_NUMBERS[Math.floor(Math.random() * CVE_NUMBERS.length)],
      protocol: PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)],
      origin: fromRegion.name,
      target: toRegion.name,
      timestamp: new Date(),
      status: Math.random() > 0.3 ? 'blocked' : 'active',
      progress: 0
    };

    setThreats(prev => [...prev.slice(-30), newThreat]);
    setThreatCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    const radarInterval = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 50);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(radarInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const drawWorldMap = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (h / 10) * i);
        ctx.lineTo(w, (h / 10) * i);
        ctx.stroke();
      }

      for (let i = 0; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo((w / 20) * i, 0);
        ctx.lineTo((w / 20) * i, h);
        ctx.stroke();
      }

      const continents = [
        'M 120,150 C 180,100 250,110 320,130 C 400,120 480,100 560,110 C 640,100 720,120 800,140 C 860,160 900,180 920,200 L 900,250 L 750,270 L 600,250 L 450,260 L 300,240 L 180,220 Z',
        'M 280,240 L 260,290 L 280,350 L 310,370 L 340,340 L 320,290 Z',
        'M 620,120 L 650,90 L 700,100 L 740,130 L 720,170 L 680,180 L 640,160 Z',
        'M 750,230 L 780,200 L 830,220 L 860,250 L 840,290 L 800,300 L 770,280 Z',
        'M 500,280 L 530,260 L 580,270 L 600,300 L 570,330 L 520,320 L 490,300 Z',
        'M 870,320 L 890,300 L 920,310 L 930,340 L 910,360 L 880,350 Z'
      ];

      ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
      ctx.lineWidth = 2;
      continents.forEach(path => {
        const p = new Path2D(path);
        ctx.stroke(p);
      });
    };

    const drawRadarSweep = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.max(w, h) * 0.8;

      const angle = (radarAngle * Math.PI) / 180;
      const gradient = ctx.createConicGradient(angle, cx, cy);
      gradient.addColorStop(0, 'rgba(0, 243, 255, 0)');
      gradient.addColorStop(0.9, 'rgba(0, 243, 255, 0)');
      gradient.addColorStop(1, 'rgba(0, 243, 255, 0.08)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawAttackLines = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const time = Date.now() / 1000;

      threats.forEach(threat => {
        if (threat.progress > 1) return;

        const color = getSeverityColor(threat.severity);
        const startX = threat.fromX * w;
        const startY = threat.fromY * h;
        const endX = threat.x * w;
        const endY = threat.y * h;

        const midX = (startX + endX) / 2;
        const midY = Math.min(startY, endY) - 50;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.globalAlpha = 0.6;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(midX, midY, endX, endY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        const headPos = threat.progress;
        const t = headPos;
        const headX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX;
        const headY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY;

        const headGradient = ctx.createRadialGradient(headX, headY, 0, headX, headY, 12);
        headGradient.addColorStop(0, color);
        headGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(headX, headY, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(headX, headY, 4, 0, Math.PI * 2);
        ctx.fill();

        if (headPos >= 1) {
          createExplosion(endX, endY, color);
        }
      });
    };

    const drawThreatNodes = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const time = Date.now() / 1000;

      threats.forEach(threat => {
        if (threat.progress < 1) return;

        const color = getSeverityColor(threat.severity);
        const x = threat.x * w;
        const y = threat.y * h;
        const size = threat.severity === 'critical' ? 10 : threat.severity === 'high' ? 8 : 6;

        const pulse = Math.sin(time * 3) * 0.5 + 0.5;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3 + pulse * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, size + 10 + pulse * 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, size + 15 + pulse * 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 1;

        const bracketSize = size + 8;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - bracketSize, y - bracketSize + 5);
        ctx.lineTo(x - bracketSize, y - bracketSize);
        ctx.lineTo(x - bracketSize + 5, y - bracketSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + bracketSize, y - bracketSize + 5);
        ctx.lineTo(x + bracketSize, y - bracketSize);
        ctx.lineTo(x + bracketSize - 5, y - bracketSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - bracketSize, y + bracketSize - 5);
        ctx.lineTo(x - bracketSize, y + bracketSize);
        ctx.lineTo(x - bracketSize + 5, y + bracketSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + bracketSize, y + bracketSize - 5);
        ctx.lineTo(x + bracketSize, y + bracketSize);
        ctx.lineTo(x + bracketSize - 5, y + bracketSize);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 15, y);
        ctx.lineTo(x + 15, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x, y + 15);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };

    const drawParticles = () => {
      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      const bgGradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      bgGradient.addColorStop(0, '#020c12');
      bgGradient.addColorStop(1, '#010608');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      drawWorldMap();
      drawRadarSweep();
      drawAttackLines();
      drawThreatNodes();
      drawParticles();

      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 3) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const vignetteGradient = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7);
      vignetteGradient.addColorStop(0, 'transparent');
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, w, h);

      if (timestamp - lastSpawnRef.current > 1700) {
        spawnThreat();
        lastSpawnRef.current = timestamp;
      }

      setThreats(prev => prev.map(t => ({
        ...t,
        progress: Math.min(1, t.progress + 0.008)
      })));

      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02
        }))
        .filter(p => p.life > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [threats, particles, radarAngle, spawnThreat, createExplosion]);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const filteredThreats = filterSeverity === 'all' ? threats : threats.filter(t => t.severity === filterSeverity);
  const threatsPerMinute = Math.round((threatCount / Math.max(1, uptime / 60)));

  return (
    <div ref={containerRef} className="w-full h-full relative bg-[#020c12] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute top-4 left-4 w-64 bg-black/80 border border-[#00f3ff]/30 p-4 backdrop-blur-sm z-10">
        <h3 className="text-sm font-bold text-[#00f3ff] mb-3 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          THREAT_STATISTICS
        </h3>
        <div className="space-y-3">
          <div>
            <div className="text-[10px] text-gray-400 mb-1">TOTAL_THREATS</div>
            <div className="text-2xl font-bold text-[#00f3ff]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{threatCount}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 mb-1">THREATS/MIN</div>
            <div className="text-xl font-bold text-[#00f3ff]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{threatsPerMinute}</div>
          </div>
          {(['critical', 'high', 'medium', 'low'] as const).map(severity => {
            const count = threats.filter(t => t.severity === severity).length;
            const percentage = Math.round((count / Math.max(1, threats.length)) * 100);
            return (
              <div key={severity}>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-gray-400">{severity.toUpperCase()}</span>
                  <span style={{ color: getSeverityColor(severity) }}>{percentage}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${percentage}%`, backgroundColor: getSeverityColor(severity) }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-[10px] text-gray-400 mb-2">FILTER_BY_SEVERITY</div>
          <div className="grid grid-cols-2 gap-2">
            {['all', 'critical', 'high', 'medium', 'low'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2 py-1 text-[9px] font-bold border transition-all ${
                  filterSeverity === sev
                    ? 'border-[#00f3ff] text-[#00f3ff] bg-[#00f3ff]/10'
                    : 'border-white/20 text-gray-500 hover:border-white/40'
                }`}
              >
                {sev.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-72 bg-black/80 border border-[#00f3ff]/30 p-4 backdrop-blur-sm z-10">
        <h3 className="text-sm font-bold text-[#00f3ff] mb-3 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          LIVE_ATTACK_FEED
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
          {filteredThreats.slice(-10).reverse().map(threat => (
            <div
              key={threat.id}
              onClick={() => setSelectedThreat(threat)}
              className="p-2 bg-white/5 border border-white/10 hover:border-[#00f3ff]/50 cursor-pointer transition-all"
            >
              <div className="flex justify-between text-[9px] mb-1">
                <span style={{ color: getSeverityColor(threat.severity) }}>{threat.severity.toUpperCase()}</span>
                <span className="text-gray-500">{threat.timestamp.toLocaleTimeString()}</span>
              </div>
              <div className="text-[9px] text-gray-400">{threat.actor}</div>
              <div className="text-[8px] text-gray-500 mt-1">{threat.protocol} | {threat.cve}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedThreat && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-black/95 border border-[#00f3ff]/50 p-6 backdrop-blur-md z-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#00f3ff]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              THREAT_DETAILS
            </h3>
            <button
              onClick={() => setSelectedThreat(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-400">Actor:</span>
              <span className="text-[#00f3ff] font-bold">{selectedThreat.actor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payload:</span>
              <span className="text-[#00f3ff]">{selectedThreat.payload}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CVE:</span>
              <span className="text-[#00f3ff]">{selectedThreat.cve}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Protocol:</span>
              <span className="text-[#00f3ff]">{selectedThreat.protocol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Severity:</span>
              <span style={{ color: getSeverityColor(selectedThreat.severity) }} className="font-bold">
                {selectedThreat.severity.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`font-bold ${selectedThreat.status === 'blocked' ? 'text-green-500' : 'text-red-500'}`}>
                {selectedThreat.status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Origin:</span>
              <span className="text-[#00f3ff]">{selectedThreat.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Target:</span>
              <span className="text-[#00f3ff]">{selectedThreat.target}</span>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/90 border-t border-[#00f3ff]/30 flex items-center px-4 gap-6 z-10">
        <div className="flex items-center gap-4">
          {(['critical', 'high', 'medium', 'low'] as const).map(severity => (
            <div key={severity} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getSeverityColor(severity) }} />
              <span className="text-[9px] text-gray-400">{severity.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="text-[10px] text-gray-400" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          SYSTEM_STATUS: <span className="text-green-500 font-bold">ACTIVE</span> | 
          UPTIME: <span className="text-[#00f3ff]">{formatUptime(uptime)}</span> | 
          MONITORING: <span className="text-[#00f3ff]">ENABLED</span>
        </div>
      </div>
    </div>
  );
};
