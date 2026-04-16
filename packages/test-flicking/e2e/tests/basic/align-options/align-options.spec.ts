import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/align-options");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "AlignOptions");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 align 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const aligns = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.align);
      });
      expect(aligns).toEqual(["prev", "center", "next"]);
    });

    test("드래그로 패널 이동", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBeGreaterThan(0);
    });
  });
}
