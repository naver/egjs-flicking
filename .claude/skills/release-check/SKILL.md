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
6. **빌드**: `pnpm packages:build` — 모든 패키지 빌드 성공
7. **문서 빌드**: `pnpm docs:build` — API 문서 + Docusaurus 빌드 성공
8. **TSDoc 검증**: `pnpm api-docs:generate` 실행 후 에러/경고 확인. 새로 추가된 공개 API에 `@since` 태그가 있는지, 태그 순서가 가이드에 맞는지 검증 (dev-guide/TSDOC_FORMAT_GUIDE.md 기준)
9. **버전 일관성**: 각 패키지의 `package.json` 버전이 일치하는지 확인
10. **CHANGELOG**: 최신 변경사항이 반영되어 있는지 확인

## 보고 형식

```
| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | Unit 테스트 | PASS/FAIL | (실패 시 상세) |
...
```

## 릴리즈 절차 상세

@dev-guide/DOCS_GUIDE.md 참조.
