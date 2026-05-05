import { Crumb } from '@/components/Crumb';
import { Mascot } from '@/components/ui/Mascot';

export const metadata = { title: '마이페이지 — 나와나망' };

export default function MyPage() {
  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 32px' }}>
      <Crumb items={[{ label: '마이페이지' }]} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 32,
          alignItems: 'start',
          marginTop: 8,
        }}
      >
        {/* Sidebar */}
        <aside>
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: '28px 22px',
              background: '#fff',
              textAlign: 'center',
            }}
          >
            <Mascot size={72} />
            <div
              style={{
                marginTop: 14,
                fontWeight: 800,
                fontSize: 17,
                color: 'var(--ink-900)',
              }}
            >
              지○○ 님
            </div>
            <div
              style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}
            >
              가입일 2026.01.15
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '14px 0',
                borderTop: '1px solid var(--line-2)',
                borderBottom: '1px solid var(--line-2)',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              {[
                { label: '스크랩', value: '3' },
                { label: '신청', value: '1' },
                { label: '완료', value: '0' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: 'var(--brand-500)',
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <nav style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['내 스크랩', '신청 현황', '내 정보 수정', '알림 설정'].map((item) => (
                <button
                  key={item}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: 'none',
                    background: item === '내 스크랩' ? 'var(--brand-50)' : 'transparent',
                    color:
                      item === '내 스크랩' ? 'var(--brand-500)' : 'var(--ink-700)',
                    fontWeight: item === '내 스크랩' ? 700 : 500,
                    fontSize: 13,
                    textAlign: 'left',
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div>
          <h1
            style={{
              margin: '0 0 24px',
              fontSize: 24,
              fontWeight: 800,
              color: 'var(--ink-900)',
              letterSpacing: '-0.03em',
            }}
          >
            내 스크랩
          </h1>
          <div
            style={{
              padding: '80px 0',
              textAlign: 'center',
              border: '1px dashed var(--line)',
              borderRadius: 14,
              color: 'var(--ink-400)',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔖</div>
            <div style={{ fontSize: 14 }}>아직 스크랩한 사업이 없어요.</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>
              관심 있는 사업을 스크랩하면 여기서 확인할 수 있어요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
