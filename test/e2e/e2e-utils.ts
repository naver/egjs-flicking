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

  ScenarioMethod(`✨${chalk.hex("FFFFFF").bold("[Vanilla]")} ${title}`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    await I.amLoadingNativeFlicking();
    I.seeElement(".flicking-camera");
    return callback({ I });
  });
  ScenarioMethod(`✨${chalk.hex("00d8ff").bold("[React]")} ${title}`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    return callback({ I });
  });
  ScenarioMethod(`✨${chalk.hex("42b883").bold("[Vue]")} ${title}`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    return callback({ I });
  });
  ScenarioMethod(`✨${chalk.hex("dd0031").bold("[Angular]")} ${title}`, async ({ I }) => {
    I.amOnPage(`/test/e2e/fixture/${page}`);
    return callback({ I });
  });
};
