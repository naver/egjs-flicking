# egjs-flicking 모노레포

egjs-flicking은 Naver가 개발하는 JavaScript 캐러셀/슬라이더 라이브러리다. 이 레포지토리는 pnpm 워크스페이스 기반 모노레포다.

## 패키지 구조

| 패키지 | 경로 | 역할 |
|--------|------|------|
| `@egjs/flicking` | `packages/flicking/` | 코어 라이브러리 (Vanilla JS) |
| `@egjs/flicking-plugins` | `packages/flicking-plugins/` | 플러그인 (AutoPlay, Arrow 등) |
| `@egjs/react-flicking` | `packages/react-flicking/` | React 래퍼 |
| `@egjs/vue3-flicking` | `packages/vue3-flicking/` | Vue 3 래퍼 |
| `@test/unit` 외 | `packages/test-flicking/` | 전체 테스트 스위트 (unit / plugins / cfc) |
| docs | `packages/docs/` | Docusaurus 문서 사이트 |
| `api-docs-generator` | `packages/api-docs-generator/` | API 문서 자동 생성 (TypeScript → MDX) |

## 핵심 규칙

### dev/ 파일 수정
- **`dev/{subdir}/App.*` 하나만 교체한다.** 모든 `dev/` 하위 디렉토리(scratch, basic-sample, plugin-check 등)의 `index.html`, `main.*`은 절대 수정하지 않는다.
- dev 파일에서는 `@egjs/` 대신 `@dev/` alias를 사용한다.

### Import Alias (dev 파일 전용)

| alias | 대상 |
|-------|------|
| `@dev/flicking` | `@egjs/flicking` 코어 |
| `@dev/react-flicking` | React 래퍼 |
| `@dev/vue3-flicking` | Vue 3 래퍼 |
| `@dev/plugins` | 플러그인 |
| `@dev/flicking-css` | 코어 CSS (사전 빌드 불필요, HMR 지원) |
| `@dev/plugins-css` | 플러그인 CSS |

### 테스트
- `shared/pre-setup.ts`는 `setupFiles` 배열 **첫 번째**에 위치해야 한다. 순서가 바뀌면 Axes가 잘못된 Input을 선택한다.
- CSS 레이아웃(`offsetWidth` 등)이 필요한 테스트는 unit(Vitest Browser Mode)에 작성한다. jsdom 환경(plugins, cfc)에서는 실제 크기 계산이 불가능하다.

### 문서
- `llms.txt`의 링크는 HTML(`/docs/...`)이 아닌 `/llm-docs/.../.md`를 가리킨다.
- 데모 코드는 TSX 내 템플릿 리터럴이 아닌 별도 파일(`react.jsx`, `vue.vue`, `vanilla.js`)로 작성한다.
- API 자동 생성 파일(`docs/api/`, `blog/release-*.md`, `static/llm-docs/`)은 직접 수정하지 않는다.

## 자주 쓰는 명령어

```bash
# 개발 서버 (HMR 지원)
pnpm dev:all          # 모든 패키지 동시 실행 (포트 3000~3003)
pnpm dev:flicking     # flicking만 (3000)
pnpm dev:react        # react-flicking (3001)
pnpm dev:vue          # vue3-flicking (3002)
pnpm dev:plugins      # flicking-plugins (3003)

# 테스트
pnpm test             # unit 테스트 (Vitest Browser Mode + Playwright)
pnpm test:plugins     # plugins 테스트 (jsdom)
pnpm test:cfc         # Cross-Framework 테스트 (jsdom)
pnpm test:e2e         # E2E 테스트 (Playwright + 데모 기반)
pnpm test:all         # 전체 순차 실행 (unit + plugins + cfc)

# 코드 품질 (Biome)
pnpm lint             # lint + format 검사
pnpm lint:fix         # 자동 수정
pnpm format           # 포맷팅만 적용

# 퍼블리시 (Publish: npm 패키지 배포, 상세 → dev-guide/PUBLISH_GUIDE.md)
pnpm publish:version          # 래퍼 버전 동기화 [patch|minor|major]
pnpm publish:build            # 전체 빌드
pnpm publish:stable           # 전체 빌드 + 정식 퍼블리시
pnpm publish:stable:{pkg}     # 개별 빌드 + 정식 퍼블리시 (flicking|react|vue|plugins)
pnpm publish:beta             # 전체 빌드 + 베타 퍼블리시
pnpm publish:beta:{pkg}       # 개별 빌드 + 베타 퍼블리시

# 릴리즈 (Release: changelog + commit + tag + push)
pnpm release          # 전체 릴리즈 파이프라인
pnpm release:dry-run  # 실행하지 않고 명령어만 출력

# 문서 배포 (Deploy: 문서 사이트)
pnpm docs:build       # API 문서 생성 + Docusaurus 빌드
pnpm docs:deploy      # 빌드 + gh-pages 배포 (upstream)
pnpm api-docs:generate && pnpm api-docs:docusaurus  # API 문서만 재생성
```

## 이슈 재현 (빠른 참조)

이슈 재현 요청 시 scratch 패턴을 사용한다:

| 대상 | App 파일 | 포트 | 명령어 |
|------|----------|------|--------|
| 코어 (Vanilla) | `packages/flicking/dev/scratch/App.js` | 3000 | `pnpm dev:flicking` |
| React | `packages/react-flicking/dev/scratch/App.tsx` | 3001 | `pnpm dev:react` |
| Vue 3 | `packages/vue3-flicking/dev/scratch/App.vue` | 3002 | `pnpm dev:vue` |
| 플러그인 | `packages/flicking-plugins/dev/scratch/App.js` | 3003 | `pnpm dev:plugins` |

확인 URL: `http://localhost:{포트}/scratch/`

**규칙**: App 파일 상단에 이슈 번호 주석 기록, 스타일은 인라인으로 작성.
프레임워크별 템플릿 → `dev-guide/ISSUE_REPRODUCTION_GUIDE.md`

## 가이드 인덱스

| 가이드 | 경로 | 역할 | 업데이트 시점 |
|--------|------|------|--------------|
| 개발 환경 | `dev-guide/DEV_GUIDE.md` | dev 서버, HMR, alias, 빌드 검증 모드, 타입 지원 | dev 환경 구성 변경 시 |
| 이슈 재현 | `dev-guide/ISSUE_REPRODUCTION_GUIDE.md` | scratch 패턴 워크플로우, 프레임워크별 템플릿 | scratch 패턴 변경 시 |
| 테스트 | `dev-guide/TEST_GUIDE.md` | Vitest 설정, unit/plugins/cfc 구조, 테스트 작성법 | 테스트 환경·구조 변경 시 |
| 린트/포맷 | `dev-guide/LINT_AND_FORMAT.md` | Biome 설정, 규칙 요약, Git Hooks, IDE 설정 | Biome 설정 변경 시 |
| TSDoc | `dev-guide/TSDOC_FORMAT_GUIDE.md` | API 주석 태그·포맷, 이벤트·에러 추가 절차 | TSDoc 컨벤션 변경 시 |
| 데모 | `dev-guide/DEMO_GUIDE.md` | Sandpack 데모 구조, 프레임워크별 코드 패턴 | 데모 컴포넌트·구조 변경 시 |
| 문서 사이트 | `dev-guide/DOCS_GUIDE.md` | 버전 관리 방침, LLM 문서 파이프라인, 배포 절차 | 배포·LLM 파이프라인 변경 시 |
| llms.txt | `dev-guide/LLMS_TXT_GUIDE.md` | llms.txt 작성 규칙, 링크 패턴, 체크리스트 | llms.txt 구조·링크 규칙 변경 시 |
| E2E 테스트 | `dev-guide/E2E_TEST_GUIDE.md` | 데모 기반 E2E 테스트 구조, 스펙/테스트 작성법 | E2E 테스트 환경·구조 변경 시 |
| E2E 리뷰 | `dev-guide/E2E_REVIEW_PROCESS.md` | 케이스별 리뷰 절차, 품질 등급, 현황 테이블 | E2E 케이스 리뷰 진행 시 |
| 퍼블리시 | `dev-guide/PUBLISH_GUIDE.md` | 버전 정책, 배포 파이프라인, workspace: 프로토콜 | 배포 환경·버전 정책 변경 시 |
| 하네스 | `dev-guide/HARNESS_GUIDE.md` | Claude Code 스킬, 훅, 서브에이전트 시스템 | 스킬·훅·에이전트 추가/변경 시 |

## 문서 유지보수 원칙

### 단일 출처 원칙
- 어떤 내용이든 **한 곳에만 존재**한다. 다른 곳에서는 링크로 참조한다.
- AGENTS.md / CLAUDE.md는 규칙·진입점만 담는다. 상세 내용은 `dev-guide/`에만 있다.
- `dev-guide/` 파일 간에도 중복을 만들지 않는다. 관련 파일끼리 서로 링크로 참조한다.

### 업데이트 책임표
| 변경 사항 | 업데이트해야 할 파일 |
|-----------|---------------------|
| 핵심 규칙·워크플로우 변경 | AGENTS.md + 해당 dev-guide 파일 |
| 명령어 추가·변경 | AGENTS.md (요약) + 해당 dev-guide 파일 (상세) |
| 테스트 환경·구조 변경 | `dev-guide/TEST_GUIDE.md` |
| dev 서버·빌드 환경 변경 | `dev-guide/DEV_GUIDE.md` |
| 배포·LLM 파이프라인 변경 | `dev-guide/DOCS_GUIDE.md` |
| llms.txt 링크 규칙 변경 | `dev-guide/LLMS_TXT_GUIDE.md` |
| Biome 설정 변경 | `dev-guide/LINT_AND_FORMAT.md` |
| TSDoc 컨벤션 변경 | `dev-guide/TSDOC_FORMAT_GUIDE.md` |
| 데모 구조·컴포넌트 변경 | `dev-guide/DEMO_GUIDE.md` |
| E2E 테스트 환경·구조 변경 | `dev-guide/E2E_TEST_GUIDE.md` |
| E2E 케이스 리뷰 진행 | `dev-guide/E2E_REVIEW_PROCESS.md` |
| 배포 환경·버전 정책 변경 | `dev-guide/PUBLISH_GUIDE.md` |
| 스킬·훅·에이전트 변경 | `dev-guide/HARNESS_GUIDE.md` |

### 금지 사항
- AGENTS.md / CLAUDE.md에 `dev-guide/` 내용을 복사하지 않는다.
- `dev-guide/` 파일에 다른 `dev-guide/` 파일의 내용을 그대로 복사하지 않는다.
