import { vi } from "vitest";
import { ALIGN } from "~/constants/values";
import Panel from "~/core/panel/Panel";
import VanillaElementProvider from "~/core/panel/provider/VanillaElementProvider";

import El from "../../helper/El";
import { createFlicking, createPanel, tick } from "../../helper/test-util";

class PanelImpl extends Panel {
  private _visible: boolean = true;

  public get element() {
    return El.panel().el;
  }
  public get rendered() {
    return this._visible;
  }
  public markForHide() {
    this._visible = false;
  }
  public markForShow() {
    this._visible = true;
  }
}

describe("Panel", () => {
  describe("Properties", () => {
    it("should have the same element given in constructor", async () => {
      const el = El.panel();
      const panel = await createPanel(el);

      expect(panel.element).toBe(el.el);
      expect(panel.element).toBeInstanceOf(HTMLElement);
    });

    it("should have the same index in constructor", async () => {
      const panel = await createPanel(El.panel(), { index: 999 });

      expect(panel.index).toBe(999);
    });

    it("has size 0 on creation", async () => {
      expect((await createPanel(El.panel())).size).toBe(0);
    });

    it("has sizeIncludingMargin 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.sizeIncludingMargin).toBe(0);
    });

    it("has position 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.position).toBe(0);
    });

    it("has height 0 on creation", async () => {
      expect((await createPanel(El.panel(), {}, { horizontal: true })).height).toBe(0);
      expect((await createPanel(El.panel(), {}, { horizontal: false })).height).toBe(0);
    });

    it("has margin 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.margin.prev).toBe(0);
      expect(panel.margin.next).toBe(0);
    });

    it("has alignPos 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.alignPosition).toBe(0);
    });

    it("has offset 0 on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.offset).toBe(0);
    });

    it("is not removed on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.removed).toBe(false);
    });

    it("is not loading on creation", async () => {
      const panel = await createPanel(El.panel());

      expect(panel.loading).toBe(false);
    });

    it("has range from 0 to 0 as default", async () => {
      expect((await createPanel(El.panel())).range.min).toBe(0);
      expect((await createPanel(El.panel())).range.max).toBe(0);
    });

    describe("position", () => {
      it("should return its position.left + alignPos when horizontal: true", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setHeight(1000).setMargin({ left: 50, right: 50 }),
          { align: 120 },
          { horizontal: true }
        );

        panel.resize();

        expect(panel.position).toBe(panel.element.offsetLeft + 120); // pos + align
      });

      it("should return its position.top + alignPos when horizontal: false", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setHeight(1000).setMargin({ left: 90, right: 30 }),
          { align: "934px" },
          { horizontal: false }
        );

        panel.resize();

        expect(panel.position).toBe(panel.element.offsetTop + 934); // pos + align
      });
    });

    describe("loading", () => {
      it("is not readonly", async () => {
        const panel = await createPanel(El.panel());
        expect(panel.loading).toBe(false);
        panel.loading = true;
        expect(panel.loading).toBe(true);
        panel.loading = false;
        expect(panel.loading).toBe(false);
      });
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("should have the same align value in constructor", async () => {
        const align = "24px";
        const panel = await createPanel(El.panel(), { align });

        expect(panel.align).toBe(align);
      });

      it("can be changed anytime", async () => {
        const panel = await createPanel(El.panel(), { align: ALIGN.PREV });

        panel.align = ALIGN.CENTER;

        expect(panel.align).toBe(ALIGN.CENTER);
      });
    });
  });

  describe("Methods", () => {
    describe("resize", () => {
      it("should update its size", async () => {
        const panel = await createPanel(El.panel().setWidth(300).setHeight(500));

        panel.resize();

        expect(panel.size).toBe(300);
        expect(panel.height).toBe(500);
      });

      it("should update its margin", async () => {
        const margin = { top: 10, left: "20px", bottom: 30, right: "40px" };
        const horizontal = await createPanel(El.panel().setMargin(margin), {}, { horizontal: true });
        const vertical = await createPanel(El.panel().setMargin(margin), {}, { horizontal: false });

        horizontal.resize();
        vertical.resize();

        expect(horizontal.margin.prev).toBe(20);
        expect(horizontal.margin.next).toBe(40);

        expect(vertical.margin.prev).toBe(10);
        expect(vertical.margin.next).toBe(30);
      });

      it("should update its position", async () => {
        const panel = await createPanel(
          El.panel().setWidth(300).setHeight(300).setMargin({ left: 10, right: 10 }),
          {},
          { horizontal: true }
        );

        panel.resize();

        expect(panel.position).toBe(panel.element.offsetLeft + 150); // pos + align
      });

      it("should use cached sizes instead if given", async () => {
        const panel = await createPanel(
          El.panel().setWidth(300).setHeight(300).setMargin({ left: 10, right: 10 }),
          {},
          { horizontal: true }
        );

        panel.resize({ size: 500, height: 400, margin: { prev: 20, next: 25 } });

        expect(panel.size).toBe(500);
        expect(panel.height).toBe(400);
        expect(panel.margin.prev).toBe(20);
        expect(panel.margin.next).toBe(25);
      });
    });

    describe("includePosition", () => {
      it("should return true when given position is inside panel", async () => {
        const panel = await createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.includePosition(panel.range.min)).toBe(true);
        expect(panel.includePosition(panel.range.min + 500)).toBe(true);
        expect(panel.includePosition(panel.range.min + 1000)).toBe(true);
      });

      it("should return false when given position is outside of panel", async () => {
        const panel = await createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.includePosition(panel.range.min - 0.1)).toBe(false);
        expect(panel.includePosition(panel.range.max + 0.1)).toBe(false);
      });

      it("should return false when given position is inside panel margin left/right area when not including margin", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }),
          {},
          { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.range.min - 50, false)).toBe(false);
        expect(panel.includePosition(panel.range.max + 50, false)).toBe(false);
      });

      it("should return false when given position is inside panel margin top/bottom area when not including margin", async () => {
        const panel = await createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }),
          {},
          { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.range.min - 50, false)).toBe(false);
        expect(panel.includePosition(panel.range.max + 50, false)).toBe(false);
      });

      it("should return true when given position is inside panel margin left/right area", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }),
          {},
          { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.range.min - 50, true)).toBe(true);
        expect(panel.includePosition(panel.range.max + 50, true)).toBe(true);
      });

      it("should return true when given position is inside panel margin top/bottom area", async () => {
        const panel = await createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }),
          {},
          { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.range.min - 50, true)).toBe(true);
        expect(panel.includePosition(panel.range.max + 50, true)).toBe(true);
      });

      it("should return false when given position is outside of panel margin left/right area", async () => {
        const panel = await createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }),
          {},
          { horizontal: true }
        );
        panel.resize();

        expect(panel.includePosition(panel.range.min - 50.1, true)).toBe(false);
        expect(panel.includePosition(panel.range.max + 50.1, true)).toBe(false);
      });

      it("should return false when given position is outside of panel margin top/bottom area", async () => {
        const panel = await createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }),
          {},
          { horizontal: false }
        );
        panel.resize();

        expect(panel.includePosition(panel.range.min - 50.1, true)).toBe(false);
        expect(panel.includePosition(panel.range.max + 50.1, true)).toBe(false);
      });
    });

    describe("includeRange", () => {
      const cases = [true, false];
      cases.forEach(circular => {
        it("should return true when given range is both inside panel range", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min + 1, panel.range.max - 1, false)).toBe(true);
          expect(panel.includeRange(panel.range.min + 1, panel.range.max - 1, true)).toBe(true);
        });

        it("should return false when given range is both outside of panel range", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, false)).toBe(false);
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, false)).toBe(false);
          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, true)).toBe(false);
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, true)).toBe(false);
        });

        it("should return true when range max is same or bigger than panel range min", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min, false)).toBe(true);
          expect(panel.includeRange(panel.range.min - 1, panel.range.min + 1, false)).toBe(true);
          expect(panel.includeRange(panel.range.min - 1, panel.range.min, true)).toBe(true);
          expect(panel.includeRange(panel.range.min - 1, panel.range.min + 1, true)).toBe(true);
        });

        it("should return true when range min is same or smaller than panel range max", async () => {
          const panel = (await createPanel(El.panel().setWidth(1000), {}, { circular })).resize();

          expect(panel.includeRange(panel.range.max, panel.range.max + 1, false)).toBe(true);
          expect(panel.includeRange(panel.range.max - 1, panel.range.max + 1, false)).toBe(true);
          expect(panel.includeRange(panel.range.max, panel.range.max + 1, true)).toBe(true);
          expect(panel.includeRange(panel.range.max - 1, panel.range.max + 1, true)).toBe(true);
        });

        it("should return true when given range is both inside panel margin range", async () => {
          const panel = (
            await createPanel(
              El.panel().setWidth(1000).setMargin({ left: 1, top: 1, right: 1, bottom: 1 }),
              {},
              { circular }
            )
          ).resize();

          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, true)).toBe(true);
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, true)).toBe(true);
          expect(panel.includeRange(panel.range.min - 1, panel.range.min - 1, false)).toBe(false);
          expect(panel.includeRange(panel.range.max + 1, panel.range.max + 1, false)).toBe(false);
        });

        it("should return false when given range is both outside of panel margin range", async () => {
          const panel = (
            await createPanel(
              El.panel().setWidth(1000).setMargin({ left: 1, top: 1, right: 1, bottom: 1 }),
              {},
              { circular }
            )
          ).resize();

          expect(panel.includeRange(panel.range.min - 2, panel.range.min - 2, false)).toBe(false);
          expect(panel.includeRange(panel.range.max + 2, panel.range.max + 2, false)).toBe(false);
          expect(panel.includeRange(panel.range.min - 2, panel.range.min - 2, true)).toBe(false);
          expect(panel.includeRange(panel.range.max + 2, panel.range.max + 2, true)).toBe(false);
        });

        it("should return true when range max is same or bigger than panel range min - margin left/top", async () => {
          const panel = (
            await createPanel(El.panel().setWidth(1000).setMargin({ left: 100, top: 100 }), {}, { circular })
          ).resize();

          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 100, true)).toBe(true);
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 99, true)).toBe(true);
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 100, false)).toBe(false);
          expect(panel.includeRange(panel.range.min - 101, panel.range.min - 99, false)).toBe(false);
        });

        it("should return true when range min is same or smaller than panel range max + margin right/bottom", async () => {
          const panel = (
            await createPanel(El.panel().setWidth(1000).setMargin({ right: 100, bottom: 100 }), {}, { circular })
          ).resize();

          expect(panel.includeRange(panel.range.max + 100, panel.range.max + 101, true)).toBe(true);
          expect(panel.includeRange(panel.range.max + 99, panel.range.max + 101, true)).toBe(true);
          expect(panel.includeRange(panel.range.max + 100, panel.range.max + 101, false)).toBe(false);
          expect(panel.includeRange(panel.range.max + 99, panel.range.max + 101, false)).toBe(false);
        });
      });
    });

    describe("focus", () => {
      it("should call Flicking's 'moveTo' with panel's index as a parameter", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = new PanelImpl({
          index: 5,
          flicking,
          align: ALIGN.PREV,
          elementProvider: new VanillaElementProvider(document.createElement("div"))
        });

        const moveToSpy = vi.fn();
        flicking.moveTo = moveToSpy;

        await panel.focus(0);

        expect(moveToSpy.mock.calls[0][0]).toBe(panel.index);
      });

      it("should call Flicking's 'moveTo' with the same duration as a parameter", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = new PanelImpl({
          index: 5,
          flicking,
          align: ALIGN.PREV,
          elementProvider: new VanillaElementProvider(document.createElement("div"))
        });

        const moveToSpy = vi.fn();
        flicking.moveTo = moveToSpy;

        void panel.focus(9999);
        tick(10000);

        expect(moveToSpy.mock.calls[0][0]).toBe(panel.index);
      });
    });

    describe("prev", () => {
      it("should return panel with index - 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.getPanel(1).prev()).toBe(flicking.getPanel(0));
      });

      it("should return panel with index - 1 if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).toBe(true);
        expect(flicking.getPanel(1).prev()).toBe(flicking.getPanel(0));
      });

      it("should return null when called from first panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.getPanel(0).prev()).toBeNull();
      });

      it("should return last panel when called from first panel if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).toBe(true);
        expect(flicking.getPanel(0).prev()).toBe(flicking.getPanel(2));
      });
    });

    describe("next", () => {
      it("should return panel with index + 1", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);

        expect(flicking.getPanel(1).next()).toBe(flicking.getPanel(2));
      });

      it("should return panel with index + 1 if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).toBe(true);
        expect(flicking.getPanel(1).next()).toBe(flicking.getPanel(2));
      });

      it("should return null when called from last panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        expect(flicking.getPanel(2).next()).toBeNull();
      });

      it("should return first panel when called from last panel if circular is enabled", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL, { circular: true });
        expect(flicking.circularEnabled).toBe(true);
        expect(flicking.getPanel(2).next()).toBe(flicking.getPanel(0));
      });
    });

    describe("increaseIndex", () => {
      it("should increase panel's index by given value", async () => {
        expect((await createPanel(El.panel(), { index: 0 })).increaseIndex(5).index).toBe(5);
        expect((await createPanel(El.panel(), { index: 3 })).increaseIndex(8).index).toBe(11);
        expect((await createPanel(El.panel(), { index: 1 })).increaseIndex(0).index).toBe(1);
        expect((await createPanel(El.panel(), { index: 10 })).increaseIndex(1).index).toBe(11);
      });

      it("should not increase the panel's index if the given value is a negative number", async () => {
        expect((await createPanel(El.panel(), { index: 0 })).increaseIndex(-1).index).toBe(0);
        expect((await createPanel(El.panel(), { index: 3 })).increaseIndex(-100).index).toBe(3);
        expect((await createPanel(El.panel(), { index: 1 })).increaseIndex(-5).index).toBe(1);
        expect((await createPanel(El.panel(), { index: 10 })).increaseIndex(-99).index).toBe(10);
      });
    });

    describe("decreaseIndex", () => {
      it("should decrease panel's index by given value", async () => {
        expect((await createPanel(El.panel(), { index: 5 })).decreaseIndex(5).index).toBe(0);
        expect((await createPanel(El.panel(), { index: 10 })).decreaseIndex(8).index).toBe(2);
        expect((await createPanel(El.panel(), { index: 1 })).decreaseIndex(0).index).toBe(1);
        expect((await createPanel(El.panel(), { index: 10 })).decreaseIndex(1).index).toBe(9);
      });

      it("should not decrease the panel's index if the given value is a negative number", async () => {
        expect((await createPanel(El.panel(), { index: 0 })).decreaseIndex(-1).index).toBe(0);
        expect((await createPanel(El.panel(), { index: 3 })).decreaseIndex(-100).index).toBe(3);
        expect((await createPanel(El.panel(), { index: 1 })).decreaseIndex(-5).index).toBe(1);
        expect((await createPanel(El.panel(), { index: 10 })).decreaseIndex(-99).index).toBe(10);
      });
    });

    describe("updatePosition", () => {
      it("should locate its position next to the previous panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(1)!;
        const prevPos = panel.position;

        panel.prev().setSize({ width: 500 });
        panel.prev().resize();
        panel.updatePosition();

        expect(panel.position).not.toBe(prevPos);
        expect(panel.position).toBe(500 + panel.alignPosition);
      });

      it("should locate its position at it's margin.prev when it's the first panel", async () => {
        const flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
        const panel = flicking.getPanel(0)!;

        panel.element.style.marginLeft = "50px";
        panel.resize();
        panel.updatePosition();

        expect(panel.position).toBe(50 + panel.alignPosition);
      });
    });

    describe("contains", () => {
      it("should return true if element is a child of given panel's element", async () => {
        const panel = await createPanel(El.panel(), { index: 0 });
        const childEl = new El("test");

        panel.element.appendChild(childEl.el);

        expect(panel.contains(childEl.el)).toBe(true);
      });

      it("should return false if element is not a child of given panel's element", async () => {
        const panel = await createPanel(El.panel(), { index: 0 });
        const childEl = new El("test");

        panel.element.parentElement.appendChild(childEl.el);

        expect(panel.contains(childEl.el)).toBe(false);
      });

      it("should return false if element is null", async () => {
        const panel = await createPanel(El.panel(), { index: 0 });
        const childEl = new El("test");

        panel.element.appendChild(childEl.el);
        (panel.elementProvider as any)._element = null;

        expect(panel.element).toBe(null);
        expect(panel.contains(childEl.el)).toBe(false);
      });
    });

    describe("setSize", () => {
      it("should set CSS width/height style", async () => {
        const panel = await createPanel(El.panel().setWidth(300).setHeight(300), {}, { horizontal: true });

        panel.setSize({ width: 500, height: 400 });

        expect(panel.element.style.width).toBe("500px");
        expect(panel.element.style.height).toBe("400px");
      });
    });
  });
});
