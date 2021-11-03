import Flicking from "~/Flicking";

interface FixtureRenderer {
  render(el: JSX.Element): Promise<Flicking>;
}

export default FixtureRenderer;
