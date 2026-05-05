'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Crumb } from '@/components/Crumb';
import { Icon } from '@/components/ui/Icon';
import { PROGRAMS } from '@/lib/data';

const STEPS = ['기본 정보', '동의 사항', '신청 완료'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        marginBottom: 40,
      }}
    >
      {STEPS.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background:
                  i < current
                    ? 'var(--brand-500)'
                    : i === current
                    ? 'var(--ink-900)'
                    : 'var(--line)',
                color: i <= current ? '#fff' : 'var(--ink-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {i < current ? <Icon.Check width={16} height={16} /> : i + 1}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: i === current ? 700 : 500,
                color: i === current ? 'var(--ink-900)' : 'var(--ink-400)',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              style={{
                width: 80,
                height: 1,
                background: i < current ? 'var(--brand-500)' : 'var(--line)',
                marginBottom: 18,
                marginLeft: 4,
                marginRight: 4,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 18, fontWeight: 700, color: 'var(--ink-900)' }}>
        기본 정보 입력
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { label: '이름', placeholder: '실명을 입력하세요', type: 'text' },
          { label: '생년월일', placeholder: '2000.01.01', type: 'text' },
          { label: '연락처', placeholder: '010-0000-0000', type: 'tel' },
          { label: '거주 지역', placeholder: '시/도 선택', type: 'text' },
        ].map((field) => (
          <div key={field.label}>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink-700)',
                marginBottom: 6,
              }}
            >
              {field.label}
              <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              style={{
                width: '100%',
                height: 44,
                border: '1px solid var(--line)',
                borderRadius: 8,
                padding: '0 14px',
                fontSize: 14,
                outline: 'none',
                fontFamily: 'inherit',
                color: 'var(--ink-900)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-500)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
            />
          </div>
        ))}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink-700)',
              marginBottom: 6,
            }}
          >
            신청 동기
          </label>
          <textarea
            placeholder="간단히 신청 동기를 작성해주세요 (선택)"
            rows={4}
            style={{
              width: '100%',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '10px 14px',
              fontSize: 14,
              outline: 'none',
              fontFamily: 'inherit',
              color: 'var(--ink-900)',
              resize: 'vertical',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-500)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
          />
        </div>
      </div>
      <button
        onClick={onNext}
        style={{
          width: '100%',
          height: 48,
          marginTop: 28,
          background: 'var(--ink-900)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        다음 단계 <Icon.ChevronR width={14} height={14} />
      </button>
    </div>
  );
}

function Step2({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div>
      <h2 style={{ margin: '0 0 24px', fontSize: 18, fontWeight: 700, color: 'var(--ink-900)' }}>
        동의 사항
      </h2>
      <div
        style={{
          border: '1px solid var(--line)',
          borderRadius: 10,
          padding: '18px 20px',
          fontSize: 13,
          color: 'var(--ink-600)',
          lineHeight: 1.7,
          background: '#fafbfc',
          marginBottom: 18,
          maxHeight: 200,
          overflowY: 'auto',
        }}
      >
        <strong style={{ color: 'var(--ink-900)' }}>개인정보 수집·이용 동의</strong>
        <br />
        <br />
        수집 항목: 이름, 생년월일, 연락처, 거주지역
        <br />
        수집 목적: 지원사업 신청 접수 및 운영
        <br />
        보유 기간: 사업 종료 후 1년
        <br />
        <br />
        귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으나, 동의 거부 시 서비스 이용이
        제한될 수 있습니다.
      </div>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--ink-900)',
        }}
      >
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{ width: 16, height: 16, accentColor: 'var(--brand-500)' }}
        />
        개인정보 수집·이용에 동의합니다 (필수)
      </label>
      <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
        <button
          onClick={onPrev}
          style={{
            flex: 1,
            height: 48,
            background: '#fff',
            color: 'var(--ink-700)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!agreed}
          style={{
            flex: 2,
            height: 48,
            background: agreed ? 'var(--ink-900)' : 'var(--line)',
            color: agreed ? '#fff' : 'var(--ink-400)',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            cursor: agreed ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          신청 완료 <Icon.ChevronR width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

function Step3({ programId }: { programId: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
      <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: 'var(--ink-900)' }}>
        신청이 완료되었어요!
      </h2>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: 14,
          color: 'var(--ink-600)',
          lineHeight: 1.6,
        }}
      >
        담당자가 검토 후 연락드릴 예정입니다.
        <br />
        평균 3~5 영업일 소요됩니다.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <Link href="/">
          <button
            style={{
              height: 44,
              padding: '0 24px',
              background: '#fff',
              color: 'var(--ink-700)',
              border: '1px solid var(--line)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            홈으로
          </button>
        </Link>
        <Link href="/my">
          <button
            style={{
              height: 44,
              padding: '0 24px',
              background: 'var(--brand-500)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            신청 현황 확인
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  const params = useParams();
  const id = String(params.id);
  const program = PROGRAMS.find((p) => p.id === Number(id));
  const [step, setStep] = useState(0);

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 32px' }}>
      <Crumb
        items={[
          { label: '지원사업 검색', href: '/' },
          {
            label: program?.title.replace('\n', ', ') ?? '사업',
            href: `/programs/${id}`,
          },
          { label: '신청' },
        ]}
      />

      <div
        style={{
          maxWidth: 560,
          margin: '0 auto',
          border: '1px solid var(--line)',
          borderRadius: 16,
          padding: '40px 36px',
          background: '#fff',
          marginTop: 8,
        }}
      >
        {program && (
          <div
            style={{
              padding: '12px 16px',
              background: 'var(--brand-50)',
              borderRadius: 8,
              marginBottom: 32,
              fontSize: 13,
              color: 'var(--ink-700)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--brand-500)',
                flexShrink: 0,
              }}
            />
            <span>
              <strong style={{ color: 'var(--brand-500)' }}>
                {program.title.replace('\n', ' ')}
              </strong>{' '}
              신청
            </span>
          </div>
        )}

        <StepIndicator current={step} />

        {step === 0 && <Step1 onNext={() => setStep(1)} />}
        {step === 1 && <Step2 onNext={() => setStep(2)} onPrev={() => setStep(0)} />}
        {step === 2 && <Step3 programId={id} />}
      </div>
    </div>
  );
}
