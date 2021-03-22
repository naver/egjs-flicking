import { storiesOf } from "@storybook/react";
import * as testCases from "./testcases";
import ReactFlickingTemplate from "../template/ReactFlickingTemplate";

const stories = storiesOf("React", module);

Object.keys(testCases).forEach(testCaseName => {
  const { options, panels, styles } = testCases[testCaseName];
  stories.add(testCaseName, () => <>{ ReactFlickingTemplate(options, panels, styles) }</>);
});
