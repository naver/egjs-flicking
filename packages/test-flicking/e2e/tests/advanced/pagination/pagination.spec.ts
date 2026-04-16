import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/pagination");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "Pagination");
      await waitForFlickingReady(page);
    });

    test("5개 패널 + 5개 dot 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(5);

      const dots = page.locator(".dot");
      await expect(dots).toHaveCount(5);
    });

    test("dot 클릭으로 해당 패널로 이동", async ({ page }) => {
      // 3번째 dot 클릭 (index 2)
      const dot = page.locator(".dot").nth(2);
      await dot.click();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBe(2);
    });

    test("드래그 후 active dot이 현재 패널과 동기화", async ({ page }) => {
      await dragLeft(page);
      const state = await getFlickingState(page);

      // active 클래스를 가진 dot의 인덱스 확인
      const activeDotIndex = await page.evaluate(() => {
        const dots = document.querySelectorAll(".dot");
        for (let i = 0; i < dots.length; i++) {
          if (dots[i].classList.contains("active")) return i;
        }
        return -1;
      });
      expect(activeDotIndex).toBe(state.currentIndex);
    });

    test("초기 상태에서 첫 번째 dot이 active", async ({ page }) => {
      const firstDot = page.locator(".dot").first();
      await expect(firstDot).toHaveClass(/active/);
    });
  });
}
