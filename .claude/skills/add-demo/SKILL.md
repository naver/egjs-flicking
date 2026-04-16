---
name: add-demo
description: 데모 스펙을 받아 데모 코드 + E2E 테스트 + TSDoc 링크를 한 번에 생성한다. 어떤 API/옵션을 어떻게 보여줄지 설명하면 전체 세트가 만들어진다.
disable-model-invocation: true
argument-hint: "[데모 스펙 설명]"
---

"$ARGUMENTS" 스펙을 기반으로 데모 세트를 생성한다.

## 전체 흐름

사용자 프롬프트에서 4가지를 순차적으로 생성한다:

### Step 1. 스펙 구조화

프롬프트를 분석하여 다음을 결정한다:
- **카테고리**: basic / advanced / plugins / reactive
- **데모 ID**: 영문 PascalCase (디렉토리명)
- **intent**: 이 데모가 왜 존재하는지 (한 문장)
- **focus**: 무엇을 검증해야 하는지 (구체적 동작)
- **api**: 관련 API 목록 (옵션, 메서드, 이벤트)
- **frameworks**: [vanilla, react, vue]

결정한 내용을 사용자에게 확인받은 뒤 진행한다.

### Step 2. 데모 코드 생성

`packages/docs/src/demo/{category}/{Name}/` 아래 6개 파일:
- `react.jsx`, `vue.vue`, `vanilla.js` — 프레임워크별 코드
- `index.html` — Vanilla용 HTML 구조
- `styles.css` — 공통 스타일
- `index.tsx` — Sandpack 데모 컴포넌트 (`?raw` import)

`packages/docs/docs/demos/{category}/{name}.mdx` — MDX 문서

코드 패턴, Sandpack 설정, MDX 구조는 @dev-guide/DEMO_GUIDE.md 참조.
기존 데모 패턴은 `packages/docs/src/demo/` 내 유사 데모를 참고한다.

### Step 3. E2E 테스트 생성

`packages/test-flicking/e2e/tests/{category}/{id}/` 아래 2개 파일:
- `{id}.yaml` — Step 1에서 구조화한 스펙 (intent, focus, api, frameworks)
- `{id}.spec.ts` — Step 2에서 만든 데모의 실제 동작을 검증하는 Playwright 테스트

스펙 포맷, 헬퍼 함수, 테스트 패턴은 @dev-guide/E2E_TEST_GUIDE.md 참조.

생성 후 `cd packages/test-flicking/e2e && pnpm generate`로 HTML 엔트리 재생성.

### Step 4. TSDoc @see 링크 추가

Step 1에서 식별한 api 목록의 각 옵션/메서드에 대해:
- `packages/flicking/src/` 또는 `packages/flicking-plugins/src/`에서 해당 API의 TSDoc을 찾는다
- `@see` 태그로 데모 링크를 추가한다:
  ```
  @see {@link https://naver.github.io/egjs-flicking/demos/{category}/{name} | 데모 제목}
  ```

TSDoc 포맷은 @dev-guide/TSDOC_FORMAT_GUIDE.md 참조.

## 완료 후 안내

- dev 서버 확인: `pnpm docs:serve` → 해당 데모 페이지 URL
- E2E 테스트 확인: `pnpm test:headed`
- sidebars.js 업데이트 필요 여부
