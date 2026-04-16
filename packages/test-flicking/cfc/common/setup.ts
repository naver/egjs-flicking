import "@testing-library/jest-dom/vitest";
import { cleanup } from "@common/renderer";
import { afterEach, beforeEach, vi } from "vitest";
import { setupJsdomMocks } from "../../shared/jsdom-mocks";

setupJsdomMocks();

// real setTimeout 보존 (waitTime용)
(window as any)._real = {
  setTimeout: window.setTimeout.bind(window)
};

vi.useFakeTimers();

beforeEach(() => {
  vi.clearAllTimers();
});

afterEach(() => {
  cleanup();
});
