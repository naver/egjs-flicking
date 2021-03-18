import { storiesOf } from "@storybook/vue";
import * as testCases from "./testcases";
import VueFlickingTemplate from "../template/VueFlickingTemplate";

const stories = storiesOf("Vue", module);

Object.keys(testCases).forEach(testCaseName => {
  const { options, panels } = testCases[testCaseName];
  stories.add(testCaseName, () => VueFlickingTemplate(options, panels), options);
});
