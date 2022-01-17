import BoundCameraMode from "~/camera/mode/BoundCameraMode";

import { createFlicking } from "../../helper/test-util";
import El from "../../helper/El";

describe("BoundCameraMode", () => {
  describe("Methods", () => {
    describe("getRange", () => {
      it("should range range to min:0, max:0 when there're no panels", async () => {
        const flicking = await createFlicking(El.viewport().add(El.camera()), { bound: true });

        expect(flicking.camera.mode).to.be.an.instanceOf(BoundCameraMode);
        expect(flicking.camera.range).to.deep.equal({ min: 0, max: 0 });
      });

      it("should return range from first panel's left + align to last panel's right - align", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { bound: true });
        const camera = flicking.camera;
        const range = camera.mode.getRange();

        expect(camera.mode).to.be.an.instanceOf(BoundCameraMode);
        expect(range).to.deep.equal({
          min: flicking.getPanel(0).range.min + camera.alignPosition,
          max: flicking.getPanel(2).range.max - camera.alignPosition
        });
      });

      it("should set range by align value when sum of panel size is same or smaller than viewport size", async () => {
        const flicking = await createFlicking(
          El.viewport().setWidth(900).add(
            El.camera()
              .add(El.panel("300px"))
              .add(El.panel("300px"))
              .add(El.panel("300px"))
          ),
          { bound: true }
        );
        const camera = flicking.camera;

        expect(camera.mode).to.be.an.instanceOf(BoundCameraMode);

        camera.align = "center";
        camera.updateAlignPos();
        expect(camera.mode.getRange()).to.deep.equal({
          min: 450,
          max: 450
        });

        camera.align = "prev";
        camera.updateAlignPos();
        expect(camera.mode.getRange()).to.deep.equal({
          min: 0,
          max: 0
        });

        camera.align = "next";
        camera.updateAlignPos();
        expect(camera.mode.getRange()).to.deep.equal({
          min: 900,
          max: 900
        });
      });
    });
  });
});
