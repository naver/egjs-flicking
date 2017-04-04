/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import tutils from "./assets/utils";

describe("restore() method", function() {
	describe("Check for basic functionality", function() {
		tutils.hooks.run();

		// Given
		const $el = tutils.createFixture("#mflick1");
		const eventOrder = ["beforeRestore", "flick", "restore"];

		const inst = tutils.create($el, {
			duration : 200,
			hwAccelerable : true,
			threshold : 70,
			circular: true
		});

		let panelIndex = {
			no: inst._conf.panel.no,
			index: inst._conf.panel.index
		};

		let setCondition = function() {
			inst._mcInst._pos = [145,0];
			inst._setTranslate([-145,0]);
		};

		let runTest = function() {
			let currPos = inst._mcInst.get()[0];
			let panel = inst._conf.panel;

			// Restored in right position?
			expect(currPos % panel.size === 0 && currPos).to.equal(panel.currIndex * panel.size);

			// Restored to previous panel number?
			expect(panelIndex.no === inst.getIndex() && panelIndex.index === inst.getIndex(true)).to.be.ok;

			// Custom events are fired correctly?
			expect($el.eventFired).to.deep.equal(eventOrder);

			$el.eventFired = [];
		};

		// Given
		it("Restore #1", () => {
			setCondition();
			inst.restore(0);
			runTest();
		});

		// Given
		it("Restore #2", () => {
			const panel = inst._conf.panel;
			const pos = panel.size * (panel.currIndex + 1);

			inst._mcInst._pos = [pos,0];
			inst._setTranslate([-pos,0]);

			inst.restore(0);
			runTest();
		});

		// Given
		it("Restore #3", done => {
			setCondition();

			// When
			inst.restore(100);

			// Is animating?
			expect(inst.isPlaying()).to.be.true;

			setTimeout(() => {
				runTest();
				done();
			}, 200);
		});
	});

	describe("When restoring after event stop", function() {
		tutils.hooks.run();

		// Given
		const $el = tutils.createFixture("#mflick1");

		const inst = tutils.create($el, {
			duration: 100,
			hwAccelerable: true,
			threshold: 70,
			circular: true
		}, {
			beforeFlickStart: function (e) {
				if (e.no === 0) {
					e.stop();
					this.restore(0);
				}
			}
		});

		let panelIndex = {
			no: inst._conf.panel.no,
			index: inst._conf.panel.index
		};

		let runTest = () => {
			// Panel is in right position?
			expect(inst._mcInst.get()[0] % inst._conf.panel.size).to.equal(0);

			// Restored to previous panel number?
			expect(panelIndex.no === inst.getIndex() && panelIndex.index === inst.getIndex(true)).to.be.ok;

			// Events are not fired?
			expect($el.eventFired.length).to.equal(0);
		};

		// Given
		it("Restoring #1", () => {
			inst.prev(0);
			runTest();
		});

		it("Restoring #2", () => {
			inst.prev(100);
			runTest();
		});

		it("Restoring #3", () => {
			inst.moveTo(2);
			runTest();
		});

		it("Restoring #4", () => {
			inst.moveTo(2, 100);
			runTest();
		});

		it("Restoring #5", () => {
			inst.next(0);
			panelIndex = {
				no: inst._conf.panel.no,
				index: inst._conf.panel.index
			};

			inst.next(0);

			runTest();
		});

		it("Restoring #6", done => {
			inst.next(100);
			runTest();

			setTimeout(done, 300);
		});
	});
});
