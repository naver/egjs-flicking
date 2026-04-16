import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/threshold");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Threshold");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 threshold 옵션 확인", async ({ page }) => {
      const thresholds = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.threshold);
      });
      expect(thresholds).toEqual([10, 40, 100]);
    });

    test("threshold:100에서 짧은 드래그는 패널 이동 안 됨", async ({ page }) => {
      // 50px 짧은 드래그 → threshold:100에는 부족
      await dragLeft(page, { nth: 2, instanceIndex: 2, distance: 50 });
      const state = await getFlickingState(page, 2);
      expect(state.currentIndex).toBe(0);
    });

    test("threshold:10에서 짧은 드래그로 패널 이동", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0, distance: 50 });
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBeGreaterThan(0);
    });
  });
}
