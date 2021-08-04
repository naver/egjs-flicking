import { storiesOf } from "@storybook/vue3";
import * as testCases from "./testcases";
import Vue3FlickingTemplate from "../template/Vue3FlickingTemplate";

const stories = storiesOf("Vue3", module);

Object.keys(testCases).forEach(testCaseName => {
  const { options, panels, styles } = testCases[testCaseName];
  stories.add(testCaseName, () => Vue3FlickingTemplate(options, panels, styles), options);
});
