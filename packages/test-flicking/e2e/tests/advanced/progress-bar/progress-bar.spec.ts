import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/progress-bar");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "ProgressBar");
      await waitForFlickingReady(page);
    });

    test("5개 패널 + progress bar 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(5);

      const progressBar = page.locator(".progress-bar");
      await expect(progressBar).toBeAttached();

      const progressText = page.locator(".progress-text");
      await expect(progressText).toBeAttached();
    });

    test("드래그 후 Flicking progress 증가", async ({ page }) => {
      await dragLeft(page);

      // Flicking API로 progress 직접 조회
      const progress = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[0];
        return flicking.camera.progress * 100;
      });
      expect(progress).toBeGreaterThan(0);
    });

    test("마지막으로 이동 시 progress 100%에 근접", async ({ page }) => {
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[0];
        await flicking.moveTo(flicking.panelCount - 1, 0);
      });
      await page.waitForTimeout(300);

      const progress = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[0];
        return flicking.camera.progress * 100;
      });
      expect(progress).toBeGreaterThanOrEqual(90);
    });

    test("moveType이 freeScroll이고 bound가 true", async ({ page }) => {
      const options = await page.evaluate(() => {
        const flicking = (window as any).__flickingInstances[0];
        return { moveType: flicking.moveType, bound: flicking.bound };
      });
      expect(options.moveType).toBe("freeScroll");
      expect(options.bound).toBe(true);
    });
  });
}
