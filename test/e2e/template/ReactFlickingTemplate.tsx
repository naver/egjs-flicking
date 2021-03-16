import { Parser } from "html-to-react";

import { FlickingOptions } from "../../../src";
import Flicking from "../../../packages/react-flicking/src/react-flicking/Flicking";

export default (options: Partial<FlickingOptions>, panels: string[]) => {
  const HTMLParser = Parser();

  return <Flicking>
    { HTMLParser.parse(panels.join("")) }
  </Flicking>
};
