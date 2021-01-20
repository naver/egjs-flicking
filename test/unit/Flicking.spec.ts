import FlickingError from "~/core/FlickingError";
import Viewport from "~/core/Viewport";
import RawRenderer from "~/renderer/RawRenderer";
import LinearCamera from "~/camera/LinearCamera";
import Control from "~/control/Control";
import { FlickingEvent } from "~/Flicking";
import * as ERROR from "~/const/error";
import * as OPTIONS from "~/const/option";
import * as EVENTS from "~/const/event";

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
      it("is null by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.getAlign()).to.be.null;
      });

      it("should override renderer & camera's align", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: OPTIONS.ALIGN.CENTER
        });

        expect(flicking.getAlign()).equals(OPTIONS.ALIGN.CENTER);
      });

      it("can be changed at anytime", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          align: OPTIONS.ALIGN.CENTER
        });

        flicking.align = OPTIONS.ALIGN.PREV;

        expect(flicking.align).equals(OPTIONS.ALIGN.PREV);
        expect(flicking.renderer.align).equals(OPTIONS.ALIGN.PREV);
        expect(flicking.camera.align).equals(OPTIONS.ALIGN.PREV);
      });
    });

    describe("direction", () => {
      it(`is ${OPTIONS.DIRECTION.HORIZONTAL} by default`, () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.direction).to.equal(OPTIONS.DIRECTION.HORIZONTAL);
      });

      it("can be changed on creating new instance", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          direction: OPTIONS.DIRECTION.VERTICAL
        });

        expect(flicking.direction).to.equal(OPTIONS.DIRECTION.VERTICAL);
      });

      it("can be changed anytime", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, {
          direction: OPTIONS.DIRECTION.HORIZONTAL
        });

        flicking.direction = OPTIONS.DIRECTION.VERTICAL;

        expect(flicking.direction).to.equal(OPTIONS.DIRECTION.VERTICAL);
      });
    });

    describe("autoInit", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.autoInit).to.be.true;
      });

      it("should set initialized to true", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.initialized).to.be.true;
      });

      it("should not set initialized to true when it's set to false", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false });

        expect(flicking.initialized).to.be.false;
      });
    });

    describe("autoResize", () => {
      it("is true by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);

        expect(flicking.autoResize).to.be.true;
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

    describe("initialIndex", () => {
      it("should be 0 by default", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE);
        expect(flicking.initialIndex).to.equal(0);
      });

      it("should accept any number, even if it's bigger than actual panel length", () => {
        // Empty flicking
        const flicking = createFlicking(El.viewport().add(El.camera()), { initialIndex: 2 });
        expect(flicking.renderer.panels.length).to.equal(0);
        expect(flicking.initialIndex).to.equal(2);
      });

      it("should locate camera at position of panel which has index equal to initialIndex", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { initialIndex: 1 });
        expect(flicking.camera.position).not.to.equal(0);
        expect(flicking.camera.position).to.equal(flicking.renderer.panels[1].position);
      });

      it("should locate camera at first panel's position instead if index is out of range", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { initialIndex: 99999 });
        expect(flicking.camera.position).to.equal(flicking.renderer.firstPanel.position);
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

        expect(flicking.initialized).to.be.true;
        flicking.destroy();
        expect(flicking.initialized).to.be.false;
      });

      it("should remove window resize event handler", () => {
        const flicking = createFlicking(El.DEFAULT_STRUCTURE, { autoInit: false, autoResize: false });
        const resizeSpy = sinon.spy();
        flicking.resize = resizeSpy;
        flicking.autoResize = true;
        flicking.init();

        resizeSpy.resetHistory();
        flicking.destroy();

        window.dispatchEvent(new Event("resize"));
        expect(resizeSpy.called).to.be.false;
      });
    });
  });
});
