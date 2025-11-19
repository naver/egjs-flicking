(window as any)._real = {
  setTimeout: (window as any).setTimeout.bind((window as any)),
};

(window as any).timer = sinon.useFakeTimers();
(window as any).flickings = [];

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
