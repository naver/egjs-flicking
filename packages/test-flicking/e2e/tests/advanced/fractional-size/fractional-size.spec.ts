import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("advanced/fractional-size");

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "advanced", "FractionalSize");
      await waitForFlickingReady(page);
    });

    test("2개 인스턴스 + useFractionalSize 옵션 확인", async ({ page }) => {
      const options = await page.evaluate(() => {
        return (window as any).__flickingInstances.map((f: any) => ({
          useFractionalSize: f.useFractionalSize,
          defaultIndex: f.defaultIndex
        }));
      });
      expect(options[0].useFractionalSize).toBe(false);
      expect(options[1].useFractionalSize).toBe(true);
      expect(options[0].defaultIndex).toBe(2);
      expect(options[1].defaultIndex).toBe(2);
    });

    test("초기 인덱스가 defaultIndex(2)로 설정됨", async ({ page }) => {
      const state0 = await getFlickingState(page, 0);
      const state1 = await getFlickingState(page, 1);
      expect(state0.currentIndex).toBe(2);
      expect(state1.currentIndex).toBe(2);
    });

    test("두 인스턴스 모두 드래그로 패널 이동 가능", async ({ page }) => {
      await dragLeft(page, { nth: 0, instanceIndex: 0 });
      const state0 = await getFlickingState(page, 0);
      expect(state0.currentIndex).toBeGreaterThan(2);

      await dragLeft(page, { nth: 1, instanceIndex: 1 });
      const state1 = await getFlickingState(page, 1);
      expect(state1.currentIndex).toBeGreaterThan(2);
    });
  });
}
