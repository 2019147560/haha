'use client'

import { useState } from 'react'
import type { Program } from './data'

export function ProgramCard({ p, onClick }: { p: Program; onClick: () => void }) {
  const [hover, setHover] = useState(false)

  const statusBg = p.statusVariant === 'closed' ? '#fff'
    : p.statusVariant === 'soon' ? '#fff'
    : 'var(--ink-900)'
  const statusFg = p.statusVariant === 'closed' ? 'var(--ink-500)'
    : p.statusVariant === 'soon' ? 'var(--ink-900)'
    : '#fff'
  const statusBorder = p.statusVariant ? '1px solid rgba(0,0,0,0.08)' : 'none'

  const dDayBg = p.dDay === '마감' || p.dDay === '곧오픈' ? '#fff' : 'var(--brand-500)'
  const dDayFg = p.dDay === '마감' ? 'var(--ink-700)'
    : p.dDay === '곧오픈' ? 'var(--ink-900)'
    : '#fff'
  const dDayBorder = p.dDay === '마감' || p.dDay === '곧오픈' ? '1px solid rgba(0,0,0,0.12)' : 'none'

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden',
        background: '#fff',
        boxShadow: hover ? '0 8px 24px rgba(15,23,42,0.08)' : 'var(--shadow-card)',
        transition: 'transform .18s ease, box-shadow .18s ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Visual top */}
      <div style={{
        position: 'relative', background: p.bg, height: 200, padding: 18,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', left: -40, bottom: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.45)' }} />
        <div aria-hidden style={{ position: 'absolute', right: -30, top: 30, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.30)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ background: 'rgba(255,255,255,0.7)', color: 'var(--ink-900)', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
            {p.tag}
          </span>
          <span style={{ background: dDayBg, color: dDayFg, border: dDayBorder, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
            {p.dDay}
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, lineHeight: 1.35, color: 'var(--ink-900)', letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
            {p.title}
          </h3>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-700)', fontWeight: 500 }}>{p.org}</span>
          <span style={{ background: statusBg, color: statusFg, border: statusBorder, padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
            {p.status}
          </span>
        </div>
      </div>

      {/* Bottom info */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.chips.map((c, i) => {
            const isClosed = c === '마감'
            const isSoon = c === '모집 예정'
            const bg = isClosed ? '#f0f1f4' : isSoon ? '#fff4d6' : i === 0 ? '#e6f4ec' : '#f3f4f7'
            const fg = isClosed ? 'var(--ink-500)' : isSoon ? '#7a5b00' : i === 0 ? '#1f7a4d' : 'var(--ink-700)'
            return (
              <span key={i} style={{ background: bg, color: fg, padding: '4px 9px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                {c}
              </span>
            )
          })}
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-0.01em', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {p.title.replace('\n', ', ')}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.org}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px dashed var(--line)', fontSize: 12 }}>
          <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{p.weeks}</span>
          <span style={{ color: 'var(--ink-500)' }}>{p.deadline}</span>
        </div>
      </div>
    </article>
  )
}

export function ListView({ programs, onOpen }: { programs: Program[]; onOpen: (p: Program) => void }) {
  return (
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {programs.map((p) => (
        <div
          key={p.id}
          onClick={() => onOpen(p)}
          style={{
            display: 'flex', gap: 18, alignItems: 'center',
            padding: 14, border: '1px solid var(--line)', borderRadius: 12,
            background: '#fff', cursor: 'pointer',
          }}
        >
          <div style={{ width: 96, height: 96, borderRadius: 10, background: p.bg, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              {p.chips.map((c, i) => (
                <span key={i} style={{ background: '#f3f4f7', color: 'var(--ink-700)', padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600 }}>
                  {c}
                </span>
              ))}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.title.replace('\n', ' ')}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.org} · {p.weeks}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'var(--brand-500)', color: '#fff', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>
              {p.dDay}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.deadline}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
