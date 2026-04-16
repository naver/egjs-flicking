# 테스트 가이드 (test-flicking)

## 개요

`packages/test-flicking/`은 egjs-flicking 모노레포의 전체 테스트를 관리하는 패키지다. Karma/Mocha/Jest에서 **Vitest**로 통합 마이그레이션되었으며, 세 가지 테스트 스위트로 구성된다.

| 구분 | 도구 | 환경 | 테스트 수 | 이벤트 방식 | 타이머 |
|------|------|------|---------|-----------|--------|
| **unit** | Vitest Browser Mode + Playwright | Chromium Headless (640×480) | 573 | TouchEvent (shared) | fake |
| **plugins** | Vitest | jsdom | 41 | TouchEvent (shared) | fake |
| **cfc** | Vitest | jsdom (3 frameworks) | 42 | TouchEvent (shared) | fake |
| **합계** | | | **656** | | |

## 패키지 구조

각 테스트 스위트는 별도의 pnpm workspace 패키지로 분리되어 있다:

| 디렉토리 | 패키지명 | 의존성 |
|----------|---------|--------|
| `unit/` | `@test/unit` | `vitest`, `@vitest/browser-playwright` |
| `plugins/` | `@test/plugins` | `vitest`, `@egjs/flicking`, `@egjs/flicking-plugins` |
| `cfc/` | `@test/cfc` | `vitest`, `@testing-library/*`, `react`, `react-dom` |

> `shared/`는 별도 패키지가 아니며, 각 스위트에서 상대 경로로 직접 import한다.

## 실행 방법

```bash
# 루트에서 실행 (pnpm workspace filter)
pnpm test            # unit 테스트만 (@test/unit)
pnpm test:plugins    # plugins 테스트만 (@test/plugins)
pnpm test:cfc        # cfc 테스트만 (@test/cfc, Vanilla + React + Vue3)
pnpm test:all        # 전체 실행 (unit → plugins → cfc 순차)
```

각 패키지 내에서 직접 실행도 가능하다:
```bash
cd packages/test-flicking/unit && pnpm test
cd packages/test-flicking/plugins && pnpm test
cd packages/test-flicking/cfc && pnpm test
```

CFC는 프레임워크별 개별 실행도 지원한다:
```bash
cd packages/test-flicking/cfc
pnpm test:vanilla    # vitest run --project Vanilla
pnpm test:react      # vitest run --project React
pnpm test:vue3       # vitest run --project Vue3
```

---

## 디렉토리 구조

```
packages/test-flicking/
├── shared/                        # 모든 스위트 공유 모듈
│   ├── pre-setup.ts               # Axes Input 타입 결정용 사전 설정 (1개로 통합)
│   ├── jsdom-mocks.ts             # jsdom element size mock (plugins + cfc)
│   ├── simulate.ts                # TouchEvent dispatcher (전 스위트 공유)
│   └── utils.ts                   # createSandbox, cleanup, tick, waitEvent, waitTime
│
├── unit/                          # 핵심 Flicking 유닛 테스트 (실제 브라우저)
│   ├── vitest.config.ts           # Vitest Browser Mode + Playwright 설정
│   ├── setup.ts                   # fake timers, CSS 로드, 인스턴스 cleanup
│   ├── helper/
│   │   ├── El.ts                  # DOM 빌더 패턴 (unit 전용)
│   │   └── test-util.ts           # createFlicking 등 unit 전용 + shared re-export
│   ├── *.spec.ts                  # 최상위 spec 파일 (Flicking, CrossFlicking, utils)
│   ├── camera/                    # Camera 관련 spec (Camera, mode/)
│   ├── control/                   # Control 관련 spec (Control, Snap, Free, Strict, AxesController)
│   ├── core/                      # Core 컴포넌트 spec (Viewport, panel/, FlickingError)
│   ├── renderer/                  # Renderer 관련 spec (Renderer, VanillaRenderer, VirtualManager)
│   ├── reactive/                  # Reactive 관련 spec
│   └── cfc/                       # CFC 유닛 테스트 (getRenderingPanels, sync)
│
├── plugins/                       # flicking-plugins 테스트 (jsdom)
│   ├── vitest.config.ts           # Vitest + jsdom 설정
│   ├── setup.ts                   # jsdom-mocks + fake timers
│   ├── utils.ts                   # fixture 생성 + shared re-export (simulate, utils)
│   └── *.spec.ts                  # 플러그인별 spec 파일
│
├── cfc/                           # Cross-Framework Component 테스트 (jsdom + fake timers)
│   ├── vitest.config.ts           # 마스터 config (3개 project 참조)
│   ├── common/
│   │   ├── setup.ts               # jsdom-mocks + fake timers + renderer cleanup
│   │   └── utils.ts               # CFC 전용 (JSX 유틸, render 헬퍼) + shared re-export
│   ├── fixture/                   # DummyFlicking 등 테스트 fixture
│   ├── suite/                     # 공유 테스트 suite
│   │   ├── gesture.spec.ts        # 제스처 (select, threshold 이동)
│   │   ├── render.spec.ts         # 렌더링 검증
│   │   └── plugins/               # 플러그인 테스트
│   │       ├── Autoplay.spec.ts
│   │       ├── Fade.spec.ts
│   │       └── Parallax.spec.ts
│   └── framework/
│       ├── vanilla/               # VanillaFixtureRenderer + vitest.config
│       ├── react/                 # ReactFixtureRenderer + vitest.config
│       └── vue3/                  # Vue3FixtureRenderer + vitest.config
│
└── manual/                        # 수동 테스트 페이지
```

---

## shared/ — 공유 모듈

3개 스위트에 중복되었던 코드를 통합한 공유 모듈이다. 각 스위트는 여기서 import하거나 re-export한다.

### shared/pre-setup.ts

`@egjs/axes`는 **모듈 로드 시점**에 입력 타입 지원 여부를 결정한다:

```typescript
// @egjs/axes 내부
export const SUPPORT_POINTER = "PointerEvent" in window;
export const SUPPORT_TOUCH = "ontouchstart" in window;
```

이 값들은 한 번 평가되면 변경 불가능하다. 이후 Flicking의 `inputType` 옵션에 따라 어떤 EventInput을 사용할지 `convertInputType()`에서 결정한다:

```
inputType: ["mouse", "touch"]  (Flicking 기본값)
  → "pointer"가 배열에 없으므로 hasPointer = false
  → SUPPORT_TOUCH = true, hasMouse = true
  → TouchMouseEventInput 선택 (PointerEvent 유무와 무관)
```

통합된 pre-setup은 모든 스위트에서 동일하게 적용된다:

```typescript
// shared/pre-setup.ts
delete (window as any).MSPointerEvent;       // 구 IE 호환 방지
(window as any).ontouchstart = () => {};     // SUPPORT_TOUCH = true
```

**결과:** 3개 스위트 모두 `TouchMouseEventInput`이 선택된다. 이 Input은 `touchstart/touchmove/touchend` + `mousedown/mousemove/mouseup`을 모두 수신하므로, unit/cfc의 TouchEvent와 plugins의 MouseEvent 모두 정상 처리된다.

| 스위트 | SUPPORT_POINTER | SUPPORT_TOUCH | 기본 Axes Input | simulate 이벤트 |
|--------|----------------|--------------|----------------|----------------|
| unit | `true` (Chromium 네이티브) | `true` | TouchMouseEventInput | TouchEvent (shared) |
| plugins | `true` (jsdom 기본) | `true` | TouchMouseEventInput | TouchEvent (shared) |
| cfc | `true` (jsdom 기본) | `true` | TouchMouseEventInput | TouchEvent (shared) |

> `shared/pre-setup.ts`는 반드시 `setupFiles` 배열의 **첫 번째**에 위치해야 한다. 순서가 바뀌면 Axes가 잘못된 Input을 선택한다.

### shared/jsdom-mocks.ts

jsdom은 CSS 레이아웃 엔진이 없으므로 `offsetWidth`/`clientHeight` 등이 항상 0이다. plugins와 cfc에서 공유하는 mock 함수:

```typescript
import { setupJsdomMocks } from "../../shared/jsdom-mocks";
setupJsdomMocks();
```

`element.style.width` 값에서 숫자를 파싱하여 `offsetWidth`/`offsetHeight`/`clientWidth`/`clientHeight`를 반환한다. unit은 실제 브라우저이므로 이 mock이 불필요하다.

### shared/simulate.ts

3개 스위트가 공유하는 TouchEvent dispatcher. 10ms 간격으로 touchstart → touchmove... → touchend를 dispatch한다.

```typescript
import { simulate } from "../../shared/simulate";

// 기본 사용: 왼쪽으로 500px 드래그 (duration=500ms)
await simulate(el, { deltaX: -500, duration: 500 });

// 커스텀 시작 위치
await simulate(el, { pos: [100, 50], deltaX: -300 });

// 느린 드래그 (속도 ≈ 0) + 충분한 타이머 진행
await simulate(el, { deltaX: -2000, duration: 9999 }, 15000);

// fire-and-forget + 수동 tick 제어
void simulate(el, { deltaX: -1000, duration: 9999 });
tick(9000);  // 중간 지점에서 멈춤
```

**좌표 공식:**
```
progress = loop / totalLoops
easingVal = easing(progress)
x = pos[0] + (deltaX * progress) * easingVal
```
기본 easing은 linear이므로 실제 이동은 `pos + deltaX * progress²` (quadratic).

**세 번째 인자 `time`:**
- 기본값: `10000` (10초)
- simulate 내부에서 `vi.advanceTimersByTime(time)` 호출
- 제스처 완료 후 남은 시간은 애니메이션 진행에 사용
- `time = 0`이면 타이머 진행 없음 (수동 제어 시)

**`new Event()` 사용:** deprecated된 `document.createEvent()` + `initEvent()` 대신 모던 `new Event(type, { bubbles: true, cancelable: true })` API를 사용한다.

### shared/utils.ts

3개 스위트에서 중복되었던 유틸리티를 통합:

```typescript
import { createSandbox, cleanup, tick, waitEvent, waitTime } from "../../shared/utils";

createSandbox("my-test");              // ._tempSandbox_ div 생성 → body에 append
cleanup();                             // 모든 ._tempSandbox_ 제거
tick(1000);                            // vi.advanceTimersByTime(1000)
await waitEvent(flicking, "changed");  // 이벤트 1회 발생까지 대기 (emitter.once 또는 addEventListener)
await waitTime(100);                   // 실제 setTimeout으로 대기 (_real.setTimeout 사용)
```

> `waitTime`은 `window._real.setTimeout`을 사용하므로, setup.ts에서 `_real` 저장 이후에만 동작한다.

---

## Unit 테스트 상세

### 환경: Vitest Browser Mode + Playwright

unit 테스트는 **실제 브라우저**에서 실행된다. Flicking이 CSS 레이아웃 엔진(`offsetWidth`, `getBoundingClientRect`, CSS 배치)에 강하게 의존하기 때문이다.

```typescript
// unit/vitest.config.ts 핵심
export default defineConfig({
  resolve: {
    alias: [
      { find: "~", replacement: "../../flicking/src" },              // 소스 직접 참조
      { find: "@egjs/axes", replacement: "../../flicking/node_modules/@egjs/axes" },
      { find: "@egjs/list-differ", replacement: "../../flicking/node_modules/@egjs/list-differ" },
    ],
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium", viewport: { width: 640, height: 480 } }],
    },
    setupFiles: ["../shared/pre-setup.ts", "./setup.ts"],  // 순서 중요!
    globals: true,
    testTimeout: 30000,
    css: true,  // 실제 CSS 로드 필수
  },
});
```

**왜 Browser Mode인가:**
- jsdom은 CSS 레이아웃을 계산하지 않는다 (`offsetWidth` = 항상 0)
- Flicking의 패널 크기/위치 계산이 실제 렌더링에 의존
- `css: true` 옵션으로 `flicking.sass`를 실제 로드

### setup.ts

```typescript
import "../../flicking/sass/flicking.sass";  // 실제 CSS 로드

(window as any)._real = { setTimeout: window.setTimeout.bind(window) };  // 실제 setTimeout 보존
vi.useFakeTimers();                          // 모든 타이머 가짜화
(window as any).flickings = [];              // 인스턴스 추적

// Fire-and-forget 애니메이션 rejection만 선별 억제
// ANIMATION_INTERRUPTED(9), ANIMATION_ALREADY_PLAYING(10)만 허용
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const isAnimationError = reason?.name === "FlickingError"
    && (reason.code === 9 || reason.code === 10);

  if (isAnimationError) {
    event.preventDefault();
  }
});

beforeEach(() => vi.clearAllTimers());

afterEach(() => {
  // Flicking 인스턴스 destroy
  (window as any).flickings.forEach(f => f.destroy());
  (window as any).flickings = [];
  // sandbox DOM 제거
  document.querySelectorAll("._tempSandbox_").forEach(v => v.parentNode.removeChild(v));
});
```

**Unhandled Rejection 선별 억제:**
많은 테스트가 `void flicking.next()` / `void flicking.moveTo()` 패턴을 사용한다. 이 Promise가 interrupt되면 `FlickingError`로 reject되는데, await하지 않았으므로 unhandled rejection이 된다. 이 중 **`ANIMATION_INTERRUPTED`(code 9)와 `ANIMATION_ALREADY_PLAYING`(code 10)만** 선별적으로 억제한다. 그 외 예상치 못한 rejection은 억제하지 않아 Vitest가 정상적으로 리포트할 수 있다.

### 헬퍼: El (DOM 빌더 패턴)

Flicking에 필요한 DOM 구조를 fluent interface로 생성한다:

```typescript
import El from "./helper/El";

// 기본 수평 Flicking (1000px viewport, 100% 너비 패널 3개)
const el = El.DEFAULT_HORIZONTAL;

// 커스텀 구조
const el = El.viewport("800px", "600px").add(
  El.camera().add(
    El.panel().setWidth("50%").setHeight(200),
    El.panel().setWidth("50%").setHeight(200),
  ),
);

// 수직 Flicking
const el = El.DEFAULT_VERTICAL;

// CrossFlicking (data-cross-groupkey 속성 필요)
const el = El.DEFAULT_CROSS;
```

**주요 프리셋:**

| 프리셋 | viewport | 패널 | 특징 |
|--------|----------|------|------|
| `DEFAULT_HORIZONTAL` | 1000px × 100% | 100% × 300px × 3 | 기본 수평 |
| `HALF_HORIZONTAL` | 1000px × 100% | 50% × 300px × 3 | 반 너비 패널 |
| `VARIOUS_HORIZONTAL` | 1000px × 100% | 100% × (300~600px) × 5 | 다양한 높이 |
| `DEFAULT_VERTICAL` | 1000px × 1000px | 100% × 1000px × 3 | 기본 수직 |
| `DEFAULT_CROSS` | 1000px × 100% | 100% × 1000px × 9 | 3그룹 CrossFlicking |
| `EMPTY` | 1000px × 1000px | 없음 | 빈 구조 |

### 헬퍼: test-util.ts

unit 전용 함수 + shared re-export를 제공한다:

```typescript
import { createFlicking, createCrossFlicking, simulate, tick, waitEvent, range } from "./helper/test-util";
```

**shared에서 re-export하는 함수:** `simulate`, `createSandbox`, `cleanup`, `tick`, `waitEvent`, `waitTime`

**unit 전용 함수:**
- `createFlicking(el, option)` — Flicking 인스턴스 생성 + sandbox 관리
- `createCrossFlicking(el, option)` — CrossFlicking 인스턴스 생성 (특수 init 로직)
- `createPanel(el, panelOption, flickingOption)` — 단일 Panel 생성
- `range(end)` — `[0, 1, ..., end-1]` 배열 생성

**createFlicking 동작:**
1. sandbox div 생성 후 DOM에 append
2. `new Flicking(element, option)` 인스턴스 생성
3. `window.flickings` 배열에 등록 (afterEach에서 destroy)
4. autoInit이면 READY 이벤트를 await하고 반환

**createCrossFlicking 특수 로직:**
1. `autoInit: false`로 강제 설정
2. `flicking.init()` 전체 체인을 await (READY 이벤트 대신)
3. `_createCrossStructure()`가 inline style을 제거하므로 패널 너비 복원
4. `resize()` + `moveTo(index, 0)` 호출로 카메라 위치 재설정

> CrossFlicking은 `init()`이 `super.init().then()`으로 체이닝되어 READY 이벤트가 cross structure 생성 **전에** 발생한다. 따라서 READY 이벤트 대신 `init()` Promise를 직접 await해야 한다.

### Fake Timer 사용 패턴

Flicking의 애니메이션은 `requestAnimationFrame` / `setTimeout` 기반이므로 fake timer로 동기 제어한다.

**패턴 A: 단순 await (가장 일반적)**
```typescript
await simulate(el, { deltaX: -500 });
// simulate 내부에서 tick(10000) → 제스처 + 애니메이션 모두 완료
expect(flicking.index).toBe(1);
```

**패턴 B: 커스텀 시간**
```typescript
await simulate(el, { deltaX: -2000, duration: 9999 }, 15000);
// 느린 드래그 (속도≈0) + 15초 애니메이션
```

**패턴 C: Fire-and-forget + 수동 tick**
```typescript
void simulate(el, { deltaX: -1000, duration: 9999 });
tick(9000);
// 9초 시점에서 상태 확인 가능
await simulate(el, { deltaX: 0, duration: 100 }, 1000);  // 빈 터치로 중단
```

**패턴 D: 애니메이션 API + 인터럽트**
```typescript
void flicking.moveTo(2, 1500);  // 1.5초 애니메이션 시작
tick(500);                       // 0.5초 진행
await simulate(el, { deltaX: 0, duration: 100 }, 1000);  // 터치로 중단
```

---

## Plugins 테스트 상세

### 환경: Vitest + jsdom

플러그인 테스트는 CSS 레이아웃에 의존하지 않으므로 jsdom으로 충분하다.

```typescript
// plugins/vitest.config.ts 핵심
export default defineConfig({
  resolve: {
    alias: {
      "~": "../../flicking-plugins/src",                    // 플러그인 소스
      "@egjs/flicking": "../../flicking/src/index.ts",      // 코어 소스
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["../shared/pre-setup.ts", "./setup.ts"],
  },
});
```

### setup.ts

```typescript
import { setupJsdomMocks } from "../shared/jsdom-mocks";

setupJsdomMocks();        // jsdom element size mock
vi.useFakeTimers();       // 모든 타이머 가짜화

beforeEach(() => vi.clearAllTimers());
```

### utils.ts

shared에서 re-export하는 함수와 plugins 전용 함수를 함께 제공한다:

```typescript
// shared에서 re-export
export { createSandbox as sandbox, cleanup, tick, waitEvent } from "../shared/utils";
export { simulate } from "../shared/simulate";

// plugins 전용
export { createFlickingFixture, createPaginationFixture, createArrowFixture };
export { createFlicking, wait };
```

### Fixture 생성 패턴

```typescript
import { createFlickingFixture, createPaginationFixture, createArrowFixture } from "./utils";

const el = createFlickingFixture();     // viewport > camera > panel × 3
const el = createPaginationFixture();   // + .flicking-pagination div
const el = createArrowFixture();        // + .flicking-arrow-prev/next span
```

---

## CFC 테스트 상세

### 구조: 공유 Suite × 3 Framework

CFC(Cross-Framework Component) 테스트는 동일한 테스트 suite를 Vanilla / React / Vue3 각각에서 실행한다.

```
cfc/
├── vitest.config.ts              # 3개 project config 참조
├── common/
│   ├── setup.ts                  # jsdom-mocks + fake timers + renderer cleanup
│   └── utils.ts                  # CFC 전용 (JSX 유틸, render 헬퍼) + shared re-export
├── suite/
│   ├── gesture.spec.ts           # → Vanilla, React, Vue3 각각 실행
│   ├── render.spec.ts
│   └── plugins/...
└── framework/
    ├── vanilla/vitest.config.ts  # @common/renderer → VanillaFixtureRenderer
    ├── react/vitest.config.ts    # @common/renderer → ReactFixtureRenderer
    └── vue3/vitest.config.ts     # @common/renderer → Vue3FixtureRenderer
```

각 framework config에서 `@common/renderer` alias를 해당 프레임워크의 FixtureRenderer로 연결한다. suite 파일은 `@common/renderer`를 import하므로 실행 프레임워크에 따라 다른 렌더러가 주입된다. 모든 framework config는 공통적으로 `@egjs/flicking`과 `@egjs/flicking-plugins` alias를 포함하며, React는 추가로 `@egjs/react-flicking`, Vue3는 `@egjs/vue3-flicking` alias를 가진다.

### setup.ts

```typescript
// cfc/common/setup.ts
import "@testing-library/jest-dom/vitest";
import { setupJsdomMocks } from "../../shared/jsdom-mocks";

setupJsdomMocks();

(window as any)._real = { setTimeout: window.setTimeout.bind(window) };
vi.useFakeTimers();

beforeEach(() => vi.clearAllTimers());
afterEach(() => cleanup());    // @common/renderer의 cleanup
```

CFC는 이전에 real timer를 사용했지만, 현재 **fake timer로 전환**되었다. 이로써:
- Autoplay 테스트의 flaky 문제 해결 (deterministic)
- CFC 전체 테스트 시간 ~9초 → ~2초로 단축
- `tick()`으로 동기적 시간 제어 가능

### common/utils.ts

CFC 전용 유틸리티 + shared 일부 re-export:

```typescript
// shared에서 re-export (tick은 미포함)
export { createSandbox, cleanup, waitEvent } from "../../shared/utils";

// CFC 전용
export { findFlickingJSX };          // JSX 트리에서 DummyFlicking 찾기
export { resolveFlickingWhenReady };  // autoInit 대기 Promise
export { flattenAttrs };              // JSX 속성 → 문자열 배열
```

> `tick`과 `simulate`은 CFC utils에서 re-export하지 않는다. suite 파일에서 shared 경로로 직접 import한다.

### Simulate (shared 사용)

CFC의 gesture 테스트는 shared simulate을 직접 사용한다:

```typescript
// cfc/suite/gesture.spec.ts
import { simulate } from "../../shared/simulate";

// Flicking 인스턴스가 아닌 HTMLElement를 전달
await simulate(flicking.panels[0].element, { deltaX: -50, deltaY: 0, duration: 3000 });
// simulate 내부에서 tick(10000) → 제스처 + 애니메이션 모두 완료
// waitEvent 불필요
```

### CFC 테스트 패턴

**gesture 테스트:**
```typescript
const flicking = await render(Wrapped({ options: { threshold: 40 } }));
await simulate(flicking.panels[0].element, { deltaX: -50, deltaY: 0, duration: 3000 });
expect(flicking.index).toEqual(1);
```

**plugin 테스트 (Autoplay):**
```typescript
import { AutoPlay } from "@egjs/flicking-plugins";
import { Horizontal } from "../../fixture";
import { render } from "@common/renderer";
import { tick } from "../../../shared/utils";

const plugin = new AutoPlay({ duration: 2000 });
const flicking = await render(Horizontal({ plugins: [plugin] }));

tick(1900);
expect(flicking.animating).toBeFalsy();
tick(100);
expect(flicking.animating).toBeTruthy();
```

### Vue3 특수 설정

```typescript
// framework/vue3/vitest.config.ts
test: {
  server: {
    deps: {
      inline: ["vue", "@vue/test-utils"],  // CJS → ESM 해석 문제 우회
    },
  },
},
```

---

## pnpm 모노레포 주의사항

### `.npmrc` 설정 (필수)

```ini
public-hoist-pattern[]=*vitest*
public-hoist-pattern[]=*playwright*
```

pnpm strict isolation 환경에서 Vitest Browser Mode와 Playwright가 올바르게 동작하려면 이 설정이 필수다. 없으면 `vitest/internal/browser` 해석 실패가 발생한다.

### resolve.alias 패턴

모노레포에서 패키지 간 참조는 `resolve.alias`로 소스 직접 참조한다:

```typescript
// unit → flicking 소스
{ find: "~", replacement: "../../flicking/src" }

// plugins → flicking-plugins 소스 + flicking 코어
{ "~": "../../flicking-plugins/src" }
{ "@egjs/flicking": "../../flicking/src/index.ts" }

// cfc → 프레임워크별 소스 (모든 framework config 공통)
{ "@egjs/flicking": "../../../../flicking/src/index.ts" }
{ "@egjs/flicking-plugins": "../../../../flicking-plugins/src/index.ts" }
// React 전용
{ "@egjs/react-flicking": "../../../../react-flicking/src/react-flicking/index.ts" }
// Vue3 전용
{ "@egjs/vue3-flicking": "../../../../vue3-flicking/src/index.ts" }
```

> 빌드된 dist가 아닌 **src를 직접 참조**하므로, 소스 변경이 즉시 테스트에 반영된다.

---

## 새 테스트 작성 가이드

### Unit 테스트 추가

```typescript
// unit/example.spec.ts
import { createFlicking, simulate, tick } from "./helper/test-util";
import El from "./helper/El";

describe("MyFeature", () => {
  it("should do something", async () => {
    // 1. Flicking 생성
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, {
      moveType: "freeScroll",
    });

    // 2. 제스처 시뮬레이션
    await simulate(flicking.element, { deltaX: -300, duration: 500 });

    // 3. 검증
    expect(flicking.camera.position).toBeGreaterThan(0);
  });

  it("should handle animation interrupt", async () => {
    const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

    // moveTo 시작 후 중간에 터치
    void flicking.moveTo(2, 1500);
    tick(500);
    await simulate(flicking.element, { deltaX: 0, duration: 100 }, 1000);

    // 애니메이션이 중단되었는지 확인
    expect(flicking.animating).toBe(false);
  });
});
```

### Plugin 테스트 추가

```typescript
// plugins/MyPlugin.spec.ts
import { createFlickingFixture, createFlicking, simulate, tick } from "./utils";
import MyPlugin from "~/MyPlugin";

describe("MyPlugin", () => {
  it("should init with flicking", async () => {
    const el = createFlickingFixture();
    document.body.appendChild(el);

    const flicking = await createFlicking(el, {
      plugins: [new MyPlugin()],
    });

    expect(flicking.plugins).toHaveLength(1);

    el.remove();
  });
});
```

### CFC 테스트 추가

```typescript
// cfc/suite/myFeature.spec.ts
import { render } from "@common/renderer";
import { simulate } from "../../shared/simulate";
import { tick } from "../../shared/utils";
import { Horizontal } from "../fixture";

describe("MyFeature", () => {
  it("should work across frameworks", async () => {
    const flicking = await render(Horizontal());

    await simulate(flicking.panels[0].element, { deltaX: -100 });

    expect(flicking.index).toBe(1);
  });
});
```

### 주의사항

1. **afterEach cleanup은 자동** — unit의 setup.ts가 `window.flickings` destroy + sandbox DOM 제거를 처리. CFC는 renderer cleanup 처리.
2. **await를 빼먹지 말 것** — `createFlicking`과 `simulate`은 Promise를 반환하며, await 누락 시 타이밍 문제 발생
3. **void 패턴 사용 시 주의** — `void simulate()`로 fire-and-forget 할 때는 반드시 `tick()` 또는 다른 `await simulate()`로 시간을 진행시켜야 한다
4. **CSS 레이아웃이 필요한 테스트는 unit에** — jsdom 환경(plugins, cfc)에서는 실제 크기 계산 불가
5. **`time` 파라미터 조절** — simulate의 세 번째 인자가 너무 작으면 애니메이션이 완료되지 않을 수 있다
6. **shared import 경로 참고** — unit은 `../../shared/`, plugins는 `../shared/`, cfc suite는 `../../shared/` 또는 `../../../shared/`
