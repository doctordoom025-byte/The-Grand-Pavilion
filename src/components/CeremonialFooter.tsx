import React from 'react';

export const CeremonialFooter: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-stone-800/80 bg-[#090d13] py-10 px-6 lg:px-12 text-stone-500 text-xs">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-cinzel text-stone-300 font-semibold tracking-wider block mb-1">
            The Grand Pavilion
          </span>
          <p className="font-light text-stone-400">
            Directorate of Ceremonial Stagecraft · Salon Des Cérémonies
          </p>
        </div>

        {/* Clean Unboxed Metadata with Typographic Separators */}
        <div className="flex flex-wrap items-center gap-2 text-stone-400 text-xs">
          <span>Standard Protocol ISO-1884</span>
          <span aria-hidden="true">·</span>
          <span>5.0s Release Calibration</span>
          <span aria-hidden="true">·</span>
          <span>Medium Aperture</span>
          <span aria-hidden="true">·</span>
          <span>© 2026 The Grand Pavilion</span>
        </div>
      </div>
    </footer>
  );
};
