---
name: tsdoc-format
description: egjs-flicking TSDoc 주석 포맷 컨벤션. packages/flicking/src/ 또는 packages/flicking-plugins/src/ 내 TypeScript 소스의 TSDoc 주석(/** ... */) 수정 시 자동 로드.
user-invocable: false
---

# TSDoc 작성 핵심 규칙

## 태그 순서
summary → @deprecated → @remarks → @dependency → @accepts → @defaultValue → @since → @see

## 주요 패턴
- **Option getter**: `/** Current value of the {@link XxxOptions.yyy | yyy} option. */` (한 줄)
- **@fires**: 이벤트를 발생시키는 메서드에 그룹 인터페이스 참조 (`@fires {@link MovementEvents}`)
- **@throws**: 에러 그룹 참조 (`@throws {@link MovementErrors}`)
- **@since**: v4.0.0 이후 추가된 API에만 기재 (`@since 4.1.0`)
- **@see 데모**: `@see {@link https://naver.github.io/egjs-flicking/demos/... | 데모 제목}`

## 상세 가이드
전체 태그 목록, 커스텀 태그(@dependency, @accepts, @fires 등), 이벤트/에러 추가 절차는 @dev-guide/TSDOC_FORMAT_GUIDE.md 참조.
