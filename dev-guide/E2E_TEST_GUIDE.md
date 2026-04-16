# E2E 테스트 가이드

데모 기반 E2E 테스트 시스템. Playwright Test로 데모 페이지를 실제 브라우저에서 검증한다.

## 구조

```
packages/test-flicking/e2e/
├── generate-test-harness.mjs      # test harness 생성기: 데모 스캔 → HTML 엔트리 생성
├── vite.config.ts             # Vite MPA 서버 (React+Vue 플러그인, @egjs/* alias)
├── playwright.config.ts       # Playwright 설정 (webServer, viewport)
├── .generated/                # (gitignored) 생성된 HTML 엔트리
│   ├── vanilla/{category}/{Name}.html
│   ├── react/{category}/{Name}.html
│   └── vue/{category}/{Name}.html
└── tests/                     # 스펙 + 테스트 (같은 디렉토리에 공존)
    ├── helpers/               # 공유 헬퍼 (demo, gesture, spec-loader)
    └── {category}/{id}/
        ├── {id}.yaml          # 선언적 YAML 스펙
        └── {id}.spec.ts       # Playwright 테스트
```

## 명령어

```bash
cd packages/test-flicking/e2e

pnpm dev           # Vite 서버 실행 (http://localhost:3010)
pnpm test          # Playwright 테스트 실행
pnpm test:headed   # 브라우저 창 띄우고 실행
pnpm generate      # HTML 엔트리만 재생성
```

루트에서:
```bash
pnpm test:e2e      # E2E 테스트 실행
```

### 브라우저에서 테스트 실행 확인

`pnpm test:headed`를 사용하면 Chromium 브라우저 창이 뜨면서 테스트가 하나씩 실행되는 모습을 볼 수 있다.

```bash
cd packages/test-flicking/e2e
pnpm test:headed
```

특정 테스트만 보고 싶으면:
```bash
# 특정 파일만
npx playwright test tests/basic/default/default.spec.ts --headed

# 특정 키워드로 필터
npx playwright test --headed --grep "circular"
```

더 천천히 보고 싶으면 Playwright UI 모드를 사용한다:
```bash
npx playwright test --ui
```

UI 모드에서는 테스트를 하나씩 선택해서 실행하고, 타임라인 리플레이도 가능하다.

## 아키텍처

### 왜 docs 사이트를 직접 테스트하지 않나?

docs의 Sandpack 데모는 **npm CDN 버전**(`@egjs/flicking@^4.11.4`)을 사용한다. 로컬 코드 변경을 테스트하려면 `@egjs/*` import를 로컬 소스로 resolve하는 별도 test harness가 필요하다.

### test harness 동작 원리

1. `generate-test-harness.mjs`가 `packages/docs/src/demo/`를 스캔
2. 각 데모의 프레임워크별(vanilla/react/vue) HTML 엔트리를 `.generated/`에 생성
3. Vanilla: 데모의 `index.html` body를 추출하여 삽입 + `vanilla.js` import
4. React: `<div id="root">` + `react.jsx` 컴포넌트 마운트
5. Vue: `<div id="app">` + `vue.vue` SFC 마운트 + `styles.css` import
6. 모든 HTML에 Flicking 인스턴스 자동 등록 패치 스크립트 포함

### Import 해석

| import | alias 대상 |
|--------|-----------|
| `@egjs/flicking` | `packages/flicking/src/index.ts` |
| `@egjs/react-flicking` | `packages/react-flicking/src/react-flicking/index.ts` |
| `@egjs/vue3-flicking` | `packages/vue3-flicking/src/index.ts` |
| `@egjs/flicking-plugins` | `packages/flicking-plugins/src/index.ts` |
| `@egjs/flicking/dist/flicking.css` | `packages/flicking/sass/flicking.sass` |
| `@egjs/flicking-plugins/dist/*.css` | `packages/flicking-plugins/css/*.css` |

## 선언적 YAML 스펙

각 데모의 존재 이유와 테스트 포커스를 기술한다. 테스트 코드의 "설계 문서" 역할.

```yaml
id: default
category: basic
demo: basic/Default

intent: "이 데모가 왜 존재하는지 한 줄 설명"

focus:
  - 테스트가 검증해야 할 포인트 1
  - 테스트가 검증해야 할 포인트 2

api:
  options: [align]        # 사용하는 옵션
  events: [needPanel]     # 사용하는 이벤트
  methods: [append]       # 사용하는 메서드
  plugins: [Arrow]        # 사용하는 플러그인

frameworks: [vanilla, react, vue]
```

**스펙이 담는 것**: 데모의 존재 이유, 테스트 포커스, 관련 API
**스펙이 담지 않는 것**: 옵션 상세 설명(MDX에 있음), selector/assertion 상세(테스트 코드에 있음)

## 테스트 작성법

### 기본 구조

```typescript
import { test, expect } from "@playwright/test";
import { loadSpec } from "../helpers/spec-loader";
import { navigateToDemo, waitForFlickingReady, getFlickingState } from "../helpers/demo";
import { dragLeft } from "../helpers/gesture";

const spec = loadSpec("basic/default");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, spec.category, "Default");
      await waitForFlickingReady(page);
    });

    test("패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(5);
    });
  });
}
```

### 헬퍼 함수

- `navigateToDemo(page, framework, category, name)`: 데모 페이지로 이동
- `waitForFlickingReady(page)`: Flicking 초기화 완료 대기
- `getFlickingState(page, instanceIndex?)`: `{ currentIndex, panelCount, animating }` 조회
- `waitForAnimationEnd(page, instanceIndex?)`: 애니메이션 완료 대기
- `dragLeft(page, options?)`: 좌측 드래그 (다음 패널 방향)
- `dragRight(page, options?)`: 우측 드래그

### 여러 Flicking 인스턴스가 있는 데모

```typescript
// nth: n번째 .flicking-viewport 선택, instanceIndex: __flickingInstances[n]
await dragLeft(page, { nth: 1, instanceIndex: 1 });
const state = await getFlickingState(page, 1);
```

### Flicking API 직접 호출

```typescript
await page.evaluate(async () => {
  const flicking = (window as any).__flickingInstances[0];
  await flicking.moveTo(4, 0);  // 즉시 이동
});
```

## 새 데모 E2E 테스트 추가 절차

1. `tests/{category}/{id}/` 디렉토리 생성
2. `tests/{category}/{id}/{id}.yaml` 스펙 작성 (intent, focus, api, frameworks)
3. `tests/{category}/{id}/{id}.spec.ts` 테스트 작성 (스펙의 focus를 테스트로 구현)
3. `pnpm generate` 실행하여 HTML 엔트리 생성 확인
4. `pnpm test:headed` 로 브라우저에서 확인
5. `pnpm test` 로 전체 통과 확인

## 주의사항

- 데모 파일(`packages/docs/src/demo/`)은 직접 import됨 → 데모 수정 시 E2E에 영향
- Vanilla 데모의 `index.html` body가 HTML 엔트리에 삽입됨 → HTML 구조 변경 시 regenerate 필요
- Vue SFC는 `./styles.css`를 자체 import하지 않음 → test harness가 별도 import 처리
- 기본 패널 스타일(`demo-defaults.ts`)이 HTML `<style>` 태그로 주입됨
