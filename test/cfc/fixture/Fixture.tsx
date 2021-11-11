import { FlickingEvents, FlickingOptions } from "@egjs/flicking";

type Fixture = (
  options?: Partial<FlickingOptions>,
  events?: Partial<{ [key in keyof FlickingEvents]: (e: FlickingEvents[key]) => any }>
) => JSX.Element;

export default Fixture;
