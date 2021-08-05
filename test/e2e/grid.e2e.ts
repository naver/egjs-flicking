import { expect } from "chai";

import { CFCScenario } from "./e2e-utils";

Feature("no-options");

CFCScenario("Initial rendering status", "grid", async ({ I }) => {
  I.seeElement(".flicking-camera");

  const numOfElements = await I.grabNumberOfVisibleElements(".flicking-panel");

  expect(numOfElements).to.equal(2);
});
