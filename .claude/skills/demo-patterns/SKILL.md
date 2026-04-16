---
name: demo-patterns
description: Sandpack 데모 코드 패턴. packages/docs/src/demo/ 또는 packages/docs/docs/demos/ 내 파일 작성·수정 시 자동 로드. 프레임워크별 코드 구조, 파일 구성, import 패턴 안내.
user-invocable: false
---

# 데모 작성 핵심 규칙

## 파일 구성
데모 디렉토리(`packages/docs/src/demo/{category}/{Name}/`)에 다음 파일:
- `react.jsx`, `vue.vue`, `vanilla.js` — 프레임워크별 코드 (TSX 내 템플릿 리터럴 금지)
- `index.html` — Vanilla용 HTML 구조
- `styles.css` — 공통 스타일
- `index.tsx` — Sandpack 데모 컴포넌트 (`?raw` import)

## 프레임워크별 패턴 요약
- **React**: `@egjs/react-flicking`, props 기반, `<ViewportSlot>` 으로 플러그인 UI
- **Vue**: `@egjs/vue3-flicking`, `:options` 객체 prop, `<template #viewport>` 슬롯
- **Vanilla**: `@egjs/flicking`, `.flicking-viewport > .flicking-camera` DOM 구조

## 상세 가이드
MDX 문서 작성법, Sandpack 설정, 플러그인 데모 dependencies, 전체 체크리스트는 @dev-guide/DEMO_GUIDE.md 참조.
