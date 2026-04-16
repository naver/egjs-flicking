# llms.txt 작성 가이드

`packages/docs/static/llms.txt`는 LLM이 이 프로젝트를 이해하기 위한 진입점이다. [llms.txt 표준](https://llmstxt.org/)을 따르며, 수동으로 관리한다.

## 핵심 원칙

- **llms.txt는 문서 사이트의 목차가 아니다.** LLM이 사용자의 질문에 답하는 데 필요한 정보를 빠르게 찾을 수 있도록 구조화한 인덱스다.
- **모든 링크는 `/llm-docs/.../.md`를 가리킨다.** HTML 페이지(`/docs/...`)가 아닌, 빌드 시 생성되는 순수 마크다운 파일을 가리켜야 LLM이 불필요한 HTML/JS/CSS 파싱 없이 내용을 읽을 수 있다.
- **스크립트와 독립적이다.** `generate-llm-docs.js`는 llms.txt를 읽거나 수정하지 않는다. 각자 독립적으로 동작한다.

## 파일 위치

```
packages/docs/static/llms.txt       ← 직접 편집 (git 추적됨)
packages/docs/static/llms-full.txt  ← 자동 생성 (gitignore)
packages/docs/static/llm-docs/      ← 자동 생성 (gitignore)
```

## 링크 규칙

### 기본 URL

```
https://naver.github.io/egjs-flicking/llm-docs/
```

### 경로 패턴

| 문서 종류 | 링크 형식 | 예시 |
|-----------|-----------|------|
| 가이드 | `llm-docs/guide/{slug}.md` | `llm-docs/guide/quickstart.md` |
| 데모 | `llm-docs/demos/{category}/{slug}.md` | `llm-docs/demos/basic/circular.md` |
| API 클래스 | `llm-docs/api/classes/{Name}.md` | `llm-docs/api/classes/Flicking.md` |
| API 인터페이스 | `llm-docs/api/interfaces/{Name}.md` | `llm-docs/api/interfaces/FlickingOptions.md` |
| API 변수 | `llm-docs/api/variables/{NAME}.md` | `llm-docs/api/variables/ALIGN.md` |
| API 함수 | `llm-docs/api/functions/{name}.md` | `llm-docs/api/functions/connectFlickingReactiveAPI.md` |
| API 타입 | `llm-docs/api/types/{Name}.md` | `llm-docs/api/types/ReadyEvent.md` |

### slug 확인 방법

- **가이드**: `docs/guide/` 내 `.mdx` 파일명 (확장자 제외)
- **데모**: `docs/demos/{category}/` 내 `.mdx` 파일명 — `sidebars.js`의 `demosSidebar`에서 카테고리와 slug 확인 가능
- **API**: `docs/api/{subcategory}/` 내 `.mdx` 파일명 — api-docs-generator가 자동 생성하므로 빌드 후 확인

## llms.txt 구조

[llms.txt 표준](https://llmstxt.org/)에 따른 구조:

```markdown
# 프로젝트명

> 한 줄 요약

상세 설명 (1-2문단)

## 섹션 제목

- [링크 텍스트](URL): 한 줄 설명
```

### 권장 섹션 구성

| 섹션 | 목적 | 포함 기준 |
|------|------|-----------|
| Getting Started | 입문자가 처음 읽어야 할 가이드 | 설치, 기본 구조, 옵션 패턴 |
| Framework Guides | 프레임워크별 사용법 | React, Vue3 등 래퍼별 가이드 |
| Plugins | 플러그인 사용법 | 각 플러그인의 데모 페이지 |
| Key Options Reference | 핵심 옵션 요약 | FlickingOptions + 인라인 설명 |
| API Essentials | 가장 자주 참조되는 API | Flicking 클래스, 옵션, 이벤트, 에러 |
| Demos | 주요 데모 코드 | 자주 묻는 패턴 위주로 선별 |
| Optional | 부가 레퍼런스 | 내부 API, 이벤트 인터페이스, 상수 |

## 작성 팁

### 각 링크의 설명은 LLM이 검색 판단에 사용한다

LLM은 llms.txt를 읽고 어떤 문서를 가져올지 결정한다. 설명에 **옵션명, 메서드명, 유스케이스 키워드**를 포함하면 검색 정확도가 올라간다.

```markdown
<!-- 나쁨: 무엇을 할 수 있는지 알 수 없음 -->
- [Flicking class](/.../Flicking.md): Main carousel class

<!-- 좋음: 어떤 질문에 이 문서가 필요한지 판단 가능 -->
- [Flicking class](/.../Flicking.md): Main carousel class — constructor, properties (`index`, `currentPanel`, `panels`, `camera`), methods (`next`, `prev`, `moveTo`, `addPlugins`, `resize`, `destroy`)
```

### 모든 문서를 나열하지 않는다

llms.txt는 `llms-full.txt`와 다르다. 전체 목록이 아니라 **LLM이 가장 자주 필요로 할 정보의 인덱스**다. 내부 유틸 함수(`camelize`, `clamp` 등)는 일반적으로 불필요하다.

### Optional 섹션을 활용한다

llms.txt 표준의 `## Optional` 섹션은 "필요할 때만 참조"라는 신호다. 내부 API, 이벤트 인터페이스 상세, 상수 등은 여기에 둔다.

### 인라인 정보로 왕복을 줄인다

LLM이 링크를 따라가지 않아도 바로 사용할 수 있는 정보는 인라인으로 제공한다:

```markdown
- Important options: `circular` (loop mode), `align` (PREV/CENTER/NEXT or px/%), ...
- **Option constraints**: `circular: true` and `bound: true` cannot be used together.
```

## 새 문서 추가 시 체크리스트

새 가이드나 데모를 추가했을 때:

1. `sidebars.js`에 추가 → `generate-llm-docs.js`가 자동으로 `.md` 생성
2. llms.txt에 해당 링크를 적절한 섹션에 추가 (필요한 경우만)
3. `node scripts/generate-llm-docs.js` 실행하여 `.md` 파일이 생성되는지 확인
4. llms.txt의 링크가 실제 파일을 가리키는지 확인

```bash
# 링크 검증
cd packages/docs
grep -oE '/llm-docs/[^ )]+\.md' static/llms.txt | while read link; do
  file="static${link}"
  [ ! -f "$file" ] && echo "MISSING: $file"
done
```

## 참고

- 빌드 파이프라인 상세: `dev-guide/DOCS_GUIDE.md` → "LLM 문서 생성 파이프라인" 섹션
- 데모 코드 구조: `dev-guide/DEMO_GUIDE.md`
- llms.txt 표준: https://llmstxt.org/
