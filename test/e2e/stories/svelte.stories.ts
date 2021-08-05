import { storiesOf } from "@storybook/svelte";
import * as testCases from "./testcases";
import SvelteFlickingTemplate from "../template/SvelteFlickingTemplate";

const stories = storiesOf("Svelte", module);

Object.keys(testCases).forEach(testCaseName => {
  const fixture = testCases[testCaseName];
  stories.add(testCaseName, () => SvelteFlickingTemplate(fixture));
});
