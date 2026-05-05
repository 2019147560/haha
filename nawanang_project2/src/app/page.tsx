'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ReviewStrip } from '@/components/ReviewStrip';
import { Poster } from '@/components/Poster';
import { PROGRAMS, FILTER_OPTIONS, FILTER_LABELS, REVIEWS } from '@/lib/data';
import type { Program, FilterValues, FilterKey } from '@/types';

/* ── Hero ── */
function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 18,
        marginTop: 28,
        background: 'linear-gradient(135deg, #eaf2ff 0%, #f4f8ff 60%, #f0eaff 100%)',
        padding: '40px 44px',
        minHeight: 200,
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -40,
          top: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'rgba(125,155,255,0.18)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 120,
          top: 30,
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: 'rgba(125,155,255,0.22)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 60,
          bottom: -50,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(174,145,255,0.20)',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 640 }}>
        <span
          style={{
            display: 'inline-block',
            background: 'var(--brand-500)',
            color: '#fff',
            padding: '5px 12px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 12,
            marginBottom: 14,
          }}
        >
          특별 안내
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 800,
            color: 'var(--brand-700)',
            letterSpacing: '-0.025em',
          }}
        >
          2026년 청년 자립 지원 프로그램 모집
        </h2>
        <p
          style={{
            marginTop: 12,
            marginBottom: 22,
            fontSize: 14,
            color: 'var(--ink-600)',
            lineHeight: 1.6,
          }}
        >
          고립·은둔청년을 위한 맞춤형 지원 프로그램이 시작됩니다. 주거, 일자리, 심리상담까지 종합 지원
        </p>
        <button
          style={{
            background: 'var(--ink-900)',
            color: '#fff',
            border: 'none',
            padding: '12px 22px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          자세히 보기
          <Icon.ArrowUpRight width={14} height={14} />
        </button>
      </div>
    </section>
  );
}

/* ── Filter Chip ── */
const FILTER_KEYS = Object.keys(FILTER_LABELS) as FilterKey[];

function FilterChip({
  id,
  value,
  onChange,
}: {
  id: FilterKey;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const options = FILTER_OPTIONS[id];
  const selected = value;
  const allSelected = selected.length === options.length;
  const noneSelected = selected.length === 0;
  const active = !noneSelected && !allSelected;

  let display = FILTER_LABELS[id];
  if (active) {
    display = selected.length === 1 ? selected[0] : `${FILTER_LABELS[id]} ${selected.length}`;
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
            setTimeout(() => setOpen(false), 150);
          }
        }}
        style={{
          height: 36,
          padding: '0 14px',
          borderRadius: 999,
          border: `1px solid ${active ? 'var(--brand-500)' : 'var(--line)'}`,
          background: active ? 'var(--brand-50)' : '#fff',
          color: active ? 'var(--brand-500)' : 'var(--ink-700)',
          fontSize: 13,
          fontWeight: active ? 600 : 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {display}
        <Icon.Chevron width={14} height={14} />
      </button>
      {open && (
        <div
          tabIndex={-1}
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 5,
            minWidth: 200,
            background: '#fff',
            border: '1px solid var(--line)',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(15,23,42,0.10)',
            padding: 6,
            maxHeight: 360,
            overflowY: 'auto',
          }}
        >
          {/* 전체 선택 */}
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onChange(allSelected ? [] : options.slice());
            }}
            style={dropdownItemStyle}
          >
            <Checkbox
              checked={allSelected}
              indeterminate={!allSelected && !noneSelected}
            />
            <span>전체선택</span>
          </button>
          <div style={{ height: 1, background: 'var(--line-2)', margin: '4px 6px' }} />
          {options.map((opt) => (
            <button
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(
                  selected.includes(opt)
                    ? selected.filter((x) => x !== opt)
                    : [...selected, opt]
                );
              }}
              style={dropdownItemStyle}
            >
              <Checkbox checked={selected.includes(opt)} />
              <span>{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const dropdownItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  textAlign: 'left',
  padding: '9px 10px',
  borderRadius: 8,
  border: 'none',
  background: 'transparent',
  color: 'var(--ink-700)',
  fontWeight: 500,
  fontSize: 13,
};

function Checkbox({
  checked,
  indeterminate,
}: {
  checked: boolean;
  indeterminate?: boolean;
}) {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        border: `1.5px solid ${checked || indeterminate ? 'var(--brand-500)' : 'var(--ink-300)'}`,
        background: checked || indeterminate ? 'var(--brand-500)' : '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
      {indeterminate && !checked && (
        <span style={{ width: 8, height: 2, background: '#fff', borderRadius: 1 }} />
      )}
    </span>
  );
}

/* ── Filter Bar ── */
function FilterBar({
  values,
  onChange,
  onReset,
  query,
  setQuery,
  onSearch,
}: {
  values: FilterValues;
  onChange: (k: FilterKey, v: string[]) => void;
  onReset: () => void;
  query: string;
  setQuery: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={onReset}
          style={{
            width: 36,
            height: 36,
            border: '1px solid var(--line)',
            background: '#fff',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-600)',
          }}
          aria-label="필터 초기화"
        >
          <Icon.Refresh width={16} height={16} />
        </button>
        {FILTER_KEYS.map((k) => (
          <FilterChip key={k} id={k} value={values[k]} onChange={(v) => onChange(k, v)} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        style={{ display: 'flex', gap: 10, marginTop: 14 }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="사업명을 입력하세요"
            style={{
              width: '100%',
              height: 48,
              border: '1px solid var(--line)',
              borderRadius: 10,
              padding: '0 18px',
              fontSize: 14,
              outline: 'none',
              color: 'var(--ink-900)',
              fontFamily: 'inherit',
              background: '#fff',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-500)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
          />
        </div>
        <button
          type="submit"
          style={{
            height: 48,
            padding: '0 28px',
            background: 'var(--ink-900)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon.Search width={16} height={16} />
          검색
        </button>
      </form>
    </div>
  );
}

/* ── Program Card ── */
function ProgramCard({ p }: { p: Program }) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={`/programs/${p.id}`} style={{ display: 'block' }}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          border: '1px solid var(--line)',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#fff',
          boxShadow: hover ? '0 8px 24px rgba(15,23,42,0.08)' : 'var(--shadow-card)',
          transition: 'transform .18s ease, box-shadow .18s ease',
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Poster bg={p.bg} title={p.title} tag={p.tag} dDay={p.dDay} org={p.org} />
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {p.chips.map((c, i) => {
              const isFirst = i === 0;
              const isClosed = c === '마감';
              const isSoon = c === '모집 예정';
              const bg = isClosed ? '#f0f1f4' : isSoon ? '#fff4d6' : isFirst ? '#e6f4ec' : '#f3f4f7';
              const fg = isClosed
                ? 'var(--ink-500)'
                : isSoon
                ? '#7a5b00'
                : isFirst
                ? '#1f7a4d'
                : 'var(--ink-700)';
              return (
                <span
                  key={i}
                  style={{
                    background: bg,
                    color: fg,
                    padding: '4px 9px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {c}
                </span>
              );
            })}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--ink-900)',
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {p.title.replace('\n', ', ')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.org}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              borderTop: '1px dashed var(--line)',
              fontSize: 12,
            }}
          >
            <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{p.weeks}</span>
            <span style={{ color: 'var(--ink-500)' }}>{p.deadline}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── List View ── */
function ListView({ programs }: { programs: Program[] }) {
  return (
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {programs.map((p) => (
        <Link key={p.id} href={`/programs/${p.id}`} style={{ display: 'block' }}>
          <div
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'center',
              padding: 14,
              border: '1px solid var(--line)',
              borderRadius: 12,
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 10,
                background: p.bg,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                {p.chips.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f3f4f7',
                      color: 'var(--ink-700)',
                      padding: '3px 8px',
                      borderRadius: 5,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                {p.title.replace('\n', ' ')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>
                {p.org} · {p.weeks}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'var(--brand-500)',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {p.dDay}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.deadline}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── Pagination ── */
function Pagination({
  page,
  setPage,
  total,
}: {
  page: number;
  setPage: (n: number) => void;
  total: number;
}) {
  const pageBtn = (active: boolean): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 8,
    border: 'none',
    background: active ? 'var(--ink-900)' : 'transparent',
    color: active ? '#fff' : 'var(--ink-600)',
    fontSize: 13,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 36,
      }}
    >
      <button onClick={() => setPage(Math.max(1, page - 1))} style={pageBtn(false)} aria-label="이전">
        <Icon.ChevronL width={16} height={16} />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => setPage(n)} style={pageBtn(n === page)}>
          {n}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(total, page + 1))}
        style={pageBtn(false)}
        aria-label="다음"
      >
        <Icon.ChevronR width={16} height={16} />
      </button>
    </div>
  );
}

/* ── Main Page Component ── */
export default function HomeClient() {
  const [filters, setFilters] = useState<FilterValues>({
    region: [],
    level: [],
    mode: [],
    period: [],
    status: [],
    people: [],
  });
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('추천순');

  const handleFilter = (k: FilterKey, v: string[]) => {
    setFilters((f) => ({ ...f, [k]: v }));
    setPage(1);
  };
  const reset = () => {
    setFilters({ region: [], level: [], mode: [], period: [], status: [], people: [] });
    setQuery('');
    setAppliedQuery('');
    setPage(1);
  };
  const search = () => {
    setAppliedQuery(query);
    setPage(1);
  };

  const filtered = useMemo(() => {
    return PROGRAMS.filter((p) => {
      if (appliedQuery && !p.title.includes(appliedQuery) && !p.org.includes(appliedQuery))
        return false;
      const anySelected = (arr: string[]) => arr.length > 0;
      if (
        anySelected(filters.region) &&
        !filters.region.some((v) => p.chips.some((c) => c.includes(v)))
      )
        return false;
      if (
        anySelected(filters.mode) &&
        !filters.mode.some((v) => p.chips.some((c) => c === v || c.includes(v)))
      )
        return false;
      if (anySelected(filters.status)) {
        const map: Record<string, string> = {
          '모집 중': '현재 신청 가능',
          '모집 예정': '모집 예정',
          마감: '마감',
        };
        if (!filters.status.includes(map[p.status] || p.status)) return false;
      }
      return true;
    });
  }, [filters, appliedQuery]);

  const viewBtn = (active: boolean): React.CSSProperties => ({
    height: 34,
    padding: '0 12px',
    background: active ? 'var(--ink-900)' : '#fff',
    color: active ? '#fff' : 'var(--ink-600)',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
  });

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 32px' }}>
      <Hero />

      {/* Section heading */}
      <div style={{ marginTop: 40 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 12,
            color: 'var(--ink-500)',
            letterSpacing: '-0.01em',
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          고립·은둔 예방
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 800,
            color: 'var(--ink-900)',
            letterSpacing: '-0.03em',
          }}
        >
          지원사업 검색
        </h1>
      </div>

      {/* Filters */}
      <div style={{ marginTop: 22 }}>
        <FilterBar
          values={filters}
          onChange={handleFilter}
          onReset={reset}
          query={query}
          setQuery={setQuery}
          onSearch={search}
        />
      </div>

      {/* Result toolbar */}
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>
          전체{' '}
          <strong style={{ color: 'var(--ink-900)', fontWeight: 700 }}>{filtered.length}</strong>건
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              height: 34,
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '0 10px 0 12px',
              fontSize: 12,
              color: 'var(--ink-700)',
              background: '#fff',
              fontFamily: 'inherit',
              minWidth: 120,
            }}
          >
            <option>추천순</option>
            <option>마감 임박순</option>
            <option>최신순</option>
          </select>
          <div
            style={{
              display: 'inline-flex',
              border: '1px solid var(--line)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <button onClick={() => setViewMode('grid')} style={viewBtn(viewMode === 'grid')}>
              <Icon.Grid width={14} height={14} />
              <span>카드</span>
            </button>
            <button onClick={() => setViewMode('list')} style={viewBtn(viewMode === 'list')}>
              <Icon.List width={14} height={14} />
              <span>리스트</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      {viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            marginTop: 18,
          }}
        >
          {filtered.map((p) => (
            <ProgramCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <ListView programs={filtered} />
      )}

      {filtered.length === 0 && (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
            color: 'var(--ink-500)',
            fontSize: 14,
          }}
        >
          조건에 맞는 사업이 없어요. 필터를 조정해보세요.
        </div>
      )}

      {filtered.length > 0 && <Pagination page={page} setPage={setPage} total={3} />}

      <ReviewStrip reviews={REVIEWS} />
    </div>
  );
}
