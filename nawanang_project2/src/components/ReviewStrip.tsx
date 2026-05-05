'use client';

import { useEffect, useRef, useState } from 'react';
import type { Review } from '@/types';

interface ReviewStripProps {
  reviews: Review[];
}

export function ReviewStrip({ reviews }: ReviewStripProps) {
  const [offset, setOffset] = useState(0);
  const animRef = useRef<number>(null);
  const itemWidth = 280;
  const gap = 16;
  const total = reviews.length;

  useEffect(() => {
    let lastTime = 0;
    const speed = 0.4; // px per ms

    const step = (time: number) => {
      if (lastTime) {
        const delta = time - lastTime;
        setOffset((prev) => {
          const next = prev + speed * delta;
          const loopAt = (itemWidth + gap) * total;
          return next >= loopAt ? 0 : next;
        });
      }
      lastTime = time;
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [total]);

  const doubled = [...reviews, ...reviews];

  return (
    <div
      style={{
        overflow: 'hidden',
        marginTop: 40,
        padding: '4px 0',
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--ink-500)',
          marginBottom: 14,
          letterSpacing: '-0.01em',
        }}
      >
        참여 후기
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 60,
            background: 'linear-gradient(to right, #fff, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 60,
            background: 'linear-gradient(to left, #fff, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            display: 'flex',
            gap,
            transform: `translateX(-${offset}px)`,
            willChange: 'transform',
          }}
        >
          {doubled.map((r, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: itemWidth,
                border: '1px solid var(--line)',
                borderRadius: 12,
                padding: '14px 16px',
                background: '#fff',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>{r.avatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--ink-900)' }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{r.program}</div>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: 'var(--ink-700)',
                  lineHeight: 1.6,
                }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
