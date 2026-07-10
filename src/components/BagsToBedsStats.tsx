"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  label: string;
  colorClass: string;
}

const STATS: Stat[] = [
  {
    value: 749,
    label: "Plastic Bags Repurposed",
    colorClass: "text-primary",
  },
  {
    value: 24,
    label: "Dog Toys Donated",
    colorClass: "text-accent-purple",
  },
  {
    value: 42,
    label: "Pounds of Fabric Kept Out of Landfills",
    colorClass: "text-accent-teal",
  },
  {
    value: 15,
    label: "Volunteers",
    colorClass: "text-[#E5A800]",
  },
];

const DURATION_MS = 1800;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setCount(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, active]);

  return count;
}

function StatCounter({
  value,
  label,
  colorClass,
  active,
}: Stat & { active: boolean }) {
  const count = useCountUp(value, active);

  return (
    <div className="flex flex-col items-center px-4 py-6 text-center">
      <p
        className={`text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl ${colorClass}`}
      >
        {count.toLocaleString()}
      </p>
      <p className="mt-2 max-w-[11rem] text-sm leading-snug text-dark/70 sm:text-base">
        {label}
      </p>
    </div>
  );
}

export function BagsToBedsStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full rounded-3xl border-4 border-primary bg-white px-2 py-4 shadow-[0_8px_0_0_#2EC4B6] sm:px-6 sm:py-8"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        {STATS.map((stat) => (
          <StatCounter key={stat.label} {...stat} active={active} />
        ))}
      </div>
    </div>
  );
}
