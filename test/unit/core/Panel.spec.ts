import Panel from "~/core/Panel";
import { ALIGN } from "~/const/external";

import El from "../helper/El";
import { createFlicking, createPanel, tick } from "../helper/test-util";

describe("Panel", () => {
  describe("Properties", () => {
    it("should have the same element given in constructor", () => {
      const el = El.panel();
      const panel = createPanel(el);

      expect(panel.getElement()).to.equal(el.el);
      expect(panel.getElement()).to.be.an.instanceOf(HTMLElement);
    });

    it("should have the same index in constructor", () => {
      const panel = createPanel(El.panel(), { index: 999 });

      expect(panel.getIndex()).to.equal(999);
    });

    it("has size 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.getSize().width).to.equal(0);
      expect(panel.getSize().height).to.equal(0);
    });

    it("has position 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.getPosition()).to.equal(0);
    });

    it("has margin 0 on creation", () => {
      const panel = createPanel(El.panel());

      expect(panel.getMargin().top).to.equal(0);
      expect(panel.getMargin().left).to.equal(0);
      expect(panel.getMargin().bottom).to.equal(0);
      expect(panel.getMargin().right).to.equal(0);
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("should have the same align value in constructor", () => {
        const align = "24px";
        const panel = createPanel(El.panel(), { align });

        expect(panel.getAlign()).to.equal(align);
      });

      it("can be changed anytime", () => {
        const panel = createPanel(El.panel(), { align: ALIGN.PREV });

        panel.setAlign(ALIGN.CENTER);

        expect(panel.getAlign()).to.equal(ALIGN.CENTER);
      });
    });
  });

  describe("Methods", () => {
    describe("resize", () => {
      it("should update its size", () => {
        const panel = createPanel(El.panel().setWidth(300).setHeight(300));

        panel.resize();

        expect(panel.getSize().width).to.equal(300);
        expect(panel.getSize().height).to.equal(300);
      });

      it("should update its margin", () => {
        const panel = createPanel(El.panel().setMargin({ top: 10, left: "20px", bottom: 30, right: "40px" }));

        panel.resize();

        expect(panel.getMargin().top).to.equal(10);
        expect(panel.getMargin().left).to.equal(20);
        expect(panel.getMargin().bottom).to.equal(30);
        expect(panel.getMargin().right).to.equal(40);
      });

      it("should update its position", () => {
        const panel = createPanel(
          El.panel()
            .setWidth(300).setHeight(300)
            .setMargin({ left: 10, right: 10 }), {}, { horizontal: true }
        );

        panel.resize();

        expect(panel.getPosition()).to.equal(panel.getElement().offsetLeft + 150); // pos + align
      });
    });

    describe("getPosition", () => {
      it("should return its position.left + alignPos when horizontal: true", () => {
        const panel = createPanel(
          El.panel()
            .setWidth(1000).setHeight(1000)
            .setMargin({ left: 50, right: 50 }), { align: 120 }, { horizontal: true }
        );

        panel.resize();

        expect(panel.getPosition()).to.equal(panel.getElement().offsetLeft + 120); // pos + align
      });

      it("should return its position.top + alignPos when horizontal: false", () => {
        const panel = createPanel(
          El.panel()
            .setWidth(1000).setHeight(1000)
            .setMargin({ left: 90, right: 30 }), { align: "934px" }, { horizontal: false }
        );

        panel.resize();

        expect(panel.getPosition()).to.equal(panel.getElement().offsetTop + 934); // pos + align
      });
    });

    describe("isRemoved", () => {
      it("should return true if the panel element is removed", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const panel = flicking.getPanel(0);

        panel.getElement().remove();

        expect(panel.isRemoved()).to.be.true;
        expect(panel.getElement().parentElement).not.equals(flicking.getCamera().getElement());
      });

      it("should return true if the panel element is not attached to camera element", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const panel = flicking.getPanel(0);

        // Append to viewport element
        flicking.getElement().appendChild(panel.getElement());

        expect(panel.isRemoved()).to.be.true;
        expect(panel.getElement().parentElement).not.equals(flicking.getCamera().getElement());
      });

      it("should return false if the panel element is attached to camera element", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const panel = flicking.getPanel(0);

        expect(panel.isRemoved()).to.be.false;
        expect(panel.getElement().parentElement).to.equal(flicking.getCamera().getElement());
      });
    });

    describe("include", () => {
      it("should return true when given position is inside panel", () => {
        const panel = createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.include(panel.getElement().offsetLeft)).to.be.true;
        expect(panel.include(panel.getElement().offsetLeft + 500)).to.be.true;
        expect(panel.include(panel.getElement().offsetLeft + 1000)).to.be.true;
      });

      it("should return false when given position is outside of panel", () => {
        const panel = createPanel(El.panel().setWidth(1000).setHeight(1000));
        panel.resize();

        expect(panel.include(panel.getElement().offsetLeft - 0.1)).to.be.false;
        expect(panel.include(panel.getElement().offsetLeft + 1000 + 0.1)).to.be.false;
      });

      it("should return true when given position is inside panel margin left/right area", () => {
        const panel = createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.include(panel.getElement().offsetLeft - 50)).to.be.true;
        expect(panel.include(panel.getElement().offsetLeft + 1000 + 50)).to.be.true;
      });

      it("should return true when given position is inside panel margin top/bottom area", () => {
        const panel = createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.include(panel.getElement().offsetTop - 50)).to.be.true;
        expect(panel.include(panel.getElement().offsetTop + 1000 + 50)).to.be.true;
      });

      it("should return false when given position is outside of panel margin left/right area", () => {
        const panel = createPanel(
          El.panel().setWidth(1000).setMargin({ left: 50, right: 50 }), {}, { horizontal: true }
        );
        panel.resize();

        expect(panel.include(panel.getElement().offsetLeft - 50.1)).to.be.false;
        expect(panel.include(panel.getElement().offsetLeft + 1000 + 50.1)).to.be.false;
      });

      it("should return false when given position is outside of panel margin top/bottom area", () => {
        const panel = createPanel(
          El.panel().setHeight(1000).setMargin({ top: 50, bottom: 50 }), {}, { horizontal: false }
        );
        panel.resize();

        expect(panel.include(panel.getElement().offsetTop - 50.1)).to.be.false;
        expect(panel.include(panel.getElement().offsetTop + 1000 + 50.1)).to.be.false;
      });
    });

    describe("focus", () => {
      it("should call Flicking's 'moveTo' with panel's index as a parameter", async () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const panel = new Panel({ el: El.panel().el, index: 5, flicking, align: ALIGN.PREV });

        const moveToSpy = sinon.spy();
        flicking.moveTo = moveToSpy;

        await panel.focus(0);

        expect(moveToSpy.calledWith(panel.getIndex())).to.be.true;
      });

      it("should call Flicking's 'moveTo' with the same duration as a parameter", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const panel = new Panel({ el: El.panel().el, index: 5, flicking, align: ALIGN.PREV });

        const moveToSpy = sinon.spy();
        flicking.moveTo = moveToSpy;

        void panel.focus(9999);
        tick(10000);

        expect(moveToSpy.calledWith(panel.getIndex())).to.be.true;
      });
    });

    describe("prev", () => {
      it("should return panel with index - 1", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getPanel(1).prev()).to.equal(flicking.getPanel(0));
      });

      it("should return null when called from first panel", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.getPanel(0).prev()).to.be.null;
      });
    });

    describe("next", () => {
      it("should return panel with index + 1", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getPanel(1).next()).to.equal(flicking.getPanel(2));
      });

      it("should return null when called from last panel", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.getPanel(2).next()).to.be.null;
      });
    });

    describe("increaseIndex", () => {
      it("should increase panel's index by given value", () => {
        expect(createPanel(El.panel(), { index: 0 }).increaeIndex(5).getIndex()).to.equal(5);
        expect(createPanel(El.panel(), { index: 3 }).increaeIndex(8).getIndex()).to.equal(11);
        expect(createPanel(El.panel(), { index: 1 }).increaeIndex(0).getIndex()).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).increaeIndex(1).getIndex()).to.equal(11);
      });

      it("should not increase the panel's index if the given value is a negative number", () => {
        expect(createPanel(El.panel(), { index: 0 }).increaeIndex(-1).getIndex()).to.equal(0);
        expect(createPanel(El.panel(), { index: 3 }).increaeIndex(-100).getIndex()).to.equal(3);
        expect(createPanel(El.panel(), { index: 1 }).increaeIndex(-5).getIndex()).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).increaeIndex(-99).getIndex()).to.equal(10);
      });
    });

    describe("decreaseIndex", () => {
      it("should decrease panel's index by given value", () => {
        expect(createPanel(El.panel(), { index: 5 }).decreaseIndex(5).getIndex()).to.equal(0);
        expect(createPanel(El.panel(), { index: 10 }).decreaseIndex(8).getIndex()).to.equal(2);
        expect(createPanel(El.panel(), { index: 1 }).decreaseIndex(0).getIndex()).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).decreaseIndex(1).getIndex()).to.equal(9);
      });

      it("should not decrease the panel's index if the given value is a negative number", () => {
        expect(createPanel(El.panel(), { index: 0 }).decreaseIndex(-1).getIndex()).to.equal(0);
        expect(createPanel(El.panel(), { index: 3 }).decreaseIndex(-100).getIndex()).to.equal(3);
        expect(createPanel(El.panel(), { index: 1 }).decreaseIndex(-5).getIndex()).to.equal(1);
        expect(createPanel(El.panel(), { index: 10 }).decreaseIndex(-99).getIndex()).to.equal(10);
      });
    });
  });
});