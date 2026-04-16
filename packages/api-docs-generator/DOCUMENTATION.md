# API Docs Generator

API Extractor의 출력물(`.api.json`)을 파싱하여 마크다운 문서를 생성하는 도구입니다.

## 빠른 시작

```bash
# 아래 명령어들은 모노레포 루트에서 실행한다.



# 순수 Markdown 생성
pnpm api-docs:generate

# Docusaurus MDX 생성
pnpm api-docs:docusaurus
```

## 전체 파이프라인

`pnpm api-docs:generate` 실행 시:

1. `packages/flicking`과 `packages/flicking-plugins`의 타입 선언 파일(`.d.ts`)들이 생성됨
2. api-extractor가 실행되어 `flicking.api.json`과 `flicking-plugins.api.json`이 `api-artifacts/`에 저장됨
3. 문서 생성기가 실행되어 마크다운 파일들이 생성됨

## 디렉토리 구조

```
api-docs-generator/
├── src/
│   ├── core/                  # 핵심 로직
│   │   ├── documentation-context.ts  # 참조 해석, 링크 생성, kindToFolder 매핑
│   │   ├── canonical-reference-parser.ts  # Canonical reference 파싱
│   │   ├── doc-extractor.ts          # TSDoc 주석 추출 (extractDocComment)
│   │   ├── markdown-renderer.ts      # 마크다운 렌더링
│   │   ├── section-builder.ts        # 문서 섹션 빌더 (throws/fires 포함)
│   │   ├── generator-registry.ts     # 제너레이터 레지스트리
│   │   ├── default-registry.ts       # 기본 레지스트리 설정
│   │   └── errors.ts                 # 에러 클래스
│   │
│   ├── generators/            # 마크다운 문서 생성기
│   │   ├── class-generator.ts        # 클래스 문서 생성
│   │   ├── interface-generator.ts    # 인터페이스 문서 생성
│   │   ├── simple-generators.ts      # 함수/변수/타입 생성
│   │   └── markdown-builder.ts       # 마크다운 빌더 유틸리티
│   │
│   ├── parsers/               # TSDoc 파싱
│   │   └── type-info.ts              # 타입 시그니처 추출 (extractTypeString)
│   │
│   ├── types/                 # 타입 정의
│   │   └── extracted-doc.ts          # ExtractedDocComment 등
│   │
│   ├── utils/                 # 유틸리티
│   │   ├── api-loader.ts             # API 모델 로딩, 통계 유틸리티
│   │   └── type-guard/               # 타입 가드
│   │       ├── api-extractor.ts      # API Extractor 타입 가드, getDisplayName
│   │       └── tsdoc.ts              # TSDoc 타입 가드
│   │
│   ├── adapters/              # 출력 형식별 어댑터
│   │   ├── markdown/                 # 순수 Markdown 출력
│   │   │   └── index.ts
│   │   └── docusaurus/               # Docusaurus MDX 출력
│   │       ├── main.ts               # 메인 생성기
│   │       ├── frontmatter.ts        # YAML frontmatter (addFrontmatter)
│   │       ├── sidebar.ts            # sidebars-api.js 생성
│   │       └── documentation-context.ts  # 인라인 옵션 관리, Docusaurus 링크
│   │
│   └── __tests__/             # 테스트
│
├── scripts/                   # 빌드 스크립트
│   ├── build-docs.ts                 # Markdown 빌드
│   └── build-docusaurus-docs.ts      # Docusaurus 빌드
│
├── api-artifacts/             # api-extractor 출력물
│   ├── flicking.api.json
│   └── flicking-plugins.api.json
│
└── docs-output/               # 생성된 문서
```

## 아키텍처

### 레이어 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                        API Model (JSON)                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Extraction Layer (core/)                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  doc-extractor  │  │ type-info.ts    │  │ documentation-  │  │
│  │     .ts         │  │ (parsers/)      │  │ context.ts      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│         │                     │                    │            │
│         ▼                     ▼                    ▼            │
│  ExtractedDocComment    Type Strings      Reference Index       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Rendering Layer (core/)                       │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  markdown-renderer.ts + section-builder.ts              │     │
│  │  renderSummaryMarkdown(), buildThrowsSection(), ...     │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Generation Layer (generators/)                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐     │
│  │class-generator│ │interface-   │ │simple-generators.ts  │     │
│  │   .ts        │ │generator.ts │ │(function, variable)  │     │
│  └──────────────┘ └──────────────┘ └──────────────────────┘     │
│                           │                                      │
│                           ▼                                      │
│              ┌─────────────────────────┐                        │
│              │   markdown-builder.ts   │                        │
│              └─────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Adapters                                  │
│  ┌──────────────────────┐  ┌──────────────────────────────┐     │
│  │  adapters/markdown/  │  │   adapters/docusaurus/       │     │
│  │  (순수 .md 출력)     │  │   (MDX + frontmatter)        │     │
│  └──────────────────────┘  └──────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### 핵심 설계 원칙

1. **추출(Extraction)과 렌더링(Rendering) 분리**: 데이터 추출은 순수 함수, 렌더링은 컨텍스트 의존
2. **글로벌 상태 제거**: `DocumentationContext`로 상태 캡슐화
3. **레지스트리 패턴**: `GeneratorRegistry`로 제너레이터 관리
4. **어댑터 패턴**: 출력 형식별 어댑터로 확장성 확보
5. **코드 중복 최소화**: 공통 패턴은 `section-builder.ts`의 헬퍼 함수로 추출
6. **단일 유틸리티 원칙**: `getDisplayName`, `kindToFolder`, `mergeStats` 등 유틸리티는 한 곳에서 정의하고 재사용

## 핵심 모듈

### DocumentationContext

모든 상태를 캡슐화하는 컨텍스트 클래스입니다.

```typescript
import { DocumentationContext } from "./core/documentation-context";

// 패키지 이름을 파라미터로 전달 (재사용 가능)
const packageName = `${apiPackage.name}!`; // "@egjs/flicking!"
const ctx = new DocumentationContext(apiPackage, packageName);

// 사이트 내부 URL을 상대 경로로 변환하려면 siteBaseUrls와 docsBasePath를 설정
const ctxWithSiteUrls = new DocumentationContext(
  apiPackage,
  packageName,
  ["https://naver.github.io/egjs-flicking/"],  // siteBaseUrls
  "api"                                         // docsBasePath
);

// 참조 해석 (이름 → canonical reference)
const ref = ctx.resolveReference("Flicking.init");

// canonical reference → 파일 경로
const path = ctx.canonicalReferenceToPath(ref);

// 상대 경로 계산
const relPath = ctx.resolveRelativeLink("classes/Flicking.md", "interfaces/Panel.md");

// 사이트 내부 URL → 상대 경로 변환
const relUrl = ctxWithSiteUrls.convertSiteUrlToRelativePath(
  "https://naver.github.io/egjs-flicking/docs/demos/basic/alignment",
  "interfaces/FlickingOptions.mdx"
);
// → "../../demos/basic/alignment.mdx"
```

**주요 메서드:**
- `resolveReference(name)` — 이름을 canonical reference로 해석
- `canonicalReferenceToPath(ref)` — canonical reference를 파일 경로로 변환
- `resolveRelativeLink(from, to)` — 두 파일 간 상대 경로 계산
- `convertSiteUrlToRelativePath(url, currentFilePath)` — 사이트 내부 URL을 상대 docs 경로로 변환
- `getContainerKind(ref)` — 멤버의 컨테이너(클래스/인터페이스) kind 반환
- `kindToFolder(kind)` — API kind를 폴더명으로 매핑 (protected, 서브클래스에서 재사용)

**생성자 파라미터:**
- `apiPackage` — API Extractor의 `ApiPackage` 인스턴스
- `packageName` — 패키지 이름 (e.g., `"@egjs/flicking!"`)
- `siteBaseUrls?` — 사이트 베이스 URL 목록. TSDoc의 절대 URL 중 이 접두사와 매칭되는 URL을 상대 경로로 변환
- `docsBasePath?` — 출력 디렉토리의 docs 루트 내 위치 (e.g., `"api"`). 상대 경로 계산 시 사용

### CanonicalReferenceParser

API Extractor의 canonical reference 문자열을 효율적으로 파싱합니다.

```typescript
import { CanonicalReferenceParser } from "./core/canonical-reference-parser";

// 한 번만 파싱하고 여러 정보 접근
const parser = new CanonicalReferenceParser("@egjs/flicking!Flicking#addPlugins:member(1)");

console.log(parser.kind);        // "member"
console.log(parser.name);        // "Flicking"
console.log(parser.memberName);  // "addPlugins"
console.log(parser.isValid);     // true
console.log(parser.isMember);    // true
```

**Canonical Reference 형식 예시:**
- Top-level 항목: `@egjs/flicking!Flicking:class`
- Member: `@egjs/flicking!Flicking#addPlugins:member(1)`
- Interface: `@egjs/flicking!FlickingOptions:interface`

### doc-extractor

TSDoc 주석을 순수 데이터 구조로 추출합니다. 단일 진입점 `extractDocComment()`만 export합니다.

```typescript
import { extractDocComment } from "./core/doc-extractor";

const doc = extractDocComment(apiItem.tsdocComment);
// doc.summary, doc.params, doc.returns, doc.throws, doc.fires, ...
```

내부의 `extractFromDocNode()`은 재귀적으로 DocNode 트리를 순회하며 텍스트와 참조를 추출합니다. 이 함수는 private으로 외부에 노출되지 않습니다.

### ExtractedDocComment

TSDoc 주석에서 추출한 순수 데이터 구조입니다.

```typescript
interface ExtractedDocComment {
  summary: string;
  summaryReferences: DocReference[];
  remarks: string | null;
  remarksReferences: DocReference[];
  params: ExtractedParam[];
  returns: string | null;
  returnsReferences: DocReference[];
  defaultValue: string | null;
  deprecated: string | null;
  since: string | null;
  throws: ThrowsEntry[];       // { text, references }
  fires: FiresEntry[];         // { text, references }
  examples: string[];
  seeAlso: SeeAlsoEntry[];
  dependencies: DependencyEntry[];
}
```

### GeneratorRegistry

제너레이터 레지스트리 패턴으로 switch 문을 제거합니다.

```typescript
import { GeneratorRegistry } from "./core/generator-registry";

const registry = new GeneratorRegistry();

registry.register({
  kind: "Class",
  directory: "classes",
  extension: ".md",
  generate: (member, context) => generateClassMarkdown(member, context),
});

// 제너레이터 사용
const result = registry.generateFor(member, context);
```

**GeneratorContext:**

```typescript
interface GeneratorContext {
  currentFilePath: string;
  documentationContext: DocumentationContext;
  inlineOptionsInterfaces?: Map<string, ApiInterface>; // className → ApiInterface
}
```

`inlineOptionsInterfaces`는 클래스 페이지에 Options 인터페이스를 인라인할 때 사용됩니다.
Docusaurus 어댑터의 `generateMembers`에서 구성되며, 클래스 생성기가 이를 조회하여 "Options" 섹션을 렌더링합니다.

### MarkdownBuilder

마크다운 문법을 추상화하는 빌더 클래스입니다.

```typescript
import { MarkdownBuilder } from "./generators/markdown-builder";

const md = new MarkdownBuilder();
md.heading(1, "Title")
  .blockquote("Summary")
  .codeBlock("const x = 1;", "typescript")
  .table(["Name", "Type"], [["foo", "string"]]);

const output = md.build();
```

### Section Builder

제너레이터 간 코드 중복을 제거하기 위한 공통 문서 섹션 빌더 함수들입니다.

**사용 가능한 함수들:**

```typescript
import {
  buildSummarySection,          // summary를 blockquote로
  buildDeprecatedSection,       // deprecated 경고
  buildSinceSection,            // @since 버전 뱃지 (heading 바로 아래)
  buildRemarksSection,          // Description 섹션
  buildExamplesSection,         // Examples 섹션
  buildSeeAlsoSection,          // See Also 섹션 (heading 또는 bold)
  buildDocHeaderSection,        // summary + deprecated (조합)
  buildDocFooterSection,        // examples + see also (조합)
  buildParametersSection,       // 파라미터 섹션
  buildPropertyMetadataSection, // 프로퍼티 메타데이터 (default, deprecated, see also)
  buildThrowsSection,           // @throws 렌더링 (참조 링크 포함)
  buildFiresSection,            // @fires 렌더링 (참조 링크 포함)
} from "./core/section-builder";
```

**사용 예시:**

```typescript
const md = new MarkdownBuilder();
const doc = extractDocComment(apiItem.tsdocComment);

// 헤더 섹션 (summary blockquote + deprecated 경고)
buildDocHeaderSection(md, doc, currentFilePath, ctx);

// @since 뱃지 (heading 바로 아래에 배치)
buildSinceSection(md, doc);

// Remarks/Description 섹션
buildRemarksSection(md, doc, currentFilePath, ctx);

// 파라미터 섹션
buildParametersSection(md, method.parameters, doc, currentFilePath, ctx, {
  headingLevel: 3,
  useHeading: true,
  format: "bold", // or "normal"
});

// Throws 섹션 (참조 링크 자동 렌더링)
buildThrowsSection(md, doc, currentFilePath, ctx);

// Fires 섹션 (참조 링크 자동 렌더링)
buildFiresSection(md, doc, currentFilePath, ctx);

// 프로퍼티 메타데이터 (default, deprecated, see also)
buildPropertyMetadataSection(md, doc, currentFilePath, ctx);

// 푸터 섹션 (examples + see also)
buildDocFooterSection(md, doc, currentFilePath, ctx);
```

### 공유 유틸리티

#### getDisplayName (`utils/type-guard/api-extractor.ts`)

`ApiItem`에서 표시 이름을 가져오는 공유 유틸리티입니다. `displayName`이 없는 경우 `kind`로 폴백합니다.

```typescript
import { getDisplayName } from "./utils/type-guard/api-extractor";

const name = getDisplayName(apiItem); // "Flicking" 또는 "Class"
```

모든 어댑터와 레지스트리에서 이 함수를 공유합니다.

#### api-loader (`utils/api-loader.ts`)

API 모델 로딩과 생성 통계 관리를 위한 유틸리티입니다.

```typescript
import {
  loadApiPackage,          // API JSON 파일 로딩
  ensureOutputDirectories, // 출력 디렉토리 생성
  createEmptyStats,        // 빈 통계 객체 생성
  mergeStats,              // 통계 누적 (여러 패키지 처리 시)
  printStats,              // 콘솔에 통계 출력
  KIND_TO_STATS_KEY,       // API kind → 통계 키 매핑
} from "./utils/api-loader";
```

## 데이터 흐름

```typescript
// 1. API 모델 로드
const { apiPackage, entryPoint } = loadApiPackage("flicking.api.json");

// 2. 컨텍스트 생성 (참조 인덱스 빌드)
const packageName = `${apiPackage.name}!`; // "@egjs/flicking!"
const ctx = new DocumentationContext(
  apiPackage,
  packageName,
  ["https://naver.github.io/egjs-flicking/"],  // siteBaseUrls (선택)
  "api"                                         // docsBasePath (선택)
);

// 3. TSDoc 추출 (순수 데이터, 한 번만 호출)
const doc = extractDocComment(flickingClass.tsdocComment);
// doc.summary, doc.summaryReferences, doc.params, doc.since, doc.throws, doc.fires, ...

// 4. 마크다운 생성 (section builders 활용)
const md = new MarkdownBuilder();
md.heading(1, flickingClass.displayName);
buildSinceSection(md, doc);  // heading 바로 아래에 버전 뱃지

buildSummarySection(md, doc, "classes/Flicking.md", ctx);
buildSeeAlsoSection(md, doc, "classes/Flicking.md", ctx, "bold"); // summary 바로 아래에 See Also
buildDeprecatedSection(md, doc);
buildRemarksSection(md, doc, "classes/Flicking.md", ctx);
buildParametersSection(md, ctor.parameters, doc, "classes/Flicking.md", ctx, {
  headingLevel: 3,
  format: "bold",
});
buildThrowsSection(md, doc, "classes/Flicking.md", ctx);
buildFiresSection(md, doc, "classes/Flicking.md", ctx);
buildExamplesSection(md, doc);  // footer에는 examples만

const markdown = md.build();

// 5. 참조 파싱 (효율적 — 한 번만 파싱)
const parser = new CanonicalReferenceParser(canonicalRef);
console.log(parser.kind, parser.name, parser.memberName);
```

## 어댑터 비교: Markdown vs Docusaurus

두 명령어는 동일한 입력(flicking + plugins의 `.api.json`)을 공유하지만, 출력 형식과 기능에 차이가 있습니다.

| | `pnpm generate` (Markdown) | `pnpm generate:docusaurus` (Docusaurus) |
|---|---|---|
| **스크립트** | `scripts/build-docs.ts` | `scripts/build-docusaurus-docs.ts` |
| **어댑터** | `adapters/markdown/` | `adapters/docusaurus/` |
| **입력** | `flicking.api.json`, `flicking-plugins.api.json` | 동일 |
| **출력 디렉토리** | `api-docs-generator/docs-output/` | `docs/docs/api/` |
| **파일 확장자** | `.md` | `.mdx` |
| **Frontmatter** | 없음 | YAML frontmatter 포함 (`title`, `sidebar_label`) |
| **인덱스 파일** | `index.md` 생성 | 생성하지 않음 |
| **Sidebar** | 생성하지 않음 | `sidebars-api.js` 생성 |
| **Featured Items** | 없음 (모두 카테고리별 폴더) | `Flicking`, `FlickingOptions`를 루트에 배치 |
| **Options 인라인** | 없음 (모든 인터페이스를 별도 파일로 생성) | `inlineOptionsMap`으로 5개 인터페이스를 클래스 페이지에 병합 |
| **사이트 내부 URL 변환** | 없음 | `siteBaseUrls` + `docsBasePath`로 절대 URL을 상대 경로로 변환 |
| **DocumentationContext** | `DocumentationContext` (기본) | `DocusaurusDocumentationContext` (anchor 소문자 변환, 인라인 링크 리다이렉트) |

### 파일 수 차이

Options 인라인으로 인해 Docusaurus 쪽이 인터페이스 파일 5개가 적고, Markdown 쪽은 추가로 `index.md`를 생성합니다.

| 카테고리 | Markdown | Docusaurus | 차이 원인 |
|----------|----------|------------|-----------|
| classes | 동일 | 동일 | |
| interfaces | **+5** | 기준 | Docusaurus가 아래 5개를 클래스에 인라인 |
| functions | 동일 | 동일 | |
| variables | 동일 | 동일 | |
| types | 동일 | 동일 | |
| index | **+1** (`index.md`) | 없음 | Markdown만 생성 |
| sidebar | 없음 | `sidebars-api.js` | Docusaurus만 생성 |

인라인되는 인터페이스 목록:
- `AutoPlayOptions` → `AutoPlay` 클래스에 병합
- `ArrowOptions` → `Arrow` 클래스에 병합
- `PerspectiveOptions` → `Perspective` 클래스에 병합
- `SyncOptions` → `Sync` 클래스에 병합
- `PaginationOptions` → `Pagination` 클래스에 병합

## Docusaurus 통합

### Featured Items

`Flicking`, `FlickingOptions` 같은 주요 항목은 루트에 배치됩니다.

```
docs/api/
├── Flicking.mdx          (Featured - 루트)
├── FlickingOptions.mdx   (Featured - 루트)
├── classes/              (나머지 클래스)
├── interfaces/           (나머지 인터페이스)
├── functions/
├── variables/
└── types/
```

### Sidebar 구조

```javascript
// sidebars-api.js (자동 생성)
module.exports = {
  api: [
    {
      type: "category",
      label: "Essentials",
      collapsed: false,
      items: ["api/Flicking", "api/FlickingOptions"]
    },
    {
      type: "category",
      label: "Internals",
      collapsed: true,
      items: [/* Classes, Interfaces, Functions, Constants, Types */]
    }
  ]
};
```

### Options 인터페이스 인라인

플러그인처럼 옵션이 적은 클래스의 경우, Options 인터페이스를 별도 페이지 대신 클래스 페이지 내 "Options" 섹션으로 인라인할 수 있습니다.

```typescript
generateDocusaurusDocs({
  apiJsonPaths,
  outputDir,
  sidebarOutputPath,
  inlineOptionsMap: {
    AutoPlay: "AutoPlayOptions",
    Arrow: "ArrowOptions",
    Perspective: "PerspectiveOptions",
    Sync: "SyncOptions",
    Pagination: "PaginationOptions",
  },
  siteBaseUrls: [
    "https://naver.github.io/egjs-flicking/",
  ],
  docsBasePath: "api",
});
```

**동작 방식:**
1. `DocusaurusDocumentationContext`가 `inlineOptionsMap`의 역매핑을 관리
2. `ctx.isInlinedInterface(name)`으로 인라인 대상 여부를 확인, 해당 인터페이스는 별도 MDX 미생성
3. `ctx.getClassForInlinedInterface(name)`으로 인터페이스가 매핑된 클래스를 조회
4. 클래스 MDX의 Constructor 뒤에 "## Options" 섹션으로 삽입
5. 각 옵션 속성은 `generatePropertySignatureSection`으로 렌더링 (타입, 설명, 기본값 포함)
6. 링크도 자동 리다이렉트 — 인라인된 인터페이스로의 링크는 해당 클래스 페이지로 변환
7. `siteBaseUrls`에 매칭되는 절대 URL은 상대 경로로 자동 변환 (클라이언트 사이드 라우팅 지원)

**생성되는 클래스 페이지 구조:**

```
# AutoPlay
> 설명
**See Also:**        ← @see 태그가 있으면 summary 바로 아래에 표시
- Demo: AutoPlay
## Constructor
## Options        ← inlineOptionsMap으로 인라인된 AutoPlayOptions의 속성들
  ### animationDuration
  ### duration
  ### direction
  ...
## Properties
## Methods
## Examples       ← @example 태그가 있으면 하단에 표시
```

### DocusaurusDocumentationContext

Docusaurus 전용 컨텍스트로, 인라인 옵션 관리와 Docusaurus 특화 링크 경로를 처리합니다.

```typescript
import { DocusaurusDocumentationContext } from "./adapters/docusaurus/documentation-context";

const packageName = `${apiPackage.name}!`;
const ctx = new DocusaurusDocumentationContext(
  apiPackage,
  packageName,
  inlineOptionsMap,
  ["https://naver.github.io/egjs-flicking/"],  // siteBaseUrls
  "api"                                         // docsBasePath
);

// 인라인 옵션 관리
ctx.isInlinedInterface("AutoPlayOptions");          // true
ctx.getClassForInlinedInterface("AutoPlayOptions");  // "AutoPlay"

// Docusaurus는 anchor를 소문자로 변환
ctx.canonicalReferenceToPath(memberRef);  // "classes/Flicking.mdx#addplugins"

// 사이트 내부 URL이 상대 경로로 변환됨
// TSDoc: @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/alignment | Demo: Alignment}
// → 생성된 MDX: [Demo: Alignment](../../demos/basic/alignment.mdx)
```

`kindToFolder()` 메서드는 부모 `DocumentationContext`로부터 상속받아 사용합니다.

### Docusaurus 어댑터 아키텍처

Docusaurus 어댑터는 `GeneratorRegistry` 패턴과 공유 유틸리티(`mergeStats`, `printStats`)를 사용합니다:

```typescript
// 레지스트리 생성 (.mdx 확장자)
const registry = createDefaultRegistry(".mdx");

// 여러 패키지 처리 시 통계 누적
const totalStats = createEmptyStats();
for (const apiJsonPath of apiJsonPaths) {
  const { apiPackage, entryPoint } = loadApiPackage(apiJsonPath);

  // 패키지마다 컨텍스트 생성 (각 패키지의 참조 인덱스가 다르므로)
  const packageName = `${apiPackage.name}!`;
  const ctx = new DocusaurusDocumentationContext(
    apiPackage, packageName, inlineOptionsMap, siteBaseUrls, docsBasePath
  );

  const stats = generateMembers(entryPoint.members, outputDir, ctx, registry, generatedFiles);
  mergeStats(totalStats, stats);
}
printStats(totalStats, outputDir);
```

## 확장하기

### 새 TSDoc 태그 추가

1. **타입 정의** (`types/extracted-doc.ts`)

```typescript
interface ExtractedDocComment {
  // 새 태그 추가
  customTag: string | null;
}

// createEmptyExtractedDoc()에도 추가
```

2. **추출 로직** (`core/doc-extractor.ts`)

```typescript
// extractDocComment() 함수 내부에 추가
const customTagBlock = docComment.customBlocks.find(
  (block) => block.blockTag.tagName === "@customTag",
);
if (customTagBlock) {
  const extracted = extractFromDocNode(customTagBlock.content);
  result.customTag = extracted.text.trim();
}
```

3. **섹션 빌더** (`core/section-builder.ts`)

```typescript
export function buildCustomTagSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext,
): void {
  if (doc.customTag) {
    md.heading(2, "Custom Tag");
    md.paragraph(doc.customTag);
  }
}
```

4. **제너레이터에서 사용** (`generators/*.ts`)

```typescript
buildCustomTagSection(md, doc, currentFilePath, ctx);
```

> **참고 — `@since` 뱃지 패턴:** `buildSinceSection`은 heading 바로 아래에 `<div className="api-since">since v{version}</div>` 형태의 뱃지를 출력합니다. 제너레이터에서는 doc 추출을 heading 앞으로 올려서, heading → since → 나머지 콘텐츠 순서를 보장합니다:
>
> ```typescript
> const doc = item.tsdocComment ? extractDocComment(item.tsdocComment) : null;
> md.heading(3, item.displayName);
> if (doc) buildSinceSection(md, doc);
> // Type, summary, 등 나머지 콘텐츠
> ```

### 새 API 타입 추가

1. **레지스트리에 등록** (`core/default-registry.ts`)

```typescript
registry.register({
  kind: "Enum",
  directory: "enums",
  extension: extension,
  generate: (member, context) => generateEnumMarkdown(member as ApiEnum, ...),
});
```

2. **제너레이터 함수 추가** (`generators/`)

```typescript
export function generateEnumMarkdown(
  apiEnum: ApiEnum,
  currentFilePath: string,
  ctx: DocumentationContext,
): string {
  const md = new MarkdownBuilder();
  // ...
  return md.build();
}
```

### 마크다운 형식 커스터마이징

```typescript
class CustomMarkdownBuilder extends MarkdownBuilder {
  admonition(type: "note" | "warning", content: string): this {
    this.raw(`:::${type}`);
    this.paragraph(content);
    this.raw(":::");
    return this;
  }
}
```

## 에러 처리

```typescript
import {
  DocGeneratorError,
  TypeMismatchError,
  GenerationError,
  FileWriteError,
  isDocGeneratorError,
  formatErrorForLogging,
} from "./core/errors";

try {
  // 문서 생성
} catch (error) {
  console.error(formatErrorForLogging(error));
}
```

## 테스트

```bash
# 전체 테스트
pnpm test

# UI로 테스트 확인
pnpm test:ui

# 한 번만 실행
pnpm test:run
```

테스트 구조:

| 레이어 | 테스트 위치 | 테스트 내용 |
|--------|-------------|-------------|
| Core | `__tests__/core/` | 추출/렌더링/컨텍스트/레지스트리 |
| Parsers | `__tests__/parsers/` | TSDoc 파싱, 타입 추출 |
| Generators | `__tests__/generators/` | 마크다운 생성 |
| Utils | `__tests__/utils/` | 유틸리티 함수 |

## 참고

### api-extractor 관련

- `api-extractor.json`은 분석 대상 패키지의 루트(`packages/flicking`, `packages/flicking-plugins`)에 위치
- `--local` 옵션으로 report.md 생성을 비활성화 (exit code 1 방지)
