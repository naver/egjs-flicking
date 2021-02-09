import LinearCamera from "~/camera/LinearCamera";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

import { createFlicking } from "../helper/test-util";
import El from "../helper/El";

describe("LinearCamera", () => {
  describe("Methods", () => {
    describe("updateRange", () => {
      it("should throw a FlickingError with code NOT_ATTACHED_TO_FLICKING when it's not initialized yet", () => {
        const camera = new LinearCamera();

        expect(() => camera.getPanelBelow())
          .to.throw(FlickingError)
          .with.property("code", ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
      });

      it("should set range to min:0, max:0 when there're no panels", () => {
        const camera = new LinearCamera();
        const flicking = createFlicking(El.viewport().add(El.camera()));

        camera.init(flicking);
        camera.updateRange();

        expect(camera.range).to.deep.equal({ min: 0, max: 0 });
      });

      it("should set range from first panel's position to last panel's position", () => {
        const camera = new LinearCamera();
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        camera.init(flicking);
        camera.updateAlignPos();
        camera.updateRange();

        expect(camera.range).to.deep.equal({
          min: flicking.getPanel(0).position,
          max: flicking.getPanel(2).position
        });
      });
    });
  });
});
