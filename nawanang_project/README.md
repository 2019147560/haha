# 나와나망

고립·은둔청년 통합 정보 플랫폼

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인

## 배포 (Vercel)

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_ID/nawanang.git
git push -u origin main
```

이후 [vercel.com](https://vercel.com) 에서 레포 연동하면 자동 배포됩니다.

## 구조

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx          # 홈 — 지원사업 검색
│   ├── support/page.tsx  # 제도 안내
│   ├── my/page.tsx       # 마이페이지
│   └── programs/[id]/
│       ├── page.tsx      # 사업 상세
│       └── apply/page.tsx
├── components/
├── lib/data.ts
├── types/index.ts
└── styles/globals.css
```
