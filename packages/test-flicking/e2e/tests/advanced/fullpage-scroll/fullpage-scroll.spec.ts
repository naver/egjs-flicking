import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForAnimationEnd, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/fullpage-scroll");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "FullpageScroll");
      await waitForFlickingReady(page);
    });

    test("5개 페이지 패널 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBe(5);
    });

    test("수직/수평 전환 토글 버튼 존재", async ({ page }) => {
      const verticalBtn = page.locator("button", { hasText: /[Vv]ertical/ });
      const horizontalBtn = page.locator("button", { hasText: /[Hh]orizontal/ });
      const verticalCount = await verticalBtn.count();
      const horizontalCount = await horizontalBtn.count();
      expect(verticalCount + horizontalCount).toBeGreaterThanOrEqual(1);
    });

    test("초기 수직 모드에서 수직 드래그로 다음 페이지 이동", async ({ page }) => {
      // 초기 상태는 수직 모드
      const viewport = page.locator(".flicking-viewport").first();
      const box = await viewport.boundingBox();

      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.mouse.down();
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2 - 200, { steps: 10 });
      await page.mouse.up();
      await waitForAnimationEnd(page);

      const state = await getFlickingState(page);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("strict moveType으로 설정됨", async ({ page }) => {
      const moveType = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].moveType;
      });
      expect(moveType).toBe("strict");
    });
  });
}
