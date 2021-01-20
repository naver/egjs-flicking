window.timer = sinon.useFakeTimers();
window.flickings = [];

before(() => {
  const cssLinks = [
    "/base/css/flicking.css"
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
  window.timer.reset();
});

afterEach(() => {
  cleanup();
  window.flickings.forEach(flicking => {
    flicking.destroy();
  });
  window.flickings = [];
});

const cleanup = () => {
  const elements = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
};
