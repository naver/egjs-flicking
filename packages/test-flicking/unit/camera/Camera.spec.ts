import { vi } from "vitest";
import { BoundCameraMode, CircularCameraMode, LinearCameraMode } from "~/camera";
import Camera from "~/camera/Camera";
import { ALIGN, DIRECTION } from "~/constants/values";
import FlickingError from "~/error/FlickingError";
import { EVENTS } from "~/event";
import El from "../helper/El";
import { createFlicking, simulate } from "../helper/test-util";

describe("Camera", () => {
  describe("Properties", () => {
    it("should have element undefined as default", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).element).toBeUndefined();
    });

    it("should have position 0 as default", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).position).toBe(0);
    });

    it("should have 0 as a default size", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).size).toBe(0);
    });

    it("should have alignPosition 0 as default", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).alignPosition).toBe(0);
    });

    it("should have range from 0 to 0 as default", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).range.min).toBe(0);
      expect(new Camera(flicking).range.max).toBe(0);
    });

    it("should have visiblePanels as an empty array as default", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).visiblePanels).toHaveLength(0);
    });

    it(`should have align ${ALIGN.CENTER} as default`, async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { autoInit: false });
      expect(new Camera(flicking).align).toBe(ALIGN.CENTER);
    });

    it("should return size same to viewport width when horizontal: true", async () => {
      const flicking = await await createFlicking(El.DEFAULT_HORIZONTAL, { horizontal: true });
      const camera = new Camera(flicking);

      camera.init();

      expect(camera.size).not.toBe(0);
      expect(camera.size).toBe(flicking.viewport.width);
      expect(camera.size).not.toBe(flicking.viewport.height);
    });

    it("should return size same to viewport height when horizontal: false", async () => {
      const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { horizontal: false });
      const camera = new Camera(flicking);

      camera.init();

      expect(camera.size).not.toBe(0);
      expect(camera.size).not.toBe(flicking.viewport.width);
      expect(camera.size).toBe(flicking.viewport.height);
    });

    describe("controlParams", () => {
      it("should return current range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);
        expect(camera.controlParams.range).toEqual(camera.range);
      });

      it("should return current position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        camera.init();
        camera.lookAt(800);

        expect(camera.controlParams.position).toBe(800);
      });

      it("should always return circular as false", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(new Camera(flicking).controlParams.circular).toBe(false);
      });
    });

    describe("visibleRange", () => {
      it("should return visible range from current position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking, { align: ALIGN.CENTER });

        camera.init();
        camera.updateAlignPos();
        camera.lookAt(500);

        expect(camera.visibleRange.min).toBe(500 - flicking.viewport.width / 2);
        expect(camera.visibleRange.max).toBe(500 + flicking.viewport.width / 2);
      });
    });
  });

  describe("Methods", () => {
    describe("init", () => {
      it("should throw a FlickingError with code VAL_MUST_NOT_NULL when there's no camera element inside it", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        // Remove viewport's children
        while (flicking.element.firstChild) {
          flicking.element.firstChild.remove();
        }

        expect(() => camera.init()).toThrow(FlickingError);
      });

      it("should set first child of the viewport element as its element", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        camera.init();

        expect(camera.element).toBe(flicking.element.firstChild);
      });

      it("should use LinearCameraMode by default", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        camera.init();

        expect(camera.mode).toBeInstanceOf(LinearCameraMode);
      });

      it("should use BoundCameraMode when bound is true and the mode is available", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { bound: true });
        const camera = new Camera(flicking);

        camera.init();

        expect(camera.mode).toBeInstanceOf(BoundCameraMode);
        expect(camera.mode.checkAvailability()).toBe(true);
      });

      it("should use CircularCameraMode when circular is true and the mode is available", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const camera = new Camera(flicking);

        camera.init();

        expect(camera.mode).toBeInstanceOf(CircularCameraMode);
        expect(camera.mode.checkAvailability()).toBe(true);
      });

      it("should use LinearCameraMode when circular is true but it's not available & circularFallback is 'default'", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), {
          circular: true,
          circularFallback: "default"
        });
        const camera = new Camera(flicking);

        camera.init();

        expect(camera.mode).toBeInstanceOf(LinearCameraMode);
      });

      it("should use BoundCameraMode when circular is true but it's not available & circularFallback is 'default'", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), {
          circular: true,
          circularFallback: "bound"
        });
        const camera = new Camera(flicking);

        camera.init();

        expect(camera.mode).toBeInstanceOf(BoundCameraMode);
      });
    });

    describe("lookAt", () => {
      it("should set position to given value", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);
        const prevPosition = camera.position;

        camera.init();
        camera.lookAt(500);

        expect(camera.position).not.toBe(prevPosition);
        expect(camera.position).toBe(500);
      });

      it("should apply transform to camera element", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        camera.init();
        camera.lookAt(500);

        expect(camera.element.style.transform).toBe(`translate(${-(500 - camera.alignPosition)}px)`);
      });

      it("should update visible panels", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        camera.init();
        camera.lookAt(500);

        expect(camera.visiblePanels.length).not.toBe(0);
      });

      it(`should trigger flicking's ${EVENTS.VISIBLE_CHANGE} on visible panels update`, async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);
        const visibleChangeSpy = vi.fn();

        flicking.on(EVENTS.VISIBLE_CHANGE, visibleChangeSpy);
        camera.init();
        camera.lookAt(500);

        await (async () => void 0)();

        expect(visibleChangeSpy).toHaveBeenCalledTimes(1);
      });

      it(`should trigger flicking's ${EVENTS.NEED_PANEL} for both sides when there're no panels`, async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()));
        const camera = new Camera(flicking);
        const needPanelSpy = vi.fn();

        flicking.on(EVENTS.NEED_PANEL, needPanelSpy);
        camera.init();
        camera.lookAt(500);

        expect(needPanelSpy).toHaveBeenCalledTimes(2);
        expect(needPanelSpy).toHaveBeenCalledWith(expect.objectContaining({ direction: DIRECTION.NEXT }));
        expect(needPanelSpy).toHaveBeenCalledWith(expect.objectContaining({ direction: DIRECTION.PREV }));
      });

      it(`should trigger flicking's ${EVENTS.REACH_EDGE} when moving to range.min`, async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()));
        const camera = new Camera(flicking);
        const reachEdgeSpy = vi.fn();

        (camera as any)._range = { min: -1000, max: 1000 };
        camera.init();
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(-1000);

        expect(reachEdgeSpy).toHaveBeenCalledTimes(1);
        expect(reachEdgeSpy).toHaveBeenCalledWith(expect.objectContaining({ direction: DIRECTION.PREV }));
      });

      it(`should trigger flicking's ${EVENTS.REACH_EDGE} when moving to range.max`, async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()));
        const camera = new Camera(flicking);
        const reachEdgeSpy = vi.fn();

        (camera as any)._range = { min: -1000, max: 1000 };
        camera.init();
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(1000);

        expect(reachEdgeSpy).toHaveBeenCalledTimes(1);
        expect(reachEdgeSpy).toHaveBeenCalledWith(expect.objectContaining({ direction: DIRECTION.NEXT }));
      });

      it(`should noot trigger flicking's ${EVENTS.REACH_EDGE} when moving from outside of range to range.min`, async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()));
        const camera = new Camera(flicking);
        const reachEdgeSpy = vi.fn();

        (camera as any)._range = { min: -1000, max: 1000 };
        camera.init();
        camera.lookAt(-1001); // Move to outside
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(-1000); // Move to outside

        expect(reachEdgeSpy).not.toHaveBeenCalled();
      });

      it(`should noot trigger flicking's ${EVENTS.REACH_EDGE} when moving from outside of range to range.max`, async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()));
        const camera = new Camera(flicking);
        const reachEdgeSpy = vi.fn();

        (camera as any)._range = { min: -1000, max: 1000 };
        camera.init();
        camera.lookAt(1001); // Move to outside
        flicking.on(EVENTS.REACH_EDGE, reachEdgeSpy);
        camera.lookAt(1000); // Move to outside

        expect(reachEdgeSpy).not.toHaveBeenCalled();
      });
    });

    describe("findAnchorIncludePosition", () => {
      it("should return panel at given position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);
        const panels = flicking.panels;

        camera.init();
        camera.updateAnchors();

        expect(camera.findAnchorIncludePosition(panels[0].position).panel).toBe(panels[0]);
        expect(camera.findAnchorIncludePosition(panels[1].position).panel).toBe(panels[1]);
        expect(camera.findAnchorIncludePosition(panels[2].position).panel).toBe(panels[2]);
      });

      it("should return null when no panel includes given position", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);
        const panels = flicking.panels;

        camera.init();
        camera.updateAnchors();

        expect(camera.findAnchorIncludePosition(-999999999)).toBeNull();
        expect(camera.findAnchorIncludePosition(999999999)).toBeNull();
        expect(camera.findAnchorIncludePosition(panels[2].range.max + 1)).toBeNull();
        expect(camera.findAnchorIncludePosition(panels[0].range.min - 1)).toBeNull();
      });
    });

    describe("findNearestAnchor", () => {
      it("should return null when there're no panels", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()));
        const camera = new Camera(flicking);

        camera.init();
        camera.updateAnchors();

        expect(camera.findNearestAnchor(0)).toBeNull();
      });

      it("should return correct panel underneath it", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking);

        camera.init();
        camera.updateAnchors();
        camera.lookAt(flicking.getPanel(1).position);

        const nearestAnchor = camera.findNearestAnchor(camera.position);
        expect(nearestAnchor.panel).toBe(flicking.getPanel(1));
        expect(nearestAnchor.position).toBe(flicking.getPanel(1).position);
      });
    });

    describe("updateRange", () => {
      it("should update mode before setting new range", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = flicking.camera;
        const prevMode = camera.mode;

        flicking.circular = true; // This should change mode to Circular
        camera.updateRange();

        const newMode = camera.mode;
        expect(newMode).not.toBe(prevMode);
        expect(newMode).toBeInstanceOf(CircularCameraMode);
      });
    });

    describe("updateAlignPos", () => {
      it("should update alignPosition using current align value", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking, { align: "80%" });
        const prevAlignPosition = camera.alignPosition;

        camera.init();
        camera.updateAlignPos();

        expect(camera.alignPosition).not.toBe(prevAlignPosition);
        expect(camera.alignPosition).toBe(flicking.viewport.width * 0.8);
      });

      it("should use property 'camera' if align is given as an object", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const camera = new Camera(flicking, { align: { panel: "30%", camera: "70%" } });
        const prevAlignPosition = camera.alignPosition;

        camera.init();
        camera.updateAlignPos();

        expect(camera.alignPosition).not.toBe(prevAlignPosition);
        expect(camera.alignPosition).toBe(flicking.viewport.width * 0.7);
      });
    });

    describe("updatePanelOrder", () => {
      it("should guarantee behavior for panels placed in RTL order by default", async () => {
        const flicking = await createFlicking(
          El.viewport()
            .setDirection("rtl")
            .add(El.camera().add(El.panel("300px")).add(El.panel("300px")).add(El.panel("300px")))
        );

        await simulate(flicking.element, { deltaX: 1000 });

        expect(flicking.index).toBe(2);
      });

      it("should update direction of panels when resize occurs", async () => {
        const viewportEl = El.viewport()
          .setDirection("ltr")
          .add(El.camera().add(El.panel("300px")).add(El.panel("300px")).add(El.panel("300px")));
        const flicking = await createFlicking(viewportEl);

        viewportEl.setDirection("rtl");
        await flicking.resize();
        await simulate(flicking.element, { deltaX: 1000 });

        expect(flicking.index).toBe(2);
      });
    });
  });
});
