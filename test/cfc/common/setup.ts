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

const returnSizeByStyle = (name: string) => function() {
  if (!this.style) return 0;

  // This ignores units (px, em, ...)
  return this.style[name] ? parseFloat(this.style[name]) : 0;
};

Object.defineProperty(window.HTMLElement.prototype, "clientWidth", {
  get: returnSizeByStyle("width")
});
Object.defineProperty(window.HTMLElement.prototype, "clientHeight", {
  get: returnSizeByStyle("height")
});
Object.defineProperty(window.HTMLElement.prototype, "offsetWidth", {
  get: returnSizeByStyle("width")
});
Object.defineProperty(window.HTMLElement.prototype, "offsetHeight", {
  get: returnSizeByStyle("height")
});

beforeEach(() => {
  cleanup();
});
