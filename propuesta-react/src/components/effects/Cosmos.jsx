import { useEffect, useRef } from "react";
export default function Cosmos({ motion, theme }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    if (!ctx) return;
    const day = theme === "light";
    let frame, time = 0, width = 0, height = 0, visible = true;
    const mouse = { x: 0, y: 0 };
    let seed = 42;
    const random = () => {
      seed = seed * 16807 % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const stars = Array.from({ length: 150 }, () => ({ x: random(), y: random(), r: random() * 1.2 + 0.3, a: random() }));
    const particles = Array.from({ length: 1900 }, () => ({ a: random() * Math.PI * 2, r: random(), wave: random() * 6.28, size: random() * 1.25 + 0.3 }));
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!motion) draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.52 + mouse.x * 12, cy = height * 0.48 + mouse.y * 12;
      const radius = Math.min(width * 0.32, height * 0.32);
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(${day ? "46,101,167" : "180,215,255"},${0.15 + s.a * 0.5 + Math.sin(time + s.x * 12) * 0.12})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, 6.29);
        ctx.fill();
      });
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.38 + mouse.x * 0.035);
      const glow = ctx.createRadialGradient(0, 0, radius * 0.68, 0, 0, radius * 1.65);
      glow.addColorStop(0, "rgba(35,99,210,0)");
      glow.addColorStop(0.32, "rgba(54,122,234,.18)");
      glow.addColorStop(0.6, "rgba(32,153,186,.06)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-width, -height, width * 2, height * 2);
      ctx.globalCompositeOperation = day ? "source-over" : "lighter";
      for (let i = 0; i < 70; i++) {
        const p = i / 70, r = radius * (0.82 + p * 0.55);
        ctx.strokeStyle = `hsla(${200 + p * 40 + Math.sin(time * 0.2) * 8},95%,${(day ? 38 : 62) + p * 15}%,${0.09 + Math.sin(p * 40 + time) * 0.035})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * (0.71 + Math.sin(p * 8 + time * 0.3) * 0.025), 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      particles.forEach((p) => {
        const a = p.a + time * 0.065, r = radius * (0.81 + p.r * 0.56 + Math.sin(a * 5 + p.wave + time * 0.3) * 0.018);
        const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.73;
        ctx.fillStyle = `hsla(${195 + p.r * 45 + Math.sin(a) * 10},95%,${(day ? 36 : 65) + p.r * 18}%,${0.24 + p.r * 0.55})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, 6.29);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.85);
      core.addColorStop(0, day ? "#f3f7fd" : "#090b10");
      core.addColorStop(0.8, day ? "#f3f7fd" : "#090b10");
      core.addColorStop(1, day ? "rgba(243,247,253,0)" : "rgba(9,11,16,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.85, radius * 0.61, 0, 0, 6.29);
      ctx.fill();
      ctx.restore();
    };
    let last = 0;
    const tick = (now) => {
      if (visible && now - last > 32) {
        time += 0.025;
        draw();
        last = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const pointer = (e) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - b.left) / b.width - 0.5;
      mouse.y = (e.clientY - b.top) / b.height - 0.5;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (motion) {
      frame = requestAnimationFrame(tick);
      window.addEventListener("pointermove", pointer, { passive: true });
    }
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", pointer);
    };
  }, [motion, theme]);
  return <canvas className="cosmos-canvas" ref={ref} aria-hidden="true" />;
}
