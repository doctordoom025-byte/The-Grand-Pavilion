import React from 'react';
import { CeremonyLogEntry } from '../types/particles';

interface ProtocolSectionProps {
  logs: CeremonyLogEntry[];
}

export const ProtocolSection: React.FC<ProtocolSectionProps> = ({ logs }) => {
  return (
    <section id="protocol" className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-stone-800/80">
      {/* Editorial Chapter Header */}
      <div className="mb-10">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-500/90 block mb-2">
          Chapter III · Curatorial Physics & Registry
        </span>
        <h2 className="font-serif-display text-3xl lg:text-4xl font-medium text-stone-100">
          Chamber Ballistics & Atmospheric Standards
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed mt-2 max-w-2xl font-light">
          A codified examination of kinetic trajectories, optical properties, and physical parameters governing ceremonial manifestations within the Grand Pavilion.
        </p>
      </div>

      {/* Two-Column Asymmetric Curatorial Study */}
      <div id="ballistics" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {/* Study 1: Snowflakes */}
        <div className="p-6 bg-[#0e131c]/70 border border-stone-800/80">
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-sky-400 font-medium mb-2">
            <span>Section A · Hexagonal Crystallography</span>
          </div>
          <h3 className="font-serif-display text-xl text-stone-100 mb-3">
            Medium-Caliber Stellar Dendrites
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
            Each snowflake is rendered according to Kepler’s hexagonal symmetry principles. Spanning twenty-four to thirty-six millimeters in virtual diameter, the particles exhibit subtle horizontal sinusoidal swaying induced by atmospheric micro-currents.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs">
            <div>
              <span className="text-stone-300 block text-[11px] uppercase tracking-wider">Terminal Velocity</span>
              <span className="font-mono text-stone-200 tabular-nums">1.2 – 2.0 m/s</span>
            </div>
            <div>
              <span className="text-stone-300 block text-[11px] uppercase tracking-wider">Crystal Geometry</span>
              <span className="font-mono text-stone-200 tabular-nums">6-Fold Stellar Dendrite</span>
            </div>
          </div>
        </div>

        {/* Study 2: Balloons */}
        <div className="p-6 bg-[#0e131c]/70 border border-stone-800/80">
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-amber-400 font-medium mb-2">
            <span>Section B · Aerostatic Buoyancy</span>
          </div>
          <h3 className="font-serif-display text-xl text-stone-100 mb-3">
            Jewel-Toned Buoyant Aerostats
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
            Constructed with formal satin-finish ellipsoids measuring forty-eight millimeters in mean diameter, each vessel features an anchored knot and undulating ribbon. Buoyancy forces overcome ambient gravity to ascend smoothly toward the vaulted skylight.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs">
            <div>
              <span className="text-stone-300 block text-[11px] uppercase tracking-wider">Ascent Velocity</span>
              <span className="font-mono text-stone-200 tabular-nums">1.4 – 2.4 m/s</span>
            </div>
            <div>
              <span className="text-stone-300 block text-[11px] uppercase tracking-wider">Volumetric Palette</span>
              <span className="font-mono text-stone-200 tabular-nums">7 Imperial Gemstones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chamber Ledger / History Table */}
      <div id="ledger" className="bg-[#0e131c]/90 border border-stone-800/80 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-500/90 block mb-0.5">
              Record of Manifestations
            </span>
            <h3 className="font-serif-display text-xl text-stone-100">
              Chamber Chronological Ledger
            </h3>
          </div>
          <div className="text-xs text-stone-400">
            Total Recorded Events: <span className="font-mono text-stone-200 tabular-nums">{logs.length}</span>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-stone-800/70 text-stone-300 text-xs">
            No ceremonial releases initiated in this session yet. Engage "Snowflakes" or "Balloons" above to populate the ledger.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-800 text-stone-300 font-mono text-[11px] tracking-wider uppercase">
                  <th className="py-2.5 px-3">Entry ID</th>
                  <th className="py-2.5 px-3">Protocol Order</th>
                  <th className="py-2.5 px-3">Chamber Time</th>
                  <th className="py-2.5 px-3">Execution Window</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/50 font-light">
                {logs.slice(0, 8).map((log) => (
                  <tr key={log.id} className="hover:bg-stone-900/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-stone-400">{log.id}</td>
                    <td className="py-3 px-3 font-medium text-stone-200">
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            log.effect === 'Snowflakes' ? 'bg-sky-400' : 'bg-amber-400'
                          }`}
                        />
                        {log.effect === 'Snowflakes' ? 'Atmospheric Snowflakes' : 'Aerostat Balloons'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-400 font-mono">{log.timestamp}</td>
                    <td className="py-3 px-3 text-stone-300 font-mono tabular-nums">
                      {log.durationSeconds.toFixed(2)}s
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-wider ${
                          log.status === 'In Progress' ? 'text-amber-400 font-medium' : 'text-stone-300'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
