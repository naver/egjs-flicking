---
name: test-guide
description: egjs-flicking 테스트 작성 컨벤션. 테스트 파일(*.spec.ts, *.spec.tsx) 생성·수정 시 자동 로드. unit/plugins/cfc 스위트 선택 기준, setup 파일 순서, 헬퍼 함수 패턴 안내.
user-invocable: false
---

# 테스트 작성 핵심 규칙

## 스위트 선택 기준
- **unit** (Vitest Browser Mode): CSS 레이아웃 의존 테스트 (offsetWidth, getBoundingClientRect 등)
- **plugins** (jsdom): 플러그인 로직 테스트 (CSS 불필요)
- **cfc** (jsdom): React/Vue 래퍼의 프레임워크별 동작 테스트

## 필수 규칙
- `shared/pre-setup.ts`는 `setupFiles` 배열 **첫 번째**에 위치해야 한다. 순서가 바뀌면 Axes가 잘못된 Input을 선택한다.
- jsdom 환경(plugins, cfc)에서는 실제 크기 계산이 불가능하다. CSS 레이아웃이 필요하면 unit에 작성한다.

## 상세 가이드
전체 테스트 구조, 헬퍼 함수 목록, fake timer 패턴, 테스트 실행 명령어 등 상세 사항은 @dev-guide/TEST_GUIDE.md 참조.
