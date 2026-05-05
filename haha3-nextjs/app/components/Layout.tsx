import { Icons } from './Icons'

export function UtilityBar() {
  return (
    <div style={{ borderBottom: '1px solid var(--line-2)', background: '#fafbfc', fontSize: 12, color: 'var(--ink-600)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ background: '#fff8d4', color: '#7a5b00', padding: '3px 8px', borderRadius: 4, fontWeight: 600, fontSize: 11 }}>
            고립·은둔청년 통합 정보 플랫폼
          </span>
          <span style={{ color: 'var(--ink-500)' }}>운영시간 평일 10:00–18:00</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: 'var(--ink-500)' }}>
          <a href="#">도움말</a>
          <span style={{ color: 'var(--line)' }}>|</span>
          <a href="#">1:1 문의</a>
          <span style={{ color: 'var(--line)' }}>|</span>
          <a href="#">로그인</a>
          <span style={{ color: 'var(--line)' }}>|</span>
          <a href="#">회원가입</a>
        </div>
      </div>
    </div>
  )
}

export function MainNav({ activeTab = 'search' }: { activeTab?: string }) {
  return (
    <header style={{ borderBottom: '1px solid var(--line)', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 36 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', color: 'var(--brand-700)' }}>
            <span>나와</span>
            <span style={{ color: 'var(--brand-500)' }}>나망</span>
          </div>
          <div style={{ paddingLeft: 12, marginLeft: 4, borderLeft: '1px solid var(--line)', fontSize: 11, color: 'var(--ink-500)', lineHeight: 1.35, maxWidth: 130 }}>
            고립·은둔청년<br />통합 정보 플랫폼
          </div>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 28, marginLeft: 16 }}>
          {[
            { id: 'search', label: '지원사업 검색' },
            { id: 'scrap',  label: '내 스크랩' },
          ].map(({ id, label }) => {
            const active = activeTab === id
            return (
              <a key={id} href={id === 'search' ? '/' : '#'} style={{
                position: 'relative', padding: '24px 0',
                fontWeight: active ? 700 : 500, fontSize: 15,
                color: active ? 'var(--brand-500)' : 'var(--ink-700)',
              }}>
                {label}
                {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 3, background: 'var(--brand-500)', borderRadius: 2 }} />}
              </a>
            )
          })}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
          <button style={{ position: 'relative', width: 36, height: 36, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-700)', borderRadius: 8 }} aria-label="검색">
            <Icons.Search width={20} height={20} />
          </button>
          <button style={{ position: 'relative', width: 36, height: 36, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-700)', borderRadius: 8 }} aria-label="알림">
            <Icons.Bell width={20} height={20} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '1.5px solid #fff' }} />
          </button>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: '#e7f0ff', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, border: 'none' }}>지</button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 80, background: '#fafbfc' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.7, maxWidth: 540 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink-900)', marginBottom: 10 }}>나와나망</div>
          <div>고립·은둔청년 통합 정보 플랫폼</div>
          <div>
            <strong style={{ color: 'var(--ink-700)' }}>대표 전화</strong> 02-000-0000{'  '}
            <strong style={{ color: 'var(--ink-700)' }}>운영시간</strong> 평일 10:00–18:00
          </div>
          <div style={{ marginTop: 10, color: 'var(--ink-400)' }}>본 화면은 디자인 목업으로 실제 사업과 무관합니다</div>
        </div>
        <div style={{ display: 'flex', gap: 22, fontSize: 13, color: 'var(--ink-600)', fontWeight: 500 }}>
          <a href="#">이용약관</a>
          <a href="#" style={{ color: 'var(--ink-900)', fontWeight: 700 }}>개인정보처리방침</a>
          <a href="#">오시는 길</a>
          <a href="#">문의하기</a>
        </div>
      </div>
    </footer>
  )
}
