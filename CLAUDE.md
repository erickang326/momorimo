# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MOMORIMO(모모리모) — 탈모증상완화 기능성 올인원 샴푸 브랜드의 원페이지 마케팅 웹사이트 (v4.0). 프레임워크나 빌드 시스템 없이 순수 HTML/CSS/JS로 구성된 정적 사이트.

## Development

별도 빌드/설치 과정 없음. 로컬 개발 시 Live Server 등으로 `index.html`을 직접 서빙하면 됨.

**배포**: Netlify 정적 호스팅 (master 브랜치 push 시 자동 배포)
**원격 저장소**: `https://github.com/erickang326/momorimo.git`

## Architecture

단일 페이지(SPA가 아닌 정적 원페이지) 구성:

```
index.html          # 전체 페이지 구조 (21개 섹션)
css/style.css       # 전체 스타일 (CSS 변수 기반, 768px/480px 반응형)
js/main.js          # GSAP 애니메이션 및 인터랙션
img/                # 제품 이미지, 브랜드 심볼
img/origin/         # 상세페이지 원본 이미지 (21장, 일부 섹션에서 직접 참조)
```

### 외부 의존성 (CDN)

- **GSAP 3.12.5** + ScrollTrigger — 스크롤 기반 애니메이션
- **Google Fonts** — Outfit(영문), Noto Sans KR(한글)

### CSS 디자인 토큰

```css
--gold: #B8962E;         /* 프라이머리 골드 */
--bg: #FAFAF7;           /* 웜 라이트 배경 */
--bg-warm: #F5F0E8;      /* Pain Point 등 웜 배경 */
--bg-dark: #1A1615;      /* 푸터/CTA 다크 */
--mint-bg: #F0F8F6;      /* 멘톨 섹션 */
--silver-bg: #F4F6F8;    /* 판테놀 섹션 */
--floral-bg: #FDF5F9;    /* 퍼퓸 섹션 */
```

반응형 브레이크포인트: `768px` (태블릿 → 단일 컬럼, 햄버거 메뉴), `480px` (모바일 폰트/간격 축소)

### JS 애니메이션 구조

`js/main.js`는 섹션별 IIFE 패턴으로 구성:

- **프리로더**: 심볼 → 로고 → 라인 순차 타임라인
- **히어로**: 글자별 타이핑 애니메이션 (`populateKrText`) + 씰뱃지
- **Pain Point**: 4개 고민 카드 stagger fade-in
- **브랜드 스토리**: 네이밍 카드 stagger 애니메이션
- **기능성 성분 / 멘톨 / 판테놀**: 각각 ScrollTrigger fade-in
- **식약처 인증**: 테이블 + 스탬프 fade-in
- **육미지황 / 6종 약재**: 카드 stagger 애니메이션
- **특허증**: 박스 fade-in
- **비오틴 / 퍼퓸**: ScrollTrigger fade-in
- **pH 게이지**: ScrollTrigger 콜백으로 fill + marker 애니메이션
- **카운터**: `gsap.to()` + `onUpdate`로 숫자 카운트업
- **모델 CTA**: 텍스트 오버레이 fade-in
- **Sticky CTA**: hero~purchase 사이 하단 고정 구매 버튼 토글

`prefers-reduced-motion` 감지 시 모든 애니메이션을 즉시 완료 상태로 폴백.

### 페이지 섹션 순서 (전환 퍼널)

Hero → Brand Intro → Pain Point(4가지 두피고민) → OUR STORY(모모세포) → Product Showcase → POINT 01(기능성분/맥주효모) → 멘톨 → 판테놀 → MFDS 식약처 인증 → POINT 02(육미지황 HR) → 6종 약재 상세 → 특허증 → POINT 03(비오틴) → POINT 04(퍼퓸 효과) → POINT 05(pH 5.5) → By the Numbers → How to Use → Gift 선물세트 → Model CTA → Purchase CTA → Footer(제품정보고시)

### origin 이미지 직접 참조

일부 섹션은 `img/origin/` 이미지를 배경 또는 인라인으로 활용:
- `detail_05.jpg` → Product Showcase
- `detail_11.jpg` → Gift 선물 세트
- `detail_12.jpg` → POINT 02 육미지황 배경
- `detail_15.jpg` → Model CTA 배경

## Conventions

- **HTML**: kebab-case ID/클래스 (`.hero-logo`, `.pain-card`)
- **JS**: camelCase 함수명 (`initHero`, `showHeroInstant`)
- **커밋**: 한국어 또는 영어, Conventional Commits 접두사 사용
- **접근성**: 시맨틱 태그(header/footer/section/nav), alt 텍스트, lazy loading, reduced motion 대응
