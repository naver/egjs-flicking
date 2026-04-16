import { FlickingEvents, FlickingOptions, Plugin } from "@egjs/flicking";

type DummyFlickingProps = {
  children: JSX.Element[];
  tag: string;
  cameraTag: string;
  options: Partial<FlickingOptions>;
  events: Partial<{ [key in keyof FlickingEvents]: (e: FlickingEvents[key]) => any }>;
  plugins: Plugin[];
} & JSX.IntrinsicElements["div"];

export default DummyFlickingProps;
