import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("plugins/arrow");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "plugins", "Arrow");
      await waitForFlickingReady(page);
    });

    // focus: 화살표 버튼이 렌더링됨
    test("화살표 버튼 렌더링", async ({ page }) => {
      const prevArrow = page.locator(".flicking-arrow-prev");
      const nextArrow = page.locator(".flicking-arrow-next");

      await expect(prevArrow).toBeAttached();
      await expect(nextArrow).toBeAttached();
    });

    // focus: next 화살표 클릭 시 다음 패널로 이동
    test("next 화살표 클릭으로 다음 패널 이동", async ({ page }) => {
      const nextArrow = page.locator(".flicking-arrow-next");
      await nextArrow.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(1);
    });

    // focus: prev 화살표 클릭 시 이전 패널로 이동
    test("prev 화살표 클릭으로 이전 패널 이동", async ({ page }) => {
      // 먼저 다음으로 이동
      const nextArrow = page.locator(".flicking-arrow-next");
      await nextArrow.click();
      await waitForAnimationEnd(page);

      // prev 클릭으로 복귀
      const prevArrow = page.locator(".flicking-arrow-prev");
      await prevArrow.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(0);
    });
  });
}
