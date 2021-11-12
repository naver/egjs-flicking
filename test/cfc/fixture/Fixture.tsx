import { FlickingEvents, FlickingOptions, Plugin } from "@egjs/flicking";

type Fixture = (props?: {
  options?: Partial<FlickingOptions>;
  events?: Partial<{ [key in keyof FlickingEvents]: (e: FlickingEvents[key]) => any }>;
  plugins?: Plugin[];
}) => JSX.Element;

export default Fixture;
