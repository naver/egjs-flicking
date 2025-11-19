import Flicking from "@egjs/flicking";

declare function render(el: JSX.Element): Promise<Flicking>;
declare function cleanup(): void;

export {
  render,
  cleanup
};
