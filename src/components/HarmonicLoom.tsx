'use client';

import React, { useEffect, useRef } from 'react';

export const HarmonicLoom: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // The Loom's configuration
    const STRAND_COUNT = 3; // The count of layered geometric ribbons

    const render = () => {
      if (!canvasRef.current) return;
      const isDark = document.documentElement.classList.contains('dark');
      
      ctx.clearRect(0, 0, w, h);

      // Pure stateless parametric clock (locked to 60fps forever, zero memory leaks)
      const time = performance.now() * 0.00035; 

      const baseColor = isDark ? '163, 163, 163' : '15, 23, 42';

      for (let i = 0; i < STRAND_COUNT; i++) {
        // Offset each ribbon's phase equally across a 360-degree mathematical loop
        const phase = (i / STRAND_COUNT) * Math.PI * 2;

        // 1. ANCHOR A: Slides back and forth along the Top Ceiling (0 to half-width)
        const xTop = (w / 2) * (0.5 + 0.45 * Math.sin(time * 0.65 + phase));
        const yTop = 0;

        // 2. ANCHOR B: Slides up and down the Left Wall (0 to half-height)
        const xLeft = 0;
        const yLeft = (h / 2) * (0.5 + 0.45 * Math.cos(time * 0.48 + phase));

        // 3. THE NODE: A gentle attractor point orbiting inside the room
        const nodeX = (w / 2) * (0.35 + 0.5 * Math.sin(time * 0.32 + phase * 1.5));
        const nodeY = (h / 2) * (0.35 + 0.5 * Math.cos(time * 0.41 + phase * 1.5));

        const alpha = (0.03 + (i / STRAND_COUNT) * 0.05) * (isDark ? 2.2 : 2.8);

        ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.lineWidth = 1.0;

        // Mathematical helper to cast the curve and instantly strike its 4 mirrors
        const drawSymmetricWeave = (startX: number, startY: number, ctrlX: number, ctrlY: number, endX: number, endY: number) => {
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          ctx.stroke();
        };

        // Cast Quadrant 1 (Top-Left)
        drawSymmetricWeave(xTop, yTop, nodeX, nodeY, xLeft, yLeft);

        // Cast Quadrant 2 (Top-Right Mirror)
        drawSymmetricWeave(w - xTop, yTop, w - nodeX, nodeY, w - xLeft, yLeft);

        // Cast Quadrant 3 (Bottom-Right Mirror)
        drawSymmetricWeave(w - xTop, h - yTop, w - nodeX, h - nodeY, w - xLeft, h - yLeft);

        // Cast Quadrant 4 (Bottom-Left Mirror)
        drawSymmetricWeave(xTop, h - yTop, nodeX, h - nodeY, xLeft, h - yLeft);

        // --- THE NODES ---
        // Render tiny, elegant celestial beads at the bend-points of the curves
        const nodeAlpha = alpha * 2.5;
        ctx.fillStyle = `rgba(${baseColor}, ${nodeAlpha})`;
        
        const drawNode = (nx: number, ny: number) => {
          ctx.beginPath();
          ctx.arc(nx, ny, isDark ? 1.4 : 1.1, 0, Math.PI * 2);
          ctx.fill();
        };

        drawNode(nodeX, nodeY);
        drawNode(w - nodeX, nodeY);
        drawNode(w - nodeX, h - nodeY);
        drawNode(nodeX, h - nodeY);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};