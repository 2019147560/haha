import { Crumb } from '@/components/Crumb';
import { SUPPORT_INFO } from '@/lib/data';

export const metadata = { title: '제도 안내 — 나와나망' };

const CATEGORY_COLOR: Record<string, { bg: string; fg: string }> = {
  주거: { bg: '#cfe6ff', fg: '#0b3a73' },
  상담: { bg: '#d9c8ff', fg: '#4b2aad' },
  관계: { bg: '#b9d8c5', fg: '#1a5c3a' },
};

export default function SupportPage() {
  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 32px' }}>
      <Crumb
        items={[
          { label: '고립·은둔 예방', icon: 'search' },
          { label: '제도 안내' },
        ]}
      />

      <div style={{ marginBottom: 32 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 12,
            color: 'var(--ink-500)',
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
          제도 안내
        </h1>
        <p
          style={{
            marginTop: 10,
            fontSize: 14,
            color: 'var(--ink-600)',
            lineHeight: 1.6,
          }}
        >
          고립·은둔청년을 위한 다양한 지원 제도를 안내해드립니다.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 18,
        }}
      >
        {SUPPORT_INFO.map((info) => {
          const color = CATEGORY_COLOR[info.category] ?? { bg: '#f3f4f7', fg: 'var(--ink-700)' };
          return (
            <div
              key={info.id}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 14,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Top band */}
              <div
                style={{
                  background: color.bg,
                  padding: '20px 22px 16px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.65)',
                    color: color.fg,
                    padding: '3px 10px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {info.category}
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 800,
                    color: 'var(--ink-900)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {info.title}
                </h2>
              </div>

              {/* Body */}
              <div style={{ padding: '18px 22px 22px' }}>
                <p
                  style={{
                    margin: '0 0 16px',
                    fontSize: 13,
                    color: 'var(--ink-600)',
                    lineHeight: 1.6,
                  }}
                >
                  {info.description}
                </p>
                <dl
                  style={{
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    fontSize: 12,
                  }}
                >
                  {[
                    { label: '신청 자격', value: info.eligibility },
                    { label: '지원 내용', value: info.benefit },
                    { label: '문의', value: info.contact },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', gap: 8 }}>
                      <dt
                        style={{
                          flexShrink: 0,
                          width: 64,
                          color: 'var(--ink-500)',
                          fontWeight: 600,
                        }}
                      >
                        {row.label}
                      </dt>
                      <dd style={{ margin: 0, color: 'var(--ink-700)' }}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
