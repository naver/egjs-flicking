# Claude Code 하네스 가이드

Claude Code의 Skills, Hooks, Subagents 시스템을 관리하는 가이드.

## 개요

이 프로젝트의 Claude Code 하네스는 세 계층으로 구성된다:

| 계층 | 역할 | 위치 |
|------|------|------|
| **AGENTS.md** | 항상 로드되는 핵심 규칙·진입점 | 루트 |
| **Hooks** | 규칙의 물리적 enforcement (판단 불필요) | `.claude/settings.json` |
| **Skills** | 워크플로우 실행 + 도메인 지식 (필요 시 로드) | `.claude/skills/` |
| **Subagents** | 격리된 컨텍스트에서 검증 작업 | `.claude/agents/` |

## Hooks 인벤토리

| 이벤트 | Matcher | 동작 | 스크립트 |
|--------|---------|------|----------|
| PreToolUse | `Edit\|Write` | dev/ 보호 파일 수정 차단 | `.claude/hooks/protect-dev-files.sh` |
| PostToolUse | `Edit\|Write` | Biome 자동 포맷 (`check --write`) | 인라인 |
| Notification | (전체) | macOS 데스크톱 알림 | 인라인 |

### 훅 테스트 방법

```bash
# protect-dev-files.sh 차단 확인
echo '{"tool_input":{"file_path":"packages/flicking/dev/scratch/index.html"}}' | .claude/hooks/protect-dev-files.sh
echo $?  # → 2 (차단)

# 허용 확인
echo '{"tool_input":{"file_path":"packages/flicking/dev/scratch/App.js"}}' | .claude/hooks/protect-dev-files.sh
echo $?  # → 0 (통과)
```

## Skills 인벤토리

### 자동 호출 (Claude가 관련 작업 시 자동 로드)

| Skill | 트리거 | 참조 가이드 |
|-------|--------|------------|
| `test-guide` | `test-flicking/` 내 *.spec.ts 작업 | [TEST_GUIDE.md](TEST_GUIDE.md) |
| `tsdoc-format` | `flicking/src/` TSDoc 수정 | [TSDOC_FORMAT_GUIDE.md](TSDOC_FORMAT_GUIDE.md) |
| `demo-patterns` | `docs/src/demo/` 작업 | [DEMO_GUIDE.md](DEMO_GUIDE.md) |

### 사용자 호출 (`/명령어`로 실행)

| Skill | 인자 | context | 참조 가이드 |
|-------|------|---------|------------|
| `/reproduce` | 이슈 번호/URL | inline | [ISSUE_REPRODUCTION_GUIDE.md](ISSUE_REPRODUCTION_GUIDE.md) |
| `/add-demo` | 데모 스펙 설명 | inline | [DEMO_GUIDE.md](DEMO_GUIDE.md) + [E2E_TEST_GUIDE.md](E2E_TEST_GUIDE.md) + [TSDOC_FORMAT_GUIDE.md](TSDOC_FORMAT_GUIDE.md) |
| `/release-check` | (없음) | fork | [DOCS_GUIDE.md](DOCS_GUIDE.md) |

## Subagents 인벤토리

| Agent | 모델 | 용도 |
|-------|------|------|
| `cross-framework-checker` | sonnet | 코어 변경의 React/Vue 래퍼 영향 분석 |
| `api-docs-checker` | sonnet | TSDoc 포맷 + API 문서 파이프라인 검증 |

## 추가·수정 방법

### Skill 추가

1. `.claude/skills/{name}/SKILL.md` 생성
2. frontmatter 설정:
   - 자동 호출: `user-invocable: false` + 정확한 `description`
   - 사용자 호출: `disable-model-invocation: true`
3. dev-guide 내용을 복사하지 않고 `@dev-guide/` 경로로 참조
4. 이 가이드의 인벤토리 테이블 업데이트

### Hook 추가

1. `.claude/settings.json`의 `hooks` 객체에 이벤트 추가
2. 복잡한 로직은 `.claude/hooks/` 스크립트로 분리 (`chmod +x` 필요)
3. 반드시 판단이 불필요한 결정적(deterministic) 동작만 hook으로 구현
4. 이 가이드의 인벤토리 테이블 업데이트

### Subagent 추가

1. `.claude/agents/{name}.md` 생성
2. `tools` 필드에 최소 필요 도구만 지정
3. 이 가이드의 인벤토리 테이블 업데이트

## 유지보수 원칙

- **Skill은 dev-guide의 실행 가능한 래퍼**다. 가이드 내용이 바뀌면 skill의 요약도 검토한다.
- **Hook은 AGENTS.md 규칙의 물리적 보장**이다. 규칙이 바뀌면 hook도 업데이트한다.
- **AGENTS.md에는 harness 상세를 넣지 않는다.** 이 가이드에만 기술한다.

## 미해결 과제

### 코드 변경 시 연관 산출물 동기화

코드가 변경되면 다음이 함께 업데이트되어야 할 수 있다:
- 테스트 (unit/plugins/cfc/e2e)
- TSDoc 주석
- dev-guide 문서
- AGENTS.md (핵심 규칙이 바뀐 경우)

현재는 AGENTS.md의 업데이트 책임표에 의존하지만, 긴 세션에서 누락될 수 있다.

**검토한 접근법:**
- **Stop hook (prompt 타입)**: 매 응답마다 누락 체크. 효과적이지만 단순 질문에도 실행되어 비효율적.
- **커밋 시점 체크**: diff를 분석해서 누락된 연관 작업을 확인. 타이밍이 적절하고 분석 범위가 명확.
- **AGENTS.md 규칙 강화**: 비용 없지만 보장도 없음.

**현재 결정**: AGENTS.md 책임표로 운영하되, 누락이 반복되면 커밋 시점 prompt hook으로 승격한다.
