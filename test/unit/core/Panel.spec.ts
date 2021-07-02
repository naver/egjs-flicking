import Panel from "~/core/panel/Panel";
import { ALIGN } from "~/const/external";

import El from "../helper/El";
import { createFlicking, createPanel, tick } from "../helper/test-util";

class PanelImpl extends Panel {
  private _visible: boolean = true;

  public get element() { return El.panel().el; }
  public get rendered() { return this._visible; }
  public markForHide() { this._visible = false; }
  public markForShow() { this._visible = true; }
}

describe("Panel", () => {
  describe("Properties", () => {
    it("should have the same element given in constructor", async () => {
      const el = El.panel();
      const panel = await createPanel(el);

      expect(panel.element).to.equal(el.el);
      expect(panel.element).to.be.an.instanceOf(HTMLElement);
    });

    it("should have the same index in constructor", async () => {
      const panel = await createPanel(El.panel(), { index: 999 });

      expect(panel.index).to.equal(999);
    });

    it("has size 0 on creation", async () => {
      expect((await createPanel(El.panel())).size).to.equal(0);
    });

    it("has sizeIncludingMargin 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.sizeIncludingMargin).to.equal(0);
    });

    it("has position 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.position).to.equal(0);
    });

    it("has height 0 on creation", async () => {
      expect((await createPanel(El.panel(), {}, { horizontal: true })).height).to.equal(0);
      expect((await createPanel(El.panel(), {}, { horizontal: false })).height).to.equal(0);
    });

    it("has margin 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.margin.prev).to.equal(0);
      expect(panel.margin.next).to.equal(0);
    });

    it("has alignPos 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.alignPosition).to.equal(0);
    });

    it("has offset 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.offset).to.equal(0);
    });

    it("is not removed on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.removed).to.be.false;
    });

    it("has range from 0 to 0 as default", async () => {
      expect((await createPanel(El.panel())).range.min).to.equal(0);
      expect((await createPanel(El.panel())).range.max).to.equal(0);
    });

    describe("position", () => {
      it("should return its position.left + alignPos when horizontal: true", async () => {
        const panel = await createPanel(
          El.panel()
            .setWidth(1000).setHeight(1000)
            .setMargin({ left: 50, right: 50 }), { align: 120 }, { horizontal: true }
        );

        panel.resize();

        expect(panel.position).to.equal(panel.element.offsetLeft + 120); // pos + align
      });

      it("should return its position.top + alignPos when horizontal: false", async () => {
        const panel = await createPanel(
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
      it("should have the same align value in constructor", async () => {
        const align = "24px";
        const panel = await createPanel(El.panel(), { align });

        expect(panel.align).to.equal(align);
      });

      it("can be changed anytime", async () => {
        const panel = await createPanel(El.panel(), { align: ALIGN.PREV });

        panel.align = ALIGN.CENTER;

        expect(panel.align).to.equal(ALIGN.CENTER);
      });
    });
  });

  describe("Methods", () => {
    describe("resize", () => {
      it("should update its size", async () => {
        const panel = await createPanel(El.panel().setWidth(300).setHeight(500));

        panel.resize();

        expect(panel.size).to.equal(300);
        expect(panel.height).to.equal(500);
      });

      it("should update its margin", async () => {
        const margin = { top: 10, left: "20px", bottom: 30, right: "40px" };
        const horizontal = await createPanel(El.panel().setMargin(margin), {}, { horizontal: true });
        const vertical = await createPanel(El.panel().setMargin(margin), {}, { horizontal: false });

        horizontal.resize();
        vertical.resize();

        expect(horizontal.margin.prev).to.equal(20);
        expect(horizontal.margin.next).to.equal(40);

        expect(vertical.margin.prev).to.equal(10);
        expect(vertical.margin.next).to.equal(30);
      });

      it("should update its position", async () => {
        const panel = await createPanel(
          El.panel()
            .setWidth(300).setHeight(300)
            .setMargin({ left: 10, right: 10 }), {}, { horizontal: true }
        );

        panel.resize();

        expect(panel.position).to.equal(panel.element.offsetLeft + 150); // pos + align
      });
    });

    describe("includePosition", () => {
      it("should return true when given position is inside panel", async () => {
        const panel = await createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft)).to.be.true;
        expect(panel.includePosition(panel.element.offsetLeft + 500)).to.be.true;
        expect(panel.includePosition(panel.element.offsetLeft + 1000)).to.be.true;
      });

      it("should return false when given position is outside of panel", async () => {
        const panel = await createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 0.1)).to.be.false;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 0.1)).to.be.false;
      });

      it("should return false when given position is inside panel margin left/right area when not including margin", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 50, false)).to.be.false;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 50, false)).to.be.false;
      });

      it("should return false when given position is inside panel margin top/bottom area when not including margin", async () => {
        const panel = await createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetTop - 50, false)).to.be.false;
        expect(panel.includePosition(panel.element.offsetTop + 1000 + 50, false)).to.be.false;
      });

      it("should return true when given position is inside panel margin left/right area", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 50, true)).to.be.true;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 50, true)).to.be.true;
      });

      it("should return true when given position is inside panel margin top/bottom area", async () => {
        const panel = await createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetTop - 50, true)).to.be.true;
        expect(panel.includePosition(panel.element.offsetTop + 1000 + 50, true)).to.be.true;
      });

      it("should return false when given position is outside of panel margin left/right area", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.element.offsetLeft - 50.1, true)).to.be.false;
        expect(panel.includePosition(panel.element.offsetLeft + 1000 + 50.1, true)).to.be.false;
      });

      it("should return false when given position is outside of panel margin top/bottom area", async () => {
        const panel = await createPanel(
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
        it("should return true when given range is both inside panel range", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min + 1, panel.range.max - 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.min + 1, panel.range.max - 1, true)).to.be.true;
        });

        it("should return false when given range is both outside of panel range", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, false)).to.be.false;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, true)).to.be.false;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, true)).to.be.false;
        });

        it("should return true when range max is same or bigger than panel range min", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min, false)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min + 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min + 1, true)).to.be.true;
        });

        it("should return true when range min is same or smaller than panel range max", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.max, panel.range.max + 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.max - 1, panel.range.max + 1, false)).to.be.true;
          expect(panel.includeRange(panel.range.max, panel.range.max + 1, true)).to.be.true;
          expect(panel.includeRange(panel.range.max - 1, panel.range.max + 1, true)).to.be.true;
        });

        it("should return true when given range is both inside panel margin range", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000).setMargin({ left: 1, top: 1, right: 1, bottom: 1 }), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, true)).to.be.true;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, false)).to.be.false;
        });

        it("should return false when given range is both outside of panel margin range", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000).setMargin({ left: 1, top: 1, right: 1, bottom: 1 }), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 2, panel.range.min - 2, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 2, panel.range.max + 2, false)).to.be.false;
          expect(panel.includeRange(panel.range.min - 2, panel.range.min - 2, true)).to.be.false;
          expect(panel.includeRange(panel.range.max + 2, panel.range.max + 2, true)).to.be.false;
        });

        it("should return true when range max is same or bigger than panel range min - margin left/top", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000).setMargin({ left: 100, top: 100 }), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 100, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 99, true)).to.be.true;
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 100, false)).to.be.false;
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 99, false)).to.be.false;
        });

        it("should return true when range min is same or smaller than panel range max + margin right/bottom", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000).setMargin({ right: 100, bottom: 100 }), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.max + 100, panel.range.max + 101, true)).to.be.true;
          expect(panel.includeRange(panel.range.max + 99, panel.range.max + 101, true)).to.be.true;
          expect(panel.includeRange(panel.range.max + 100, panel.range.max + 101, false)).to.be.false;
          expect(panel.includeRange(panel.range.max + 99, panel.range.max + 101, false)).to.be.false;
        });
      });
    });

    describe("focus", () => {
      it("should call Flicking's 'moveTo' with panel's index as a parameter", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = new PanelImpl({ index: 5, flicking, align: ALIGN.PREV });

        const moveToSpy = sinon.spy();
        flicking.moveTo = moveToSpy;

        await panel.focus(0);

        expect(moveToSpy.calledWith(panel.index)).to.be.true;
      });

      it("should call Flicking's 'moveTo' with the same duration as a parameter", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = new PanelImpl({ index: 5, flicking, align: ALIGN.PREV });

        const moveToSpy = sinon.spy();
        flicking.moveTo = moveToSpy;

        void panel.focus(9999);
        tick(10000);

        expect(moveToSpy.calledWith(panel.index)).to.be.true;
      });
    });

    describe("prev", () => {
      it("should return panel with index - 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.getPanel(1).prev()).to.equal(flicking.getPanel(0));
      });

      it("should return panel with index - 1 if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(1).prev()).to.equal(flicking.getPanel(0));
      });

      it("should return null when called from first panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.getPanel(0).prev()).to.be.null;
      });

      it("should return last panel when called from first panel if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(0).prev()).to.equal(flicking.getPanel(2));
      });
    });

    describe("next", () => {
      it("should return panel with index + 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.getPanel(1).next()).to.equal(flicking.getPanel(2));
      });

      it("should return panel with index + 1 if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(1).next()).to.equal(flicking.getPanel(2));
      });

      it("should return null when called from last panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.getPanel(2).next()).to.be.null;
      });

      it("should return first panel when called from last panel if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).to.be.true;
        expect(flicking.getPanel(2).next()).to.equal(flicking.getPanel(0));
      });
    });

    describe("increaseIndex", () => {
      it("should increase panel's index by given value", async () => {
        expect((await createPanel(El.panel(), { index: 0 })).increaseIndex(5).index).to.equal(5);
        expect((await createPanel(El.panel(), { index: 3 })).increaseIndex(8).index).to.equal(11);
        expect((await createPanel(El.panel(), { index: 1 })).increaseIndex(0).index).to.equal(1);
        expect((await createPanel(El.panel(), { index: 10 })).increaseIndex(1).index).to.equal(11);
      });

      it("should not increase the panel's index if the given value is a negative number", async () => {
        expect((await createPanel(El.panel(), { index: 0 })).increaseIndex(-1).index).to.equal(0);
        expect((await createPanel(El.panel(), { index: 3 })).increaseIndex(-100).index).to.equal(3);
        expect((await createPanel(El.panel(), { index: 1 })).increaseIndex(-5).index).to.equal(1);
        expect((await createPanel(El.panel(), { index: 10 })).increaseIndex(-99).index).to.equal(10);
      });
    });

    describe("decreaseIndex", () => {
      it("should decrease panel's index by given value", async () => {
        expect((await createPanel(El.panel(), { index: 5 })).decreaseIndex(5).index).to.equal(0);
        expect((await createPanel(El.panel(), { index: 10 })).decreaseIndex(8).index).to.equal(2);
        expect((await createPanel(El.panel(), { index: 1 })).decreaseIndex(0).index).to.equal(1);
        expect((await createPanel(El.panel(), { index: 10 })).decreaseIndex(1).index).to.equal(9);
      });

      it("should not decrease the panel's index if the given value is a negative number", async () => {
        expect((await createPanel(El.panel(), { index: 0 })).decreaseIndex(-1).index).to.equal(0);
        expect((await createPanel(El.panel(), { index: 3 })).decreaseIndex(-100).index).to.equal(3);
        expect((await createPanel(El.panel(), { index: 1 })).decreaseIndex(-5).index).to.equal(1);
        expect((await createPanel(El.panel(), { index: 10 })).decreaseIndex(-99).index).to.equal(10);
      });
    });

    describe("contains", () => {
      it("should return true if element is a child of given panel's element", async () => {
        const panel = await createPanel(El.panel(), { index: 0 });
        const childEl = new El("test");

        panel.element.appendChild(childEl.el);

        expect(panel.contains(childEl.el)).to.be.true;
      });

      it("should return false if element is not a child of given panel's element", async () => {
        const panel = await createPanel(El.panel(), { index: 0 });
        const childEl = new El("test");

        panel.element.parentElement.appendChild(childEl.el);

        expect(panel.contains(childEl.el)).to.be.false;
      });

      it("should return false if element is null", async () => {
        const panel = await createPanel(El.panel(), { index: 0 });
        const childEl = new El("test");

        panel.element.appendChild(childEl.el);
        (panel as any)._el = null;

        expect(panel.element).equals(null);
        expect(panel.contains(childEl.el)).to.be.false;
      });
    });
  });
});
