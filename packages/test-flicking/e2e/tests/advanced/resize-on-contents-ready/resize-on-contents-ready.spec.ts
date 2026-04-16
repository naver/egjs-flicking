import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/resize-on-contents-ready");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "ResizeOnContentsReady");
      await waitForFlickingReady(page);
    });

    test("resizeOnContentsReady 옵션 확인 (true/false)", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.resizeOnContentsReady);
      });
      expect(options).toEqual([true, false]);
    });

    test("이미지 패널이 존재함", async ({ page }) => {
      const images = page.locator(".flicking-panel img");
      const count = await images.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test("API로 패널 이동 가능", async ({ page }) => {
      for (let i = 0; i < 2; i++) {
        await page.evaluate(async (idx: number) => {
          const flicking = (window as any).__flickingInstances[idx];
          await flicking.moveTo(1, 0);
        }, i);
        const state = await page.evaluate((idx: number) => {
          return (window as any).__flickingInstances[idx].index;
        }, i);
        expect(state).toBe(1);
      }
    });
  });
}
