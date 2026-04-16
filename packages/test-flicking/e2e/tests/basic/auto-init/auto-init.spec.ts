import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/auto-init");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "AutoInit");
      await waitForFlickingReady(page);
    });

    test("autoInit:true 인스턴스는 즉시 초기화됨", async ({ page }) => {
      const initialized = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].initialized;
      });
      expect(initialized).toBe(true);
    });

    test("버튼 클릭으로 수동 초기화", async ({ page }) => {
      // init 버튼 클릭
      const initBtn = page.locator("button", { hasText: /init/i });
      await initBtn.click();
      await page.waitForTimeout(500);

      // 두 번째 인스턴스도 초기화됨
      const count = await page.evaluate(() => {
        return (window as any).__flickingInstances.length;
      });
      expect(count).toBe(2);
    });
  });
}
