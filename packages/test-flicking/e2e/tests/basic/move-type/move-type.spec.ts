import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/move-type");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "MoveType");
      await waitForFlickingReady(page);
    });

    test("3개 인스턴스 렌더링 및 moveType 옵션 확인", async ({ page }) => {
      const viewports = page.locator(".flicking-viewport");
      await expect(viewports).toHaveCount(3);

      const moveTypes = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) =>
          typeof f.moveType === "string" ? f.moveType : f.moveType.type
        );
      });
      expect(moveTypes).toEqual(["snap", "freeScroll", "strict"]);
    });

    test("strict 인스턴스는 한 칸만 이동", async ({ page }) => {
      // strict 인스턴스(index 2)에서 큰 드래그
      await dragLeft(page, { nth: 2, instanceIndex: 2, distance: 500 });
      const state = await getFlickingState(page, 2);
      // strict는 아무리 멀리 드래그해도 한 칸만 이동
      expect(state.currentIndex).toBe(1);
    });
  });
}
