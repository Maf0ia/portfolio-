import { SystemProvider } from '@/context/SystemContext';
import { HUDSystem } from '@/components/HUD/HUDSystem';
import { MatrixIntro } from '@/components/HUD/MatrixIntro';
import { AudioPlayer } from '@/components/HUD/AudioPlayer';

export default function Home() {
  return (
    <SystemProvider>
      <main className="min-h-screen bg-background selection:bg-neon-cyan selection:text-black overflow-hidden relative scanline">
        <div className="crt absolute inset-0 pointer-events-none z-[9999]" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-green/5 pointer-events-none" />
        <MatrixIntro />
        <HUDSystem />
        <AudioPlayer />
      </main>
    </SystemProvider>
  );
}
