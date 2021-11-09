import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "./utils";

Object.defineProperty(window, "CSS", {value: null});
Object.defineProperty(window, "getComputedStyle", {
  value: () => {
    return {
      display: "none",
      appearance: ["-webkit-appearance"]
    };
  }
});

Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>"
});
Object.defineProperty(document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

beforeEach(() => {
  cleanup();
});
