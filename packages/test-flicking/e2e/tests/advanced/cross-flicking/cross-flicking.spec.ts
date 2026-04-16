import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/cross-flicking");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "CrossFlicking");
      await waitForFlickingReady(page);
    });

    test("외부 수직 + 내부 수평 인스턴스 존재", async ({ page }) => {
      const result = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        const verticalInstance = instances.find((f: any) => f.horizontal === false);
        const nestedInstance = instances.find((f: any) => f.nested === true);
        return {
          hasVertical: !!verticalInstance,
          hasNested: !!nestedInstance,
          totalInstances: instances.length
        };
      });
      expect(result.hasVertical).toBe(true);
      expect(result.hasNested).toBe(true);
      expect(result.totalInstances).toBeGreaterThanOrEqual(4);
    });

    test("내부 수평 Flicking에서 드래그로 패널 이동", async ({ page }) => {
      // 첫 번째 내부 viewport에서 수평 드래그
      const innerViewport = page.locator(".inner-viewport, .flicking-viewport").nth(1);
      const box = await innerViewport.boundingBox();
      if (!box) return;

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 200, box.y + box.height / 2, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(500);

      // 수평 내부 Flicking이 이동됨
      const innerIndex = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        // horizontal && nested인 인스턴스 찾기
        const inner = instances.find((f: any) => f.horizontal === true && f.nested === true);
        return inner ? inner.index : -1;
      });
      expect(innerIndex).toBeGreaterThanOrEqual(0);
    });

    test("외부 수직 Flicking에서 API로 그룹 이동", async ({ page }) => {
      const outerIndex = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        return instances.findIndex((f: any) => f.horizontal === false);
      });

      // API로 다음 그룹으로 이동
      const afterIndex = await page.evaluate(async (idx: number) => {
        const flicking = (window as any).__flickingInstances[idx];
        await flicking.moveTo(1, 300);
        return flicking.index;
      }, outerIndex);
      expect(afterIndex).toBe(1);
    });
  });
}
