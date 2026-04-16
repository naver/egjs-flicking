import type { Page } from "@playwright/test";
import { waitForAnimationEnd } from "./demo";

interface DragOptions {
  /** 드래그 이동 거리 (px) */
  distance?: number;
  /** 드래그 스텝 수 (많을수록 부드러움) */
  steps?: number;
  /** 대상 .flicking-viewport 선택자 (여러 인스턴스가 있는 데모용) */
  selector?: string;
  /** 여러 viewport가 있을 때 n번째 선택 (0-based) */
  nth?: number;
  /** 드래그 후 애니메이션 완료 대기 여부 */
  waitAnimation?: boolean;
  /** 애니메이션 완료 대기 시 사용할 인스턴스 인덱스 */
  instanceIndex?: number;
}

/**
 * .flicking-viewport 중앙에서 수평 드래그를 수행
 */
async function drag(page: Page, direction: "left" | "right", options: DragOptions = {}) {
  const {
    distance = 300,
    steps = 10,
    selector = ".flicking-viewport",
    nth = 0,
    waitAnimation = true,
    instanceIndex = 0
  } = options;

  const viewport = page.locator(selector).nth(nth);
  const box = await viewport.boundingBox();
  if (!box) throw new Error(`Element not found: ${selector}`);

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  const deltaX = direction === "left" ? -distance : distance;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + deltaX, startY, { steps });
  await page.mouse.up();

  if (waitAnimation) {
    await waitForAnimationEnd(page, instanceIndex);
  }
}

/**
 * 왼쪽으로 드래그 (다음 패널 방향)
 */
export async function dragLeft(page: Page, options?: DragOptions) {
  await drag(page, "left", options);
}

/**
 * 오른쪽으로 드래그 (이전 패널 방향)
 */
export async function dragRight(page: Page, options?: DragOptions) {
  await drag(page, "right", options);
}
