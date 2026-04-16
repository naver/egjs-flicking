# TSDoc 작성 가이드

이 문서는 egjs-flicking 프로젝트의 TSDoc 작성 규칙과 포맷을 정리합니다.

---

## 1. 사용 가능한 태그

### 1.1 표준 TSDoc 태그

| 태그 | 설명 | 사용 예시 |
|------|------|----------|
| `@param` | 파라미터 설명 | `@param index - The index of the panel` |
| `@returns` | 반환값 설명 | `@returns Promise that resolves...` |
| `@throws` | 발생 가능한 에러 그룹 | `@throws {@link MovementErrors}` |
| `@remarks` | 추가 설명, 주의사항, 상세 내용 | 여러 줄로 작성 가능 |
| `@privateRemarks` | 내부 구현 설명 (API 문서에 미표시) | 구현 세부사항 설명 |
| `@example` | 사용 예제 (코드 블록) | ` ```ts ... ``` ` |
| `@defaultValue` | 옵션/속성의 기본값 | `@defaultValue 0` |
| `@see` | 관련 참조 링크 | `@see {@link Flicking.init}` |
| `@deprecated` | 폐기 예정 | `@deprecated Use {@link 대체옵션} instead` |
| `@internal` | 내부 전용. API Extractor가 이 태그를 인식하여 외부 API 문서에서 제외함 | 공개하지 않고 내부에서만 사용하는 코드 |
| `@readonly` | 읽기 전용 | getter 속성 |
| `@public` | 공개 API | interface, class |

### 1.2 커스텀 태그

| 태그 | 설명 | 사용 위치 | 사용 예시 |
|------|------|----------|----------|
| `@fires` | 메서드가 발생시키는 이벤트 | 메서드 | `@fires {@link ReadyEvent}` |
| `@dependency` | 옵션 간 의존 관계 | Options | `@dependency Requires - {@link FlickingOptions.panelsPerView}` |
| `@accepts` | 옵션이 받아들이는 상수 값 | Options | `@accepts {@link ALIGN}` |
| `@since` | 해당 API가 도입된 버전 | 옵션, 메서드, 이벤트, 클래스 등 | `@since 4.2.0` |

### 1.3 @dependency 유형

| 유형 | 설명 |
|------|------|
| `Mutual Exclusive` | 상호 배타적 옵션 (하나만 활성화 가능) |
| `Conditional` | 특정 조건에서만 활성화 |
| `Related` | 관련 옵션 (함께 사용 권장) |
| `Requires` | 필수 의존성 (다른 옵션이 필요) |

### 1.4 @accepts 태그

옵션이 받아들이는 값이 상수 객체(예: `ALIGN`, `MOVE_TYPE`)로 정의되어 있을 때 사용합니다.

**패턴:** `@accepts {@link 상수명}`

```typescript
/**
 * Align position of the panels within viewport.
 * @accepts {@link ALIGN}
 * @defaultValue "center"
 */
align: LiteralUnion<ValueOf<typeof ALIGN>> | number | { ... };
```

**규칙:**
- TSDoc에는 `@accepts {@link 상수명}`만 작성. 값 나열은 하지 않음
- api-docs-generator가 상수 정의에서 값을 자동 추출하여 렌더링
- 렌더링 결과: `**Accepts:** [ALIGN](link) - "prev" | "center" | "next"`
- 배치 순서: `@remarks` 뒤, `@defaultValue` 앞

---

## 2. 클래스 TSDoc 포맷

### 2.1 클래스 정의

Flicking 클래스처럼 옵션이 별도 인터페이스로 분리된 경우, 클래스 자체에는 별도의 TSDoc 주석이 없으며 **생성자(constructor)에 TSDoc을 작성**합니다.

단, 플러그인 클래스는 클래스 레벨에 summary와 `@see` 데모 링크를 작성합니다. 플러그인은 클래스 하나가 곧 하나의 기능 단위이므로 클래스 설명 바로 아래에 데모 링크가 표시됩니다:

```typescript
/**
 * Plugin that allows you to automatically move to the next/previous panel on a specific time basis
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/autoplay | Demo: AutoPlay}
 */
class AutoPlay implements Plugin {
  // ...
}
```

**Flicking 클래스:**

```typescript
class Flicking extends Component<FlickingEvents> {
  /** Creates a new Flicking instance
   * @param root - A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
   * @param options - A {@link FlickingOptions} object
   * @throws {@link InitializationErrors}
   * @example
   * ```ts
   * import Flicking from "@egjs/flicking";
   *
   * // Creating new instance of Flicking with HTMLElement
   * const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });
   *
   * // Creating new instance of Flicking with CSS selector
   * const flicking2 = new Flicking(".flicking-viewport", { circular: true });
   * ```
   */
  public constructor(root: HTMLElement | string, options: Partial<FlickingOptions> = {}) {
    // ...
  }
}
```

### 2.2 Static 속성

```typescript
/**
 * Version info string
 * @example
 * ```ts
 * Flicking.VERSION;  // ex) 4.0.0
 * ```
 */
public static readonly VERSION: string = "#__VERSION__#";
```

### 2.3 Getter/Setter 속성

**Getter (읽기 전용 속성):**
```typescript
/**
 * {@link Control} instance that manages user input and panel movement animations
 * @remarks
 * The concrete Control implementation is selected based on {@link FlickingOptions.moveType | moveType} option.
 * @privateRemarks
 * The control instance is created during construction by {@link Flicking._createControl}.
 * @readonly
 */
public get control(): Control {
  return this._control;
}
```

**옵션을 참조하는 Getter (IMPORTANT):**

Options 인터페이스의 속성을 반환하는 getter는 **한 줄 패턴**으로 통일합니다.
옵션의 동작 설명은 Options 인터페이스에만 작성하고, getter에서는 중복하지 않습니다:

```typescript
/** Current value of the {@link FlickingOptions.circular | circular} option. */
public get circular(): FlickingOptions["circular"] {
  return this._circular;
}
```

플러그인도 동일한 패턴을 따릅니다:
```typescript
/** Current value of the {@link AutoPlayOptions.duration | duration} option. */
public get duration() { return this._duration; }
```

**작성 규칙:**
- 패턴: `/** Current value of the {@link XxxOptions.yyy | yyy} option. */`
- 옵션 설명을 getter에 중복 작성하지 않습니다 — Options 인터페이스가 단일 소스(single source of truth)입니다
- `@deprecated` 옵션은 deprecated 태그를 유지합니다:
  ```typescript
  /**
   * @deprecated Use {@link Flicking.externalRenderer | externalRenderer} instead.
   * Current value of the {@link FlickingOptions.renderExternal | renderExternal} option.
   */
  ```

**복잡한 Getter 예시:**
```typescript
/**
 * Whether Flicking's {@link Flicking.init} is called.
 * @remarks
 * This is `true` when {@link Flicking.init} is called, and is `false` after calling {@link Flicking.destroy}.
 * Use this to check if Flicking is ready before calling certain methods that require initialization.
 * @defaultValue false
 * @readonly
 * @example
 * ```ts
 * if (flicking.initialized) {
 *   flicking.setStatus(status);
 * } else {
 *   await flicking.init();
 *   flicking.setStatus(status);
 * }
 * ```
 */
public get initialized(): boolean {
  return this._initialized;
}
```

**Setter:**
```typescript
/**
 * Sets {@link FlickingOptions.align}.
 * @privateRemarks
 * Setting this value updates the renderer and camera alignment, and triggers a resize operation.
 */
public set align(val: FlickingOptions["align"]) {
  // ...
}
```

### 2.4 메서드

**기본 메서드:**
```typescript
/**
 * Initialize Flicking and move to the default index.
 * @remarks
 * This method is automatically called in the constructor when {@link FlickingOptions.autoInit | autoInit} is `true` (default).
 * If Flicking is already initialized, this method returns immediately without doing anything.
 * @fires {@link ReadyEvent}
 * @returns Promise that resolves when initialization is complete
 */
public init(): Promise<void> {
  // ...
}
```

**파라미터가 있는 메서드:**
```typescript
/**
 * Move to the panel with the given index.
 * @param index - The index of the panel to move to
 * @param duration - Duration of the animation (unit: ms). Defaults to {@link FlickingOptions.duration}
 * @param direction - Direction to move (circular mode only). Defaults to {@link DIRECTION.NONE}
 * @fires {@link MovementEvents}
 * @throws {@link MovementErrors}
 * @returns Promise that resolves after reaching the target panel
 */
public moveTo(
  index: number,
  duration: number = this._duration,
  direction: ValueOf<typeof DIRECTION> = DIRECTION.NONE
): Promise<void> {
  // ...
}
```

**Private/Internal 메서드:**
```typescript
/**
 * Factory method to create the appropriate Control implementation based on moveType option.
 * @internal
 * @privateRemarks
 * Called during constructor and when moveType option is changed. The moveType option must be set before calling this method.
 * Throws error if moveType is invalid.
 */
private _createControl(): Control {
  // ...
}
```

---

## 3. Options Interface TSDoc 포맷

### 3.1 기본 옵션

```typescript
/**
 * Options for the Flicking component
 * @public
 */
export interface FlickingOptions {
  /**
   * Index of the panel to move when Flicking's {@link Flicking.init | init()} is called. A zero-based integer.
   * @defaultValue 0
   * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/default-index | Demo: Default Index}
   */
  defaultIndex: number;
}
```

### 3.2 상세 설명이 필요한 옵션

`@remarks`를 사용하여 가능한 값들을 목록 형태로 작성합니다:

```typescript
/**
 * Align position of the panels within viewport. You can set different values each for the panel and camera.
 * @remarks
 * Possible values include
 *
 * - literal strings ("prev", "center", "next")
 *
 * - percentage values ("0%", "25%")
 *
 * - pixel values ("0px", "100px")
 *
 * - arithmetic expressions ("50% - 25px")
 *
 * - numbers
 *
 * - an object with separate `panel` and `camera` alignment values
 *
 * @example
 * ```ts
 * const possibleOptions = [
 *   // Literal strings
 *   "prev", "center", "next",
 *   // % values, applied to both panel & camera
 *   "0%", "25%", "42%",
 *   // px values, arithmetic calculation with (+/-) is also allowed.
 *   "0px", "100px", "50% - 25px",
 *   // numbers, same to number + px ("0px", "100px")
 *   0, 100, 1000,
 *   // Setting a different value for panel & camera
 *   { panel: "10%", camera: "25%" }
 * ];
 *
 * possibleOptions.forEach(align => {
 *   new Flicking("#el", { align });
 * });
 * ```
 * @defaultValue "center"
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/alignment | Demo: Alignment}
 */
align: LiteralUnion<ValueOf<typeof ALIGN>> | number | { panel: number | string; camera: number | string };
```

### 3.3 의존성이 있는 옵션

```typescript
/**
 * Enables circular (continuous loop) mode, which connects first/last panel for continuous scrolling.
 * @dependency Mutual Exclusive - {@link FlickingOptions.bound | bound}. When both are true, circular takes precedence and bound will be ignored.
 * @dependency Conditional - Total panel size must be ≥ viewport size. If not met, automatically falls back to {@link FlickingOptions.circularFallback | circularFallback} mode.
 * @dependency Related - {@link FlickingOptions.circularFallback | circularFallback} determines fallback behavior when circular cannot be enabled
 *
 * @defaultValue false
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/circular | Demo: Circular}
 */
circular: boolean;
```

### 3.4 Deprecated / Internal 옵션

```typescript
/**
 * @deprecated Use {@link FlickingOptions.externalRenderer | externalRenderer} instead
 */
renderExternal: { /* ... */ } | null;

/**
 * This is an option for the frameworks (React, Vue, Angular, ...).
 * Don't set it as it's automatically managed by Flicking.
 * @defaultValue null
 * @internal
 * @readonly
 */
externalRenderer: ExternalRenderer | null;
```

### 3.5 버전 태그 (`@since` / `@deprecated`)

**`@since` — API가 도입된 버전:**

v4.0.0에 존재하던 API에는 `@since` 태그를 추가하지 않습니다. 태그가 없으면 4.0.0부터 존재한다는 의미로 해석됩니다.
v4.1.0 이후 추가된 API에만 해당 버전의 `@since` 태그를 추가합니다.

```typescript
/**
 * Enable nested Flicking mode to allow parent Flicking to move when reaching boundaries.
 * @defaultValue false
 *
 * @since 4.7.0
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/nested | Demo: Nested}
 */
nested: boolean;
```

옵션을 참조하는 getter에도 `@since`를 추가합니다:
```typescript
/**
 * Current value of the {@link FlickingOptions.nested | nested} option.
 * @since 4.7.0
 */
public get nested(): FlickingOptions["nested"] {
  return this._nested;
}
```

메서드, 이벤트, 클래스에도 동일하게 적용합니다:
```typescript
/**
 * Change the destination and duration of the animation currently playing.
 * @since 4.10.0
 * @throws {@link AnimationUpdateErrors}
 */
public updateAnimation(index: number, duration?: number): void { /* ... */ }

/**
 * Event that fires when a panel is added or removed
 * @since 4.1.0
 */
export interface PanelChangeEvent { /* ... */ }

/**
 * A preset for cross-directional carousel
 * @since 4.12.0
 * @public
 */
export class CrossFlicking extends Flicking { /* ... */ }
```

**`@deprecated` — 폐기 예정:**

```typescript
/**
 * @deprecated Use {@link FlickingOptions.externalRenderer | externalRenderer} instead
 */
renderExternal: { /* ... */ } | null;
```

**배치 순서:** `@accepts`는 `@remarks` 다음, `@defaultValue` 직전에 배치합니다. `@since`는 `@defaultValue` 다음, `@see` 직전에 배치합니다. `@deprecated`는 summary 직후에 배치합니다. 데모 링크(`@see Demo:`)는 `@see` 태그들 중 마지막에 배치합니다.

---

## 4. 이벤트 문서화

### 4.0 이벤트 시스템 구조

이벤트 시스템은 세 가지 파일로 구성됩니다:

| 파일 | 역할 | 내용 |
|------|------|------|
| `names.ts` | 이벤트 이름 상수 정의 | `EVENTS` 객체에 모든 이벤트 이름을 상수로 정의 |
| `types.ts` | 이벤트 타입 정의 | 개별 이벤트 인터페이스 + `FlickingEvents` 매핑 인터페이스 |
| `groups.ts` | 이벤트 그룹화 (문서화용) | 메서드별로 발생 가능한 이벤트를 그룹화 |

### 4.1 이벤트 이름 상수 (names.ts)

`EVENTS` 객체에 모든 이벤트 이름을 상수로 정의합니다. 각 속성에는 간단한 주석을 추가합니다:

```typescript
/**
 * Event type object with event name strings of {@link Flicking}
 * @example
 * ```ts
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "moveStart"
 * ```
 */
export const EVENTS = {
  /** ready event */
  READY: "ready",
  /** beforeResize event */
  BEFORE_RESIZE: "beforeResize",
  /** moveStart event */
  MOVE_START: "moveStart",
  /** move event */
  MOVE: "move",
  // ...
} as const;
```

**주의사항:**
- 각 속성은 camelCase 이벤트 이름 문자열을 값으로 가집니다
- `as const`를 사용하여 리터럴 타입으로 만듭니다
- 주석은 간단히 "이벤트명 event" 형태로 작성합니다

### 4.2 개별 이벤트 Interface (types.ts)

각 이벤트는 독립적인 interface로 정의하고, 한 줄 설명 + `@remarks`로 상세 설명을 추가합니다:

```typescript
/**
 * Event that fires BEFORE the active panel changes.
 * @remarks
 * Index will be changed at the {@link ChangedEvent | changed} event.
 * It can be triggered when user finished input, or flicking start to move by method.
 * Calling `stop()` in event will prevent index change and camera movement.
 * @see {@link ChangedEvent} - Fired AFTER the panel change completes
 */
export interface WillChangeEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["WILL_CHANGE"], T> {
  /** New active index */
  index: number;
  /** New active panel */
  panel: Panel;
  /** Boolean that indicates whether the event was generated by a user action */
  isTrusted: boolean;
  /** Moving direction from the active panel to the target panel */
  direction: ValueOf<typeof DIRECTION>;
}
```

**작성 규칙:**
- 한 줄 요약: "Event that fires when/BEFORE/AFTER [상황]"
- `@remarks`: 발생 시점, 주의사항, 추가 정보
- `@see`: 관련 이벤트 참조 (특히 before/after 쌍)
- 각 속성에는 명확한 설명 추가

### 4.3 FlickingEvents 매핑 (types.ts)

모든 이벤트는 `FlickingEvents` interface에서 이벤트 이름 상수와 타입을 매핑합니다.

**IMPORTANT:** 각 이벤트 매핑에는 **해당 이벤트의 summary를 포함**해야 합니다:

```typescript
/**
 * Events of the Flicking component.
 * @privateRemarks
 * This interface is crucial as it maps event names to their actual event interfaces.
 * It is also functionally important because it is registered as the event generic parameter of Component, which is Flicking's parent class.
 */
export interface FlickingEvents {
  /**
   * Event that fires when Flicking's {@link Flicking.init | init()} is called.
   * @remarks
   * See {@link ReadyEvent} for more details.
   */
  [EVENTS.READY]: ReadyEvent;
  /**
   * Event that fires when Flicking's {@link Flicking.resize} is called, before updating the sizes of panels and viewport.
   * @remarks
   * See {@link BeforeResizeEvent} for more details.
   */
  [EVENTS.BEFORE_RESIZE]: BeforeResizeEvent;
  /**
   * Event that fires BEFORE the active panel changes.
   * @remarks
   * See {@link WillChangeEvent} for more details.
   */
  [EVENTS.WILL_CHANGE]: WillChangeEvent;
  // ...
}
```

**작성 규칙:**
- 각 속성 키는 `EVENTS` 객체의 값을 사용합니다 (예: `[EVENTS.READY]`)
- 첫 줄에 개별 이벤트 interface에서 가져온 요약 설명 작성
- `@remarks` 섹션에 "See {@link EventType} for more details." 추가
- 단순히 `/** see {@link EventType} */`만 작성하지 않습니다 ❌
- 이 인터페이스는 Component의 제네릭 파라미터로 사용되므로 기능적으로 중요합니다

### 4.4 이벤트 그룹 Interface (groups.ts)

관련 이벤트들을 메서드별로 그룹화하여 문서화 목적으로 사용합니다:

```typescript
/**
 * Events fired during panel movement operations (prev, next, moveTo).
 */
export interface MovementEvents {
  /** see {@link WillChangeEvent} */
  willChange: WillChangeEvent;
  /** see {@link ChangedEvent} */
  changed: ChangedEvent;
  /** see {@link WillRestoreEvent} */
  willRestore: WillRestoreEvent;
  /** see {@link RestoredEvent} */
  restored: RestoredEvent;
  /** see {@link MoveStartEvent} */
  moveStart: MoveStartEvent;
  /** see {@link MoveEvent} */
  move: MoveEvent;
  /** see {@link MoveEndEvent} */
  moveEnd: MoveEndEvent;
}

/**
 * Events fired during resize operations.
 */
export interface ResizeEvents {
  /** see {@link BeforeResizeEvent} */
  beforeResize: BeforeResizeEvent;
  /** see {@link AfterResizeEvent} */
  afterResize: AfterResizeEvent;
}
```

**사용 목적:**
- 메서드의 `@fires` 태그에서 이벤트 그룹 참조
- 예: `@fires {@link MovementEvents}`
- 런타임에는 사용되지 않으며 순수 문서화 목적

---

## 5. 에러 문서화

### 5.1 에러 구조

에러 시스템은 세 가지 파일로 구성됩니다:

| 파일 | 역할 |
|------|------|
| `types.ts` | `FlickingErrors` interface - 각 에러 코드에 대한 상세 문서화 |
| `codes.ts` | 에러 코드와 메시지 정의 (런타임 사용) |
| `groups.ts` | 에러 그룹 type alias (메서드별 발생 가능 에러 그룹화) |

### 5.2 FlickingErrors Interface (types.ts)

각 에러 코드에 대해 상세한 문서를 작성합니다:

- 에러 설명 (한 줄)
- `@remarks`: 발생 원인, 해결 방법
- `@example`: 잘못된 사용법(❌)과 올바른 사용법(✅)
- `@see`: 관련 메서드/속성 참조

```typescript
/**
 * Documentation interface for Flicking error codes.
 * @public
 * @see {@link ERROR_CODE} for usage in error handling
 */
export interface FlickingErrors {
  /**
   * The given index is out of possible range.
   * @remarks
   * This error occurs when trying to access a panel with an invalid index.
   * Common causes include:
   *
   * - Index is negative
   *
   * - Index is greater than or equal to panel count
   *
   * - Trying to access panels when there are none
   *
   * **Solution:** Ensure the index is within the valid range [0, panelCount - 1].
   * Check `flicking.panelCount` before accessing panels by index.
   * @example
   * ```typescript
   * const flicking = new Flicking("#flicking");
   *
   * // ❌ Wrong - negative index
   * flicking.moveTo(-1);
   *
   * // ❌ Wrong - index too large
   * flicking.moveTo(999);
   *
   * // ✅ Correct - check valid range first
   * const targetIndex = 5;
   * if (targetIndex >= 0 && targetIndex < flicking.panelCount) {
   *   flicking.moveTo(targetIndex);
   * }
   * ```
   * @see {@link Flicking.moveTo}
   * @see {@link Flicking.panelCount}
   */
  INDEX_OUT_OF_RANGE: {
    code: 5;
    message: (val: number, min: number, max: number) => string;
  };
}
```

### 5.3 에러 코드 정의 (codes.ts)

`errors` 객체에 에러 코드와 메시지를 정의합니다:

```typescript
/**
 * Internal error catalog containing all error information.
 * @internal
 */
const errors: FlickingErrors = {
  INDEX_OUT_OF_RANGE: {
    code: 5,
    message: (val, min, max) => `Index "${val}" is out of range: should be between ${min} and ${max}.`
  },
  // ...
};
```

### 5.4 에러 그룹 Type Alias (groups.ts)

관련 에러들을 메서드별로 그룹화합니다:

```typescript
/**
 * Error codes that may be thrown during panel movement operations.
 * @remarks
 * These errors can occur when using navigation methods like {@link Flicking.prev},
 * {@link Flicking.next}, or {@link Flicking.moveTo}.
 *
 * Common scenarios:
 * - `NOT_INITIALIZED`: Attempting to navigate before Flicking is ready
 * - `INDEX_OUT_OF_RANGE`: Target panel index doesn't exist
 * - `ANIMATION_ALREADY_PLAYING`: Starting new animation while one is in progress
 */
export type MovementErrors =
  | typeof ERROR_CODE.NOT_INITIALIZED
  | typeof ERROR_CODE.INDEX_OUT_OF_RANGE
  | typeof ERROR_CODE.ANIMATION_ALREADY_PLAYING;
```

### 5.5 FlickingError 클래스

```typescript
/**
 * Special type of known error that {@link Flicking} throws.
 * @remarks
 * see {@link FlickingErrors} for possible error codes and explantaion
 * @example
 * ```ts
 * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
 * try {
 *   const flicking = new Flicking(".flicking-viewport")
 * } catch (e) {
 *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
 *     console.error(e.message)
 *   }
 * }
 * ```
 */
class FlickingError extends Error {
  public code: number;
  // ...
}
```

---

## 6. 공통 작성 규칙

### 6.1 링크 작성법

**내부 참조:**
```typescript
{@link ClassName}                    // 클래스
{@link ClassName.methodName}         // 메서드
{@link ClassName.propertyName}       // 속성
{@link InterfaceName.propertyName}   // 인터페이스 속성
{@link CONSTANT_NAME}                // 상수
{@link ERROR_CODE.ERROR_NAME}        // 에러 코드
```

**외부 URL:**
```typescript
{@link https://example.com | 표시 텍스트}
```

**데모 링크:**

옵션에 관련 데모가 있을 경우 `@see` 태그로 데모 링크를 추가합니다.
표시 텍스트는 `Demo: 데모이름` 형태를 사용합니다:
```typescript
@see {@link https://naver.github.io/egjs-flicking/docs/demos/basic/circular | Demo: Circular}
@see {@link https://naver.github.io/egjs-flicking/docs/demos/advanced/virtual-scroll | Demo: Virtual Scroll}
```

**파이프(|)를 사용한 별칭:**
```typescript
{@link Flicking.init | init()}       // "init()"으로 표시
{@link FlickingOptions.bound | bound} // "bound"로 표시
```

### 6.2 코드 블록 / 인라인 코드

```typescript
/**
 * @example
 * ```ts
 * const flicking = new Flicking("#el", { circular: true });
 * ```
 */

/**
 * This is `true` when initialized.
 * Use backticks for inline code like `panelCount - 1`.
 */
```

### 6.3 목록 작성법

`@remarks` 블록 내에서 목록을 작성할 때 각 항목 사이에 빈 줄을 추가합니다:

```typescript
/**
 * @remarks
 * Common causes include:
 *
 * - First cause
 *
 * - Second cause
 *
 * - Third cause
 */
```

### 6.4 빈 줄 사용

- 주요 섹션 사이에 빈 줄 사용
- `@dependency` 태그들 사이에 빈 줄 사용
- `@defaultValue`와 `@see` 앞에 빈 줄 권장

---

## 7. 새 에러/이벤트 추가하기

### 7.1 새 에러 코드 추가 절차

1. **`error/codes.ts`의 `errors` 객체에 추가:**

```typescript
const errors: FlickingErrors = {
  // ... existing errors ...
  NEW_ERROR_NAME: {
    code: 15,  // 다음 사용 가능한 번호
    message: "Error message" // 또는 파라미터가 있는 함수
  }
};
```

2. **`error/types.ts`의 `FlickingErrors` interface에 문서 추가:**

```typescript
export interface FlickingErrors {
  /**
   * 에러에 대한 한 줄 설명.
   * @remarks
   * This error occurs when...
   * Common causes include:
   *
   * - First cause
   *
   * - Second cause
   *
   * **Solution:** How to fix this error.
   * @example
   * ```typescript
   * // ❌ Wrong
   * wrongUsage();
   *
   * // ✅ Correct
   * correctUsage();
   * ```
   * @see {@link RelatedMethod}
   */
  NEW_ERROR_NAME: {
    code: 15;
    message: string; // 또는 함수 시그니처
  };
}
```

3. **필요시 `error/groups.ts`에 에러 그룹 추가/수정**

4. **빌드 및 문서 확인:**

```bash
pnpm build
pnpm api-docs:docusaurus
```

### 7.2 새 이벤트 추가 절차

**1. `event/names.ts`에 이벤트 이름 상수 추가:**

```typescript
export const EVENTS = {
  // ... existing events ...
  /** newEvent event */
  NEW_EVENT: "newEvent"
} as const;
```

- 이벤트 이름은 camelCase로 작성
- 간단한 주석 추가: `/** 이벤트명 event */`

**2. `event/types.ts`에 이벤트 interface 정의:**

```typescript
/**
 * Event that fires when [상황 설명]
 * @remarks
 * Additional details about when this event fires.
 * @see {@link RelatedEvent} - Related event description
 */
export interface NewEvent<T extends Flicking = Flicking> extends ComponentEvent<{}, typeof EVENTS["NEW_EVENT"], T> {
  /** Property description */
  propertyName: PropertyType;
}
```

- 한 줄 요약 + `@remarks`로 상세 설명
- 관련 이벤트가 있으면 `@see`로 참조

**3. `event/types.ts`의 `FlickingEvents`에 매핑 추가:**

```typescript
export interface FlickingEvents {
  // ... existing events ...
  /** see {@link NewEvent} */
  [EVENTS.NEW_EVENT]: NewEvent;
}
```

**4. 필요시 `event/groups.ts`에 이벤트 그룹 추가/수정:**

```typescript
export interface SomeEventGroup {
  // ... existing events ...
  /** see {@link NewEvent} */
  newEvent: NewEvent;
}
```

**5. 관련 메서드의 `@fires` 태그 업데이트:**

```typescript
/**
 * Some method that triggers the new event
 * @fires {@link NewEvent}
 */
public someMethod(): void {
  // ...
}
```

### 7.3 파일 구조

```
packages/flicking/src/
├── error/
│   ├── FlickingError.ts   # 에러 클래스
│   ├── codes.ts           # 에러 코드와 메시지 (런타임)
│   ├── groups.ts          # 에러 그룹 type alias
│   ├── types.ts           # FlickingErrors interface (문서화)
│   └── index.ts           # public exports
│
├── event/
│   ├── names.ts           # EVENTS 상수 (이벤트 이름 문자열)
│   ├── types.ts           # 개별 이벤트 interface + FlickingEvents 매핑
│   ├── groups.ts          # 이벤트 그룹 interface (문서화용, 런타임 미사용)
│   └── index.ts           # public exports
│
└── Flicking.ts            # 메인 클래스 + FlickingOptions
```
