'use client'

import { useState, useMemo } from 'react'
import { Icons } from './Icons'
import { FilterBar } from './FilterBar'
import { ProgramCard, ListView } from './ProgramCard'
import { DetailPage } from './DetailPage'
import { UtilityBar, MainNav, Footer } from './Layout'
import { PROGRAMS } from './data'
import type { Program } from './data'

type Route = { name: 'list' } | { name: 'detail'; program: Program }

function Hero() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 18, marginTop: 28,
      background: 'linear-gradient(135deg, #eaf2ff 0%, #f4f8ff 60%, #f0eaff 100%)',
      padding: '40px 44px', minHeight: 200,
    }}>
      <div aria-hidden style={{ position: 'absolute', right: -40, top: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(125,155,255,0.18)' }} />
      <div aria-hidden style={{ position: 'absolute', right: 120, top: 30, width: 110, height: 110, borderRadius: '50%', background: 'rgba(125,155,255,0.22)' }} />
      <div aria-hidden style={{ position: 'absolute', right: 180, top: 90, width: 14, height: 14, borderRadius: '50%', background: 'var(--brand-500)' }} />
      <div aria-hidden style={{ position: 'absolute', right: 60, bottom: -50, width: 160, height: 160, borderRadius: '50%', background: 'rgba(174,145,255,0.20)' }} />

      <div style={{ position: 'relative', maxWidth: 640 }}>
        <span style={{ display: 'inline-block', background: 'var(--brand-500)', color: '#fff', padding: '5px 12px', borderRadius: 999, fontWeight: 600, fontSize: 12, marginBottom: 14 }}>
          특별 안내
        </span>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: 'var(--brand-700)', letterSpacing: '-0.025em' }}>
          2026년 청년 자립 지원 프로그램 모집
        </h2>
        <p style={{ marginTop: 12, marginBottom: 22, fontSize: 14, color: 'var(--ink-600)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>
          고립·은둔청년을 위한 맞춤형 지원 프로그램이 시작됩니다. 주거, 일자리, 심리상담까지 종합 지원
        </p>
        <button style={{ background: 'var(--ink-900)', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 999, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          자세히 보기
          <Icons.ArrowUpRight width={14} height={14} />
        </button>
      </div>
    </section>
  )
}

function Pagination({ page, setPage, total }: { page: number; setPage: (n: number) => void; total: number }) {
  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: 36, height: 36, borderRadius: 8,
    border: 'none', background: active ? 'var(--ink-900)' : 'transparent',
    color: active ? '#fff' : 'var(--ink-600)',
    fontSize: 13, fontWeight: 600,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 36 }}>
      <button onClick={() => setPage(Math.max(1, page - 1))} style={btnStyle(false)} aria-label="이전">
        <Icons.ChevronL width={16} height={16} />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map(n => (
        <button key={n} onClick={() => setPage(n)} style={btnStyle(n === page)}>{n}</button>
      ))}
      <button onClick={() => setPage(Math.min(total, page + 1))} style={btnStyle(false)} aria-label="다음">
        <Icons.ChevronR width={16} height={16} />
      </button>
    </div>
  )
}

function ListPage({ onOpen }: { onOpen: (p: Program) => void }) {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    region: [], level: [], mode: [], period: [], status: [], people: [],
  })
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('추천순')

  const handleFilter = (k: string, v: string[]) => { setFilters(f => ({ ...f, [k]: v })); setPage(1) }
  const reset = () => {
    setFilters({ region: [], level: [], mode: [], period: [], status: [], people: [] })
    setQuery(''); setAppliedQuery(''); setPage(1)
  }
  const search = () => { setAppliedQuery(query); setPage(1) }

  const filtered = useMemo(() => PROGRAMS.filter(p => {
    if (appliedQuery && !p.title.includes(appliedQuery) && !p.org.includes(appliedQuery)) return false
    const any = (arr: string[]) => arr.length > 0
    const someChip = (arr: string[], fn: (c: string, v: string) => boolean) => arr.some(v => p.chips.some(c => fn(c, v)))
    if (any(filters.region) && !someChip(filters.region, (c, v) => c.includes(v))) return false
    if (any(filters.mode) && !someChip(filters.mode, (c, v) => c === v || c.includes(v))) return false
    if (any(filters.status)) {
      const map: Record<string, string> = { '모집 중': '현재 신청 가능', '모집 예정': '모집 예정', '마감': '마감' }
      if (!filters.status.includes(map[p.status] || p.status)) return false
    }
    return true
  }), [filters, appliedQuery])

  const viewBtnStyle = (active: boolean): React.CSSProperties => ({
    height: 34, padding: '0 12px',
    background: active ? 'var(--ink-900)' : '#fff',
    color: active ? '#fff' : 'var(--ink-600)',
    border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: 12, fontWeight: 600, cursor: 'pointer',
  })

  return (
    <div>
      <UtilityBar />
      <MainNav activeTab="search" />

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 32px' }}>
        <Hero />

        <div style={{ marginTop: 40 }}>
          <span style={{ display: 'inline-block', fontSize: 12, color: 'var(--ink-500)', letterSpacing: '-0.01em', marginBottom: 8, fontWeight: 500 }}>
            고립·은둔 예방
          </span>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-0.03em' }}>
            지원사업 검색
          </h1>
        </div>

        <div style={{ marginTop: 22 }}>
          <FilterBar values={filters} onChange={handleFilter} onReset={reset} query={query} setQuery={setQuery} onSearch={search} />
        </div>

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>
            전체 <strong style={{ color: 'var(--ink-900)', fontWeight: 700 }}>{filtered.length}</strong>건
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <select
              value={sort} onChange={e => setSort(e.target.value)}
              style={{ height: 34, border: '1px solid var(--line)', borderRadius: 8, padding: '0 10px 0 12px', fontSize: 12, color: 'var(--ink-700)', background: '#fff', fontFamily: 'inherit', minWidth: 120, cursor: 'pointer' }}
            >
              <option>추천순</option>
              <option>마감 임박순</option>
              <option>최신순</option>
            </select>
            <div style={{ display: 'inline-flex', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => setView('grid')} style={viewBtnStyle(view === 'grid')}>
                <Icons.Grid width={14} height={14} /><span>카드</span>
              </button>
              <button onClick={() => setView('list')} style={viewBtnStyle(view === 'list')}>
                <Icons.List width={14} height={14} /><span>리스트</span>
              </button>
            </div>
          </div>
        </div>

        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 18 }}>
            {filtered.map(p => <ProgramCard key={p.id} p={p} onClick={() => onOpen(p)} />)}
          </div>
        ) : (
          <ListView programs={filtered} onOpen={onOpen} />
        )}

        {filtered.length === 0 && (
          <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ink-500)', fontSize: 14 }}>
            조건에 맞는 사업이 없어요. 필터를 조정해보세요.
          </div>
        )}

        {filtered.length > 0 && <Pagination page={page} setPage={setPage} total={3} />}
      </main>

      <Footer />
    </div>
  )
}

export function AppShell() {
  const [route, setRoute] = useState<Route>({ name: 'list' })

  const onOpen = (p: Program) => {
    setRoute({ name: 'detail', program: p })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const onBack = () => {
    setRoute({ name: 'list' })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (route.name === 'detail') return <DetailPage program={route.program} onBack={onBack} />
  return <ListPage onOpen={onOpen} />
}
