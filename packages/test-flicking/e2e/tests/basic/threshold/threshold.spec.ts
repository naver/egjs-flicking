import { expect, test } from "@playwright/test";
import { getFlickingState, navigateToDemo, waitForFlickingReady } from "../../helpers/demo";
import { dragLeft } from "../../helpers/gesture";
import { loadSpec } from "../../helpers/spec-loader";

const spec = loadSpec("basic/threshold");

/** 데모의 인스턴스 순서 = threshold 값 */
const LOW = 0; // threshold: 10
const DEFAULT = 1; // threshold: 40
const HIGH = 2; // threshold: 100

/** threshold:100 미만이면서 10/40은 넘는 거리 */
const SHORT_DRAG = 50;
/** 세 인스턴스의 threshold를 모두 넘는 거리 */
const LONG_DRAG = 150;

for (const framework of spec.frameworks) {
  test.describe(`${spec.id} [${framework}]`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToDemo(page, framework, "basic", "Threshold");
      await waitForFlickingReady(page);
    });

    // focus: threshold가 다른 3개 인스턴스(10/40/100)가 렌더링된다
    test("threshold 10/40/100 인스턴스 렌더링", async ({ page }) => {
      await expect(page.locator(".flicking-viewport")).toHaveCount(3);

      const thresholds = await page.evaluate(() => (window as any).__flickingInstances.map((f: any) => f.threshold));
      expect(thresholds).toEqual([10, 40, 100]);
    });

    // focus: threshold 미만으로 드래그하면 패널이 바뀌지 않고 원래 패널로 되돌아온다
    test("threshold 미만 드래그는 원래 패널로 복귀", async ({ page }) => {
      await dragLeft(page, { nth: HIGH, instanceIndex: HIGH, distance: SHORT_DRAG });

      const state = await getFlickingState(page, HIGH);
      expect(state.currentIndex).toBe(0);
      // 복귀 애니메이션까지 끝나 카메라가 원래 패널에 정확히 정렬되어야 한다
      expect(state.animating).toBe(false);
    });

    // focus: threshold 이상으로 드래그하면 인접 패널로 이동한다
    test("threshold 이상 드래그는 인접 패널로 이동", async ({ page }) => {
      await dragLeft(page, { nth: HIGH, instanceIndex: HIGH, distance: LONG_DRAG });

      const state = await getFlickingState(page, HIGH);
      expect(state.currentIndex).toBe(1);
    });

    // focus: 같은 거리를 드래그해도 threshold가 큰 인스턴스는 이동하지 않는다
    test(`같은 ${SHORT_DRAG}px 드래그에서 threshold 10/40만 이동`, async ({ page }) => {
      for (const idx of [LOW, DEFAULT, HIGH]) {
        await dragLeft(page, { nth: idx, instanceIndex: idx, distance: SHORT_DRAG });
      }

      const indices = await Promise.all(
        [LOW, DEFAULT, HIGH].map(async idx => (await getFlickingState(page, idx)).currentIndex)
      );
      expect(indices).toEqual([1, 1, 0]);
    });

    // focus: 되돌아온 인스턴스도 이후 충분한 드래그에는 정상적으로 이동한다
    test("복귀 후에도 충분한 드래그에는 정상 이동", async ({ page }) => {
      await dragLeft(page, { nth: HIGH, instanceIndex: HIGH, distance: SHORT_DRAG });
      expect((await getFlickingState(page, HIGH)).currentIndex).toBe(0);

      await dragLeft(page, { nth: HIGH, instanceIndex: HIGH, distance: LONG_DRAG });
      expect((await getFlickingState(page, HIGH)).currentIndex).toBe(1);
    });
  });
}
