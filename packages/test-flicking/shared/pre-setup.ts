// This file MUST run before any @egjs/flicking or @egjs/axes imports.
// Axes evaluates SUPPORT_POINTER/SUPPORT_TOUCH at module load time.

// MSPointerEvent만 삭제 (구 IE 호환 방지)
delete (window as any).MSPointerEvent;

// SUPPORT_TOUCH = true → 기본 inputType ["mouse","touch"]에서 TouchMouseEventInput 선택
// PointerEvent는 삭제하지 않음 (기본 inputType에 "pointer"가 없으므로 무관)
(window as any).ontouchstart = () => {};
