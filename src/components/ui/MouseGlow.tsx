import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let mouseX = -200, mouseY = -200;
    let curX = -200, curY = -200;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      el.style.transform = `translate(${curX - 150}px, ${curY - 150}px)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[1] w-[300px] h-[300px] rounded-full opacity-[0.08] blur-[80px]"
      style={{ background: 'radial-gradient(circle, #F59E0B 0%, #2563EB 60%, transparent 100%)' }}
    />
  );
}
