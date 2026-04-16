# Flicking Development Environment Guide

로컬 개발 환경 사용 가이드입니다.

## 빠른 시작

### 1. 초기 설정 (최초 1회)

`@dev/flicking-css`, `@dev/plugins-css` alias를 통해 CSS를 import하는 dev 파일은 CSS 사전 빌드 없이 바로 실행됩니다.

`dist/*.css`를 직접 참조하는 기존 dev 파일을 사용하는 경우에만 아래 CSS 빌드가 필요합니다:

```bash
pnpm --filter @egjs/flicking build:css
pnpm --filter @egjs/flicking-plugins build:css
```

### 2. 개발 서버 시작

```bash
# 모든 패키지 동시 실행 (추천)
pnpm dev:all

# 또는 개별 실행
pnpm dev:flicking     # flicking만
pnpm dev:react        # react-flicking만
pnpm dev:vue          # vue3-flicking만
pnpm dev:plugins      # flicking-plugins만
```

### 3. 브라우저에서 확인

- **flicking**: http://localhost:3000
- **react-flicking**: http://localhost:3001
- **vue3-flicking**: http://localhost:3002
- **flicking-plugins**: http://localhost:3003

## dev/ 디렉토리 구조

각 패키지의 `dev/` 디렉토리는 **개발자 전용 환경**입니다.
포괄적인 기능 데모는 `docs` 패키지가 담당하며, `dev/`는 소스 수정 확인과 이슈 재현에 집중합니다.

### 구조 컨벤션

각 페이지는 역할이 이름으로 드러나는 독립된 디렉토리입니다.
모든 디렉토리는 동일한 3파일 패턴을 따릅니다:

```
dev/
  index.html              # 진입점 (페이지 목록)
  basic-sample/           # 기본 동작 확인용 샘플
    index.html            # 고정 — 수정하지 않음
    main.tsx              # 고정 — 수정하지 않음
    App.tsx               # 샘플 코드
  scratch/                # 이슈 재현용 독립 페이지
    index.html            # 고정 — 수정하지 않음
    main.tsx              # 고정 — 수정하지 않음
    App.tsx               # 재현 코드 (매번 덮어씀)
```

- **basic-sample/**: 패키지의 기초적인 동작을 확인하는 고정 샘플
- **scratch/**: 이슈 재현 및 실험용. `App.tsx` 하나만 교체하면 됨
- 새 용도가 필요하면 같은 패턴으로 디렉토리를 추가 (예: `performance-test/`)

### 페이지 독립성

각 디렉토리는 완전히 독립적입니다:
- 자체 `index.html` + `main.tsx` + `App.tsx`를 가짐
- 다른 페이지의 CSS나 상태에 영향받지 않음
- 스타일은 `App.tsx` 내 인라인 스타일로 작성 (외부 CSS 파일 없음)

### 이슈 재현 워크플로우

`scratch/App.*` 파일만 교체하면 재현 환경이 완성된다. `index.html`, `main.*`은 수정하지 않는다.

상세 워크플로우, 패키지별 파일 경로, 프레임워크별 템플릿 → [`ISSUE_REPRODUCTION_GUIDE.md`](./ISSUE_REPRODUCTION_GUIDE.md)

## Import alias 규칙

dev 파일에서는 `@dev/` 스코프의 alias를 사용합니다. 실제 npm 패키지명(`@egjs/`)과 혼동을 방지하기 위한 컨벤션입니다.

### dev 파일용 alias (`@dev/`)

| alias | 대상 |
|---|---|
| `@dev/flicking` | `@egjs/flicking` 코어 |
| `@dev/plugins` | `@egjs/flicking-plugins` |
| `@dev/react-flicking` | `@egjs/react-flicking` |
| `@dev/vue3-flicking` | `@egjs/vue3-flicking` |
| `@dev/flicking-css` | `@egjs/flicking` CSS |
| `@dev/plugins-css` | `@egjs/flicking-plugins` CSS |

```tsx
// dev 파일에서의 import 예시
import Flicking from "@dev/flicking";
import { Arrow, AutoPlay } from "@dev/plugins";
import ReactFlicking from "@dev/react-flicking";
import Vue3Flicking from "@dev/vue3-flicking";

// CSS import — dist/를 직접 참조하는 대신 alias 사용
import "@dev/flicking-css";
import "@dev/plugins-css";
```

CSS alias를 사용하면 개발 모드에서 CSS 소스(sass/css)를 직접 참조하므로, **CSS 사전 빌드 없이도 dev 서버가 즉시 실행됩니다.** 빌드 검증 모드에서는 자동으로 `dist/` 빌드 결과물을 참조합니다.

### 소스코드 내부용 alias (`@egjs/flicking`)

패키지 소스코드(`src/`)에서는 실제 npm 패키지명 `@egjs/flicking`을 사용합니다.
(예: `export * from "@egjs/flicking"`)

이 import가 dev 서버에서도 정상 동작하도록, `vite.dev.config.ts`에 `@egjs/flicking` alias가 별도로 설정되어 있습니다. 빌드 설정(`vite.config.ts`)과는 완전히 분리된 dev 전용 설정이므로 빌드 결과물에 영향을 주지 않습니다.

### 개발 모드 vs 빌드 검증 모드에 따른 해석

| 모드 | `@dev/*`, `@egjs/flicking` 해석 대상 |
|---|---|
| 개발 모드 (`pnpm dev`) | `src/index.ts` (TypeScript 소스 직접 참조, HMR 지원) |
| 빌드 검증 모드 (`pnpm preview`) | `dist/*.esm.js` (빌드 결과물) |

이 분기는 각 패키지의 `vite.dev.config.ts`에서 Vite의 `mode` 값으로 결정됩니다:

```typescript
// vite.dev.config.ts 내부 패턴
const useBuild = mode === "production"; // preview 시 --mode production 전달

resolve: {
  alias: useBuild ? {
    "@dev/flicking":     "dist/flicking.esm.js",       // 빌드 결과물
    "@dev/flicking-css": "dist/flicking.css",
    "@dev/plugins-css":  "dist/flicking-plugins.css",
    "@egjs/flicking":    "dist/flicking.esm.js",
  } : {
    "@dev/flicking":     "src/index.ts",                // 소스 직접
    "@dev/flicking-css": "sass/flicking.sass",          // CSS 소스 직접 (HMR 지원)
    "@dev/plugins-css":  "css/all.css",
    "@egjs/flicking":    "src/index.ts",
  }
}
```

## HMR (Hot Module Replacement)

소스 코드를 수정하면 즉시 브라우저에 반영됩니다:

```
packages/flicking/src/Flicking.ts 수정           → 모든 dev 서버에 즉시 반영
packages/flicking-plugins/src/AutoPlay.ts 수정   → 모든 dev 서버에 즉시 반영
packages/react-flicking/src/Flicking.tsx 수정    → React dev 서버에 즉시 반영
```

CSS도 `@dev/flicking-css`, `@dev/plugins-css` alias를 통해 import하면 HMR이 지원됩니다. `dist/*.css`를 직접 참조하는 경우에는 CSS 변경 후 재빌드가 필요합니다.

## 개발 모드 vs 빌드 검증 모드

| 항목 | 개발 모드 (`pnpm dev`) | 빌드 모드 (`pnpm dev:prod`) |
|------|------------------------|------------------------------|
| **용도** | 일상 개발 | 릴리즈 전 검증 |
| **소스** | `src/index.ts` (소스 직접) | `dist/*.esm.js` (빌드 결과물) |
| **HMR** | 지원 | 미지원 |
| **빌드 필요** | CSS만 | 전체 빌드 필요 |
| **목적** | 빠른 이터레이션 | 프로덕션 검증 |

### 릴리즈 전 검증

```bash
# 방법 1: 한 번에
pnpm preview

# 방법 2: 단계별
pnpm preview:build     # 모든 패키지 빌드
pnpm preview:run       # 빌드 결과물로 실행
```

## 타입 선언 파일 (.d.ts) 생성

### 빌드 구조

소스 번들링(JS)과 타입 선언 파일 생성은 분리되어 있습니다:

- **JS 번들**: Vite(esbuild/rollup)가 처리 — 주석은 번들러가 자체적으로 제거
- **타입 선언 파일**: `tsc -p tsconfig.declaration.json`으로 별도 생성

### removeComments 정책

타입 선언 파일(`.d.ts`)에는 **주석을 유지**합니다 (`removeComments: false`).

- IDE 자동완성 시 JSDoc 설명이 표시되어 라이브러리 사용자의 DX가 향상됨
- api-extractor가 주석을 기반으로 API 문서를 추출하므로, 별도의 "주석 포함용" 설정 없이 하나의 declaration 설정으로 통일 가능

각 패키지의 `tsconfig.declaration.json`에 `removeComments` 옵션이 없으면 기본값 `false`가 적용되어 주석이 유지됩니다.

### api-extractor 연동

api-extractor는 `build:declaration`의 출력물을 직접 참조합니다:

| 패키지 | declaration 출력 경로 | api-extractor 진입점 |
|---|---|---|
| flicking | `dist/` | `dist/index.d.ts` |
| flicking-plugins | `declaration/` | `declaration/index.d.ts` |

```bash
# API 문서 생성 (declaration 빌드 → api-extractor → 문서 생성)
pnpm api-docs:generate
pnpm api-docs:docusaurus
```

## IDE 타입 지원

### `@dev/*` alias 인식

vite alias는 런타임에만 동작하므로, IDE의 TypeScript 서버는 `@dev/*` 모듈을 기본적으로 인식하지 못합니다. 이를 해결하기 위해 `react-flicking`, `vue3-flicking` 패키지의 `dev/` 디렉토리에 별도 `tsconfig.json`이 제공됩니다.

```
packages/react-flicking/dev/tsconfig.json
packages/vue3-flicking/dev/tsconfig.json
```

TypeScript는 파일 위치 기준으로 가장 가까운 `tsconfig.json`을 자동으로 선택하므로, `dev/` 내의 파일들은 이 설정을 통해 `@dev/*` 경로를 정상적으로 해석합니다.

| alias | 해석 경로 |
|---|---|
| `@dev/react-flicking` | `src/react-flicking/index.ts` |
| `@dev/vue3-flicking` | `src/index.ts` |
| `@dev/flicking` | `../flicking/src/index.ts` |
| `@dev/plugins` | `../flicking-plugins/src/index.ts` |

> `flicking-plugins/dev/`는 `.js` 파일만 사용하므로 별도 tsconfig가 필요 없습니다.

### IDE 에러 발생 시

```
Cannot find module '@dev/react-flicking' or its corresponding type declarations.
```

TypeScript 서버 재시작으로 해결됩니다: `Cmd+Shift+P` → **TypeScript: Restart TS Server**

## 문제 해결

### CSS가 적용되지 않는 경우

```bash
# CSS 빌드 필수
pnpm --filter @egjs/flicking build:css
pnpm --filter @egjs/flicking-plugins build:css
```

### 의존성 에러가 발생하는 경우

```bash
pnpm install

# Vite 캐시 삭제
rm -rf packages/*/node_modules/.vite
```

### 포트 충돌이 발생하는 경우

```bash
pkill -f "vite.*dev.config"
pnpm dev:all
```

## 참고사항

- **CSS 빌드 필요 여부**: `@dev/flicking-css`, `@dev/plugins-css` alias로 import하면 CSS 사전 빌드 없이 dev 서버가 실행되며 HMR도 지원됩니다. `dist/*.css`를 직접 참조하는 경우에는 CSS 사전 빌드가 필요합니다.
- **HMR 범위**: TypeScript/JavaScript 및 `@dev/*-css` alias를 통한 CSS 변경은 HMR 지원. `dist/*.css`를 직접 참조하는 경우 CSS 변경은 빌드 후 새로고침이 필요합니다.
- **docs와 역할 분담**: 포괄적인 기능 데모와 프레임워크별 사용 예제는 `docs` 패키지가 담당합니다. `dev/`는 개발자 전용 도구입니다.
