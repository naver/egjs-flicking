import El from "./helper/El";
import { cleanup, createCrossFlicking, simulate, tick } from "./helper/test-util";

describe.only("CrossFlicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", async () => {
      const err = await createCrossFlicking(El.DEFAULT_CROSS).then(() => null).catch(e => e);
      expect(err).to.be.null;
    });
  });

  describe("Options", () => {
    describe("sideOptions", () => {
      it("should apply sideOptions to side flicking instances.", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          sideOptions: {
            preventClickOnDrag: true,
            duration: 3000
          }
        });

        expect(flicking.sideFlicking[2].preventClickOnDrag).to.equal(true);
        expect(flicking.sideFlicking[2].duration).to.equal(3000);
      });
    });

    describe("preserveIndex", () => {
      it("is true by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.preserveIndex).to.equal(true);
      });

      it("should preserve index of previous side flicking when preserveIndex is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS,{
          preserveIndex: true
        });
        void flicking.sideFlicking[0].moveTo(1, 0);
        void flicking.moveTo(1, 0);
        tick(100);

        expect(flicking.index).to.equal(1);
        expect(flicking.sideFlicking[0].index).to.equal(1);
      });

      it("should reset index of previous side flicking when preserveIndex is false", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS,{
          preserveIndex: false
        });
        void flicking.sideFlicking[0].moveTo(1, 0);
        void flicking.moveTo(1, 0);
        tick(100);

        expect(flicking.index).to.equal(1);
        expect(flicking.sideFlicking[0].index).to.equal(0);
      });
    });

    describe("disableSlideOnHold", () => {
      it("is true by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.disableSlideOnHold).to.equal(true);
      });

      it("should prevent side flicking from dragging while the main flicking is being dragged when disableSlideOnHold is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableSlideOnHold: true
        });

        const moveSpy = sinon.spy();
        const sidemoveSpy = sinon.spy();
        flicking.on("move", moveSpy);
        flicking.sideFlicking[0].on("move", sidemoveSpy);

        await simulate(flicking.sideFlicking[0].element, { deltaX: -200, deltaY: -300, duration: 300 });

        expect(moveSpy.called).to.be.false;
        expect(sidemoveSpy.called).to.be.true;
      });

      it("should allow side flicking from dragging while the main flicking is being dragged when disableSlideOnHold is false", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableSlideOnHold: false
        });

        const moveSpy = sinon.spy();
        const sidemoveSpy = sinon.spy();
        flicking.on("move", moveSpy);
        flicking.sideFlicking[0].on("move", sidemoveSpy);

        await simulate(flicking.sideFlicking[0].element, { deltaX: -200, deltaY: -300, duration: 300 });

        expect(moveSpy.called).to.be.true;
        expect(sidemoveSpy.called).to.be.true;
      });
    });

    describe("disableIndexSync", () => {
      it("is false by default", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS);

        expect(flicking.disableIndexSync).to.equal(false);
      });

      it("should not change index of main flicking from index of side flicking when disableIndexSync is true", async () => {
        const flicking = await createCrossFlicking(El.DEFAULT_CROSS, {
          disableIndexSync: true
        });
        void flicking.sideFlicking[0].moveTo(5, 0);
        tick(100);

        expect(flicking.index).to.equal(0);
        expect(flicking.sideFlicking[0].index).to.equal(5);
        expect(flicking.sideFlicking[1].index).to.equal(3);
      });
    });
  });

  describe("Key Features", () => {
    it("should change index of main flicking from index of side flicking", async () => {
      const flicking = await createCrossFlicking(El.DEFAULT_CROSS);
      void flicking.sideFlicking[0].moveTo(5, 0);
      tick(100);

      expect(flicking.index).to.equal(1);
      expect(flicking.sideFlicking[0].index).to.equal(2);
      expect(flicking.sideFlicking[1].index).to.equal(5);
    });
  });
});
