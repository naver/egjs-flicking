import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/coverflow");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "Coverflow");
      await waitForFlickingReady(page);
    });

    test("8개 패널 렌더링", async ({ page }) => {
      const panels = page.locator(".flicking-panel");
      await expect(panels).toHaveCount(8);
    });

    test("circular + center align 옵션 확인", async ({ page }) => {
      const opts = await page.evaluate(() => {
        const f = (window as any).__flickingInstances[0];
        return { circular: f.circular, align: f.align };
      });
      expect(opts.circular).toBe(true);
      expect(opts.align).toBe("center");
    });

    test("드래그로 패널 이동", async ({ page }) => {
      await dragLeft(page);
      const state = await getFlickingState(page);
      expect(state.currentIndex).toBeGreaterThan(0);
    });
  });
}
