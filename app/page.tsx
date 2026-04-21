import { SystemProvider } from '@/context/SystemContext';
import { HUDSystem } from '@/components/HUD/HUDSystem';
import { MatrixIntro } from '@/components/HUD/MatrixIntro';

export default function Home() {
  return (
    <SystemProvider>
      <main className="min-h-screen bg-background selection:bg-neon-cyan selection:text-black overflow-hidden relative scanline">
        <div className="crt absolute inset-0 pointer-events-none z-[9999]" />
        <MatrixIntro />
        <HUDSystem />
      </main>
    </SystemProvider>
  );
}
