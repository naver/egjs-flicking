import DummyFlickingProps from "./DummyFlickingProps";

export enum DEFAULT_PROPS {
  tag,
  cameraTag,
  options,
  events,
  plugins
}

const DummyFlicking = ({
  children,
  ...restProps
}: Partial<DummyFlickingProps> = {}) => {
  return <div {...restProps}>
    { children }
  </div>;
};

DummyFlicking.defaultProps = {
  tag: "div",
  cameraTag: "div",
  options: {},
  events: {},
  plugins: []
};

export default DummyFlicking;
