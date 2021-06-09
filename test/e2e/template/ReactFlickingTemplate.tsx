import { Parser } from "html-to-react";

import { FlickingOptions } from "../../../src";
import Flicking from "../../../packages/react-flicking/src/react-flicking/Flicking";
import "../../../css/flicking.css";

export default (options: Partial<FlickingOptions>, panels: string[], styles: string[]) => {
  const HTMLParser = Parser();

  styles.forEach(style => require(`../public/${style}`));

  return <Flicking {...options}>
    { HTMLParser.parse(panels.join("")) }
  </Flicking>;
};
