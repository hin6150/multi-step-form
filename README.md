# 📚 Book Form (멀티 스텝 독서 기록)

사용자가 도서 정보 → 평점/추천 → 독후감 → 인용구 → 공개 여부까지 한 번에 입력할 수 있는 멀티 스텝 폼입니다.

모바일 친화 UI, Stepper 진행바, 폼 상태 퍼시스트(새로고침 복원)를 지원합니다.

## 🔧 기술스택
TypeScript

Next.js (Pages Router)

React

React Query

React Hook Form (+ Zod Resolver)

Emotion (Global/Theme/Component styles)

Jotai

## 🧭 플로우 (5단계)
1단계 — 도서 기본 정보, 독서 상태, 시작/종료일
독서 상태: 읽고 싶은 책 / 읽는 중 / 읽음 / 보류 중

2단계 — 도서 추천 여부, 별점(0~5, 0.5 스텝)

3단계 — 독후감

4단계 — 인용구

5단계 — 공개 여부


## 📁 주요 구조
```
src/
 ┣ components/
 ┃ ┣ form/           # 각 스텝별 Form 화면과 전체 Form 화면을 관리합니다.
 ┃ ┣ inputs/         # Form 내부에서 사용하는 Input 입니다.
 ┃ ┗ stepper/        # 상단의 진행 상태를 알려주는 Step 컴포넌트입니다.
 ┣ lib/              # Emotion 캐시관리, Form 스키마를 관리합니다.
 ┣ pages/            # pages router 엔트리입니다.
 ┗ styles/           # globals, theme 등 css 스타일을 관리합니다.
```
