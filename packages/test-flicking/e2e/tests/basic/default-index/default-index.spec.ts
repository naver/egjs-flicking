import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/default-index");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "DefaultIndex");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스의 초기 인덱스 확인", async ({ page }) => {
      const indices = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.index);
      });
      expect(indices).toEqual([0, 2, 4]);
    });
  });
}
