/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChamberHeader } from './components/ChamberHeader';
import { EffectsConsole } from './components/EffectsConsole';
import { ProtocolSection } from './components/ProtocolSection';
import { CeremonialFooter } from './components/CeremonialFooter';
import { CeremonialCanvas } from './components/CeremonialCanvas';
import { ParticleDensity, CeremonyLogEntry } from './types/particles';
import { soundFx } from './utils/audio';

const DURATION_MS = 5000; // 5 seconds exact execution requirement

export default function App() {
  const [isSnowing, setIsSnowing] = useState<boolean>(false);
  const [isBalloons, setIsBalloons] = useState<boolean>(false);
  const [snowRemainingMs, setSnowRemainingMs] = useState<number>(0);
  const [balloonRemainingMs, setBalloonRemainingMs] = useState<number>(0);
  const [density, setDensity] = useState<ParticleDensity>('formal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [logs, setLogs] = useState<CeremonyLogEntry[]>([]);
  const [poppedCount, setPoppedCount] = useState<number>(0);

  const snowEndRef = useRef<number>(0);
  const balloonEndRef = useRef<number>(0);
  const activeLogIdsRef = useRef<{ snow?: string; balloon?: string }>({});

  // Sync soundFx toggle
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // High-precision clock ticker for the 5-second countdowns
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const now = performance.now();

      // Snow countdown
      if (snowEndRef.current > 0) {
        const remaining = Math.max(0, snowEndRef.current - now);
        setSnowRemainingMs(remaining);
        if (remaining <= 0) {
          snowEndRef.current = 0;
          setIsSnowing(false);
          // Update log status to Completed
          const currentId = activeLogIdsRef.current.snow;
          if (currentId) {
            setLogs((prev) =>
              prev.map((l) => (l.id === currentId ? { ...l, status: 'Completed' } : l))
            );
            activeLogIdsRef.current.snow = undefined;
          }
        }
      }

      // Balloon countdown
      if (balloonEndRef.current > 0) {
        const remaining = Math.max(0, balloonEndRef.current - now);
        setBalloonRemainingMs(remaining);
        if (remaining <= 0) {
          balloonEndRef.current = 0;
          setIsBalloons(false);
          // Update log status to Completed
          const currentId = activeLogIdsRef.current.balloon;
          if (currentId) {
            setLogs((prev) =>
              prev.map((l) => (l.id === currentId ? { ...l, status: 'Completed' } : l))
            );
            activeLogIdsRef.current.balloon = undefined;
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Format local ceremonial chamber time
  const getChamberTime = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0] + '.' + Math.floor(d.getMilliseconds() / 100);
  };

  // Trigger Snowflakes (Falls for 5 seconds)
  const handleTriggerSnow = useCallback(() => {
    const now = performance.now();
    snowEndRef.current = now + DURATION_MS;
    setIsSnowing(true);
    setSnowRemainingMs(DURATION_MS);

    soundFx.playSnowflakeChime();

    const logId = `SNW-${Math.floor(1000 + Math.random() * 9000)}`;
    activeLogIdsRef.current.snow = logId;

    const newLog: CeremonyLogEntry = {
      id: logId,
      effect: 'Snowflakes',
      timestamp: getChamberTime(),
      durationSeconds: 5.0,
      status: 'In Progress',
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  }, []);

  // Trigger Balloons (Floats from bottom to top for 5 seconds)
  const handleTriggerBalloons = useCallback(() => {
    const now = performance.now();
    balloonEndRef.current = now + DURATION_MS;
    setIsBalloons(true);
    setBalloonRemainingMs(DURATION_MS);

    soundFx.playBalloonAscendTone();

    const logId = `BLN-${Math.floor(1000 + Math.random() * 9000)}`;
    activeLogIdsRef.current.balloon = logId;

    const newLog: CeremonyLogEntry = {
      id: logId,
      effect: 'Balloons',
      timestamp: getChamberTime(),
      durationSeconds: 5.0,
      status: 'In Progress',
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  }, []);

  // Trigger both simultaneously
  const handleTriggerBoth = useCallback(() => {
    handleTriggerSnow();
    handleTriggerBalloons();
  }, [handleTriggerSnow, handleTriggerBalloons]);

  // Stop all active manifestations immediately
  const handleStopAll = useCallback(() => {
    snowEndRef.current = 0;
    balloonEndRef.current = 0;
    setIsSnowing(false);
    setIsBalloons(false);
    setSnowRemainingMs(0);
    setBalloonRemainingMs(0);

    setLogs((prev) =>
      prev.map((l) => (l.status === 'In Progress' ? { ...l, status: 'Completed' } : l))
    );
  }, []);

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-grand-hall text-stone-100 flex flex-col relative selection:bg-amber-900/40">
      {/* Background Architectural Grid Lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(#e2d5be 1px, transparent 1px), linear-gradient(90deg, #e2d5be 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Fullscreen Ceremonial Physics Canvas (Snowflakes & Balloons) */}
      <CeremonialCanvas
        isSnowing={isSnowing}
        isBalloons={isBalloons}
        density={density}
        onBalloonPop={(count) => setPoppedCount(count)}
      />

      {/* Formal Top Navigation Bar */}
      <ChamberHeader
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <EffectsConsole
          isSnowing={isSnowing}
          isBalloons={isBalloons}
          snowRemainingMs={snowRemainingMs}
          balloonRemainingMs={balloonRemainingMs}
          density={density}
          onChangeDensity={setDensity}
          onTriggerSnow={handleTriggerSnow}
          onTriggerBalloons={handleTriggerBalloons}
          onTriggerBoth={handleTriggerBoth}
          onStopAll={handleStopAll}
          poppedBalloonsCount={poppedCount}
        />

        <ProtocolSection logs={logs} />
      </main>

      {/* Formal Institutional Footer */}
      <CeremonialFooter />
    </div>
  );
}
