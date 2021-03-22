import { storiesOf } from "@storybook/angular";
import * as testCases from "./testcases";
import NgxFlickingTemplate from "../template/NgxFlickingTemplate";

const stories = storiesOf("Angular", module);

Object.keys(testCases).forEach(testCaseName => {
  const { options, panels, styles } = testCases[testCaseName];
  stories.add(testCaseName, () => NgxFlickingTemplate(options, panels, styles));
});
