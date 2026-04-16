import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/infinite-scroll");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "InfiniteScroll");
      await waitForFlickingReady(page);
    });

    test("초기 패널 렌더링", async ({ page }) => {
      const state = await getFlickingState(page);
      expect(state.panelCount).toBeGreaterThanOrEqual(5);
    });

    test("needPanelThreshold 옵션 설정 확인", async ({ page }) => {
      const threshold = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].needPanelThreshold;
      });
      expect(typeof threshold).toBe("number");
    });

    test("드래그로 패널 이동 가능", async ({ page }) => {
      await dragLeft(page);
      const state = await getFlickingState(page);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("align 옵션 설정 확인", async ({ page }) => {
      const align = await page.evaluate(() => {
        return (window as any).__flickingInstances[0].align;
      });
      expect(align).toBeTruthy();
    });

    test("이벤트 로그 영역이 존재", async ({ page }) => {
      const eventLog = page.locator("#event-log, .event-log");
      const count = await eventLog.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });
}
