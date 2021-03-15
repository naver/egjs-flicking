/* eslint-disable @typescript-eslint/no-misused-promises */
import chalk from "chalk";

export const CFCScenario = (title: string, page: string, callback?: CodeceptJS.HookCallback) => {
  if (!callback) {
    Scenario(title);
    return;
  }

  callAllScenarios(title, page, callback);
};

CFCScenario.skip = (title: string, page: string, callback: CodeceptJS.HookCallback): any => {
  callAllScenarios(title, page, callback, { skip: true });
};

CFCScenario.only = (title: string, page: string, callback: CodeceptJS.HookCallback): any => {
  callAllScenarios(title, page, callback, { only: true });
};

CFCScenario.todo = (title: string, page: string, callback: CodeceptJS.HookCallback): any => {
  callAllScenarios(title, page, callback, { todo: true });
};

const callAllScenarios = (title: string, page: string, callback: CodeceptJS.HookCallback, {
  skip = false,
  todo = false,
  only = false
}: Partial<{
  skip: boolean;
  todo: boolean;
  only: boolean;
}> = {}) => {
  let ScenarioMethod: CodeceptJS.IScenario = Scenario;

  if (skip) {
    ScenarioMethod = Scenario.skip;
  } else if (todo) {
    ScenarioMethod = Scenario.todo;
  } else if (only) {
    ScenarioMethod = Scenario.only;
  }

  ScenarioMethod(`${title}-vanilla`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    await I.amLoadingNativeFlicking();
    return callback({ I });
  });
  ScenarioMethod(`${title}-react`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    await I.amLoadingReactFlicking();
    I.seeElement(".flicking-camera");
    return callback({ I });
  });
  ScenarioMethod(`${title}-vue`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    return callback({ I });
  });
  ScenarioMethod(`${title}-angular`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    return callback({ I });
  });
};
