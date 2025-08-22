"use client";
import { useEffect, useRef, useState } from "react";

export default function MatrixRain({ fadeOut }: { fadeOut: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    let animationFrameId: number;
    let hue = 0;

    let drift = 0;

    const handleMouseMove = (e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    drift = (e.clientX - centerX) / centerX * 0.5; // range: -0.5 to 0.5
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      if (fadeOut && opacity > 0) {
        setOpacity((prev) => Math.max(0, prev - 0.01));
      }

      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = `hsl(${(hue + i * 10) % 360}, 100%, 80%)`;
        ctx.fillText(text, i * fontSize + drift * drops[i] * 2, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      hue += 3;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [fadeOut]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-[55] pointer-events-none transition-opacity duration-1000"
      style={{ opacity }}
    />
  );
}
