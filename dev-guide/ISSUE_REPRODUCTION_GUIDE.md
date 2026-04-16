# 이슈 재현 데모 가이드

이슈를 재현하는 개발 데모를 `scratch/` 디렉토리에 만들고 로컬 dev 서버로 확인하는 워크플로우.

## 핵심 원칙

- 각 패키지의 `dev/scratch/` 디렉토리에 **App 파일 하나만 덮어쓰면** 재현 환경이 완성된다.
- `index.html`, `main.*` 파일은 **절대 수정하지 않는다**.
- 스타일은 **인라인**으로 작성한다 (외부 CSS 파일 없음).
- 파일 상단에 **이슈 번호와 설명을 주석**으로 기록한다.

## 패키지별 매핑

| 대상 | App 파일 경로 | 포트 | dev 명령어 |
|------|-------------|------|-----------|
| 코어 (Vanilla) | `packages/flicking/dev/scratch/App.js` | 3000 | `pnpm dev:flicking` |
| React | `packages/react-flicking/dev/scratch/App.tsx` | 3001 | `pnpm dev:react` |
| Vue 3 | `packages/vue3-flicking/dev/scratch/App.vue` | 3002 | `pnpm dev:vue` |
| 플러그인 | `packages/flicking-plugins/dev/scratch/App.js` | 3003 | `pnpm dev:plugins` |

브라우저 URL: `http://localhost:{포트}/scratch/`

## 실행 순서

### 1. 대상 패키지 결정

- 코어 로직 이슈 → `flicking` (Vanilla)으로 먼저 재현. 프레임워크 래퍼 관련이면 해당 패키지 사용.
- 플러그인 이슈 → `flicking-plugins`. 프레임워크 래퍼와의 상호작용이 관련되면 해당 래퍼 패키지 사용.
- 불확실하면 `react-flicking`을 기본으로 사용 (가장 직관적인 JSX 문법).

### 2. scratch/App 파일 작성

App 파일을 재현 코드로 **덮어쓴다**. 각 프레임워크별 템플릿은 아래 참조.

### 3. dev 서버 시작

```bash
# 해당 패키지만 실행
pnpm dev:flicking  # 코어 (Vanilla)
pnpm dev:react     # React
pnpm dev:vue       # Vue 3
pnpm dev:plugins   # 플러그인

# 또는 모든 패키지 동시 실행
pnpm dev:all
```

### 4. 브라우저 확인

`http://localhost:{포트}/scratch/` 에서 재현 상태를 확인한다.

소스 코드(`packages/*/src/`)를 수정하면 HMR로 즉시 반영된다.

## 프레임워크별 App 파일 템플릿

### React (`App.tsx`)

```tsx
/**
 * Issue: #{번호} - {설명}
 * {이슈 URL}
 */
import Flicking from "@dev/react-flicking";

const css: Record<string, React.CSSProperties> = {
  panel: {
    minWidth: 200,
    height: 200,
    margin: "0 5px",
    background: "#f0f0f0",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold"
  }
};

export default function App() {
  return (
    <div>
      <h2>Issue #{번호}</h2>
      <Flicking align="prev">
        <div style={css.panel}>1</div>
        <div style={css.panel}>2</div>
        <div style={css.panel}>3</div>
      </Flicking>
    </div>
  );
}
```

### Vanilla JS (`App.js`)

```js
/**
 * Issue: #{번호} - {설명}
 * {이슈 URL}
 */
import Flicking from "@dev/flicking";

export function createApp(container) {
  container.innerHTML = `
    <h2>Issue #${번호}</h2>
    <div id="flicking" class="flicking-viewport" style="max-width: 600px;">
      <div class="flicking-camera">
        <div style="min-width: 200px; height: 200px; margin: 0 5px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">1</div>
        <div style="min-width: 200px; height: 200px; margin: 0 5px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">2</div>
        <div style="min-width: 200px; height: 200px; margin: 0 5px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">3</div>
      </div>
    </div>
  `;

  new Flicking("#flicking", {
    align: "prev"
  });
}
```

### Vue 3 (`App.vue`)

```vue
<!--
  Issue: #{번호} - {설명}
  {이슈 URL}
-->
<template>
  <div>
    <h2>Issue #{번호}</h2>
    <Flicking :options="{ align: 'prev' }">
      <div v-for="n in 3" :key="n" :style="css.panel">{{ n }}</div>
    </Flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from "@dev/vue3-flicking";

const css = {
  panel: {
    minWidth: "200px",
    height: "200px",
    margin: "0 5px",
    background: "#f0f0f0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold"
  }
};
</script>
```

## Import alias

dev 파일에서는 **`@dev/` 스코프**를 사용한다. `@egjs/`가 아님에 주의.

| alias | 대상 |
|-------|------|
| `@dev/flicking` | 코어 |
| `@dev/plugins` | 플러그인 |
| `@dev/react-flicking` | React 래퍼 |
| `@dev/vue3-flicking` | Vue 3 래퍼 |
| `@dev/flicking-css` | 코어 CSS (main.*에서 이미 import됨) |
| `@dev/plugins-css` | 플러그인 CSS |

플러그인 CSS는 App 파일에서 직접 import한다:

```tsx
import "@dev/plugins-css";
// 또는 개별 플러그인 CSS가 필요하면:
import { Arrow } from "@dev/plugins";
```

## 플러그인 이슈 재현 시 추가 사항

플러그인을 사용하는 재현 코드에서는 플러그인 CSS import가 필요하다.

```tsx
// React 예시
import Flicking, { ViewportSlot } from "@dev/react-flicking";
import { Arrow } from "@dev/plugins";
import "@dev/plugins-css";

export default function App() {
  const plugins = [new Arrow()];
  return (
    <Flicking plugins={plugins}>
      <div style={css.panel}>1</div>
      <ViewportSlot>
        <span className="flicking-arrow-prev" />
        <span className="flicking-arrow-next" />
      </ViewportSlot>
    </Flicking>
  );
}
```

## 새 페이지가 필요한 경우

`scratch/`만으로 부족한 경우 (예: 성능 테스트, A/B 비교 등) 같은 3파일 패턴으로 디렉토리를 추가할 수 있다:

```
dev/
  perf-test/
    index.html    # scratch/index.html 복사 후 title만 변경
    main.tsx      # scratch/main.tsx 복사 후 주석만 변경
    App.tsx       # 새 코드
```

추가 후 `dev/index.html`에 링크를 추가한다.

## 문제 해결

| 증상 | 해결 |
|------|------|
| CSS 미적용 | `@dev/flicking-css`는 `main.*`에서 이미 import됨. 플러그인 CSS만 App에서 추가 import |
| 모듈 못 찾음 | `pnpm install` 실행 후 `rm -rf packages/*/node_modules/.vite` |
| 포트 충돌 | `pkill -f "vite.*dev.config"` 후 재시작 |
| HMR 안 됨 | `@dev/*` alias로 import하고 있는지 확인. `dist/` 직접 참조 시 HMR 미지원 |
