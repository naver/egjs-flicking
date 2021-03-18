/* eslint-disable @typescript-eslint/no-misused-promises */
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

  const pageName = page.replace(/-/g, "");

  ScenarioMethod(`${title}-vanilla`, async ({ I }) => {
    I.amOnPage(`http://localhost:9005/iframe.html?id=html--${pageName}`);
    return callback({ I });
  });
  ScenarioMethod(`${title}-react`, async ({ I }) => {
    I.amOnPage(`http://localhost:9006/iframe.html?id=react--${pageName}`);
    return callback({ I });
  });
  ScenarioMethod(`${title}-vue`, async ({ I }) => {
    I.amOnPage(`http://localhost:9007/iframe.html?id=vue--${pageName}`);
    return callback({ I });
  });
  ScenarioMethod(`${title}-angular`, async ({ I }) => {
    I.amOnPage(`http://localhost:9008/iframe.html?id=angular--${pageName}`);
    return callback({ I });
  });
};
