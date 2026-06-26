# 문서 버전 관리 및 배포 정책

Docusaurus 문서 사이트의 버전 관리 방침과 배포 파이프라인 가이드입니다.

## 핵심 원칙

- **Docusaurus 버전 기능은 사용하지 않는다.** 메이저 단위로 정적 빌드를 아카이브한다.
- **docs는 항상 최신 마이너를 반영한다.** 마이너/패치 릴리스마다 버전 스냅샷을 생성하지 않는다.
- **릴리스 노트는 문서 사이트에 자동 반영한다.** GitHub Release → Docusaurus Blog 자동 생성.

### 배경

기존에는 Docusaurus의 `docs:version` 기능으로 마이너/패치 릴리스마다 스냅샷을 생성했다.
그 결과 `versioned_docs/`에 4.0.0 ~ 4.14.1까지 15개 버전이 누적되었고, 아래의 문제가 발생했다:

- 빌드 시간 증가 (버전마다 별도 사이트 생성)
- 수백 개의 중복 파일 (15개 버전 × API 문서 수십 개)
- 문서 구조 변경 시 기존 버전과의 호환성 충돌

## 문서 디렉토리 구조

```
packages/docs/
  docusaurus.config.js      # 사이트 설정 (blog, navbar 등)
  package.json               # build 스크립트에 fetch-releases 연결
  sidebars.js                # Guide, Demos 사이드바
  sidebars-api.js            # API 사이드바 (자동 생성)
  scripts/
    fetch-releases.js        # GitHub Release → blog/ md 자동 생성
    generate-llm-docs.js     # MDX + 데모 코드 → LLM용 순수 마크다운 생성
  blog/
    .gitkeep
    release-*.md             # 자동 생성 (gitignore 대상)
  docs/
    api/                     # 자동 생성 (gitignore 대상)
    guide/
    demos/
  static/
    img/
    llms.txt                 # LLM용 문서 인덱스 (추적됨)
    llm-docs/                # LLM용 순수 마크다운 (자동 생성, gitignore)
    llms-full.txt            # 전체 합본 (자동 생성, gitignore)
    release/                 # 메이저 버전 아카이브 (향후 생성)
      4.x/
```

### 자동 생성 파일과 gitignore

| 경로 | 생성 방법 | gitignore |
|------|-----------|-----------|
| `docs/api/` | `pnpm api-docs:docusaurus` | O |
| `blog/release-*.md` | `scripts/fetch-releases.js` | O |
| `static/llm-docs/` | `scripts/generate-llm-docs.js` | O |
| `static/llms-full.txt` | `scripts/generate-llm-docs.js` | O |

## LLM 문서 생성 파이프라인

### 왜 필요한가

`llms.txt`의 링크가 Docusaurus HTML 페이지를 가리키면 LLM이 문서를 읽을 때 네비게이션, 사이드바, Sandpack 에디터 등 대량의 HTML/JS/CSS를 함께 파싱해야 한다. 이로 인해 컨텍스트 윈도우가 낭비되고, 실제 문서 내용을 정확히 추출하기 어렵다.

이를 해결하기 위해 빌드 시 `static/llm-docs/`에 순수 마크다운 버전을 생성하고, `llms.txt`가 이 `.md` 파일들을 가리키도록 한다. LLM은 JSX/import/HTML 래퍼 없이 텍스트와 코드 블록만 읽으면 된다.

### 파이프라인

```
문서 빌드 시 → generate-llm-docs.js 실행
                    ↓
               sidebars.js에서 Guide/Demo 대상 결정
               docs/api/ 디렉토리 스캔으로 API 대상 결정
                    ↓
               Guide MDX → 순수 Markdown (Tabs/admonition 변환)
               Demo MDX + 코드 파일 → Markdown + 코드 블록
               API MDX → HTML 래퍼 제거
                    ↓
               static/llm-docs/ 에 .md 파일 생성
               생성된 .md 내부 /docs/ 링크 → /llm-docs/ 링크로 치환
               static/llms-full.txt 전체 합본 생성
                    ↓
               docusaurus build (static/ 포함하여 배포)
```

### 자동 생성 파일

| 경로 | 내용 | gitignore |
|------|------|-----------|
| `static/llm-docs/` | 변환된 순수 마크다운 | O |
| `static/llms-full.txt` | 전체 문서 합본 | O |
| `static/llms.txt` | LLM용 문서 인덱스 (수동 관리) | X (추적) |

### generate-llm-docs.js

`packages/docs/scripts/generate-llm-docs.js`가 빌드 전 자동 실행된다.

**생성 대상 결정:**

| 대상 | 결정 방식 |
|------|-----------|
| Guide | `sidebars.js`의 `guideSidebar` |
| Demo | `sidebars.js`의 `demosSidebar` |
| API | `docs/api/` 디렉토리 스캔 |

`sidebars.js`가 단일 소스이므로, 새 가이드/데모를 사이드바에 추가하면 LLM 문서도 자동으로 생성된다.

**변환 규칙:**

| 소스 | 변환 |
|------|------|
| `<Tabs>` + `<TabItem label="React">` | `**React:**` |
| `:::info Title` / `:::warning` 등 | `> **Info: Title**` |
| `<div className="...">` 래퍼 | 제거 |
| `import ... from ...` (코드 블록 외부) | 제거 |
| 상대 링크 (`../../api/...`) | 절대 URL (`/llm-docs/.../.md`) |
| 데모 `<ComponentName />` | `## Code` + React/Vue/JS 코드 블록 삽입 |
| API `<div className="api-property">` | 제거 (마크다운 유지) |

**데모 코드 삽입 원리:**

데모 MDX에서 `import AlignOptions from '@site/src/demo/basic/AlignOptions'`를 파싱하여 디렉토리 경로를 결정한 후, 분리된 코드 파일(`react.jsx`, `vue.vue`, `vanilla.js`, `styles.css`)을 직접 읽어 코드 블록으로 삽입한다.

**API 문서 처리:**

`docs/api/` 디렉토리를 자동 스캔하여 존재하는 모든 `.mdx` 파일을 처리한다. API 문서는 `api-docs-generator`로 자동 생성되므로 대상 목록을 하드코딩하지 않는다.

**링크 치환:**

생성 완료 후 모든 `.md` 파일 내부의 `/docs/` 링크를 대응하는 `/llm-docs/.../.md` 링크로 일괄 치환한다. 생성되지 않은 대상은 원래 HTML 링크를 유지한다.

### llms.txt

`static/llms.txt`는 [llms.txt 표준](https://llmstxt.org/)을 따르는 인덱스 파일이다.

- 구조, 설명, 링크를 모두 수동으로 관리한다
- 링크는 처음부터 `/llm-docs/.../.md` 형식으로 작성한다 (스크립트가 치환하지 않음)
- 새 가이드/데모 문서를 추가하면 `llms.txt`에도 해당 링크를 수동 추가해야 한다
- 스크립트와 llms.txt는 서로 독립적으로 동작한다

작성 규칙과 링크 패턴 상세는 `LLMS_TXT_GUIDE.md`를 참조한다.

### 데모 코드 분리 구조

데모 코드가 별도 파일(`react.jsx`, `vue.vue` 등)로 분리되어 있어 LLM 문서 스크립트가 직접 읽을 수 있다. 이전에는 TSX 파일 내 템플릿 리터럴에 코드가 임베딩되어 있어 파싱이 불가능했다.

데모 디렉토리 구조와 작성법은 `DEMO_GUIDE.md`를 참조한다.

### Webpack ?raw 설정

데모 코드 파일을 문자열로 import하기 위해 `docusaurus.config.ts`에 두 가지 설정이 추가되어 있다:

1. **기존 로더 규칙에서 `?raw` 제외** — `resourceQuery: { not: [/raw/] }`를 모든 기존 규칙에 추가하여 Babel/CSS 로더가 `?raw` import를 처리하지 않도록 한다
2. **`asset/source` 규칙 추가** — `resourceQuery: /raw/`로 매칭하여 파일 내용을 문자열로 반환한다

이 설정이 없으면 `.jsx` 파일이 Babel을 거쳐 JSX가 `React.createElement(...)` 호출로 변환된 상태로 반환되어, Sandpack 에디터에 표시되는 코드가 사용자가 복붙할 수 없는 형태가 된다.

### package.json 빌드 스크립트

```json
{
  "build": "node scripts/fetch-releases.js && node scripts/generate-llm-docs.js && docusaurus build"
}
```

빌드 순서: 릴리스 fetch → LLM 문서 생성 → Docusaurus 빌드.

---

## 마이너/패치 릴리스

### API 변경 사항 전달 수단

별도의 버전별 API 스냅샷은 유지하지 않는다. 아래 수단들이 동일한 정보를 커버하며,
사용자가 실제 코드 작성 시 참조하는 건 설치된 패키지의 TypeScript 타입이다.

| 수단 | 용도 |
|------|------|
| `@since` TSDoc 태그 | 새 API 추가 시점 표시 |
| `@deprecated` TSDoc 태그 | 폐기 예정 API 표시 |
| 릴리스 노트 (Blog) | 문서 사이트 내 전체 릴리스 히스토리 열람 |
| Git 태그 | 특정 시점의 전체 소스(문서 포함) 참조 |

### TSDoc 예시

```ts
/**
 * @since 4.11.0
 */
public newMethod(): void { ... }

/**
 * @deprecated Since 4.12.0. Use {@link newMethod} instead.
 */
public oldMethod(): void { ... }
```

### 가이드 문서 (MDX)

```mdx
:::info Added in v4.11.0
`newMethod()`는 4.11.0부터 사용 가능합니다.
:::

:::caution Deprecated since v4.12.0
`oldMethod()`는 더 이상 권장되지 않습니다. `newMethod()`를 사용하세요.
:::
```

### 릴리스 절차

1. 소스 코드에 `@since` / `@deprecated` TSDoc 추가
2. `pnpm api-docs:docusaurus` 재생성
3. 필요 시 가이드 문서에 admonition 추가
4. GitHub Release 작성 (릴리스 노트)
5. 문서 빌드 & 배포 (릴리스 노트 자동 반영)

## 릴리스 노트 자동 반영

GitHub Release에 작성된 릴리스 노트를 문서 빌드 시 자동으로 Docusaurus Blog에 반영한다.
사용자는 문서 사이트의 Releases 탭(`/releases`)에서 전체 릴리스 히스토리를 열람할 수 있다.

### 파이프라인

```
라이브러리 배포 → GitHub Release 작성
                    ↓
문서 빌드 시 → fetch-releases.js 실행
                    ↓
                 GitHub API로 releases fetch
                    ↓
                 blog/ 폴더에 release-*.md 자동 생성
                    ↓
                 docusaurus build
```

### fetch-releases.js

`packages/docs/scripts/fetch-releases.js`가 빌드 전 자동 실행된다.

**동작 방식:**

1. GitHub API (`https://api.github.com/repos/naver/egjs-flicking/releases`)에서 전체 릴리스 목록을 페이지네이션으로 fetch
2. `blog/` 폴더의 기존 `release-*` 파일을 삭제
3. 각 릴리스를 `release-{date}-{tag}.md` 형식의 Docusaurus blog 포스트로 생성

**환경 변수:**

| 변수 | 필수 여부 | 용도 |
|------|-----------|------|
| `GITHUB_TOKEN` | 선택 | 공개 저장소이므로 없어도 동작. 설정 시 rate limit 완화 (60 → 5000 req/h) |

- 토큰 미설정 시에도 정상 동작한다 (공개 저장소).
- fetch 실패 시 에러가 아닌 경고를 출력하고 빌드를 계속 진행한다.
- GitHub Actions에서는 `${{ secrets.GITHUB_TOKEN }}`으로 자동 주입 가능.

**생성되는 파일 형식:**

```md
---
title: "v4.15.0"
date: 2025-01-15
tags: [release]
---

## New Features
- newMethod() 추가
...
```

### package.json 빌드 스크립트

```json
{
  "build": "node scripts/fetch-releases.js && node scripts/generate-llm-docs.js && docusaurus build"
}
```

`pnpm build` 실행 시 릴리스 fetch → LLM 문서 생성 순으로 자동으로 선행된다.
`pnpm start` (dev 서버)는 fetch 없이 바로 시작된다. 로컬에서 릴리스 포스트를 확인하려면 수동 실행:

```bash
cd packages/docs
node scripts/fetch-releases.js
pnpm start
```

### Docusaurus 설정

```js
// docusaurus.config.js — blog 설정
blog: {
  blogTitle: "Releases",
  blogSidebarTitle: "All Releases",
  blogSidebarCount: "ALL",
  postsPerPage: "ALL",
  routeBasePath: "releases",   // /blog → /releases
}
```

### Navbar 레이아웃

```
┌──────────────────────────────────────────────────────────────────┐
│ Flicking   Guide  API  Demos       Releases  Version ▾  🌐  GitHub │
│             ←── left ──→            ←──────── right ────────→    │
└──────────────────────────────────────────────────────────────────┘
```

- **Releases**: `/releases` 경로로 이동 (blog 포스트 목록)
- **Version**: 드롭다운으로 현재/이전 버전 문서 이동

### /releases 페이지 결과

```
/releases
┌──────────────────────────────────────────────┐
│ All Releases  │  v4.15.1          2025-02-20 │
│               │  ──────────────────────────── │
│ ▸ v4.15.1     │  ## Bug Fixes                │
│ ▸ v4.15.0     │  - xxx 수정                   │
│ ▸ v4.14.1     │                              │
│ ▸ v4.14.0     │  v4.15.0          2025-01-15 │
│ ▸ ...         │  ──────────────────────────── │
│               │  ## New Features             │
│               │  - newMethod() 추가           │
└──────────────────────────────────────────────┘
```

- 왼쪽 사이드바: 전체 릴리스 목록 (클릭으로 개별 릴리스 이동)
- 메인 영역: 스크롤로 전체 히스토리 열람
- 개별 릴리스 URL 공유 가능 (`/releases/release-v4.15.0`)

## 메이저 릴리스 (예: v4 → v5)

현재 문서를 정적 빌드로 아카이브하고 새 버전 문서로 전환한다.

### 아카이브 생성 절차

**1. 현재 docs를 아카이브용으로 빌드**

```bash
cd packages/docs

# docusaurus.config.js의 baseUrl을 임시 변경:
#   baseUrl: "/egjs-flicking/release/4.x/"

pnpm clear && pnpm build
```

**2. 빌드 결과물을 static/에 저장**

```bash
mkdir -p static/release/4.x
cp -r build/* static/release/4.x/

# config 원복
git checkout docusaurus.config.js
```

**3. 새 버전 docs로 전환**

- `docs/` 콘텐츠를 v5 문서로 교체
- `sidebars.js` 업데이트
- API 문서 재생성 (`pnpm api-docs:docusaurus`)

**4. Version 드롭다운 업데이트**

```js
// docusaurus.config.js — navbar items
items: [
  { label: "5.x (Current)", to: "/docs/guide/quickstart" },
  { label: "4.x", href: "/egjs-flicking/release/4.x/" },
  { label: "3.x", href: "https://naver.github.io/egjs-flicking/release/3.8.2/doc/index.html" },
]
```

**5. 빌드 & 배포**

```bash
pnpm docs:deploy            # v5 docs + static/release/4.x/ 포함
```

### 아카이브 원칙

- **`static/release/{major}.x/`에 저장**: Docusaurus가 빌드 시 자동 포함
- **메이저 버전 당 1개 아카이브**: 패치/마이너 업데이트마다 아카이브 불필요
- **빌드 시점**: 메이저 버전 전환 직전, 현재 docs가 완전한 상태일 때
- **baseUrl 변경만으로 아카이브 생성**: 다른 config 수정 불필요

## 배포

### 루트 스크립트

| 스크립트 | 설명 |
|----------|------|
| `pnpm docs:build` | API 문서 생성(`api-docs:docusaurus`) + Docusaurus 빌드 |
| `pnpm docs:serve` | 빌드 결과물 로컬 서빙 |
| `pnpm docs:deploy` | 빌드 + gh-pages 배포 (upstream) |
| `pnpm docs:deploy-origin` | 빌드 + gh-pages 배포 (origin/fork) |

### 배포 파이프라인

```
pnpm docs:deploy
  ├── pnpm api-docs:docusaurus    # .d.ts 생성 → api-extractor → api-docs-generator
  ├── pnpm --filter docs build    # fetch-releases.js → generate-llm-docs.js → docusaurus build
  └── gh-pages -d packages/docs/build --add --dotfiles --remote upstream
```

> **`--dotfiles`는 필수다.** `gh-pages` CLI는 기본적으로 dotfile을 배포에서 제외하므로, 이 플래그가 없으면 Docusaurus가 생성한 `.nojekyll`이 gh-pages 브랜치에 올라가지 않는다. 그러면 GitHub Pages가 사이트를 Jekyll로 빌드하려 시도하고, `llm-docs/**/*.md` 등의 마크다운을 Liquid로 파싱하다 실패하여 **배포가 통째로 실패**한다. `.nojekyll`이 루트에 있어야 Jekyll이 비활성화되고 정적 파일이 그대로 서빙된다.

> `api-docs:docusaurus` 내부 구현(파싱·렌더링 레이어 등)은 `packages/api-docs-generator/DOCUMENTATION.md`를 참조한다.

### 배포 절차

```bash
# 1. 빌드 + 배포 (upstream)
pnpm docs:deploy

# 또는 fork에서 테스트 배포
pnpm docs:deploy-origin
```

## 로컬 테스트

`docs/api/`는 자동 생성 파일로 gitignore 대상이다. `pnpm start`(dev 서버)는 이 디렉토리를 재생성하지 않으므로, clone 직후 또는 TSDoc 변경 후에는 API 탭이 빈 상태가 된다. dev 서버를 시작하기 전에 한 번 실행해야 한다:

```bash
pnpm api-docs:docusaurus     # 루트에서 실행 — docs/api/ 생성
```

`pnpm docs:build`와 `pnpm docs:deploy`는 파이프라인에 포함되어 있어 별도 실행이 불필요하다.

### 전체 빌드 테스트

```bash
pnpm docs:build               # API 문서 생성 + fetch-releases + docusaurus build
pnpm docs:serve                # 빌드 결과물 로컬 서빙
```

### 릴리스 포스트만 확인

```bash
cd packages/docs
node scripts/fetch-releases.js   # blog/에 release-*.md 생성
ls blog/                         # 생성된 파일 확인
pnpm start                       # dev 서버로 /releases 확인
```

### fetch 없이 dev 서버만

```bash
cd packages/docs
pnpm start                       # 릴리스 포스트 없이 시작 (navbar 등 확인용)
```

### 다국어(i18n) 로컬 테스트

Docusaurus 개발 서버(`docusaurus start`)는 **한 번에 하나의 로케일만** 서빙할 수 있는 제한이 있다.

```bash
cd packages/docs
pnpm start                   # 기본 로케일(en)만 서빙
pnpm start --locale ko       # 한국어만 서빙 (영어 전환 시 404)
```

**여러 로케일을 동시에 확인하려면** 풀 빌드 후 serve해야 한다:

```bash
cd packages/docs
pnpm docusaurus build         # 모든 로케일 빌드 (build/ + build/ko/)
pnpm docusaurus serve         # 빌드 결과물 서빙 — 로케일 드롭다운 정상 작동
```

| 명령 | 영어 | 한국어 | 로케일 전환 |
|------|------|--------|-------------|
| `pnpm start` | ✅ | ❌ | ❌ |
| `pnpm start --locale ko` | ❌ | ✅ | ❌ |
| `pnpm docusaurus build && pnpm docusaurus serve` | ✅ | ✅ | ✅ |

## 다국어(i18n) 지원

### 현황

- 기본 로케일: `en` (영어)
- 지원 로케일: `ko` (한국어)
- 현재 번역 범위: **Guide 탭만** 한국어 번역 완료. API, Demos 탭은 미번역 (영문 원본 자동 표시).

### 디렉토리 구조

```
packages/docs/i18n/ko/
  code.json                                          # 테마 UI 문자열 번역
  docusaurus-plugin-content-docs/
    current.json                                     # 사이드바 라벨 번역
    current/
      guide/                                         # Guide 탭 번역 파일
        quickstart.mdx
        structure-and-styling.mdx
        react-guide.mdx
        vue3-guide.mdx
        controlling-flicking.mdx
        reactive-api.mdx
        option-recipes.mdx
      demos/                                         # (향후) Demos 탭 번역
      api/                                           # (향후) API 탭 번역
```

### 새 탭 번역 추가 프로세스

새로운 탭(Demos, API 등)에 한국어 번역을 추가할 때 아래 순서를 따른다.

**1. 원본 파일 복사**

```bash
# 예: Demos 탭 번역 추가
cp -r packages/docs/docs/demos/ \
  packages/docs/i18n/ko/docusaurus-plugin-content-docs/current/demos/
```

**2. 본문 텍스트 번역**

복사한 MDX 파일의 본문 텍스트를 한국어로 번역한다. (번역 시 주의사항은 아래 섹션 참조)

**3. 사이드바 라벨 번역 (필요 시)**

`i18n/ko/docusaurus-plugin-content-docs/current.json`에 사이드바 카테고리 라벨 번역을 추가한다.

```json
{
  "sidebar.guideSidebar.category.Framework Guide": {
    "message": "프레임워크 가이드",
    "description": "The label for category Framework Guide in sidebar guideSidebar"
  },
  "sidebar.demosSidebar.category.Basic": {
    "message": "기본",
    "description": "The label for category Basic in sidebar demosSidebar"
  }
}
```

키 형식: `sidebar.{sidebarId}.category.{영문 라벨}`

**4. 빌드 테스트**

```bash
cd packages/docs
pnpm docusaurus build --locale ko    # 한국어만 빠르게 빌드 테스트
pnpm docusaurus build                # 전체 로케일 빌드
pnpm docusaurus serve                # 로케일 전환 동작 확인
```

### 번역 시 주의사항

#### 변경하지 않아야 할 것

| 항목 | 이유 |
|------|------|
| front matter의 `id`, `slug`, `sidebar_position` | 라우팅과 사이드바 매핑에 사용. 변경 시 404 발생 |
| `import` 구문 | 데모 컴포넌트 등 코드 임포트는 로케일과 무관 |
| 코드 블록 내용 | API명, 변수명, 패키지명 등은 원본 유지 |
| MDX 컴포넌트 태그 | `<Tabs>`, `<TabItem>`, `:::tip` 등 구조 유지 |
| 상대 링크 경로 | `./react-guide`, `../api/classes/Flicking` 등 그대로 유지 |

#### 변경해야 할 것

| 항목 | 예시 |
|------|------|
| front matter의 `title` | `"Quick Start"` → `"빠른 시작"` |
| front matter의 `description`, `keywords` | 검색 최적화를 위해 한국어로 |
| 본문의 설명 텍스트 | 영문 → 한국어 |
| admonition 내 텍스트 | `:::tip`, `:::warning` 등의 본문 |
| 코드 블록 내 주석 | `// Initialize Flicking` → `// Flicking 초기화` |
| 코드 블록 내 문자열 리터럴 (UI 텍스트) | `"Panel 1"` → `"패널 1"` (선택 사항) |

#### API 탭 번역 시 추가 고려사항

API 문서(`docs/api/`)는 `pnpm api-docs:docusaurus`로 자동 생성된다.
번역 시 아래 두 가지 방법 중 하나를 선택한다:

1. **생성된 파일을 수동 번역**: 유지보수 비용이 높음. API 변경 시 원본 재생성 후 번역도 다시 해야 함.
2. **번역하지 않음**: API 레퍼런스는 영문 원본을 그대로 표시. 국제적으로 통용되는 API 문서 관행에 부합.

**권장**: API 탭은 번역하지 않는다. 코드와 타입 정의가 대부분이므로 영문 유지가 합리적이다.

### 번역하지 않은 탭의 동작

Docusaurus는 번역 파일이 없는 문서에 대해 **영문 원본을 자동으로 표시**한다 (fallback). 별도 설정이 필요 없으며, 번역이 준비된 탭부터 점진적으로 추가하면 된다.

## 요약

| 구분 | 메이저 (v4→v5) | 마이너 (v4.11→v4.12) |
|------|----------------|----------------------|
| 아카이브 | `static/release/4.x/` 생성 | 불필요 |
| API 추가 | 새 docs로 전환 | `@since` 태그 |
| API 제거/변경 | Breaking change 문서화 | `@deprecated` 태그 |
| 릴리스 노트 | 아카이브에 포함 | GitHub Release → Blog 자동 반영 |
| 버전별 레퍼런스 | 정적 빌드 아카이브 | CHANGELOG + Git 태그 |
| docs 상태 | 이전 버전 freeze | 항상 최신 반영 |
