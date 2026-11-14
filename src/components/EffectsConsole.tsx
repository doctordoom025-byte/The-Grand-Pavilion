import React from 'react';
import { Snowflake as SnowflakeIcon, Play, RotateCcw, Sparkles } from 'lucide-react';
import { ParticleDensity } from '../types/particles';

interface EffectsConsoleProps {
  isSnowing: boolean;
  isBalloons: boolean;
  snowRemainingMs: number;
  balloonRemainingMs: number;
  density: ParticleDensity;
  onChangeDensity: (d: ParticleDensity) => void;
  onTriggerSnow: () => void;
  onTriggerBalloons: () => void;
  onTriggerBoth: () => void;
  onStopAll: () => void;
  poppedBalloonsCount: number;
}

export const EffectsConsole: React.FC<EffectsConsoleProps> = ({
  isSnowing,
  isBalloons,
  snowRemainingMs,
  balloonRemainingMs,
  density,
  onChangeDensity,
  onTriggerSnow,
  onTriggerBalloons,
  onTriggerBoth,
  onStopAll,
  poppedBalloonsCount,
}) => {
  const snowProgress = Math.max(0, Math.min(100, (snowRemainingMs / 5000) * 100));
  const balloonProgress = Math.max(0, Math.min(100, (balloonRemainingMs / 5000) * 100));

  const formatSeconds = (ms: number) => {
    return (Math.max(0, ms) / 1000).toFixed(1);
  };

  return (
    <section id="console" className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Editorial Kicker & Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-amber-500/90 mb-3">
          <span>Salon Des Cérémonies</span>
          <span aria-hidden="true">·</span>
          <span>Atmospheric Dispersion Suite</span>
          <span aria-hidden="true">·</span>
          <span>Order No. 1884</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-100 mb-4 leading-tight">
          Ceremonial Effects Directorate
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
          Engage calibrated atmospheric precipitation or celebratory buoyant aerostats. Each sequence is timed to execute with five seconds of continuous manifestation.
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-400">
          <span>Duration Window: 5.0 Seconds</span>
          <span aria-hidden="true">·</span>
          <span>Scale: Medium Caliber</span>
          <span aria-hidden="true">·</span>
          <span>Pacing: Continuous Cadence</span>
          {poppedBalloonsCount > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-medium">Balloons Popped: {poppedBalloonsCount}</span>
            </>
          )}
        </div>
      </div>

      {/* Main Two Action Consoles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* --- Card 1: Snowflakes --- */}
        <div
          className={`relative p-8 rounded-none border transition-all duration-300 bg-[#121722]/90 backdrop-blur-md ${
            isSnowing
              ? 'border-sky-400/80 shadow-[0_0_35px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/40'
              : 'border-stone-800 hover:border-stone-700 hover:bg-[#151c2a]'
          }`}
        >
          {/* Subtle Corner Accents for Formal Polish */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-600/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-stone-600/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-stone-600/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-600/60 pointer-events-none" />

          {/* Card Top Information */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-sky-400/90 block mb-1">
                Protocol I · Atmospheric Fall
              </span>
              <h2 className="font-serif-display text-2xl lg:text-3xl font-medium text-stone-100">
                Atmospheric Snowfall
              </h2>
            </div>
            <div
              className={`p-3 border rounded-sm transition-colors ${
                isSnowing
                  ? 'border-sky-400/50 bg-sky-950/60 text-sky-200'
                  : 'border-stone-800 bg-stone-900/60 text-stone-400'
              }`}
            >
              <SnowflakeIcon className={`w-6 h-6 ${isSnowing ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </div>
          </div>

          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
            Triggers delicate 6-fold crystalline dendrite flakes of medium size descending from the ceiling of the hall to the floor across 5 seconds.
          </p>

          {/* 5-Second Active Countdown Display */}
          <div className="mb-6 py-3 px-4 bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-stone-400 tracking-wider uppercase text-[10px]">
                {isSnowing ? 'Active Cascade' : 'Chamber State'}
              </span>
              <span className="font-mono text-xs tabular-nums text-stone-200">
                {isSnowing ? `${formatSeconds(snowRemainingMs)}s Remaining` : 'Ready / 5.0s'}
              </span>
            </div>
            {/* Countdown Progress Track */}
            <div className="w-full h-1.5 bg-stone-900 overflow-hidden rounded-xs">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-sky-300 transition-all duration-100 ease-linear"
                style={{ width: `${snowProgress}%` }}
              />
            </div>
          </div>

          {/* PRIMARY BUTTON: "Snowflakes" */}
          <button
            onClick={onTriggerSnow}
            className={`w-full py-4 px-6 text-sm tracking-widest uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-3 border shadow-sm cursor-pointer ${
              isSnowing
                ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-stone-900/90 hover:bg-stone-800 text-stone-100 border-stone-700 hover:border-sky-400/60 hover:text-sky-200'
            }`}
          >
            <SnowflakeIcon className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap font-cinzel text-base tracking-wider">
              {isSnowing ? `Snowflakes (${formatSeconds(snowRemainingMs)}s)` : 'Snowflakes'}
            </span>
          </button>
        </div>

        {/* --- Card 2: Balloons --- */}
        <div
          className={`relative p-8 rounded-none border transition-all duration-300 bg-[#121722]/90 backdrop-blur-md ${
            isBalloons
              ? 'border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40'
              : 'border-stone-800 hover:border-stone-700 hover:bg-[#151c2a]'
          }`}
        >
          {/* Subtle Corner Accents for Formal Polish */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-600/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-stone-600/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-stone-600/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-600/60 pointer-events-none" />

          {/* Card Top Information */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400/90 block mb-1">
                Protocol II · Buoyant Ascendance
              </span>
              <h2 className="font-serif-display text-2xl lg:text-3xl font-medium text-stone-100">
                Aerostat Ascendance
              </h2>
            </div>
            {/* Custom Formal Balloon SVG Icon */}
            <div
              className={`p-3 border rounded-sm transition-colors ${
                isBalloons
                  ? 'border-amber-400/50 bg-amber-950/60 text-amber-200'
                  : 'border-stone-800 bg-stone-900/60 text-stone-400'
              }`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 4.5 4 8 8 8s8-3.5 8-8c0-4.42-3.58-8-8-8z" />
                <path d="M12 18v1" />
                <path d="M11 19h2" />
                <path d="M12 20c-1 1-1 2 0 3s1 2 0 3" />
              </svg>
            </div>
          </div>

          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
            Releases medium-size satin-finish jewel-toned balloons with trailing ribbons floating upwards from the floor to the vaulted ceiling for 5 seconds.
          </p>

          {/* 5-Second Active Countdown Display */}
          <div className="mb-6 py-3 px-4 bg-stone-950/70 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-stone-400 tracking-wider uppercase text-[10px]">
                {isBalloons ? 'Active Ascendance' : 'Chamber State'}
              </span>
              <span className="font-mono text-xs tabular-nums text-stone-200">
                {isBalloons ? `${formatSeconds(balloonRemainingMs)}s Remaining` : 'Ready / 5.0s'}
              </span>
            </div>
            {/* Countdown Progress Track */}
            <div className="w-full h-1.5 bg-stone-900 overflow-hidden rounded-xs">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 transition-all duration-100 ease-linear"
                style={{ width: `${balloonProgress}%` }}
              />
            </div>
          </div>

          {/* PRIMARY BUTTON: "Balloons" */}
          <button
            onClick={onTriggerBalloons}
            className={`w-full py-4 px-6 text-sm tracking-widest uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-3 border shadow-sm cursor-pointer ${
              isBalloons
                ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-stone-900/90 hover:bg-stone-800 text-stone-100 border-stone-700 hover:border-amber-400/60 hover:text-amber-200'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C7.58 2 4 5.58 4 10c0 4.5 4 8 8 8s8-3.5 8-8c0-4.42-3.58-8-8-8z" />
              <path d="M12 18v1" />
              <path d="M12 20c-0.8 0.8-0.8 1.6 0 2.4" />
            </svg>
            <span className="whitespace-nowrap font-cinzel text-base tracking-wider">
              {isBalloons ? `Balloons (${formatSeconds(balloonRemainingMs)}s)` : 'Balloons'}
            </span>
          </button>
        </div>
      </div>

      {/* Chamber Calibration & Secondary Controls Bar */}
      <div className="p-6 bg-[#0e131d]/90 border border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Density Segmented Control */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <span className="text-xs uppercase tracking-wider text-stone-400 font-medium whitespace-nowrap">
            Atmospheric Density:
          </span>
          <div className="flex items-center gap-1 p-1 bg-stone-950/80 border border-stone-800 rounded-sm w-full sm:w-auto">
            <button
              onClick={() => onChangeDensity('subtle')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-xs whitespace-nowrap ${
                density === 'subtle'
                  ? 'bg-stone-800 text-amber-200 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Subtle
            </button>
            <button
              onClick={() => onChangeDensity('formal')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-xs whitespace-nowrap ${
                density === 'formal'
                  ? 'bg-stone-800 text-amber-200 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Curated (Medium)
            </button>
            <button
              onClick={() => onChangeDensity('grand')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-xs whitespace-nowrap ${
                density === 'grand'
                  ? 'bg-stone-800 text-amber-200 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Grand Gala
            </button>
          </div>
        </div>

        {/* Ceremonial Action Utility Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onTriggerBoth}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-medium tracking-wider uppercase text-amber-300 bg-amber-950/40 border border-amber-600/40 hover:bg-amber-900/50 hover:border-amber-500 rounded-xs transition-colors whitespace-nowrap flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dual Release (5s Both)</span>
          </button>

          {(isSnowing || isBalloons) && (
            <button
              onClick={onStopAll}
              className="px-3.5 py-2 text-xs font-medium tracking-wider uppercase text-stone-400 hover:text-rose-300 bg-stone-900/80 border border-stone-800 hover:border-rose-800/60 rounded-xs transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Conclude</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
