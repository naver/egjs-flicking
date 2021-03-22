import { storiesOf } from "@storybook/html";
import * as testCases from "./testcases";
import NativeFlickingTemplate from "../template/NativeFlickingTemplate";

const stories = storiesOf("HTML", module);

Object.keys(testCases).forEach(testCaseName => {
  const { options, panels, styles } = testCases[testCaseName];
  stories.add(testCaseName, () => NativeFlickingTemplate(options, panels, styles));
});
