interface PosterProps {
  bg: string;
  title: string;
  tag: string;
  dDay: string;
  org: string;
  height?: number;
}

export function Poster({ bg, title, tag, dDay, org, height = 200 }: PosterProps) {
  const isDDay = dDay.startsWith('D-');

  return (
    <div
      style={{
        position: 'relative',
        background: bg,
        height,
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: -40,
          bottom: -40,
          width: 130,
          height: 130,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.45)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -30,
          top: 30,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.30)',
        }}
      />

      {/* Top row */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            background: 'rgba(255,255,255,0.7)',
            color: 'var(--ink-900)',
            padding: '4px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {tag}
        </span>
        <span
          style={{
            background: isDDay ? 'var(--brand-500)' : '#fff',
            color: isDDay ? '#fff' : 'var(--ink-700)',
            border: isDDay ? 'none' : '1px solid rgba(0,0,0,0.12)',
            padding: '4px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {dDay}
        </span>
      </div>

      {/* Title */}
      <div style={{ position: 'relative' }}>
        <h3
          style={{
            margin: 0,
            fontSize: 19,
            fontWeight: 800,
            lineHeight: 1.35,
            color: 'var(--ink-900)',
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </h3>
      </div>

      {/* Bottom row */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--ink-700)', fontWeight: 500 }}>{org}</span>
      </div>
    </div>
  );
}
