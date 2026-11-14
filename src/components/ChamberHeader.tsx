import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ChamberHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ChamberHeader: React.FC<ChamberHeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onNavigateSection,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between gap-8 px-6 lg:px-12 py-5 border-b border-stone-800/80 bg-[#0c1017]/95 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#console"
        onClick={(e) => {
          e.preventDefault();
          onNavigateSection('console');
        }}
        className="font-cinzel text-xl lg:text-2xl font-semibold tracking-wider text-stone-100 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
      >
        The Grand Pavilion
      </a>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs tracking-widest uppercase font-medium text-stone-400">
        <a
          href="#console"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('console');
          }}
          className="hover:text-stone-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Ceremonial Console
        </a>
        <a
          href="#protocol"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('protocol');
          }}
          className="hover:text-stone-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Curatorial Protocol
        </a>
        <a
          href="#ballistics"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('ballistics');
          }}
          className="hover:text-stone-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Atmospheric Physics
        </a>
        <a
          href="#ledger"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('ledger');
          }}
          className="hover:text-stone-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
        >
          Chamber Ledger
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSound}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium text-stone-300 bg-stone-900/90 border border-stone-700 hover:border-amber-500/50 hover:text-amber-200 rounded-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
          title={soundEnabled ? 'Acoustic resonance active' : 'Acoustics muted'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Chamber Audio: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-500" />
              <span>Chamber Audio: Muted</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
