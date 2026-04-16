---
name: api-docs-checker
description: TSDoc 주석 포맷과 API 문서 생성 파이프라인의 정합성을 검증. TSDoc 수정 후 사용.
tools: Read, Grep, Glob, Bash
model: sonnet
---

TSDoc 주석의 품질과 API 문서 파이프라인의 정합성을 검증하라.

## 검증 절차

1. **변경된 소스 파일 식별**: `packages/flicking/src/` 및 `packages/flicking-plugins/src/`에서 TSDoc이 수정된 파일
2. **TSDoc 포맷 검증** (dev-guide/TSDOC_FORMAT_GUIDE.md 기준):
   - Option getter가 한 줄 패턴을 따르는지
   - 태그 순서: summary → @deprecated → @remarks → @dependency → @accepts → @defaultValue → @since → @see
   - @fires가 이벤트 그룹 인터페이스를 참조하는지
   - @throws가 에러 그룹을 참조하는지
   - @since가 4.0.0 이후 새 API에만 있는지
3. **파이프라인 검증**:
   - `pnpm api-docs:generate` 실행 후 에러/경고 확인
   - 생성된 MDX 파일이 정상적인지 확인

## 보고 형식

```
## TSDoc 이슈
| 파일 | 행 | 이슈 |
|------|-----|------|
| ... | ... | ... |

## 파이프라인 상태: PASS / FAIL
- (에러 출력 요약)

## 권장 수정사항
- (구체적 수정 제안)
```
