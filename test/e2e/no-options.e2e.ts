import { expect } from "chai";

import { CFCScenario } from "./e2e-utils";

Feature("no-options");

CFCScenario("Initial rendering status", "no-options", async ({ I }) => {
  I.seeElement(".flicking-camera");

  I.saveElementScreenshot(".flicking-viewport", "no-options-initial.png");
  I.seeVisualDiff("no-options-initial.png", {tolerance: 2, prepareBaseImage: false});

  const numOfElements = await I.grabNumberOfVisibleElements(".flicking-panel");

  expect(numOfElements).to.equal(3);
});

CFCScenario("Moving to next panel", "no-options", async ({ I }) => {
  I.seeElement(".flicking-camera");
  await I.dontSeeElementInViewport(".flicking-panel:last-child");
  I.dragSlider(".flicking-viewport", -70);

  I.wait(0.5);

  I.saveElementScreenshot(".flicking-viewport", "no-options-next.png");
  I.seeVisualDiff("no-options-next.png", {tolerance: 2, prepareBaseImage: false});

  await I.seeElementInViewport(".flicking-panel:last-child");
});
