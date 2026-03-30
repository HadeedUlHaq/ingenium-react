"use client";

import { useEffect, useRef } from "react";

export function AnimatedWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const chars = ".oO0*";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);

      context.font = "14px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const cols = Math.floor(rect.width / 20);
      const rows = Math.floor(rect.height / 20);

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const px = (x + 0.5) * (rect.width / cols);
          const py = (y + 0.5) * (rect.height / rows);

          const waveOne = Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.15 + time);
          const waveTwo = Math.sin((x + y) * 0.1 + time * 1.5);
          const waveThree = Math.cos(x * 0.1 - y * 0.1 + time * 0.8);

          const combined = (waveOne + waveTwo + waveThree) / 3;
          const normalized = (combined + 1) / 2;

          const charIndex = Math.floor(normalized * (chars.length - 1));
          const alpha = 0.15 + normalized * 0.5;

          context.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          context.fillText(chars[charIndex], px, py);
        }
      }

      time += 0.03;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />;
}
