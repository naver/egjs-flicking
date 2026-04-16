import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("reactive/prev-next");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "reactive", "PrevNext");
      await waitForFlickingReady(page);
    });

    test("초기 상태: Prev disabled, Next enabled", async ({ page }) => {
      const prevBtn = page.locator("button", { hasText: "Prev" });
      const nextBtn = page.locator("button", { hasText: "Next" });
      await expect(prevBtn).toBeDisabled();
      await expect(nextBtn).toBeEnabled();
    });

    test("Next 클릭으로 다음 패널 이동 + Prev 활성화", async ({ page }) => {
      const nextBtn = page.locator("button", { hasText: "Next" });
      await nextBtn.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(1);

      const prevBtn = page.locator("button", { hasText: "Prev" });
      await expect(prevBtn).toBeEnabled();
    });

    test("Prev 클릭으로 이전 패널 복귀 + Prev 다시 disabled", async ({ page }) => {
      const nextBtn = page.locator("button", { hasText: "Next" });
      const prevBtn = page.locator("button", { hasText: "Prev" });

      await nextBtn.click();
      await waitForAnimationEnd(page);

      await prevBtn.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(0);
      await expect(prevBtn).toBeDisabled();
    });

    test("마지막 패널에서 Next disabled", async ({ page }) => {
      await page.evaluate(async () => {
        const flicking = (window as any).__flickingInstances[0];
        await flicking.moveTo(flicking.panelCount - 1, 0);
      });
      await page.waitForTimeout(200);

      const nextBtn = page.locator("button", { hasText: "Next" });
      await expect(nextBtn).toBeDisabled();
    });
  });
}
