# Lint & Format 가이드

[Biome](https://biomejs.dev/) 단일 도구로 lint + format을 통합 관리합니다.

- 설정 파일: `/biome.json` (root 단일 config)
- 버전: `@biomejs/biome` 2.3.11

## 커맨드

```bash
# lint + format 검사 (에러 시 exit code 1)
pnpm lint

# lint + format 자동 수정
pnpm lint:fix

# 포맷팅만 적용
pnpm format
```

개별 파일/디렉토리 대상으로도 실행 가능합니다:

```bash
npx biome check packages/flicking/src/
npx biome check --write packages/flicking/src/Flicking.ts
npx biome format --write packages/vue3-flicking/
```

## Git Hooks (Husky)

| Hook | 동작 |
|------|------|
| `pre-commit` | staged 파일에 대해 lint + format 자동 수정 후 re-stage |
| `pre-push` | 전체 `packages/` lint 검사 (에러 있으면 push 차단) |
| `commit-msg` | 커밋 메시지 형식 검증 (`config/validate-commit-msg.js`) |

`pre-commit`은 Biome의 `--staged` 플래그를 사용하므로 lint-staged 패키지가 필요 없습니다.

## 포맷팅 규칙

| 항목 | 값 |
|------|-----|
| Indent | Space, 2칸 |
| Line width | 120 |
| Line ending | LF |
| Quote | Double (`"`) |
| Semicolons | Always |
| Trailing commas | None |
| Arrow parens | As needed (`x => x`) |

## Lint 규칙 요약

Biome의 `recommended` 룰셋을 기반으로 하되, 프로젝트 특성에 맞게 조정했습니다.

### 전역으로 끈 룰 (off)

| 룰 | 사유 |
|-----|------|
| `noExplicitAny` | 코어 라이브러리에서 의도적 any 사용이 많음 |
| `noNonNullAssertion` | `!` 연산자를 활용하는 패턴이 많음 |
| `noInferrableTypes` | 명시적 타입 선언 허용 |
| `noForEach` | forEach 사용 허용 |
| `noBannedTypes` | `{}`, `Function` 등 사용 허용 |
| `noImportantStyles` | CSS `!important` 사용 허용 |
| `useImportType` / `useExportType` | TypeScript 3.9 호환 (inline `type` 미지원) |
| `useIterableCallbackReturn` | forEach 콜백 반환값 패턴 허용 |
| `noUnsafeDeclarationMerging` | 의도적 interface-class 병합 패턴 |
| `noUnusedFunctionParameters` | 콜백 시그니처 유지 필요 |

### warn 레벨 룰

| 룰 | 설명 |
|-----|------|
| `noUnusedImports` | 미사용 import 경고 |
| `noUnusedVariables` | 미사용 변수 경고 |
| `noAssignInExpressions` | 조건문 내 할당 경고 |
| `useArrowFunction` | 화살표 함수 권장 |

### error 레벨 룰

| 룰 | 설명 |
|-----|------|
| `useConst` | 재할당 없으면 `const` 필수 |
| `noVar` | `var` 사용 금지 |

## Override (패키지별 예외)

### `**/*.vue`

- `noUnusedImports`, `noUnusedVariables` off
- Biome가 Vue SFC `<template>`에서의 사용을 인식하지 못하므로 비활성화

### `packages/test-flicking/**`

- `noConsole`, `noEmptyBlockStatements`, `noUnusedTemplateLiteral`, `noUnusedVariables` off
- `useArrowFunction` off — 테스트에서 `function` 키워드 사용 허용

### `packages/docs/**`

- `noUnusedImports` off — Docusaurus는 구 JSX transform 사용, `import React`가 필수
- `useHookAtTopLevel`, `useExhaustiveDependencies` off — `src/demo/` 내 `.vue` 파일의 Vue composition API(`useFlickingReactiveAPI`)를 React hooks로 오인하는 false positive 방지. `.jsx` 데모 코드도 Sandpack 표시용이므로 허용
- a11y 룰 대부분 off (Docusaurus 데모 컴포넌트)
- `noConsole`, `noArrayIndexKey`, `noDangerouslySetInnerHtml` off

### `**/dev/**`

- `noConsole`, `noArrayIndexKey` off
- `useArrowFunction`, a11y 룰 off — 개발용 샘플 코드

## 검사 제외 대상

`biome.json`의 `files.includes`에서 제외된 경로:

| 경로 | 사유 |
|------|------|
| `**/dist`, `**/declaration`, `**/build` | 빌드 산출물 |
| `**/coverage` | 테스트 커버리지 |
| `**/.docusaurus` | Docusaurus 캐시 |
| `**/api-artifacts`, `**/api-documenter-output` | API 문서 생성물 |
| `config/` | 레거시 빌드 스크립트 (CommonJS, `var` 사용) |
| `packages/test-flicking/manual/` | 수동 테스트 HTML (파싱 불가) |
| `packages/test-flicking/cfc/replace-coverage.js` | 레거시 스크립트 (`package` 예약어) |
| `packages/docs/src/css/showcases/post.css` | Docusaurus `url(@site/...)` 구문 (파싱 불가) |

## IDE 설정

### VS Code

[Biome 확장](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)을 설치하면 저장 시 자동 포맷팅 + lint 수정이 적용됩니다.

```jsonc
// .vscode/settings.json (권장)
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

### WebStorm / IntelliJ

Settings > Languages & Frameworks > Biome 에서 활성화합니다. root의 `biome.json`이 자동 감지됩니다.

## ESLint에서 잃게 된 룰

아래 룰들은 Biome에 대응하는 룰이 없어 코드 리뷰로 대체합니다:

| ESLint 룰 | 비고 |
|-----------|------|
| `explicit-member-accessibility` | public/private 명시 — 코어 코드가 잘 지키고 있어 자연스럽게 유지 |
| `member-ordering` | 멤버 정렬 — 조직적 선호, 필수 아님 |
| `naming-convention` | `useNamingConvention`으로 부분 커버 가능, 추후 설정 검토 |
| `max-classes-per-file` | 파일당 클래스 수 — 현재 잘 지켜지고 있음 |
| `jsdoc/*` | JSDoc 검증은 api-extractor가 담당 |
| `radix` | parseInt radix — 사용 빈도 극히 낮음 |
