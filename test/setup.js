/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
window.timer = sinon.useFakeTimers();

beforeEach(() => {
  window.timer.reset();
});
