---
name: release-check
description: 릴리즈 전 체크리스트 순회. 테스트, 린트, 빌드, 문서 생성, 버전 일관성을 검증한다.
disable-model-invocation: true
context: fork
agent: general-purpose
---

릴리즈 전 체크리스트를 순회한다.

## 검증 항목

다음 항목을 순서대로 실행하고 결과를 보고한다:

1. **Unit 테스트**: `pnpm test` — 전체 통과 여부
2. **Plugins 테스트**: `pnpm test:plugins` — 전체 통과 여부
3. **CFC 테스트**: `pnpm test:cfc` — 전체 통과 여부
4. **E2E 테스트**: `pnpm test:e2e` — 전체 통과 여부
5. **Lint**: `pnpm lint` — 오류 없는지
6. **빌드**: `pnpm publish:build` — 배포 대상 패키지 전체 빌드 성공
7. **게시 파일**: `pnpm release:pack-check` — 게시 금지 파일·workspace 의존 치환 오류가 없는지, npm latest 대비 추가·제거 파일과 크기 변화 (6번 빌드 뒤에 실행)
8. **문서 빌드**: `pnpm docs:build` — API 문서 + Docusaurus 빌드 성공
9. **TSDoc 검증**: `pnpm api-docs:generate` 실행 후 에러/경고 확인. 새로 추가된 공개 API에 `@since` 태그가 있는지, 태그 순서가 가이드에 맞는지 검증 (dev-guide/TSDOC_FORMAT_GUIDE.md 기준)
10. **설정 스크립트 테스트**: `pnpm test:config` — sync-version / release 스크립트 단위 테스트
11. **릴리즈 상태**: `pnpm -s release:status --json --fetch` — 버전·태그·게시 상태, `clean`·`pushed`·`baseBehind`, `stage`가 예상과 맞는지 확인

## 보고 형식

```
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Unit 테스트 | PASS/FAIL | (실패 시 상세) |
...
```

## 릴리즈 절차 상세

배포 절차 자체는 `/release` 스킬이 수행한다. 이 스킬은 그 4단계(머지 전 검증)에서 전체 스위트를 돌릴 때 쓴다.
정책·명령어 레퍼런스 → @dev-guide/PUBLISH_GUIDE.md
