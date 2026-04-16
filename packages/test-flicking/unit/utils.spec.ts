import { ALIGN, DIRECTION } from "~/constants/values";
import * as ERROR from "~/error/codes";
import FlickingError from "~/error/FlickingError";
import Flicking from "~/Flicking";
import {
  checkExistence,
  clamp,
  getDirection,
  getElement,
  getElementSize,
  getFlickingAttached,
  getMinusCompensatedIndex,
  getStyle,
  includes,
  merge,
  parseAlign,
  parseArithmeticSize,
  parseBounce,
  parseCSSSizeValue,
  parseElement,
  toArray
} from "~/utils";

import El from "./helper/El";
import { cleanup, createFlicking, createSandbox, NullClass, range } from "./helper/test-util";

describe("Util Functions", () => {
  describe("merge", () => {
    it("should return same reference of the given object", () => {
      const obj = {};
      const merged = merge(obj, { a: 1 });

      expect(merged).toBe(obj);
    });

    it("should return merged object with both properties in target & source", () => {
      const obj = { b: "asdf" };
      const merged = merge(obj, { a: 1 });

      expect(merged.a).toBe(1);
      expect(merged.b).toBe("asdf");
    });

    it("should overwrite property if it was present on the target", () => {
      const obj = { a: 5 };
      const merged = merge(obj, { a: 1 });

      expect(merged.a).toBe(1);
    });
  });

  describe("getElement", () => {
    let wrapper: HTMLElement;

    beforeEach(() => {
      wrapper = createSandbox("#wrapper");
    });

    afterEach(() => {
      cleanup();
    });

    it("should search from the document with selector if the parent element is not given", () => {
      const findingEl = document.createElement("div");
      findingEl.id = "target";

      document.body.appendChild(findingEl);

      try {
        expect(() => getElement("#target")).not.toThrow();
        expect(getElement("#target")).toBe(findingEl);
      } catch (e) {
        expect(true).toBe(false); // Shouldn't reach here
      } finally {
        findingEl.remove();
      }
    });

    it("should search with the selector from the parent element if parent element is given", () => {
      const findingEl = document.createElement("div");
      const fakeEl = document.createElement("div");
      findingEl.className = "target";
      fakeEl.className = "target";

      document.body.insertBefore(fakeEl, wrapper);
      wrapper.appendChild(findingEl);

      try {
        expect(() => getElement(".target")).not.toThrow();
        expect(getElement(".target", wrapper)).toBe(findingEl);
      } catch (e) {
        expect(true).toBe(false); // Shouldn't reach here
      } finally {
        fakeEl.remove();
        findingEl.remove();
      }
    });

    it("will return element itself if HTMLelemnt is given", () => {
      const testingEl = document.createElement("div");

      wrapper.appendChild(testingEl);

      expect(() => getElement(testingEl)).not.toThrow();
      expect(getElement(testingEl)).toBe(testingEl);
    });

    it("will throw FlickingError if element with given selector not found", () => {
      let err: any;
      try {
        getElement("#el-that-definitely-not-exist");
      } catch (e) {
        err = e;
      }
      expect(err).toBeInstanceOf(FlickingError);
      expect(err.code).toBe(ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("will throw FlickingError if element with given selector not found inside given parent", () => {
      const targetEl = document.createElement("div");
      targetEl.id = "target";
      document.body.appendChild(targetEl);

      let err: any;
      try {
        getElement("#target", wrapper);
      } catch (e) {
        err = e;
      }
      expect(err).toBeInstanceOf(FlickingError);
      expect(err.code).toBe(ERROR.CODE.ELEMENT_NOT_FOUND);
    });

    it("will throw FlickingError with code 'WRONG_TYPE' if given parameter is neither string nor HTMLElement", () => {
      const wrongValues = [
        document.createTextNode("some_text"),
        null,
        undefined,
        1203498,
        { a: 1, b: 2 },
        () => "string"
      ];

      wrongValues.forEach(val => {
        let err: any;
        try {
          getElement(val as any);
        } catch (e) {
          err = e;
        }
        expect(err).toBeInstanceOf(FlickingError);
        expect(err.code).toBe(ERROR.CODE.WRONG_TYPE);
      });
    });
  });

  describe("checkExistence", () => {
    it("won't throw when value is not nullish", () => {
      // tslint:disable-next-line
      const testVals = [0, 123, "", "asdf", {}, { a: 1 }, [], [0, 1], new NullClass(), () => {}, () => 0];

      testVals.forEach(val => {
        expect(() => checkExistence(val, "ERROR_MSG")).not.toThrow();
      });
    });

    it("should throw FlickingError with code 'VAL_MUST_NOT_NULL' when value is nullish", () => {
      const testVals = [null, undefined];

      testVals.forEach(val => {
        let err: any;
        try {
          checkExistence(val, "ERROR_MSG");
        } catch (e) {
          err = e;
        }
        expect(err).toBeInstanceOf(FlickingError);
        expect(err.code).toBe(ERROR.CODE.VAL_MUST_NOT_NULL);
      });
    });
  });

  describe("clamp", () => {
    it("should clamp value to maximum value", () => {
      expect(clamp(5, 0, 3)).toBe(3);
      expect(clamp(2, -2, 1)).toBe(1);
      expect(clamp(100, -7, -3)).toBe(-3);
    });

    it("should clamp value to minimum value", () => {
      expect(clamp(-1, 0, 3)).toBe(0);
      expect(clamp(4, 5, 8)).toBe(5);
      expect(clamp(-100, -2, 1)).toBe(-2);
    });

    it("should return origin value if it's between min and max", () => {
      expect(clamp(50, 0, 100)).toBe(50);
      expect(clamp(0.5, 0, 1)).toBe(0.5);
      expect(clamp(-1, -2, 0)).toBe(-1);
      expect(clamp(-3, -4, -2)).toBe(-3);
    });
  });

  describe("getFlickingAttached", () => {
    it("should not throw when its internal field '_flicking' is not null", async () => {
      class ClassThatHasFlickingInIt {
        private _flicking: Flicking;

        public async init(): Promise<this> {
          this._flicking = await createFlicking(El.DEFAULT_HORIZONTAL);
          return this;
        }

        public test() {
          const flicking = getFlickingAttached(this._flicking);
        }
      }

      expect(async () => (await new ClassThatHasFlickingInIt().init()).test()).not.toThrow();
    });

    it("should throw FlickingError with code 'NOT_ATTACHED_TO_FLICKING' when its internal field '_flicking' is null", () => {
      class ClassThatHasFlickingAsNull {
        private _flicking: Flicking | null = null;

        public test() {
          const flicking = getFlickingAttached(this._flicking);
        }
      }

      let err: any;
      try {
        new ClassThatHasFlickingAsNull().test();
      } catch (e) {
        err = e;
      }
      expect(err).toBeInstanceOf(FlickingError);
      expect(err.code).toBe(ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
    });
  });

  describe("toArray", () => {
    let wrapper: HTMLElement;

    beforeEach(() => {
      wrapper = createSandbox("wrapper");
    });

    afterEach(() => {
      cleanup();
    });

    it("create the HTMLElement array when a HTMLCollection is given", () => {
      range(10).forEach(() => {
        wrapper.appendChild(document.createElement("div"));
      });

      const childElements = toArray(wrapper.children);

      expect(childElements.length).toBe(10);
      expect(childElements).toBeInstanceOf(Array);
      expect(childElements[0]).toBeInstanceOf(HTMLElement);
    });
  });

  describe("parseAlign", () => {
    it(`should return 0 for ${ALIGN.PREV}`, () => {
      expect(parseAlign(ALIGN.PREV, 100)).toBe(0);
    });

    it(`should return half of the size for ${ALIGN.CENTER}`, () => {
      expect(parseAlign(ALIGN.CENTER, 100)).toBe(50);
    });

    it(`should return size for ${ALIGN.NEXT}`, () => {
      expect(parseAlign(ALIGN.NEXT, 100)).toBe(100);
    });

    it("should return same number when given value is number", () => {
      expect(parseAlign(24, 100)).toBe(24);
    });

    it("should evaluate the value when given value is string", () => {
      // More cases will be tested on test codes of parseArithmeticExpression
      expect(parseAlign("32px + 50%", 100)).toBe(82);
    });

    it("should throw FlickingError with code 'WRONG_OPTION' when given value is string with wrong format", () => {
      let err1: any;
      try {
        parseAlign("SOME_FAILING_STRING", 100);
      } catch (e) {
        err1 = e;
      }
      expect(err1).toBeInstanceOf(FlickingError);
      expect(err1.code).toBe(ERROR.CODE.WRONG_OPTION);

      let err2: any;
      try {
        parseAlign("", 100);
      } catch (e) {
        err2 = e;
      }
      expect(err2).toBeInstanceOf(FlickingError);
      expect(err2.code).toBe(ERROR.CODE.WRONG_OPTION);
    });
  });

  describe("parseBounce", () => {
    it("should return [val, val] when given val is number", () => {
      expect(parseBounce(1, 100)).toEqual([1, 1]);
    });

    it("should evaluate the value when given value is string", () => {
      expect(parseBounce("32%", 100)).toEqual([32, 32]);
    });

    it("should return number array itself when given value is number array", () => {
      expect(parseBounce([10, 20], 100)).toEqual([10, 20]);
    });

    it("should evaluate each string when given value is string array", () => {
      expect(parseBounce(["4px", "70%"], 50)).toEqual([4, 35]);
    });

    it("can accept array with number and string mixed", () => {
      expect(parseBounce([16, "40%"], 70)).toEqual([16, 28]);
    });
  });

  describe("parseArithmeticSize", () => {
    it("can handle single number string", () => {
      expect(parseArithmeticSize("14", 100)).toBe(14);
    });

    it("can handle single number-px", () => {
      expect(parseArithmeticSize("80px", 100)).toBe(80);
    });

    it("can handle single number-%", () => {
      expect(parseArithmeticSize("50%", 50)).toBe(25);
    });

    it("can handle multiple number strings", () => {
      expect(parseArithmeticSize("14 + 32 - 20", 100)).toBe(26);
    });

    it("can handle multiple numbers, combined in each format", () => {
      expect(parseArithmeticSize("40% - 12px+73", 100)).toBe(101);
    });
  });

  describe("parseCSSSizeValue", () => {
    it("should return itself when given value is a string", () => {
      expect(parseCSSSizeValue("")).toBe("");
      expect(parseCSSSizeValue("24px")).toBe("24px");
      expect(parseCSSSizeValue("SOME_NON_CSS_VALUE")).toBe("SOME_NON_CSS_VALUE"); // Even this is correct behavior
    });

    it("should return '{number}px' when given value is a number", () => {
      expect(parseCSSSizeValue(0)).toBe("0px");
      expect(parseCSSSizeValue(24)).toBe("24px");
      expect(parseCSSSizeValue(-100)).toBe("-100px");
    });
  });

  describe("getDirection", () => {
    it(`should retrun ${DIRECTION.NONE} when start equals end`, () => {
      expect(getDirection(0, 0)).toBe(DIRECTION.NONE);
      expect(getDirection(100, 100)).toBe(DIRECTION.NONE);
      expect(getDirection(-1, -1)).toBe(DIRECTION.NONE);
      expect(getDirection(-0, 0)).toBe(DIRECTION.NONE);
    });

    it(`should retrun ${DIRECTION.NEXT} when end is bigger than start`, () => {
      expect(getDirection(0, 0.1)).toBe(DIRECTION.NEXT);
      expect(getDirection(100, 500)).toBe(DIRECTION.NEXT);
      expect(getDirection(-1, 0)).toBe(DIRECTION.NEXT);
      expect(getDirection(-100, 100)).toBe(DIRECTION.NEXT);
    });

    it(`should retrun ${DIRECTION.PREV} when end is smaller than start`, () => {
      expect(getDirection(0.1, 0)).toBe(DIRECTION.PREV);
      expect(getDirection(500, 100)).toBe(DIRECTION.PREV);
      expect(getDirection(0, -1)).toBe(DIRECTION.PREV);
      expect(getDirection(100, -100)).toBe(DIRECTION.PREV);
    });
  });

  describe("parseElement", () => {
    it("should return an array with given element if a single HTMLElement is given", () => {
      const element = document.createElement("div");

      expect(parseElement(element)).toBeInstanceOf(Array);
      expect(parseElement(element).length).toBe(1);
      expect(parseElement(element)[0]).toBe(element);
    });

    it("should return the same elements if an array of HTMLElement is given", () => {
      const elements = range(10).map(() => document.createElement("div"));

      expect(parseElement(elements)).toEqual(elements);
    });

    it("can accept a HTML string includes a single element and return an array of that single HTMLElment", () => {
      const parsed = parseElement('<div class="flicking-panel">Panel</div>');

      expect(parsed).toBeInstanceOf(Array);
      expect(parsed.length).toBe(1);
      expect(parsed[0]).toBeInstanceOf(HTMLElement);
      expect(parsed[0].classList.contains("flicking-panel")).toBe(true);
      expect(parsed[0].innerHTML).toBe("Panel");
    });

    it("can accept a HTML string includes a multiple elements and return an array of that HTMLElments", () => {
      const parsed = parseElement("<div>Panel 0</div><div>Panel 1</div><div>Panel 2</div>");

      expect(parsed).toBeInstanceOf(Array);
      expect(parsed.length).toBe(3);
      expect(parsed.every(el => el instanceof HTMLElement)).toBe(true);
      expect(parsed[0].innerHTML).toBe("Panel 0");
      expect(parsed[1].innerHTML).toBe("Panel 1");
      expect(parsed[2].innerHTML).toBe("Panel 2");
    });

    it("can ignore Text Nodes", () => {
      const parsed = parseElement(`
        <div>Panel 0</div>
        <div>Panel 1</div>
        <div>Panel 2</div>
      `);

      expect(parsed).toBeInstanceOf(Array);
      expect(parsed.length).toBe(3);
    });

    it("can accept an mixed array of string-HTMLElement", () => {
      const elements = ["<div>Panel</div>", document.createElement("div")];

      expect(parseElement(elements)).toBeInstanceOf(Array);
      expect(parseElement(elements).length).toBe(2);
      expect(parseElement(elements)[0]).toBeInstanceOf(HTMLElement);
      expect(parseElement(elements)[1]).toBeInstanceOf(HTMLElement);
    });

    it("should return an empty array if non-HTML string is given", () => {
      expect(parseElement("")).toEqual([]);
      expect(parseElement("123412341")).toEqual([]);
      expect(parseElement("<div<<div<")).toEqual([]);
      expect(parseElement("")).toEqual([]);
    });

    it("should throw FlickingError with code 'WRONG_TYPE' if given parameter is neither string nor HTMLElement", () => {
      const wrongValues = [
        document.createTextNode("some_text"),
        null,
        undefined,
        1203498,
        { a: 1, b: 2 },
        () => "string"
      ];

      wrongValues.forEach(val => {
        let err: any;
        try {
          parseElement(val as any);
        } catch (e) {
          err = e;
        }
        expect(err).toBeInstanceOf(FlickingError);
        expect(err.code).toBe(ERROR.CODE.WRONG_TYPE);
      });
    });
  });

  describe("getCirculatedIndex", () => {
    it("should return same number if that number is between 0 and max", () => {
      expect(getMinusCompensatedIndex(0, 1)).toBe(0);
      expect(getMinusCompensatedIndex(1, 1)).toBe(1);
      expect(getMinusCompensatedIndex(5, 10)).toBe(5);
    });

    it("should return clamped number if that number is bigger than max", () => {
      expect(getMinusCompensatedIndex(3, 1)).toBe(1);
      expect(getMinusCompensatedIndex(1, 0)).toBe(0);
      expect(getMinusCompensatedIndex(10, 5)).toBe(5);
    });

    it("should return 'max - abs(val)' if given number is negative and abs(val) <= max", () => {
      expect(getMinusCompensatedIndex(-1, 1)).toBe(0);
      expect(getMinusCompensatedIndex(-1, 5)).toBe(4);
      expect(getMinusCompensatedIndex(-2, 5)).toBe(3);
      expect(getMinusCompensatedIndex(-3, 5)).toBe(2);
      expect(getMinusCompensatedIndex(-4, 5)).toBe(1);
      expect(getMinusCompensatedIndex(-5, 5)).toBe(0);
    });

    it("should return clamp(max - abs(val), 0, max) if given number is negative and abs(val) > max", () => {
      expect(getMinusCompensatedIndex(-5, 1)).toBe(0);
      expect(getMinusCompensatedIndex(-6, 5)).toBe(0);
      expect(getMinusCompensatedIndex(-999, 5)).toBe(0);
    });
  });

  describe("includes", () => {
    it("should return true if the checking literal value is included in the given array", () => {
      expect(includes([0, 1, 2], 0)).toBe(true);
      expect(includes([0, 1, 2], 1)).toBe(true);
      expect(includes([0, 1, 2], 2)).toBe(true);
      expect(includes(["a", "b", "c"], "b")).toBe(true);
      expect(includes(["a", "b", "c"], "c")).toBe(true);
      expect(includes([undefined, null], null)).toBe(true);
      expect(includes([undefined, null], undefined)).toBe(true);
    });

    it("should return false if the checking literal value is not included in the given array", () => {
      expect(includes([0, 1, 2], 4)).toBe(false);
      expect(includes([0, 1, 2], 10)).toBe(false);
      expect(includes([0, 1, 2], -1)).toBe(false);
      expect(includes([1, 2], 0)).toBe(false);
      expect(includes([0, 1, 2], null)).toBe(false);
      expect(includes([0, 1, 2], undefined)).toBe(false);
      expect(includes([0, 1, 2], {} as any)).toBe(false);
      expect(includes([0, 1, 2], [] as any)).toBe(false);
      expect(includes(["a", "b", "c"], "")).toBe(false);
      expect(includes(["a", "b", "c"], "d")).toBe(false);
      expect(includes(["a", "b", "c"], undefined)).toBe(false);
      expect(includes(["a", "b", "c"], null)).toBe(false);
      expect(includes(["a", "b", "c"], {} as any)).toBe(false);
      expect(includes(["a", "b", "c"], [] as any)).toBe(false);
      expect(includes([undefined, null], 0)).toBe(false);
      expect(includes([undefined, null], "")).toBe(false);
      expect(includes([undefined, null], {})).toBe(false);
      expect(includes([undefined, null], [])).toBe(false);
    });

    it("should return true if the exact same class instance / array / object / function is included in the array", () => {
      class IncludesTestClass {
        public constructor(
          public foo: number,
          public bar: string
        ) {}
      }

      const instance = new IncludesTestClass(0, "");
      const array = [0, 1, 2, "1", "2", "3"];
      const object = { a: 1, b: "2" };
      const func = (a: number) => true;

      expect(includes([instance, array, object, func], instance)).toBe(true);
      expect(includes([instance, array, object, func], array)).toBe(true);
      expect(includes([instance, array, object, func], object)).toBe(true);
      expect(includes([instance, array, object, func], func)).toBe(true);
    });

    it("should return false if the class instance / array / object / function with the same value but not the same reference is included in the array", () => {
      class IncludesTestClass {
        public constructor(
          public foo: number,
          public bar: string
        ) {}
      }

      const instance = new IncludesTestClass(0, "");
      const array = [0, 1, 2, "1", "2", "3"];
      const object = { a: 1, b: "2" };
      const func = (a: number) => true;

      expect(includes([instance, array, object, func], new IncludesTestClass(0, ""))).toBe(false);
      expect(includes([instance, array, object, func], [0, 1, 2, "1", "2", "3"])).toBe(false);
      expect(includes([instance, array, object, func], { a: 1, b: "2" })).toBe(false);
      expect(includes([instance, array, object, func], (a: number) => true)).toBe(false);
    });
  });

  describe("getElementSize", () => {
    let wrapper: HTMLElement;
    let el: HTMLElement;

    beforeEach(() => {
      wrapper = createSandbox("#wrapper");
      el = document.createElement("div");

      wrapper.appendChild(el);
    });

    afterEach(() => {
      cleanup();
    });

    it("should return offsetWidth when useOffset: true and horizontal: true", () => {
      el.style.width = "20px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: true,
        useFractionalSize: false,
        style
      });

      expect(size).toBe(el.offsetWidth);
      expect(el.offsetWidth).not.toBe(el.clientWidth);
      expect(el.offsetWidth).not.toBe(el.offsetHeight);
    });

    it("should return offsetHeight when useOffset: true and horizontal: false", () => {
      el.style.width = "20px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: false,
        useOffset: true,
        useFractionalSize: false,
        style
      });

      expect(size).toBe(el.offsetHeight);
      expect(el.offsetHeight).not.toBe(el.clientHeight);
      expect(el.offsetHeight).not.toBe(el.offsetWidth);
    });

    it("should return clientWidth when useOffset: false and horizontal: true", () => {
      el.style.width = "20px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: false,
        useFractionalSize: false,
        style
      });

      expect(size).toBe(el.clientWidth);
      expect(el.clientWidth).not.toBe(el.offsetWidth);
      expect(el.clientWidth).not.toBe(el.clientHeight);
    });

    it("should return clientHeight when useOffset: false and horizontal: false", () => {
      el.style.width = "20px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: false,
        useOffset: false,
        useFractionalSize: false,
        style
      });

      expect(size).toBe(el.clientHeight);
      expect(el.clientHeight).not.toBe(el.clientWidth);
      expect(el.clientHeight).not.toBe(el.offsetHeight);
    });

    it("should return size that has fractional part in it when useFractionalSize: true", () => {
      el.style.width = "20.5px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: true,
        useFractionalSize: true,
        style
      });

      expect(size).toBe(el.offsetWidth - 0.5);
      expect(el.offsetWidth).not.toBe(el.clientWidth);
      expect(el.offsetWidth).not.toBe(el.offsetHeight);
    });

    it("should return size that is near to offsetWidth and has fractional part in it when useFractionalSize: true & useOffset: true", () => {
      el.style.width = "20.5px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: true,
        useFractionalSize: true,
        style
      });

      expect(size).toBe(el.offsetWidth - 0.5);
      expect(el.offsetWidth).not.toBe(el.clientWidth);
      expect(el.offsetWidth).not.toBe(el.offsetHeight);
    });

    it("should return size that near to clientWidth and has fractional part in it when useFractionalSize: true & useOffset: false", () => {
      el.style.width = "20.5px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: false,
        useFractionalSize: true,
        style
      });

      expect(size).toBe(el.clientWidth - 0.5);
      expect(el.clientWidth).not.toBe(el.offsetWidth);
      expect(el.clientWidth).not.toBe(el.clientHeight);
    });

    it("should return size that is near to offsetWidth and has fractional part in it when useFractionalSize: true & useOffset: true, and box-sizing is border-box", () => {
      el.style.width = "100.5px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";
      el.style.boxSizing = "border-box";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: true,
        useFractionalSize: true,
        style
      });

      expect(size).toBe(el.offsetWidth - 0.5);
      expect(el.offsetWidth).not.toBe(el.clientWidth);
      expect(el.offsetWidth).not.toBe(el.offsetHeight);
    });

    it("should return size that near to clientWidth and has fractional part in it when useFractionalSize: true & useOffset: false, and box-sizing is border-box", () => {
      el.style.width = "100.5px";
      el.style.height = "1000px";
      el.style.border = "20px solid #ffffff";
      el.style.boxSizing = "border-box";

      const style = getStyle(el);
      const size = getElementSize({
        el,
        horizontal: true,
        useOffset: false,
        useFractionalSize: true,
        style
      });

      expect(size).toBe(el.clientWidth - 0.5);
      expect(el.clientWidth).not.toBe(el.offsetWidth);
      expect(el.clientWidth).not.toBe(el.clientHeight);
    });
  });
});
