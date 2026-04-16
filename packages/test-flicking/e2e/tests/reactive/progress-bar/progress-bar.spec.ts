import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("reactive/progress-bar");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "reactive", "ProgressBar");
      await waitForFlickingReady(page);
    });

    test("5개 패널 + progress bar 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(5);

      await expect(page.locator(".progress-bar")).toBeAttached();
      await expect(page.locator(".progress-text")).toBeAttached();
    });

    test("초기 progress 값은 0%", async ({ page }) => {
      const text = await page.locator(".progress-text").textContent();
      expect(text).toContain("0");
    });

    test("드래그 후 progress 값 증가", async ({ page }) => {
      await dragLeft(page);

      const text = await page.locator(".progress-text").textContent();
      const num = parseFloat(text?.match(/[\d.]+/)?.[0] || "0");
      expect(num).toBeGreaterThan(0);
    });

    test("마지막 패널 이동 시 progress 100%", async ({ page }) => {
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[0];
        await flicking.moveTo(flicking.panelCount - 1, 0);
      });
      await page.waitForTimeout(300);

      const text = await page.locator(".progress-text").textContent();
      const num = parseFloat(text?.match(/[\d.]+/)?.[0] || "0");
      expect(num).toBeCloseTo(100, 0);
    });
  });
}
