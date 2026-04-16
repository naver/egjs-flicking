import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/input-type");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "InputType");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 inputType 설정 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const inputTypes = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => f.inputType);
      });
      // touch+mouse / touch only / mouse only
      expect(inputTypes[0]).toEqual(expect.arrayContaining(["touch", "mouse"]));
      expect(inputTypes[1]).toEqual(["touch"]);
      expect(inputTypes[2]).toEqual(["mouse"]);
    });

    test("touch+mouse 인스턴스에서 마우스 드래그 동작", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      const state = await getFlickingState(page, 0);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("mouse-only 인스턴스에서 마우스 드래그 동작", async ({ page }) => {
      await dragLeft(page, { nth: 2, instanceIndex: 2 });
      const state = await getFlickingState(page, 2);
      expect(state.currentIndex).toBeGreaterThan(0);
    });

    test("touch-only 인스턴스에서 마우스 드래그 불가", async ({ page }) => {
      // Playwright의 mouse 이벤트는 touch가 아님
      await dragLeft(page, { nth: 1, instanceIndex: 1 });
      const state = await getFlickingState(page, 1);
      expect(state.currentIndex).toBe(0);
    });
  });
}
