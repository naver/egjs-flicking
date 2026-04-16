import { beforeEach, vi } from "vitest";
import { setupJsdomMocks } from "../shared/jsdom-mocks";

setupJsdomMocks();

// Fake timers (replaces sinon.useFakeTimers from setup.js)
vi.useFakeTimers();

beforeEach(() => {
  vi.clearAllTimers();
});
