import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("reactive/pagination");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "reactive", "Pagination");
      await waitForFlickingReady(page);
    });

    // focus: 5개 패널이 렌더링됨
    test("5개 패널 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(5);
    });

    // focus: 5개 pagination 버튼이 존재함
    test("5개 pagination 버튼 렌더링", async ({ page }) => {
      const buttons = page.locator(".pagination-btn");
      await expect(buttons).toHaveCount(5);
    });

    // focus: 버튼 클릭으로 해당 패널로 이동
    test("버튼 클릭으로 패널 이동", async ({ page }) => {
      // 3번째 버튼 클릭 (index 2)
      const button = page.locator(".pagination-btn").nth(2);
      await button.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(2);
    });
  });
}
