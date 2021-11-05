import Flicking from "@egjs/flicking";

interface FixtureRenderer {
  render(el: JSX.Element): Promise<Flicking>;
}

export default FixtureRenderer;
