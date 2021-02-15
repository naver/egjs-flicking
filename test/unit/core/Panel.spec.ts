import Panel from "~/core/Panel";
import { ALIGN } from "~/const/external";

import El from "../helper/El";
import { createFlicking, createPanel, tick } from "../helper/test-util";

describe("Panel", () => {
  describe("Properties", () => {
    it("should have the same element given in constructor", () => {
      const el = El.panel();
      const panel = createPanel(el);

      expect(panel.element).to.equal(el.el);
      expect(panel.element).to.be.an.instanceOf(HTMLElement);
    });

    it("should have the same index in constructor", () => {
      const panel = createPanel(El.panel(), { index: 999 });

      expect(panel.index).to.equal(999);
    });

    it("should have position & size as all 0 on the bbox", () => {
      expect(createPanel(El.panel()).bbox.left).to.equal(0);
      expect(createPanel(El.panel()).bbox.top).to.equal(0);
      expect(createPanel(El.panel()).bbox.width).to.equal(0);
      expect(createPanel(El.panel()).bbox.height).to.equal(0);
    });

    it("has size 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.size).to.equal(0);
      expect(panel.size).to.equal(0);
    });

    it("has width/height 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.bbox.width).to.equal(0);
      expect(panel.bbox.height).to.equal(0);
    });

    it("has position 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.position).to.equal(0);
    });

    it("has margin 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.margin.top).to.equal(0);
      expect(panel.margin.left).to.equal(0);
      expect(panel.margin.bottom).to.equal(0);
      expect(panel.margin.right).to.equal(0);
    });

    it("has range from 0 to 0 as default", () => {
      expect(createPanel(El.panel()).range.min).to.equal(0);
      expect(createPanel(El.panel()).range.max).to.equal(0);
    });

    describe("position", () => {
      it("should return its position.left + alignPos when horizontal: true", () => {
        const panel = createPanel(
          El.panel()
            .setWidth(1000).setHeight(1000)
            .setMargin({ left: 50, right: 50 }), { align: 120 }, { horizontal: true }
        );

        panel.resize();

        expect(panel.position).to.equal(panel.element.offsetLeft + 120); // pos + align
      });

      it("should return its position.top + alignPos when horizontal: false", () => {
        const panel = createPanel(
          El.panel()
            .setWidth(1000).setHeight(1000)
            .setMargin({ left: 90, right: 30 }), { align: "934px" }, { horizontal: false }
        );

        panel.resize();

        expect(panel.position).to.equal(panel.element.offsetTop + 934); // pos + align
      });
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("should have the same align value in constructor", () => {
        const align = "24px";
        const panel = createPanel(El.panel(), { align });

        expect(panel.align).to.equal(align);
      });

      it("can be changed anytime", () => {
        const panel = createPanel(El.panel(), { align: ALIGN.PREV });

        panel.align = ALIGN.CENTER;

        expect(panel.align).to.equal(ALIGN.CENTER);
      });
    });
  });

  describe("Methods", () => {
    describe("resize", () => {
      it("should update its size", () => {
        const panel = createPanel(El.panel().setWidth(300).setHeight(300));

        panel.resize();

        expect(panel.size).to.equal(300);
        expect(panel.bbox.width).to.equal(300);
        expect(panel.bbox.height).to.equal(300);
      });

      it("should update its margin", () => {
        const panel = createPanel(El.panel().setMargin({ top: 10, left: "20px", bottom: 30, right: "40px" }));

        panel.resize();

        expect(panel.margin.top).to.equal(10);
        expect(panel.margin.left).to.equal(20);
        expect(panel.margin.bottom).to.equal(30);
        expect(panel.margin.right).to.equal(40);
      });

      it("should update its position", () => {
        const panel = createPanel(
          El.panel()
            .setWidth(300).setHeight(300)
            .setMargin({ left: 10, right: 10 }), {}, { horizontal: true }
        );

        panel.resize();

        expect(panel.position).to.equal(panel.element.offsetLeft + 150); // pos + align
      });
    });

    describe("isRemoved", () => {
      it("should return true if the panel element is removed", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        panel.element.remove();

        expect(panel.isRemoved()).to.be.true;
        expect(panel.element.parentElement).not.equals(flicking.camera.element);
      });

      it("should return true if the panel element is not attached to camera element", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        // Append to viewport element
        flicking.viewport.element.appendChild(panel.element);

        expect(panel.isRemoved()).to.be.true;
        expect(panel.element.parentElement).not.equals(flicking.camera.element);
      });

      it("should return false if the panel element is attached to camera element", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        expect(panel.isRemoved()).to.be.false;
        expect(panel.element.parentElement).to.equal(flicking.camera.element);
      });
    });

    describe("getSnapPosition", () => {
      it("should always return current position when circular: false", () => {
        const panel = createPanel(El.panel(), {}, { circular: false });
        expect(panel.getSnapPosition(999999)).to.equal(panel.position);
        expect(panel.getSnapPosition(-999999)).to.equal(panel.position);
        expect(panel.getSnapPosition(0)).to.equal(panel.position);
      });

      it("should return panel position if given position is inside of camera range when circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = flicking.getPanel(0);

        const cameraRange = flicking.camera.range;

        expect(flicking.circularEnabled).to.be.true;
        expect(panel.getSnapPosition(cameraRange.min)).to.equal(panel.position);
        expect(panel.getSnapPosition(cameraRange.max)).to.equal(panel.position);
      });

      it("should return position + loop multiplied by camera range size if given position is outside of camera range when circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = flicking.getPanel(0);

        const camRange = flicking.camera.range;
        const camRangeSize = camRange.max - camRange.min;

        expect(flicking.circularEnabled).to.be.true;

        expect(panel.getSnapPosition(camRange.max + 1))
          .to.equal(panel.position + camRangeSize);
        expect(panel.getSnapPosition(camRange.min - 1))
          .to.equal(panel.position - camRangeSize);

        expect(panel.getSnapPosition(camRange.max + camRangeSize - 1))
          .to.equal(panel.position + camRangeSize);
        expect(panel.getSnapPosition(camRange.max + camRangeSize))
          .to.equal(panel.position + camRangeSize * 2);
        expect(panel.getSnapPosition(camRange.min - camRangeSize + 1))
          .to.equal(panel.position - camRangeSize);
        expect(panel.getSnapPosition(camRange.min - camRangeSize))
          .to.equal(panel.position - camRangeSize * 2);
      });
    });

    describe("includePosition", () => {
      it("should return true when given position is inside panel", () => {
        const panel = createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft)).to.be.true;
        expect(panel.includePosition(panel.element.offsetLeft + 500)).to.be.true;
        expect(panel.includePosition(panel.element.offsetLeft + 1000)).to.be.true;
      });

      it("should return false when given position is outside of panel", () => {
        const panel = createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 0.1)).to.be.false;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 0.1)).to.be.false;
      });

      it("should return false when given position is inside panel margin left/right area when not including margin", () => {
        const panel = createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 50, false)).to.be.false;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 50, false)).to.be.false;
      });

      it("should return false when given position is inside panel margin top/bottom area when not including margin", () => {
        const panel = createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetTop - 50, false)).to.be.false;
        expect(panel.includePosition(panel.element.offsetTop + 1000 + 50, false)).to.be.false;
      });

      it("should return true when given position is inside panel margin left/right area", () => {
        const panel = createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 50, true)).to.be.true;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 50, true)).to.be.true;
      });

      it("should return true when given position is inside panel margin top/bottom area", () => {
        const panel = createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetTop - 50, true)).to.be.true;
        expect(panel.includePosition(panel.element.offsetTop + 1000 + 50, true)).to.be.true;
      });

      it("should return false when given position is outside of panel margin left/right area", () => {
        const panel = createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 50.1, true)).to.be.false;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 50.1, true)).to.be.false;
      });

      it("should return false when given position is outside of panel margin top/bottom area", () => {
        const panel = createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetTop - 50.1, true)).to.be.false;
        expect(panel.includePosition(panel.element.offsetTop + 1000 + 50.1, true)).to.be.false;
      });
    });

    describe("includeRange", () => {
      const cases = [true, false];
      cases.forEach(circular => {
        it("should return true when given range is both inside panel range", () => {
          const panel = createPanel(El.panel().setWidth(1000), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.min + 1, panel.range.max - 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.min + 1, panel.range.max - 1, true)).to.be.true;
        });

        it("should return false when given range is both outside of panel range", () => {
          const panel = createPanel(El.panel().setWidth(1000), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, false)).to.be.false;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, true)).to.be.false;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, true)).to.be.false;
        });

        it("should return true when range max is same or bigger than panel range min", () => {
          const panel = createPanel(El.panel().setWidth(1000), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min, false)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min + 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min + 1, true)).to.be.true;
        });

        it("should return true when range min is same or smaller than panel range max", () => {
          const panel = createPanel(El.panel().setWidth(1000), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.max, panel.range.max + 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.max - 1, panel.range.max + 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.max, panel.range.max + 1, true)).to.be.true;
          expect(panel.includeRange(panel.range.max - 1, panel.range.max + 1, true)).to.be.true;
        });

        it("should return true when given range is both inside panel margin range", () => {
          const panel = createPanel(El.panel().setWidth(1000).setMargin({ left: 1, top: 1, right: 1, bottom: 1 }), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, true)).to.be.true;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, false)).to.be.false;
        });

        it("should return false when given range is both outside of panel margin range", () => {
          const panel = createPanel(El.panel().setWidth(1000).setMargin({ left: 1, top: 1, right: 1, bottom: 1 }), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.min - 2, panel.range.min - 2, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 2, panel.range.max + 2, false)).to.be.false;
          expect(panel.includeRange(panel.range.min - 2, panel.range.min - 2, true)).to.be.false;
          expect(panel.includeRange(panel.range.max + 2, panel.range.max + 2, true)).to.be.false;
        });

        it("should return true when range max is same or bigger than panel range min - margin left/top", () => {
          const panel = createPanel(El.panel().setWidth(1000).setMargin({ left: 100, top: 100 }), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 100, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 99, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 100, false)).to.be.false;
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 99, false)).to.be.false;
        });

        it("should return true when range min is same or smaller than panel range max + margin right/bottom", () => {
          const panel = createPanel(El.panel().setWidth(1000).setMargin({ right: 100, bottom: 100 }), {}, { circular }).resize();

          expect(panel.includeRange(panel.range.max + 100, panel.range.max + 101, true)).to.be.true;
          expect(panel.includeRange(panel.range.max + 99, panel.range.max + 101, true)).to.be.true;
          expect(panel.includeRange(panel.range.max + 100, panel.range.max + 101, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 99, panel.range.max + 101, false)).to.be.false;
        });
      });
    });

    describe("isReachable", () => {
      it("is not reachable when it's outside of camera range", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.max + 1, max: panel.range.max + 1 }));

        expect(panel.isReachable()).to.be.false;

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.min - 1, max: panel.range.min - 1 }));

        expect(panel.isReachable()).to.be.false;
      });

      it("is reachable when it's inside of camera range", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);
        panel.element.style.marginLeft = "1px";
        panel.element.style.marginRight = "1px";
        panel.resize();

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.max + 1, max: panel.range.max + 1 }));

        expect(panel.isReachable()).to.be.true;

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.min - 1, max: panel.range.min - 1 }));

        expect(panel.isReachable()).to.be.true;
      });

      it("is reachable when it's insdie of camera range including margin", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.max, max: panel.range.max }));

        expect(panel.isReachable()).to.be.true;

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.min, max: panel.range.min }));

        expect(panel.isReachable()).to.be.true;
      });

      it("should always return true when circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = flicking.getPanel(0);

        expect(flicking.circularEnabled).to.be.true;

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.max + 1, max: panel.range.max + 1 }));

        expect(panel.isReachable()).to.be.true;

        sinon.stub(flicking.camera, "range")
          .get(() => ({ min: panel.range.min - 1, max: panel.range.min - 1 }));

        expect(panel.isReachable()).to.be.true;
      });
    });

    describe("isVisible", () => {
      it("should return true when it's inside of camera's visible range", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        sinon.stub(flicking.camera, "getVisibleRange")
          .onFirstCall().returns({ min: panel.range.max, max: panel.range.max })
          .onSecondCall().returns({ min: panel.range.min, max: panel.range.min });

        expect(panel.isVisible()).to.be.true;
        expect(panel.isVisible()).to.be.true;
      });

      it("should return false when it's outside of camera's visible range", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0);

        sinon.stub(flicking.camera, "getVisibleRange")
          .onFirstCall().returns({ min: panel.range.max + 1, max: panel.range.max + 1 })
          .onSecondCall().returns({ min: panel.range.min - 1, max: panel.range.min - 1 });

        expect(panel.isVisible()).to.be.false;
        expect(panel.isVisible()).to.be.false;
      });

      it("should return true when visible on looped position is included if circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = flicking.getPanel(0);

        sinon.stub(flicking.camera, "range").get(() => ({ min: panel.range.min, max: panel.range.max }));

        sinon.stub(flicking.camera, "getVisibleRange")
          .onFirstCall().returns({ min: panel.range.max + 1, max: panel.range.max + 1 })
          .onSecondCall().returns({ min: panel.range.min - 1, max: panel.range.min - 1 });

        expect(flicking.circularEnabled).to.be.true;
        expect(panel.isVisible()).to.be.true;
        expect(panel.isVisible()).to.be.true;
      });

      it("should return false when visible on looped position is not included if circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        const panel = flicking.getPanel(0);

        sinon.stub(flicking.camera, "range").get(() => ({ min: panel.range.min - 1, max: panel.range.max + 1 }));

        sinon.stub(flicking.camera, "getVisibleRange")
          .onFirstCall().returns({ min: panel.range.max + 1, max: panel.range.max + 1 })
          .onSecondCall().returns({ min: panel.range.min - 1, max: panel.range.min - 1 });

        expect(flicking.circularEnabled).to.be.true;
        expect(panel.isVisible()).to.be.false;
        expect(panel.isVisible()).to.be.false;
      });
    });

    describe("focus", () => {
      it("should call Flicking's 'moveTo' with panel's index as a parameter", async () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = new Panel({ el: El.panel().el, index: 5, flicking, align: ALIGN.PREV });

        const moveToSpy = sinon.spy();
        flicking.moveTo = moveToSpy;

        await panel.focus(0);

        expect(moveToSpy.calledWith(panel.index)).to.be.true;
      });

      it("should call Flicking's 'moveTo' with the same duration as a parameter", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = new Panel({ el: El.panel().el, index: 5, flicking, align: ALIGN.PREV });

        const moveToSpy = sinon.spy();
        flicking.moveTo = moveToSpy;

        void panel.focus(9999);
        tick(10000);

        expect(moveToSpy.calledWith(panel.index)).to.be.true;
      });
    });

    describe("prev", () => {
      it("should return panel with index - 1", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.getPanel(1).prev()).to.equal(flicking.getPanel(0));
      });

      it("should return panel with index - 1 if circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(1).prev()).to.equal(flicking.getPanel(0));
      });

      it("should return null when called from first panel", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.getPanel(0).prev()).to.be.null;
      });

      it("should return last panel when called from first panel if circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(0).prev()).to.equal(flicking.getPanel(2));
      });
    });

    describe("next", () => {
      it("should return panel with index + 1", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.getPanel(1).next()).to.equal(flicking.getPanel(2));
      });

      it("should return panel with index + 1 if circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(1).next()).to.equal(flicking.getPanel(2));
      });

      it("should return null when called from last panel", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.getPanel(2).next()).to.be.null;
      });

      it("should return first panel when called from last panel if circular is enabled", () => {
        const flicking = createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(2).next()).to.equal(flicking.getPanel(0));
      });
    });

    describe("increaseIndex", () => {
      it("should increase panel's index by given value", () => {
        expect(createPanel(El.panel(), { index: 0 }).increaseIndex(5).index).to.equal(5);
        expect(createPanel(El.panel(), { index: 3 }).increaseIndex(8).index).to.equal(11);
        expect(createPanel(El.panel(), { index: 1 }).increaseIndex(0).index).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).increaseIndex(1).index).to.equal(11);
      });

      it("should not increase the panel's index if the given value is a negative number", () => {
        expect(createPanel(El.panel(), { index: 0 }).increaseIndex(-1).index).to.equal(0);
        expect(createPanel(El.panel(), { index: 3 }).increaseIndex(-100).index).to.equal(3);
        expect(createPanel(El.panel(), { index: 1 }).increaseIndex(-5).index).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).increaseIndex(-99).index).to.equal(10);
      });
    });

    describe("decreaseIndex", () => {
      it("should decrease panel's index by given value", () => {
        expect(createPanel(El.panel(), { index: 5 }).decreaseIndex(5).index).to.equal(0);
        expect(createPanel(El.panel(), { index: 10 }).decreaseIndex(8).index).to.equal(2);
        expect(createPanel(El.panel(), { index: 1 }).decreaseIndex(0).index).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).decreaseIndex(1).index).to.equal(9);
      });

      it("should not decrease the panel's index if the given value is a negative number", () => {
        expect(createPanel(El.panel(), { index: 0 }).decreaseIndex(-1).index).to.equal(0);
        expect(createPanel(El.panel(), { index: 3 }).decreaseIndex(-100).index).to.equal(3);
        expect(createPanel(El.panel(), { index: 1 }).decreaseIndex(-5).index).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).decreaseIndex(-99).index).to.equal(10);
      });
    });
  });
});
