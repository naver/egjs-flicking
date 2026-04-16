// jsdom은 CSS 레이아웃 엔진이 없으므로 element size를 style에서 파싱하는 mock

export function setupJsdomMocks() {
  Object.defineProperty(window, "CSS", { value: null });
  Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
      display: "none",
      appearance: ["-webkit-appearance"]
    })
  });
  Object.defineProperty(document, "doctype", {
    value: "<!DOCTYPE html>"
  });
  Object.defineProperty(document.body.style, "transform", {
    value: () => ({ enumerable: true, configurable: true })
  });

  const returnSizeByStyle = (name: string) =>
    function (this: HTMLElement) {
      if (!this.style) return 0;
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
}
