import FlickingError from "~/core/FlickingError";
import Viewport from "~/core/Viewport";
import { FlickingEvent } from "~/Flicking";
import * as ERROR from "~/const/error";
import { ALIGN, EVENTS } from "~/const/external";

import El from "./helper/El";
import { cleanup, createFlicking } from "./helper/test-util";

describe("Flicking", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Initializing with correct structure", () => {
    it("can be created", () => {
      expect(() => {
        createFlicking(El.DEFAULT_STRUCTURE);
      }).to.not.throw();
    });

    it("should throw an Error when no element is given", () => {
      expect(() => {
        createFlicking(null);
      }).to.throw(FlickingError, typeof null)
        .with.property("code", ERROR.CODE.WRONG_TYPE);
    });

    it("should throw an Error when element with given selector is not found", () => {
      const selector = "#definitely-not-a-flicking-selector";
      expect(() => {
        createFlicking(selector);
      }).to.throw(FlickingError, selector)
        .with.property("code", ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("should not throw an Error when there's no panel elements", () => {
      expect(() => {
        createFlicking(
          El.viewport().add(
            El.camera(),
          ),
        );
      }).not.to.throw();
    });
  });

  describe("Properties", () => {
    describe("viewport", () => {
      it("exists when the flicking is created", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.getViewport()).to.exist;
        expect(flicking.getViewport()).to.be.an.instanceof(Viewport);
      });
    });
  });

  describe("Options", () => {
    describe("align", () => {
      it("is center by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.getAlign()).to.equal(ALIGN.CENTER);
      });

      it("should override renderer & camera's align", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: ALIGN.NEXT
        });

        expect(flicking.getAlign()).equals(ALIGN.NEXT);
        expect(flicking.getRenderer().getAlign()).equals(ALIGN.NEXT);
        expect(flicking.getCamera().getAlign()).equals(ALIGN.NEXT);
      });

      it("can be changed at anytime", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: ALIGN.CENTER
        });

        flicking.setAlign(ALIGN.PREV);

        expect(flicking.getAlign()).equals(ALIGN.PREV);
        expect(flicking.getRenderer().getAlign()).equals(ALIGN.PREV);
        expect(flicking.getCamera().getAlign()).equals(ALIGN.PREV);
      });
    });

    describe("defaultIndex", () => {
      it("should be 0 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.getDefaultIndex()).to.equal(0);
      });

      it("should accept any number, even if it's bigger than actual panel length", () => {
        // Empty flicking
        const flicking = createFlicking(El.viewport().add(El.camera()), { defaultIndex: 2 });
        expect(flicking.getRenderer().getPanels().length).to.equal(0);
        expect(flicking.getDefaultIndex()).to.equal(2);
      });

      it("should locate camera at position of panel which has index equal to defaultIndex", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 1 });
        expect(flicking.getCamera().getPosition()).not.to.equal(0);
        expect(flicking.getCamera().getPosition()).to.equal(flicking.getRenderer().getPanel(1).getPosition());
      });

      it("should locate camera at first panel's position instead if index is out of range", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { defaultIndex: 99999 });
        expect(flicking.getCamera().getPosition()).to.equal(flicking.getRenderer().getPanel(0).getPosition());
      });
    });

    describe("horizontal", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isHorizontal()).to.be.true;
      });

      it("can be changed on creating new instance", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          horizontal: false
        });

        expect(flicking.isHorizontal()).to.be.false;
      });

      it("can be changed anytime", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          horizontal: true
        });

        flicking.setHorizontal(false);

        expect(flicking.isHorizontal()).to.be.false;
      });
    });

    describe("circular", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isCircular()).to.be.false;
      });
    });

    describe("bound", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isBound()).to.be.false;
      });
    });

    describe("adaptive", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isAdaptive()).to.be.false;
      });
    });

    describe("deceleration", () => {
      it("is 0.0075 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getDeceleration()).to.equal(0.0075);
      });
    });

    describe("duration", () => {
      it("is 500 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getDuration()).to.equal(500);
      });
    });

    describe("easing", () => {

    });

    describe("inputType", () => {
      it("is ['mouse', 'touch'] by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getInputType()).to.deep.equal(["mouse", "touch"]);
      });
    });

    describe("moveType", () => {
      it("is 'snap' by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getMoveType()).to.equal("snap");
      });
    });

    describe("threshold", () => {
      it("is 40 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getThreshold()).to.equal(40);
      });
    });

    describe("interruptable", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isInterruptable()).to.be.true;
      });
    });

    describe("interruptable", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isInterruptable()).to.be.true;
      });
    });

    describe("bounce", () => {
      it("is '50%' by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getBounce()).to.equal("50%");
      });
    });

    describe("iOSEdgeSwipeThreshold", () => {
      it("is 30 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.getIOSEdgeSwipeThreshold()).to.equal(30);
      });
    });

    describe("isEqualSize", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isEqualSize()).to.equal(false);
      });
    });

    describe("isConstantSize", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isConstantSize()).to.equal(false);
      });
    });

    describe("renderOnlyVisible", () => {
      it("is false by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isRenderOnlyVisible()).to.equal(false);
      });
    });

    describe("autoInit", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isAutoInit()).to.be.true;
      });

      it("should set initialized to true", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isInitialized()).to.be.true;
      });

      it("should not set initialized to true when it's set to false", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false });

        expect(flicking.isInitialized()).to.be.false;
      });
    });

    describe("autoResize", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.isAutoResize()).to.be.true;
      });

      it("should receive window resize event and emit resize event", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoResize: true });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));

        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should not attach resize event until init() is called", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false, autoResize: true });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.RESIZE, resizeSpy);

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;

        flicking.init(); // resize() called inside, so reset resizeSpy history
        resizeSpy.resetHistory();
        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.calledOnce).to.be.true;

      });
    });
  });

  describe("Flicking Events", () => {
    describe(EVENTS.READY, () => {
      it("should be emitted when Flicking is initialized", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });

      it("won't be emitted after Flicking is initialized", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          autoInit: false
        });
        const readySpy = sinon.spy();
        flicking.on(EVENTS.READY, readySpy);

        expect(readySpy.called).to.be.false;
        flicking.init();
        flicking.init();
        flicking.init();
        flicking.init();
        flicking.init();
        expect(readySpy.calledOnce).to.be.true;
      });
    });

    describe(EVENTS.RESIZE, () => {
      it("should be emitted on initialization", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          autoInit: false
        });
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.init();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should be emitted when resize() is called", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const resizeSpy = sinon.spy();
        flicking.on(EVENTS.RESIZE, resizeSpy);

        expect(resizeSpy.called).to.be.false;
        flicking.resize();
        expect(resizeSpy.calledOnce).to.be.true;
      });

      it("should have new size in it", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as FlickingEvent["resize"];
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.exist;
        expect(event.height).to.exist;
      });

      it("should have correct size value of viewport in it", () => {
        const viewportSize = {
          width: 500,
          height: 300
        };

        const flicking = createFlicking(
          El.viewport().setWidth(viewportSize.width).setHeight(viewportSize.height).add(
            El.camera(),
          ),
        );
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as FlickingEvent["resize"];
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.width).to.equal(viewportSize.width);
        expect(event.height).to.equal(viewportSize.height);
      });

      it("should have size 0 on initialization", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false });
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.RESIZE, resizeSpy);
        flicking.init();

        const event = resizeSpy.firstCall.args[0] as FlickingEvent["resize"];
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.prev.width).to.equal(0);
        expect(event.prev.height).to.equal(0);
      });

      it("should set sizeChanged to true when the size is changed", () => {
        const prevSize = { width: 100, height: 200 };
        const newSize = { width: 530, height: 740 };
        const viewport = El.viewport().add(El.camera());
        viewport.setWidth(prevSize.width).setHeight(prevSize.height);

        const flicking = createFlicking(viewport);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.RESIZE, resizeSpy);
        viewport.setWidth(newSize.width).setHeight(newSize.height);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as FlickingEvent["resize"];
        expect(resizeSpy.calledOnce).to.be.true;

        expect(event.width).to.equal(newSize.width);
        expect(event.height).to.equal(newSize.height);
        expect(event.prev.width).to.equal(prevSize.width);
        expect(event.prev.height).to.equal(prevSize.height);
        expect(event.sizeChanged).to.be.true;
      });

      it("should set sizeChanged to false when the size is not changed", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as FlickingEvent["resize"];
        expect(resizeSpy.calledOnce).to.be.true;

        expect(event.width).to.equal(event.prev.width);
        expect(event.height).to.equal(event.prev.height);
        expect(event.width).not.to.equal(0);
        expect(event.height).not.to.equal(0);
        expect(event.sizeChanged).to.be.false;
      });

      it("should provide viewport element in it", () => {
        const viewport = El.viewport().add(El.camera());
        const flicking = createFlicking(viewport);
        const resizeSpy = sinon.spy();

        flicking.on(EVENTS.RESIZE, resizeSpy);
        flicking.resize();

        const event = resizeSpy.firstCall.args[0] as FlickingEvent["resize"];
        expect(resizeSpy.calledOnce).to.be.true;
        expect(event.element).to.deep.equal(viewport.el);
      });
    });
  });

  describe("Methods", () => {
    describe("destroy", () => {
      it("should set initialized to false", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: true });

        expect(flicking.isInitialized()).to.be.true;
        flicking.destroy();
        expect(flicking.isInitialized()).to.be.false;
      });

      it("should remove window resize event handler", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false, autoResize: false });
        const resizeSpy = sinon.spy();
        flicking.resize = resizeSpy;
        flicking.setAutoResize(true);
        flicking.init();

        resizeSpy.resetHistory();
        flicking.destroy();

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;
      });
    });
  });
});
