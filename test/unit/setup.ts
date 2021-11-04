import * as Flicking from "~/Flicking";
(window as any).Flicking = Flicking;

(window as any).timer = sinon.useFakeTimers();
(window as any).flickings = [];


before(() => {
  const cssLinks = [
    // "/base/css/flicking.css"
  ];
  cssLinks.forEach(cssLink => {
    const link = document.createElement("link");

    link.id = "fixture_css";
    link.rel = "stylesheet";
    link.href = cssLink;

    (document.head || document.getElementsByTagName("head")[0]).appendChild(link);
  });
});

beforeEach(() => {
  (window as any).timer.reset();
});

afterEach(() => {
  (window as any).flickings.forEach(flicking => {
    flicking.destroy();
  });
  (window as any).flickings = [];
  cleanup();
});

const cleanup = () => {
  const elements = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
};
