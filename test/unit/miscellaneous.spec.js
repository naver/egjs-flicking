/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import {utils} from "../../src/utils";
import * as consts from "../../src/consts";
import tutils from "./assets/utils";
import FlickingInjector from "inject-loader!../../src/Flicking";

describe("Miscellaneous", function() {
	describe("Workaround for buggy link highlighting on android 2.x", function() {
	    tutils.hooks.run();

	    it("Dummy anchor and left move", () => {
			// Given
			 const MockFlicking = FlickingInjector({
				"./consts": utils.extend(utils.extend({}, consts), {
					IS_ANDROID2: true
				})
			});

			// When
			const $el = tutils.createFixture("#mflick1");
			const inst = new MockFlicking($el, {});

			const $dummyAnchor = inst.$wrapper.querySelector(".__dummy_anchor");

			// Dummy anchor element should be added
			expect($dummyAnchor.tagName === "A" && !$dummyAnchor.innerHTML).to.be.ok;

			// When
			inst.next(0);
			const leftValue = utils.css(inst.getElement(), "left", true);

			// Panel should be moved using left property instead of translate
			expect(leftValue && leftValue > 0).to.be.true;
	    });
	});

	describe("Android 2.x panel move by API", function() {
		tutils.hooks.run();

		it("On panel move, container's left should be 0px and restored when moves end", done => {
			// Given
			const MockFlicking = FlickingInjector({
				"./consts": utils.extend(utils.extend({}, consts), {
					IS_ANDROID2: true
				})
			});

			// When
			const $el = tutils.createFixture("#mflick1");
			const inst = new MockFlicking($el, {});
			const $container = inst.$container;

			inst.next(300);

			// container's left should be 0px
			expect(utils.css($container, "left")).to.equal("0px");

			setTimeout(() => {
				// after panel move container's left shouldn't be 0px
				expect(utils.css($container, "left")).to.not.equal("0px");
				done();
			}, 500);
		});
	});

	describe("Check public methods return", function() {
        tutils.hooks.run();

		it("Methods are returning instance it self?", () => {
			const inst = tutils.create("#mflick1", { circular: true });

			[
				{ method: "next()", data: inst.next(0) },
				{ method: "prev()", data: inst.prev(0) },
				{ method: "moveTo()", data: inst.moveTo(1,0) },
				{ method: "resize()", data: inst.resize() },
				{ method: "restore()", data: inst.restore(0) }
			].forEach(v => {
				// Method call is returning instance it self?", () => {
				expect(v.data).to.deep.equal(inst);
			});
		});
	});

	describe("Check panel move method, depending existence of css transform property", function() {
        tutils.hooks.run();

		it("When support transform, should use translate to move", () => {
			const inst = tutils.create("#mflick1", { circular: true });
			inst.next(0);

			expect(tutils.$getTransformValue(inst.$container).indexOf("translate") >= 0).to.be.true;
		});

		it("When don't support transform, should use left/top to move", () => {
			// Given
			const MockFlicking = FlickingInjector({
				"./consts": utils.extend(utils.extend({}, consts), {
					SUPPORT_TRANSFORM: false
				})
			});

			const $el = tutils.createFixture("#mflick2");
			const inst = new MockFlicking($el, {});
			inst.next(0);

			expect(inst.$container.style.left.length > 0).to.be.true;
		});
	});

	describe("When intent to initialize with non-existent element, should throw error.", function() {
        tutils.hooks.run();

        it("When no element is given", () => {
	        const MockFlicking = FlickingInjector();
	        expect(() => new MockFlicking("#NO-ELEMENT")).to.throw(Error);
        });

		it("When no child element is given", () => {
			const $el = sandbox({
				id: "no-child"
			});

			expect(() => tutils.create($el)).to.throw(Error);
		});
	});

	describe("Disallow API move calls during touch hold", function() {
        tutils.hooks.run();

		it("Panel shouldn't have to moved during touch hold", done => {
			const inst = tutils.create("#mflick1", { circular: true });
			const index = [];

			const interval = setInterval(() => {
				index.push(inst.getIndex());
				inst.next(100);
			}, 200);

			tutils.simulator(inst.$wrapper, {
					pos: [ 200, 50],
					deltaX: -200,
					deltaY: 0,
					duration: 1000
				}, () => {
					clearInterval(interval);
					expect(index.length).to.equal(index.filter(v => v === 0).length);

					done();
				});
		});
	});
});
