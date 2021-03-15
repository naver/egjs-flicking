import { Page } from "playwright";

import { CFCScenario } from "./e2e-utils";

Feature("no-options");

// eslint-disable-next-line @typescript-eslint/no-misused-promises
CFCScenario("sample", "no-options", async ({ I }) => {
  I.seeElement(".flicking-camera");
  I.dragSlider(".flicking-viewport", -70);

  I.usePlaywrightTo("click and move panels", async ({ page }: { page: Page }) => {
    const mouse = page.mouse;
    await mouse.move(0, 0);
    await mouse.down();
    await mouse.move(0, 100);
    await mouse.move(100, 100);
    await mouse.move(100, 0);
    await mouse.move(0, 0);
    await mouse.up();
  });

  const numOfElements = await I.grabNumberOfVisibleElements(".flicking-panel");
  console.log(numOfElements);
});
