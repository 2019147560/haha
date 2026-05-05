'use client'

import { useState, useEffect, useRef } from 'react'
import { Icons } from './Icons'
import { FILTER_DEFS, FILTER_OPTIONS } from './data'

type Filters = Record<string, string[]>

function CheckRow({ label, checked, indeterminate, onToggle }: {
  label: string; checked: boolean; indeterminate?: boolean; onToggle: () => void
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onToggle() }}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', textAlign: 'left', padding: '9px 10px',
        borderRadius: 8, border: 'none', background: 'transparent',
        color: 'var(--ink-700)', fontWeight: 500, fontSize: 13, cursor: 'pointer',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-soft)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
        border: `1.5px solid ${checked || indeterminate ? 'var(--brand-500)' : 'var(--ink-300)'}`,
        background: checked || indeterminate ? 'var(--brand-500)' : '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
        {indeterminate && !checked && (
          <span style={{ width: 8, height: 2, background: '#fff', borderRadius: 1 }} />
        )}
      </span>
      <span>{label}</span>
    </button>
  )
}

function FilterChip({ filterId, label, value, onChange }: {
  filterId: string; label: string; value: string[]; onChange: (v: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const options = FILTER_OPTIONS[filterId] ?? []
  const selected = value
  const allSelected = selected.length === options.length
  const noneSelected = selected.length === 0
  const active = !noneSelected && !allSelected

  const display = active
    ? selected.length === 1 ? selected[0] : `${label} ${selected.length}`
    : label

  const toggleAll = () => onChange(allSelected ? [] : [...options])
  const toggleOne = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          height: 36, padding: '0 14px', borderRadius: 999,
          border: `1px solid ${active ? 'var(--brand-500)' : 'var(--line)'}`,
          background: active ? 'var(--brand-50)' : '#fff',
          color: active ? 'var(--brand-500)' : 'var(--ink-700)',
          fontSize: 13, fontWeight: active ? 600 : 500,
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}
      >
        {display}
        <Icons.Chevron width={14} height={14} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 20,
          minWidth: 200, background: '#fff',
          border: '1px solid var(--line)', borderRadius: 12,
          boxShadow: '0 12px 32px rgba(15,23,42,0.10)', padding: 6,
          maxHeight: 360, overflowY: 'auto',
        }}>
          <CheckRow
            label="전체선택"
            checked={allSelected}
            indeterminate={!allSelected && !noneSelected}
            onToggle={toggleAll}
          />
          <div style={{ height: 1, background: 'var(--line-2)', margin: '4px 6px' }} />
          {options.map(opt => (
            <CheckRow key={opt} label={opt} checked={selected.includes(opt)} onToggle={() => toggleOne(opt)} />
          ))}
        </div>
      )}
    </div>
  )
}

export function FilterBar({ values, onChange, onReset, query, setQuery, onSearch }: {
  values: Filters; onChange: (k: string, v: string[]) => void; onReset: () => void
  query: string; setQuery: (q: string) => void; onSearch: () => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={onReset}
          style={{
            width: 36, height: 36, border: '1px solid var(--line)', background: '#fff',
            borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-600)', cursor: 'pointer',
          }}
          aria-label="필터 초기화"
        >
          <Icons.Refresh width={16} height={16} />
        </button>
        {FILTER_DEFS.map(f => (
          <FilterChip
            key={f.id}
            filterId={f.id}
            label={f.label}
            value={values[f.id] ?? []}
            onChange={v => onChange(f.id, v)}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); onSearch() }}
        style={{ display: 'flex', gap: 10, marginTop: 14 }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="사업명을 입력하세요"
          style={{
            flex: 1, height: 48, border: '1px solid var(--line)',
            borderRadius: 10, padding: '0 18px',
            fontSize: 14, outline: 'none', color: 'var(--ink-900)',
            fontFamily: 'inherit', background: '#fff',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--brand-500)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)' }}
        />
        <button
          type="submit"
          style={{
            height: 48, padding: '0 28px',
            background: 'var(--ink-900)', color: '#fff', border: 'none', borderRadius: 10,
            fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          }}
        >
          <Icons.Search width={16} height={16} />
          검색
        </button>
      </form>
    </div>
  )
}
