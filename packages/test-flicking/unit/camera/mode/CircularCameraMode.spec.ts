import { vi } from "vitest";
import CircularCameraMode from "~/camera/mode/CircularCameraMode";
import El from "../../helper/El";
import { createFlicking, createPanel } from "../../helper/test-util";

describe("CircularCamera", () => {
  describe("Methods", () => {
    describe("findAnchorIncludePosition", () => {
      it("should return panel at toggled position if circular is enabled", async () => {
        const { camera, panels } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.findAnchorIncludePosition(panels[2].range.max + 1).panel).toBe(panels[0]);
        expect(camera.mode.findAnchorIncludePosition(panels[0].range.min - 1).panel).toBe(panels[2]);
      });

      it("should return panel at toggled position if the given position is same to the camera range max", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.findAnchorIncludePosition(camera.range.max).index).toBe(0);
      });

      it("should return panel at toggled position if the given position is same to the camera range min", async () => {
        const { camera, panelCount } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.findAnchorIncludePosition(camera.range.min).index).toBe(panelCount - 1);
      });
    });

    describe("clampToReachablePosition", () => {
      it("should return position itself even it's over range when circular can be enabled", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.controlParams.circular).toBe(true);
        expect(camera.clampToReachablePosition(camera.range.max + 1)).toBe(camera.range.max + 1);
        expect(camera.clampToReachablePosition(camera.range.min - 1)).toBe(camera.range.min - 1);
      });
    });

    describe("canReach", () => {
      it("should always return true for any panel when circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const camera = flicking.camera;
        const panel = flicking.getPanel(0);

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);

        vi.spyOn(panel, "position" as any, "get").mockReturnValue(camera.range.max + 1);

        expect(camera.canReach(panel)).toBe(true);

        vi.spyOn(panel, "position" as any, "get").mockReturnValue(camera.range.min - 1);

        expect(camera.canReach(panel)).toBe(true);
      });
    });

    describe("canSee", () => {
      it("should return true when panel is visible on looped position is included if circular is enabled", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = await createPanel(El.panel());
        const camRange = camera.range;

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);

        camera.lookAt(camRange.min);
        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.min + camera.rangeDiff + 1,
          max: camera.visibleRange.min + camera.rangeDiff + 1
        });

        expect(camera.canSee(panel)).toBe(true);

        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.max + camera.rangeDiff - 1,
          max: camera.visibleRange.max + camera.rangeDiff - 1
        });

        expect(camera.canSee(panel)).toBe(true);

        camera.lookAt(camRange.max);
        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.min - camera.rangeDiff + 1,
          max: camera.visibleRange.min - camera.rangeDiff + 1
        });

        expect(camera.canSee(panel)).toBe(true);

        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.max - camera.rangeDiff - 1,
          max: camera.visibleRange.max - camera.rangeDiff - 1
        });

        expect(camera.canSee(panel)).toBe(true);
      });

      it("should return false when visible on looped position is not included if circular is enabled", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);

        const panel = await createPanel(El.panel());
        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.min + camera.rangeDiff - 1,
          max: camera.visibleRange.min + camera.rangeDiff - 1
        });

        expect(camera.canSee(panel)).toBe(false);

        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.max + camera.rangeDiff + 1,
          max: camera.visibleRange.max + camera.rangeDiff + 1
        });

        expect(camera.canSee(panel)).toBe(false);

        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.min - camera.rangeDiff - 1,
          max: camera.visibleRange.min - camera.rangeDiff - 1
        });

        expect(camera.canSee(panel)).toBe(false);

        vi.spyOn(panel, "range" as any, "get").mockReturnValue({
          min: camera.visibleRange.max - camera.rangeDiff + 1,
          max: camera.visibleRange.max - camera.rangeDiff + 1
        });

        expect(camera.canSee(panel)).toBe(false);
      });
    });

    describe("getRange", () => {
      it("should set range from first panel's left to last panel's right when circular is enabled", async () => {
        const { camera, panels } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).toBe(true);
        expect(camera.range).toEqual({
          min: panels[0].range.min,
          max: panels[2].range.max
        });
      });
    });

    describe("findNearestAnchor", () => {
      it("should return the first anchor when position is 0", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const anchors = camera.anchorPoints;

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).toBe(true);
        expect(camera.mode.findNearestAnchor(0)).toBe(anchors[0]);
      });

      it("should return the last anchor when position is below 0", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const anchors = camera.anchorPoints;

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).toBe(true);
        expect(camera.mode.findNearestAnchor(-500)).toBe(anchors[2]);
      });
    });
  });
});
