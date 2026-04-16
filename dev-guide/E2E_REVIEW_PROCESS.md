# E2E 테스트 케이스 리뷰 프로세스

E2E 테스트 **인프라**는 완성되었으나, 각 테스트 케이스의 **품질**은 케이스별로 다르다. 이 문서는 팀이 각 케이스를 분담하여 점진적으로 개선하기 위한 작업 프로세스를 정의한다.

> **현재 상태**: 51개 데모 × 3 프레임워크 = 507 tests, 전체 통과, ~50초.
> CI에 편입하기 전에 각 케이스의 품질을 검증해야 한다.

## 리뷰 단위

하나의 "케이스"는 아래 3가지를 포함한다:
- **데모** — `packages/docs/src/demo/{category}/{Name}/` (vanilla.js, react.jsx, vue.vue, index.html)
- **스펙** — `packages/test-flicking/e2e/tests/{category}/{id}/{id}.yaml`
- **테스트** — `packages/test-flicking/e2e/tests/{category}/{id}/{id}.spec.ts`

리뷰는 반드시 이 3가지를 **함께** 본다. 테스트만 보고 고치면 안 된다.

## 리뷰 절차 (1 케이스당)

### Step 1. 데모 확인

데모 서버를 띄우고 실제 동작을 눈으로 확인한다.

```bash
cd packages/test-flicking/e2e
pnpm dev    # http://localhost:3010
```

확인할 것:
- [ ] **이 데모가 해당 옵션/기능을 설명하기에 적절한가?**
  - 비교 대상이 있는가? (on/off 두 인스턴스 비교 등)
  - 사용자가 차이를 직접 체감할 수 있는가?
  - 불필요하게 복잡하거나, 반대로 핵심을 보여주지 못하지는 않는가?
- [ ] **3 프레임워크(vanilla/react/vue) 모두 동일하게 동작하는가?**
  - 특히 Vanilla의 `connectFlickingReactiveAPI`는 React/Vue의 reactive 바인딩과 다르게 동작할 수 있다.
  - Vue wrapper에서 일부 prop이 전달되지 않는 경우가 있다 (예: `optimizeSizeUpdate`).

### Step 2. 스펙(YAML) 확인

```yaml
intent: "이 데모가 왜 존재하는지"
focus:
  - "테스트가 검증해야 할 포인트들"
```

확인할 것:
- [ ] **intent가 데모의 실제 목적과 일치하는가?**
- [ ] **focus가 이 데모의 핵심 동작을 빠짐없이 기술하는가?**
  - 옵션 값 확인만 나열되어 있으면 부족. "이 옵션이 ON일 때 **무엇이 달라지는지**"가 focus에 있어야 한다.

### Step 3. 테스트 코드 확인

```bash
# headed 모드로 특정 케이스만 실행
cd packages/test-flicking/e2e
npx playwright test tests/{category}/{id}/{id}.spec.ts --headed
```

확인할 것:
- [ ] **각 테스트가 focus에 명시된 포인트를 실제로 검증하는가?**
- [ ] **옵션 값 확인만 하고 있지는 않은가?** (동작 검증이 있어야 함)
- [ ] **프레임워크별 DOM 차이를 고려했는가?**
  - Vanilla: `#id` 셀렉터, `document.querySelector` 기반
  - React/Vue: `className` 기반, prop 전달 방식 차이
- [ ] **불안정한 테스트(flaky)가 아닌가?**
  - `waitForTimeout` 남용, 타이밍 의존적 assertion 등

### Step 4. 개선 및 기록

개선이 필요하면 수정하고 아래 체크리스트 테이블의 상태를 업데이트한다.

```bash
# 수정 후 전체 통과 확인
pnpm test:e2e
```

## 품질 등급

| 등급 | 기준 | 예시 |
|------|------|------|
| **A** | 데모 적절 + focus 완전 + 동작 검증 충분 | `default`, `circular`, `arrow`, `add-remove` |
| **B** | 동작 검증 있으나 focus 일부 미검증 또는 데모 개선 여지 | `threshold`, `move-type`, `pagination` |
| **C** | 렌더링/옵션 확인 위주, 핵심 동작 검증 부족 | `deceleration`, `easing`, `panels-per-view` |
| **N/A** | test harness 제약으로 특정 동작 검증 불가 (문서화 필요) | `resize-debounce`의 debounce 타이밍 차이 등 |

## 케이스별 현황

> **담당자**: 리뷰를 맡은 사람 이름. **상태**: 미검토 / 진행중 / 완료.
> 리뷰 완료 시 등급과 비고를 기입한다.

### basic (19개)

| ID | 테스트 수 | 인터랙션 | 담당자 | 상태 | 등급 | 비고 |
|----|-----------|----------|--------|------|------|------|
| default | 3 | 드래그 | | 미검토 | | |
| circular | 4 | 드래그 + API | | 미검토 | | |
| align-options | 2 | 드래그 | | 미검토 | | |
| bound | 3 | 드래그 | | 미검토 | | |
| adaptive | 2 | API | | 미검토 | | |
| default-index | 1 | 없음 | | 미검토 | | 옵션 확인만 |
| panels-per-view | 2 | 없음 | | 미검토 | | 비율 계산 검증 있음 |
| move-type | 2 | 드래그 | | 미검토 | | strict 한 칸 이동 검증 |
| threshold | 3 | 드래그 | | 미검토 | | 거리별 이동/미이동 검증 |
| duration | 3 | 드래그 | | 미검토 | | 애니메이션 시간 차이 검증 |
| easing | 2 | 드래그 | | 미검토 | | easing 함수 값 + 드래그 이동 |
| deceleration | 2 | 드래그 | | 미검토 | | 옵션 값 + 드래그 이동만 |
| input-type | 4 | 드래그 | | 미검토 | | touch-only 마우스 차단 검증 |
| disable-input | 4 | 드래그 + 클릭 + API | | 미검토 | | 토글 버튼 검증 포함 |
| interruptable | 4 | 드래그 + 클릭 | | 미검토 | | 애니메이션 중단 검증 |
| prevent-click | 4 | 드래그 + 클릭 | | 미검토 | | 드래그 후 클릭 차단/허용 |
| nested | 3 | 드래그 | | 미검토 | | 내부 Flicking 드래그 |
| vertical | 2 | 수직 드래그 | | 미검토 | | |
| auto-init | 2 | 클릭 | | 미검토 | | 수동 init 버튼 |

### advanced (19개 + 1 보류)

| ID | 테스트 수 | 인터랙션 | 담당자 | 상태 | 등급 | 비고 |
|----|-----------|----------|--------|------|------|------|
| add-remove | 5 | 클릭 | | 미검토 | | append/prepend/remove 전체 검증 |
| carousel | 5 | 드래그 + API | | 미검토 | | circular 순환 검증 |
| coverflow | 3 | 드래그 | | 미검토 | | transform 변화 검증 |
| pagination | 4 | 드래그 + 클릭 | | 미검토 | | dot 클릭 + active 동기화 |
| prev-next | 5 | 클릭 + API | | 미검토 | | disabled 상태 전환 + nav-info |
| progress-bar | 4 | 드래그 + API | | 미검토 | | Flicking API로 progress 조회 |
| infinite-scroll | 5 | 드래그 | | 미검토 | | needPanel 트리거 test harness 제약 있음 |
| virtual-scroll | 5 | 드래그 + API | | 미검토 | | DOM 최소화 + 500번째 패널 점프 |
| render-only-visible | 4 | 드래그 | | 미검토 | | DOM 수 비교 |
| lazy-load | 4 | 드래그 | | 미검토 | | 이미지 로드 수 증가 검증 |
| auto-resize | 3 | 슬라이더 | | 미검토 | | 슬라이더 → 너비 반영 |
| resize-debounce | 4 | 슬라이더 | | 미검토 | | 로그 기록 검증, 타이밍 비교 제한적 |
| observe-panel-resize | 4 | 클릭 | | 미검토 | | Expand → 레이아웃 재계산 |
| fullpage-scroll | 4 | 수직 드래그 | | 미검토 | | 수직/수평 전환 테스트 제한적 |
| cross-flicking | 3 | 드래그 + API | | 미검토 | | 수직 외부 + 수평 내부 |
| animation-threshold | 5 | 드래그 + 클릭 | | 미검토 | | threshold 짧은 드래그 즉시 이동 |
| fractional-size | 3 | 드래그 | | 미검토 | | defaultIndex + 드래그 |
| use-css-order | 4 | 클릭 | | 미검토 | | CSS order 속성 변경 검증 |
| resize-on-contents-ready | 3 | API | | 미검토 | | 이미지 로드 → 크기 재계산 |
| ~~optimize-size-update~~ | - | - | | 보류 | N/A | 옵션 자체에 이슈 있음. 데모·API 문서에서도 제외된 상태. 이슈 해결 후 E2E 구축 예정. |

### plugins (7개)

| ID | 테스트 수 | 인터랙션 | 담당자 | 상태 | 등급 | 비고 |
|----|-----------|----------|--------|------|------|------|
| arrow | 3 | 클릭 | | 미검토 | | prev/next 클릭 이동 |
| autoplay | 2 | 대기 | | 미검토 | | 2초 후 자동 이동 |
| fade | 2 | 드래그 | | 미검토 | | opacity 변화 |
| pagination | 3 | 클릭 | | 미검토 | | bullet 클릭 이동 |
| parallax | 2 | 드래그 | | 미검토 | | transform 변화 |
| perspective | 3 | 드래그 | | 미검토 | | 3D transform 변화 |
| sync | 4 | 드래그 | | 미검토 | | 메인 → 썸네일 active 동기화 |

### reactive (5개)

| ID | 테스트 수 | 인터랙션 | 담당자 | 상태 | 등급 | 비고 |
|----|-----------|----------|--------|------|------|------|
| coverflow | 3 | 드래그 | | 미검토 | | rotateY transform + circular |
| pagination | 3 | 클릭 | | 미검토 | | 버튼 클릭 이동 |
| parallax | 3 | 드래그 | | 미검토 | | translateX 변화 |
| prev-next | 4 | 클릭 + API | | 미검토 | | disabled 상태 전환 |
| progress-bar | 4 | 드래그 + API | | 미검토 | | progress 값 변화 |

## 알려진 test harness 제약

아래 사항은 E2E test harness 구조상 테스트가 어렵거나 불가능한 영역이다. 리뷰 시 이 제약을 감안해야 한다.

| 제약 | 영향받는 케이스 | 설명 |
|------|----------------|------|
| Vanilla `connectFlickingReactiveAPI` | progress-bar, pagination (advanced) | Vanilla에서 reactive subscribe가 DOM에 반영되지 않는 경우 있음. Flicking API로 직접 조회하여 우회. |
| `needPanel` 이벤트 트리거 | infinite-scroll (vanilla/react) | `moveTo`/`next()` 호출 시 needPanel이 발생하지 않는 경우 있음. Vue에서는 정상 동작. |
| Vue wrapper prop 전달 | optimize-size-update, infinite-scroll | Vue wrapper가 일부 prop을 내부 Flicking에 전달하지 않을 수 있음 (예: `optimizeSizeUpdate`, `needPanelThreshold`). |
| 슬라이더 상호작용 | auto-resize, resize-debounce | `slider.fill()` + `dispatchEvent("input")`으로 동작하지만 실제 사용자 슬라이드와 다를 수 있음. |
| 방향 전환 후 재초기화 | fullpage-scroll | 토글 버튼 클릭으로 Flicking이 destroy/recreate되면 `__flickingInstances` 재등록 타이밍 문제. |

## 작업 규칙

1. **한 번에 1 케이스만** 작업한다. 여러 케이스를 동시에 수정하면 실패 원인 추적이 어렵다.
2. **수정 후 반드시 `pnpm test:e2e`로 전체 통과를 확인**한다. 다른 케이스를 깨뜨리지 않았는지 확인.
3. **데모 자체가 부적절하면 데모를 먼저 고친다**. 테스트는 데모를 따라간다.
4. **test harness 제약으로 검증 불가한 항목은 비고에 기록**한다. 억지로 테스트를 만들지 않는다.
5. 리뷰 완료 후 이 문서의 테이블을 업데이트한다.

## 참고 문서

- 테스트 작성법, 헬퍼 함수, 스펙 구조 → [E2E_TEST_GUIDE.md](./E2E_TEST_GUIDE.md)
