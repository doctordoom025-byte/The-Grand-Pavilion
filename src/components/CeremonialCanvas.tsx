import React, { useEffect, useRef } from 'react';
import { Snowflake, Balloon, ConfettiParticle, ParticleDensity } from '../types/particles';
import { soundFx } from '../utils/audio';

interface CeremonialCanvasProps {
  isSnowing: boolean;
  isBalloons: boolean;
  density: ParticleDensity;
  onBalloonPop?: (count: number) => void;
}

// Formal jewel & imperial palette for balloons
const BALLOON_PALETTES = [
  { primary: '#8B1E3F', shadow: '#4A0E22', highlight: '#F472B6' }, // Imperial Burgundy
  { primary: '#B48C36', shadow: '#614B18', highlight: '#FDE68A' }, // Royal Burnished Gold
  { primary: '#1E3A8A', shadow: '#0F1E47', highlight: '#93C5FD' }, // Sapphire Lapis
  { primary: '#1B4D3E', shadow: '#0B241C', highlight: '#6EE7B7' }, // Forest Emerald
  { primary: '#581C87', shadow: '#2E0847', highlight: '#D8B4FE' }, // Royal Amethyst
  { primary: '#C5A880', shadow: '#7A6245', highlight: '#FFFBEB' }, // Champagne Pearl
  { primary: '#9F2B2B', shadow: '#521414', highlight: '#FCA5A5' }, // Crimson Sovereign
];

export const CeremonialCanvas: React.FC<CeremonialCanvasProps> = ({
  isSnowing,
  isBalloons,
  density,
  onBalloonPop,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const balloonsRef = useRef<Balloon[]>([]);
  const confettiRef = useRef<ConfettiParticle[]>([]);
  const nextIdRef = useRef<number>(1);
  const lastSpawnSnowRef = useRef<number>(0);
  const lastSpawnBalloonRef = useRef<number>(0);
  const popCountRef = useRef<number>(0);

  // Density spawn rate multiplier
  const getSpawnInterval = () => {
    switch (density) {
      case 'subtle':
        return { snowInterval: 220, balloonInterval: 320 };
      case 'grand':
        return { snowInterval: 75, balloonInterval: 130 };
      case 'formal':
      default:
        return { snowInterval: 120, balloonInterval: 200 };
    }
  };

  // Click detection for balloon popping
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check hit against active balloons (top-most first)
      const balloons = balloonsRef.current;
      for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        if (b.popped) continue;

        // Ellipse hit test: ((x - b.x)^2 / rx^2) + ((y - b.y)^2 / ry^2) <= 1
        const dx = clickX - b.x;
        const dy = clickY - b.y;
        const norm = (dx * dx) / ((b.radiusX + 6) * (b.radiusX + 6)) + (dy * dy) / ((b.radiusY + 6) * (b.radiusY + 6));

        if (norm <= 1.0) {
          b.popped = true;
          popCountRef.current += 1;
          soundFx.playBalloonPop();
          if (onBalloonPop) {
            onBalloonPop(popCountRef.current);
          }

          // Spawn burst of formal confetti
          for (let c = 0; c < 28; c++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            confettiRef.current.push({
              id: nextIdRef.current++,
              x: b.x,
              y: b.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 2,
              size: 3 + Math.random() * 4,
              color: Math.random() > 0.4 ? b.color.highlight : '#F5D77F',
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.2,
              alpha: 1,
            });
          }
          break; // Pop one per click
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [onBalloonPop]);

  // Main animation and physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Spawning logic
    const spawnSnowflake = (now: number, width: number) => {
      const size = 22 + Math.random() * 12; // Medium size: ~22 - 34px diameter
      snowflakesRef.current.push({
        id: nextIdRef.current++,
        x: Math.random() * width,
        y: -size - 10,
        baseX: Math.random() * width,
        size,
        speedY: 110 + Math.random() * 90, // pixels per second
        swayAmplitude: 15 + Math.random() * 35,
        swayFrequency: 1.2 + Math.random() * 1.6,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        opacity: 0.75 + Math.random() * 0.25,
        branchComplexity: Math.floor(Math.random() * 3) + 1,
        createdAt: now,
      });
    };

    const spawnBalloon = (now: number, width: number, height: number) => {
      const radiusX = 20 + Math.random() * 6; // width 40 - 52px (medium size)
      const radiusY = radiusX * (1.25 + Math.random() * 0.15); // height 50 - 66px
      const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];

      balloonsRef.current.push({
        id: nextIdRef.current++,
        x: Math.random() * (width - 80) + 40,
        y: height + radiusY + 20,
        baseX: Math.random() * (width - 80) + 40,
        radiusX,
        radiusY,
        speedY: 130 + Math.random() * 100, // Float upward
        swayAmplitude: 20 + Math.random() * 35,
        swayFrequency: 1.0 + Math.random() * 1.5,
        swayPhase: Math.random() * Math.PI * 2,
        tilt: 0,
        color: palette,
        stringLength: 46 + Math.random() * 18,
        popped: false,
        createdAt: now,
      });
    };

    // Draw crystalline 6-fold snowflake
    const drawSnowflake = (flake: Snowflake) => {
      ctx.save();
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);

      const r = flake.size / 2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${flake.opacity})`;
      ctx.fillStyle = `rgba(240, 248, 255, ${flake.opacity * 0.9})`;
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Soft crystalline ice glow
      ctx.shadowColor = 'rgba(210, 235, 255, 0.45)';
      ctx.shadowBlur = 4;

      // Draw 6 symmetrical arms
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);

        // Main primary arm
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        ctx.stroke();

        // Outer feather branches (medium-size dendrites)
        const branchPos1 = r * 0.52;
        const branchLen1 = r * 0.36;
        ctx.beginPath();
        ctx.moveTo(0, -branchPos1);
        ctx.lineTo(-branchLen1, -branchPos1 - branchLen1 * 0.6);
        ctx.moveTo(0, -branchPos1);
        ctx.lineTo(branchLen1, -branchPos1 - branchLen1 * 0.6);
        ctx.stroke();

        // Secondary inner branches
        if (flake.branchComplexity >= 2) {
          const branchPos2 = r * 0.8;
          const branchLen2 = r * 0.22;
          ctx.beginPath();
          ctx.moveTo(0, -branchPos2);
          ctx.lineTo(-branchLen2, -branchPos2 - branchLen2 * 0.5);
          ctx.moveTo(0, -branchPos2);
          ctx.lineTo(branchLen2, -branchPos2 - branchLen2 * 0.5);
          ctx.stroke();
        }

        // Little diamond / crystal point at the tip
        ctx.beginPath();
        ctx.arc(0, -r, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Hexagonal core
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hx = Math.cos(angle) * (r * 0.22);
        const hy = Math.sin(angle) * (r * 0.22);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    };

    // Draw medium formal balloon with 3D satin gradient, tied knot, and fluttering string
    const drawBalloon = (balloon: Balloon, nowSec: number) => {
      ctx.save();
      ctx.translate(balloon.x, balloon.y);
      ctx.rotate(balloon.tilt);

      const rx = balloon.radiusX;
      const ry = balloon.radiusY;

      // 1. Draped, wavy trailing ribbon / string from bottom knot
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, ry);
      const wavePhase = nowSec * 4 + balloon.swayPhase;
      const wave1 = Math.sin(wavePhase) * 6;
      const wave2 = Math.cos(wavePhase * 0.8) * 8;
      const wave3 = Math.sin(wavePhase * 1.2) * 5;

      ctx.bezierCurveTo(
        wave1,
        ry + balloon.stringLength * 0.35,
        wave2,
        ry + balloon.stringLength * 0.7,
        wave3,
        ry + balloon.stringLength
      );
      ctx.strokeStyle = 'rgba(230, 220, 205, 0.65)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 2. Realistic teardrop balloon body path
      ctx.beginPath();
      // Start at top center
      ctx.moveTo(0, -ry);
      // Top right shoulder to right waist
      ctx.bezierCurveTo(rx * 1.15, -ry * 0.9, rx * 1.05, ry * 0.3, rx * 0.35, ry * 0.95);
      // Right waist to bottom knot
      ctx.lineTo(0, ry);
      // Bottom knot to left waist
      ctx.lineTo(-rx * 0.35, ry * 0.95);
      // Left waist to top left shoulder
      ctx.bezierCurveTo(-rx * 1.05, ry * 0.3, -rx * 1.15, -ry * 0.9, 0, -ry);
      ctx.closePath();

      // 3D Volumetric Radial Fill (giving smooth formal satin highlight)
      const grad = ctx.createRadialGradient(-rx * 0.32, -ry * 0.35, 1, 0, 0, ry * 1.1);
      grad.addColorStop(0, balloon.color.highlight);
      grad.addColorStop(0.35, balloon.color.primary);
      grad.addColorStop(0.9, balloon.color.shadow);
      grad.addColorStop(1, '#050505');

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.fill();

      // Elegant inner rim highlight / specular shine on upper left
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(-rx * 0.38, -ry * 0.42, rx * 0.28, ry * 0.16, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.filter = 'blur(1px)';
      ctx.fill();
      ctx.restore();

      // Delicate edge hairline outline for crisp formal presentation
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 3. Balloon knot at base
      ctx.beginPath();
      ctx.moveTo(-4, ry);
      ctx.lineTo(4, ry);
      ctx.lineTo(2, ry + 5);
      ctx.lineTo(-2, ry + 5);
      ctx.closePath();
      ctx.fillStyle = balloon.color.shadow;
      ctx.fill();

      ctx.restore();
    };

    // Render loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const now = time;
      const nowSec = time / 1000;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const { snowInterval, balloonInterval } = getSpawnInterval();

      // Spawn snowflakes if active
      if (isSnowing && now - lastSpawnSnowRef.current > snowInterval) {
        spawnSnowflake(now, width);
        lastSpawnSnowRef.current = now;
      }

      // Spawn balloons if active
      if (isBalloons && now - lastSpawnBalloonRef.current > balloonInterval) {
        spawnBalloon(now, width, height);
        lastSpawnBalloonRef.current = now;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // --- Update & Draw Snowflakes ---
      const activeFlakes: Snowflake[] = [];
      for (const flake of snowflakesRef.current) {
        // Fall down
        flake.y += flake.speedY * dt;
        // Sway sideways
        const elapsedSec = (now - flake.createdAt) / 1000;
        flake.x = flake.baseX + Math.sin(elapsedSec * flake.swayFrequency + flake.swayPhase) * flake.swayAmplitude;
        flake.rotation += flake.rotationSpeed * dt;

        drawSnowflake(flake);

        // Keep until it passes the bottom of the screen
        if (flake.y < height + flake.size + 20) {
          activeFlakes.push(flake);
        }
      }
      snowflakesRef.current = activeFlakes;

      // --- Update & Draw Balloons ---
      const activeBalloons: Balloon[] = [];
      for (const balloon of balloonsRef.current) {
        if (balloon.popped) continue;

        // Float up
        balloon.y -= balloon.speedY * dt;
        // Sway sideways
        const elapsedSec = (now - balloon.createdAt) / 1000;
        const swayOffset = Math.sin(elapsedSec * balloon.swayFrequency + balloon.swayPhase) * balloon.swayAmplitude;
        balloon.x = balloon.baseX + swayOffset;
        balloon.tilt = Math.cos(elapsedSec * balloon.swayFrequency + balloon.swayPhase) * 0.08;

        drawBalloon(balloon, nowSec);

        // Keep until it floats off the top
        if (balloon.y > -balloon.radiusY * 2 - balloon.stringLength - 30) {
          activeBalloons.push(balloon);
        }
      }
      balloonsRef.current = activeBalloons;

      // --- Update & Draw Confetti ---
      const activeConfetti: ConfettiParticle[] = [];
      for (const c of confettiRef.current) {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.22; // gravity
        c.rotation += c.rotationSpeed;
        c.alpha -= dt * 0.8;

        if (c.alpha > 0.02) {
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rotation);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = Math.max(0, c.alpha);
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
          ctx.restore();
          activeConfetti.push(c);
        }
      }
      confettiRef.current = activeConfetti;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isSnowing, isBalloons, density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
};
