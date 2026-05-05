import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나와나망 — 지원사업 검색',
  description: '고립·은둔청년 통합 정보 플랫폼. 맞춤형 지원사업을 검색하고 신청하세요.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
