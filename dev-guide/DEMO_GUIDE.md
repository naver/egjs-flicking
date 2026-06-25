# 데모 작성 가이드

Docusaurus 문서 사이트의 Sandpack 데모를 작성하는 규칙과 패턴을 정리한다.

## 개요

각 데모는 **디렉토리 + MDX 문서**로 구성된다:

| 파일 | 경로 | 역할 |
|------|------|------|
| 데모 디렉토리 | `packages/docs/src/demo/{category}/{Name}/` | 프레임워크별 코드 파일 + index.tsx |
| MDX 문서 | `packages/docs/docs/demos/{category}/{name}.mdx` | 데모 설명, 옵션 표, 사용법 등 |

데모는 **Sandpack** 인라인 코드 에디터를 사용하며, 사용자가 코드를 실시간으로 편집하고 결과를 확인할 수 있다.

## 디렉토리 구조

```
packages/docs/
  src/
    demo/
      basic/                    # 기본 옵션 데모
        AlignOptions/           #   예: AlignOptions 데모
          react.jsx             #     React 코드
          vue.vue               #     Vue 3 SFC 코드
          vanilla.js            #     Vanilla JS 코드
          index.html            #     Vanilla JS용 HTML
          styles.css            #     데모별 CSS
          index.tsx             #     DemoCode 렌더링 (코드를 ?raw로 import)
        Bound/
        Circular/
        ...
      advanced/                 # 고급 패턴 데모
      plugins/                  # 플러그인 데모
      reactive/                 # Reactive API 데모
      presets/                  # 프리셋 데모 (CrossFlicking 등)
      issues/                   # 이슈 재현/검증용 데모
      components/               # 공용 스타일
        demo-defaults.ts        # defaultStyles (Sandpack에 자동 주입)
        demo-defaults.css       # 동일 내용의 CSS 파일
    component/
      DemoCode.tsx              # 프레임워크 탭 컴포넌트
      SandpackEditor.tsx        # Sandpack 래퍼
    constants/
      sandpack.ts               # 버전, 기본 의존성, 템플릿 상수
  docs/
    demos/
      basic/                    # 기본 데모 MDX
      advanced/                 # 고급 데모 MDX
      plugins/                  # 플러그인 데모 MDX
      reactive/                 # Reactive API 데모 MDX
```

## 아키텍처

```
MDX 파일
  └── import {Name}/index.tsx
        └── ?raw import로 각 코드 파일 로드
              └── <DemoCode react={...} vue3={...} js={...} jsHtml={...} css={...} />
                    └── <Tabs> → 프레임워크별 <SandpackEditor>
                          └── <Sandpack> (코드 에디터 + 라이브 프리뷰)
```

### 핵심 컴포넌트

**DemoCode** (`src/component/DemoCode.tsx`)

```tsx
interface DemoCodeProps {
  react: string;      // React 코드 (App.tsx로 렌더링)
  vue3: string;       // Vue 3 SFC 코드 (App.vue로 렌더링)
  js: string;         // Vanilla JS 코드 (src/index.js로 렌더링)
  jsHtml?: string;    // Vanilla JS용 HTML (index.html로 렌더링)
  css?: string;       // 데모별 추가 CSS (defaultStyles와 병합)
  dependencies?: Record<string, string>;  // 추가 npm 패키지
}
```

JavaScript, React, Vue@3 세 탭으로 분리하여 각각 Sandpack 에디터를 렌더링한다.

**SandpackEditor** (`src/component/SandpackEditor.tsx`)

- `defaultStyles` (공용 CSS)와 데모별 `css`를 병합하여 `/styles.css`로 제공
- Vue SFC에는 `<style>` 블록을 자동 주입 (별도 CSS 파일 불필요)
- 프레임워크별 파일 매핑:
  - React: `/App.tsx` + `/styles.css`
  - Vue: `/src/App.vue` (스타일 내장)
  - Vanilla: `/src/index.js` + `/index.html` + `/src/styles.css`

## 데모 디렉토리 구조

### 기본 구조

각 데모는 디렉토리로 구성되며, 프레임워크별 코드를 별도 파일로 분리한다:

```
src/demo/{category}/{Name}/
  react.jsx        ← React 코드
  vue.vue          ← Vue 3 SFC 코드
  vanilla.js       ← Vanilla JS 코드
  index.html       ← Vanilla JS용 HTML
  styles.css       ← 데모별 CSS
  index.tsx        ← DemoCode 렌더링
```

**index.tsx** 예시:

```tsx
import DemoCode from "@site/src/component/DemoCode";

import reactCode from "./react.jsx?raw";
import vueCode from "./vue.vue?raw";
import jsCode from "./vanilla.js?raw";
import jsHtml from "./index.html?raw";
import panelCSS from "./styles.css?raw";

export default () => (
  <DemoCode react={reactCode} vue3={vueCode} js={jsCode} jsHtml={jsHtml} css={panelCSS} />
);
```

플러그인 데모의 경우 `dependencies`를 추가:

```tsx
const PLUGIN_DEPS = {"@egjs/flicking-plugins":"^4.6.0"};

export default () => (
  <DemoCode react={reactCode} vue3={vueCode} js={jsCode} jsHtml={jsHtml} css={panelCSS} dependencies={PLUGIN_DEPS} />
);
```

### 규칙

1. **코드는 별도 파일에 직접 작성** — 템플릿 리터럴 불필요, 이스케이프 불필요
2. **`?raw` import** — webpack `asset/source` 규칙으로 파일을 문자열로 로드
3. **`styles.css`**는 세 프레임워크 공통으로 사용됨
4. **webpack이 `{Name}/index.tsx`를 자동 해석**하므로 MDX import 경로 변경 불필요

### panelCSS 작성 규칙

- `defaultStyles`에 이미 정의된 스타일(`.flicking-panel`, `.demo-container`, `.demo-label`, `.button`, `.controls`)은 **오버라이드가 필요한 속성만** 작성
- 데모 고유 CSS 클래스는 여기서 정의 (`.info-bar`, `.event-log`, `.panel-counter` 등)
- `defaultStyles`와 병합되므로 중복 선언 불필요

```ts
// 기본 패널 크기만 변경하는 경우
const panelCSS = `
.flicking-panel {
  width: 40%;
  height: 120px;
}
`;

// 추가 UI 요소가 있는 경우
const panelCSS = `
.flicking-panel { ... }
.info-bar { ... }
.event-log { ... }
`;
```

### 프레임워크별 코드 작성 패턴

#### React

```tsx
const reactCode = `import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <Flicking bound={true} align="prev">
      <div className="flicking-panel panel-1">1</div>
      <div className="flicking-panel panel-2">2</div>
      <div className="flicking-panel panel-3">3</div>
    </Flicking>
  );
}`;
```

- **import 순서**: `@egjs/react-flicking` → CSS → `./styles.css`
- **옵션 전달**: JSX props로 직접 전달 (`bound={true}`, `align="prev"`)
- **이벤트 핸들러**: `onNeedPanel`, `onVisibleChange` 등 `on` + PascalCase
- **인스턴스 접근**: `useRef`로 ref 연결
- **상태 관리**: `useState`, `useCallback` 등 React hooks 사용
- **플러그인 UI 요소**: `ViewportSlot`으로 viewport 내부에 배치

```tsx
// 플러그인 예시 (Arrow)
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";

const plugins = [new Arrow()];

<Flicking plugins={plugins}>
  {/* panels */}
  <ViewportSlot>
    <span className="flicking-arrow-prev"></span>
    <span className="flicking-arrow-next"></span>
  </ViewportSlot>
</Flicking>
```

#### Vue 3

```tsx
const vueCode = `<template>
  <Flicking :options="{ bound: true, align: 'prev' }">
    <div class="flicking-panel panel-1">1</div>
    <div class="flicking-panel panel-2">2</div>
    <div class="flicking-panel panel-3">3</div>
  </Flicking>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

</script>`;
```

- **옵션 전달**: `:options` prop에 객체로 전달
- **이벤트 핸들러**: `@need-panel`, `@visible-change` 등 kebab-case
- **인스턴스 접근**: `ref="flicking"`으로 연결
- **`<style>` 블록 불필요** — SandpackEditor가 자동 주입
- **플러그인 UI 요소**: `<template #viewport>` 슬롯 사용

```tsx
// 플러그인 예시 (Arrow)
<Flicking :options="{ circular: true }" :plugins="plugins">
  <div v-for="..." />
  <template #viewport>
    <span class="flicking-arrow-prev"></span>
    <span class="flicking-arrow-next"></span>
  </template>
</Flicking>
```

#### Vanilla JavaScript

```tsx
const jsCode = `import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

new Flicking("#flick", {
  bound: true,
  align: "prev"
});`;
```

- **import 순서**: `@egjs/flicking` → CSS → `./styles.css`
- **`#flick` 셀렉터** 사용 (HTML에서 `id="flick"`)
- **옵션 전달**: 생성자 두 번째 인자로 객체 전달
- **이벤트**: `.on("needPanel", handler)` 메서드 체이닝
- **패널 동적 추가**: `document.createElement` → `flicking.append()`
- **플러그인**: `flicking.addPlugins(new Arrow())`

#### Vanilla JavaScript HTML

```tsx
const jsHtml = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div id="flick" class="flicking-viewport">
    <div class="flicking-camera">
      <div class="flicking-panel panel-1">1</div>
      <div class="flicking-panel panel-2">2</div>
      <div class="flicking-panel panel-3">3</div>
    </div>
  </div>
</body>
</html>`;
```

- **필수 구조**: `.flicking-viewport` > `.flicking-camera` > panels
- **CSS 링크**: `<link rel="stylesheet" href="/styles.css" />` (head에)
- **id**: JS 코드의 셀렉터와 일치해야 함 (`id="flick"`)
- 패널을 JS에서 동적 생성하는 경우 `.flicking-camera` 내부를 비워둠

### 멀티 섹션 데모 패턴

하나의 옵션을 여러 값으로 비교하는 데모에서 사용한다.

```tsx
// React: demo-container로 섹션 분리
<div className="demo-container">
  <div className="demo-label">bound: false (default)</div>
  <Flicking bound={false}>...</Flicking>
</div>

<div className="demo-container">
  <div className="demo-label">bound: true</div>
  <Flicking bound={true}>...</Flicking>
</div>
```

```tsx
// Vanilla JS: 각 섹션에 고유 id 부여
new Flicking("#flick-unbound", { bound: false });
new Flicking("#flick-bound", { bound: true });
```

```html
<!-- jsHtml: 각 섹션에 대응하는 id -->
<div id="flick-unbound" class="flicking-viewport">...</div>
<div id="flick-bound" class="flicking-viewport">...</div>
```

### 인터랙티브 데모 패턴

버튼, 이벤트 로그 등 사용자 상호작용이 있는 데모.

```tsx
// React: useState + 이벤트 핸들러
const [panels, setPanels] = useState([0, 1, 2, 3, 4]);

<Flicking onNeedPanel={handleNeedPanel}>
  {panels.map(id => <div key={id} className="flicking-panel">...</div>)}
</Flicking>
<div className="panel-counter">Count: <strong>{panels.length}</strong></div>
<div className="event-log">{logs.map(...)}</div>
```

```tsx
// Vanilla JS: DOM 직접 조작
flicking.on("needPanel", (e) => {
  const panel = document.createElement("div");
  flicking.append(panel);
});
```

### 플러그인 데모

플러그인 데모에는 `dependencies` prop이 필요하다.

```tsx
const PLUGIN_DEPS = { "@egjs/flicking-plugins": "^4.6.0" };

// 각 프레임워크 코드에서 플러그인 CSS import 필요
// React: import "@egjs/flicking-plugins/dist/arrow.css";
// Vue:   import "@egjs/flicking-plugins/dist/arrow.css";
// JS:    import "@egjs/flicking-plugins/dist/arrow.css";

return (
  <DemoCode
    react={reactCode}
    vue3={vueCode}
    js={jsCode}
    jsHtml={jsHtml}
    css={panelCSS}
    dependencies={PLUGIN_DEPS}
  />
);
```

## 기본 패널 색상

`defaultStyles`에 5색 패널이 정의되어 있다. 정적 패널에는 이 클래스를 사용한다.

```css
.panel-1 { background: #3e8ed0; }  /* 파랑 */
.panel-2 { background: #00d1b2; }  /* 청록 */
.panel-3 { background: #f14668; }  /* 빨강 */
.panel-4 { background: #ffe08a; color: #333; }  /* 노랑 */
.panel-5 { background: #48c78e; }  /* 초록 */
```

동적 패널의 경우 COLORS 배열로 `style`에 직접 지정한다:

```tsx
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
// ...
style={{ background: COLORS[id % COLORS.length] }}
```

## MDX 문서 작성법

### 기본 구조

```mdx
---
title: "Feature Name"
id: kebab-case-id
slug: /demos/category/kebab-case-slug
sidebar_position: number
description: Brief description of the demo
keywords: [flicking, carousel, keyword1, keyword2]
---

import ComponentName from '@site/src/demo/category/ComponentName';

# Feature Name

Introductory paragraph with links to API docs using
[`optionName`](../../api/interfaces/FlickingOptions#option-name).

<ComponentName />

## Summary

### Key Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| [`option`](../../api/interfaces/FlickingOptions#option) | `type` | `default` | Description |

### Comparison by Value

| Value | Behavior | Suitable For |
|-------|----------|--------------|
| `value1` | What happens | When to use |
| `value2` | What happens | When to use |

## Details

### Feature in Detail
Detailed explanation...

### Related Options
- **option A와의 관계**: 설명

### Use Cases

:::info When to use?
- **scenario 1**: explanation
- **scenario 2**: explanation
:::

### Notes

:::warning Title
Important caution messages
:::

## Related Links

### Related Options
- [`option`](../../api/interfaces/FlickingOptions#option): Description

### Related Methods
- [`method`](../../api/classes/Flicking#method): Description

### Related Demos
- [Demo Name](./demo-slug): Description
```

### MDX 작성 규칙

1. **front matter**
   - `id`: kebab-case, 사이드바 ID로 사용
   - `slug`: `/demos/{category}/{kebab-case}` 형식
   - `sidebar_position`: 같은 카테고리 내 정렬 순서
   - `description`: 검색 최적화를 위한 한 줄 설명
   - `keywords`: SEO 키워드 배열

2. **API 링크**
   - 옵션: `[name](../../api/interfaces/FlickingOptions#kebab-case)`
   - 메서드: `[name](../../api/classes/Flicking#method)`
   - 이벤트: `[name](../../api/interfaces/EventName)`

3. **데모 컴포넌트 배치**
   - 소개 문단 바로 아래에 `<ComponentName />` 배치
   - Summary, Details 등 설명은 데모 아래에

4. **admonition 사용**
   - `:::info` — 사용 시나리오, 권장 사항
   - `:::warning` — 주의사항, 제약 사항
   - `:::tip` — 팁, 최적화 방법

## 카테고리별 특성

### Basic (`demos/basic/`)

단일 옵션을 설명하는 데모. 옵션 값을 비교하여 차이를 직관적으로 보여준다.

- **멀티 섹션**: 2~3개 `demo-container`로 값 비교
- **정적 패널**: `.panel-1` ~ `.panel-5` 색상 클래스 사용
- **상태 관리 불필요**: 옵션 차이만 보여주면 됨
- 예시: Bound (false vs true vs bounce), Vertical (horizontal vs vertical)

### Advanced (`demos/advanced/`)

복합 기능, 이벤트 처리, 성능 최적화 등 고급 패턴.

- **상태 관리**: `useState`, `useRef` 등 React hooks 활용
- **이벤트 처리**: `needPanel`, `visibleChange`, `ready` 등
- **동적 패널**: 추가/삭제, 무한 스크롤 등
- **UI 피드백**: `.panel-counter`, `.event-log`, `.info-bar` 등
- 예시: InfiniteScroll (needPanel 이벤트), AddRemove (동적 패널 조작)

### Plugins (`demos/plugins/`)

`@egjs/flicking-plugins` 패키지의 플러그인 사용법.

- **`dependencies` 필수**: `{ "@egjs/flicking-plugins": "^4.6.0" }`
- **플러그인 CSS import**: `@egjs/flicking-plugins/dist/{plugin}.css`
- **플러그인 UI 요소 배치**:
  - React: `<ViewportSlot>` 내부
  - Vue: `<template #viewport>` 슬롯
  - JS: `.flicking-viewport` 내 `.flicking-camera` 형제로 배치
- 예시: Arrow, Pagination, Autoplay

## 체크리스트

새 데모를 추가할 때 확인할 항목:

- [ ] 디렉토리 생성: `src/demo/{category}/{Name}/`
- [ ] `react.jsx`, `vue.vue`, `vanilla.js` 코드 작성
- [ ] `index.html` (Vanilla JS용 HTML) 작성
- [ ] `styles.css` 데모 고유 스타일 정의
- [ ] `index.tsx` — `?raw` import + DemoCode 렌더링
- [ ] 플러그인 사용 시 `dependencies` prop 전달
- [ ] MDX front matter 완성 (id, slug, sidebar_position, description, keywords)
- [ ] MDX에 API 링크 연결
- [ ] MDX에 Summary 테이블 작성
- [ ] React/Vue/JS 간 동일한 동작 보장
- [ ] Sandpack 프리뷰에서 정상 렌더링 확인
