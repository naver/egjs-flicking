import { afterEach, beforeEach, vi } from "vitest";

// Import CSS for real browser layout
import "../../flicking/sass/flicking.sass";

// Save real setTimeout before faking timers
(window as any)._real = {
  setTimeout: window.setTimeout.bind(window)
};

// Install fake timers (replaces setTimeout, setInterval, requestAnimationFrame, etc.)
vi.useFakeTimers();

// Track created Flicking instances for cleanup
(window as any).flickings = [];

// Suppress only expected fire-and-forget animation rejections.
// Many tests use `void flicking.next(...)` / `void flicking.moveTo(...)` patterns.
// When animations are interrupted, these reject with FlickingError:
//   - ANIMATION_INTERRUPTED (code 9): stopped by user input or another animation
//   - ANIMATION_ALREADY_PLAYING (code 10): start called while already animating
// Other unexpected rejections are left unhandled so Vitest can report them as failures.
window.addEventListener("unhandledrejection", event => {
  const reason = event.reason;
  const isAnimationError = reason?.name === "FlickingError" && (reason.code === 9 || reason.code === 10);

  if (isAnimationError) {
    event.preventDefault();
  }
});

beforeEach(() => {
  vi.clearAllTimers();
});

afterEach(() => {
  (window as any).flickings.forEach((flicking: any) => {
    flicking.destroy();
  });
  (window as any).flickings = [];

  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode!.removeChild(v);
  });
});
