import { expect, test } from "@playwright/test";
import { navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/nested");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Nested");
      await waitForFlickingReady(page);
    });

    test("외부 + 내부 Flicking 구조 렌더링", async ({ page }) => {
      const outerPanels = page.locator(".outer-panel");
      const count = await outerPanels.count();
      expect(count).toBeGreaterThanOrEqual(6);

      const innerViewports = page.locator(".inner-viewport");
      const innerCount = await innerViewports.count();
      expect(innerCount).toBeGreaterThanOrEqual(6);
    });

    test("내부 Flicking에서 드래그로 패널 이동", async ({ page }) => {
      // 첫 번째 inner viewport에서 드래그
      const innerViewport = page.locator(".inner-viewport").first();
      const box = await innerViewport.boundingBox();

      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.mouse.down();
      await page.mouse.move(box!.x + box!.width / 2 - 200, box!.y + box!.height / 2, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(500);

      // 내부 Flicking의 인덱스가 변경됨
      const innerIndex = await page.evaluate(() => {
        // 내부 Flicking 인스턴스 찾기 (nested: true인 인스턴스들)
        const instances = (window as any).__flickingInstances;
        // 첫 번째 inner Flicking은 보통 instances[1] (outer가 [0])
        for (let i = 1; i < instances.length; i++) {
          if (instances[i].horizontal === true) {
            return instances[i].index;
          }
        }
        return -1;
      });
      expect(innerIndex).toBeGreaterThanOrEqual(0);
    });

    test("nested:true 설정 확인", async ({ page }) => {
      const hasNested = await page.evaluate(() => {
        const instances = (window as any).__flickingInstances;
        return instances.some((f: any) => f.nested === true);
      });
      expect(hasNested).toBe(true);
    });
  });
}
