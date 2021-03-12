import { CFCScenario } from "./e2e-utils";

Feature("no-options");

CFCScenario("test something", "no-options", ({ I }) => {
  I.dontSeeElement(".flicking-camera");
});
