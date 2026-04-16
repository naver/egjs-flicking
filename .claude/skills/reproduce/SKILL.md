---
name: reproduce
description: GitHub 이슈를 scratch 패턴으로 재현. 이슈 번호 또는 URL을 인자로 받아 적절한 프레임워크의 scratch App 파일을 생성하고 dev 서버 안내.
disable-model-invocation: true
argument-hint: "[이슈 번호 또는 URL]"
allowed-tools: Bash(gh *) Read Write Edit
---

이슈 $ARGUMENTS를 재현한다.

## 워크플로우

1. **이슈 내용 파악**: `gh issue view $ARGUMENTS` 또는 URL에서 이슈 상세 확인
2. **프레임워크 결정**: 이슈 내용을 분석하여 대상 패키지 선택
   - 코어 로직 → `flicking` (Vanilla)
   - React 관련 → `react-flicking`
   - Vue 관련 → `vue3-flicking`
   - 플러그인 → `flicking-plugins`
   - 불확실하면 `react-flicking` 기본
3. **scratch/App 파일 작성**: 해당 패키지의 `dev/scratch/App.*` 파일을 재현 코드로 덮어쓰기
4. **dev 서버 안내**: 실행 명령어와 확인 URL 출력

## 규칙 (필수)
- **App 파일만 수정**한다. `index.html`, `main.*`은 절대 수정하지 않는다.
- dev 파일에서는 `@egjs/` 대신 **`@dev/` alias**를 사용한다.
- 파일 **상단에 이슈 번호와 설명을 주석**으로 기록한다.
- 스타일은 **인라인**으로 작성한다 (외부 CSS 파일 없음).

## 프레임워크별 템플릿, alias 테이블, 플러그인 CSS 패턴

@dev-guide/ISSUE_REPRODUCTION_GUIDE.md 참조.
