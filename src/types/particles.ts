export interface Snowflake {
  id: number;
  x: number;
  y: number;
  baseX: number;
  size: number; // medium size: ~24 - 36px
  speedY: number; // downward falling speed
  swayAmplitude: number;
  swayFrequency: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  branchComplexity: number; // 1, 2, or 3 branch variants
  createdAt: number;
}

export interface Balloon {
  id: number;
  x: number;
  y: number;
  baseX: number;
  radiusX: number; // medium size: ~20 - 27px (width 40 - 54px)
  radiusY: number; // ~26 - 34px (height 52 - 68px)
  speedY: number; // upward floating speed
  swayAmplitude: number;
  swayFrequency: number;
  swayPhase: number;
  tilt: number;
  color: {
    primary: string;
    shadow: string;
    highlight: string;
  };
  stringLength: number;
  popped: boolean;
  createdAt: number;
}

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
}

export type ParticleDensity = 'subtle' | 'formal' | 'grand';

export interface CeremonyLogEntry {
  id: string;
  effect: 'Snowflakes' | 'Balloons';
  timestamp: string;
  durationSeconds: number;
  status: 'In Progress' | 'Completed';
}
