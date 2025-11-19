import LinearCameraMode from "~/camera/mode/LinearCameraMode";

import { createFlicking } from "../../helper/test-util";
import El from "../../helper/El";

describe("LinearCameraMode", () => {
  describe("Methods", () => {
    describe("checkAvailability", () => {
      it("should return true", async () => {
        const { camera } = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(camera.mode).to.be.an.instanceOf(LinearCameraMode);
        expect(camera.mode.checkAvailability()).to.be.true;
      });
    });

    describe("getRange", () => {
      it("should set range to min:0, max:0 when there're no panels", async () => {
        const { camera } = await createFlicking(El.viewport().add(El.camera()));

        expect(camera.mode).to.be.an.instanceOf(LinearCameraMode);
        expect(camera.mode.getRange()).to.deep.equal({ min: 0, max: 0 });
      });

      it("should set range from first panel's position to last panel's position", async () => {
        const { camera, panels } = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(camera.mode).to.be.an.instanceOf(LinearCameraMode);
        expect(camera.mode.getRange()).to.deep.equal({
          min: panels[0].position,
          max: panels[2].position
        });
      });
    });
  });
});
