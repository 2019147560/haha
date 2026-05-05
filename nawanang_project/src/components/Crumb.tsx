import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export interface CrumbItem {
  label: string;
  href?: string;
  icon?: 'search';
}

interface CrumbProps {
  items: CrumbItem[];
}

export function Crumb({ items }: CrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      style={{
        padding: '20px 0 12px',
        fontSize: 12,
        color: 'var(--ink-500)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span>›</span>}
          {item.href ? (
            <Link
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {item.icon === 'search' && <Icon.Search width={12} height={12} />}
              {item.label}
            </Link>
          ) : (
            <span
              style={{
                color: 'var(--ink-900)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {item.icon === 'search' && <Icon.Search width={12} height={12} />}
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
