/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import {utils} from "../../src/utils";
import tutils from "./assets/utils";
import MovableCoord from "@egjs/movablecoord";

describe("moveTo() method", function() {
	describe("Check for functionality", function() {
		tutils.hooks.run();

		// Given
		const eventOrder = [ "beforeFlickStart", "flick", "flickEnd" ];

		let setCondition = function(inst, no, duration) {
			let $el = inst.$wrapper;
			$el.eventFired = [];
			inst.moveTo(no, duration);
		};

		let runTest = function(inst, no, value) {
			expect(inst.getIndex()).to.equal(no);  // Panel number indicate correct panel number?

			expect(
				(tutils.$getTransformValue(inst.getElement()).match(RegExp(value)) + "") == value
			).to.be.true;  // Invoked element is placed in right position?

			expect(inst.getElement().innerHTML.indexOf("Layer "+ no)).to.be.ok;  // Moved correctly?
			expect(inst.$wrapper.eventFired).to.deep.equal(eventOrder);  // Custom events are fired?
		};

		// Given - test #1
		it("Test for panel move #1", () => {
			const inst = tutils.create("#mflick1");
			const count = inst._conf.panel.count;
			const value = (count - 1) * 100;

			setCondition(inst, count - 1, 0);  // move to first
			runTest(inst, count - 1, value);

			// When
			setCondition(inst, 0, 0);  // move to first
			runTest(inst, 0, "0%");
		});

		// Given - test #2
		it("Test for panel move #2", () => {
			const inst = tutils.create("#mflick2", {defaultIndex: 1});
			const count = inst._conf.panel.count;
			const value = (count - 1) * 100;

			// When
			setCondition(inst, 2, 0);
			runTest(inst, 2, value);

			// When
			setCondition(inst, 0, 0);
			runTest(inst, 0, "0%");
		});

		// Given - test #3
		it("Test for panel move #3", () => {
			const inst = tutils.create("#mflick3", {
				circular: true,
				defaultIndex: 3
			});
			const count = inst._conf.panel.count;
			const index = count - 1;
			const value = (inst._getBasePositionIndex() * 100) + "%";

			setCondition(inst, index, 0);  // move to last
			runTest(inst, index, value);

			// When
			setCondition(inst, 0, 0);  // move to first
			runTest(inst, 0, "0%");

			// When
			setCondition(inst, 2, 0);  // move to third
			runTest(inst, 2, value);
		});

		// Given - test #4
		it("Test for panel move #4", () => {
			const inst = tutils.create("#mflick3-1", {
				circular: true
			});
			const value = (inst._getBasePositionIndex() * 100) + "%";

			// When
			setCondition(inst, 2, 0);
			runTest(inst, 2, value);

			// When
			setCondition(inst, 1, 0);
			runTest(inst, 1, value);
		});
	});

	describe("Check for the direction", () => {
		tutils.hooks.run();

		const MC = MovableCoord;

		let setCondition = function (inst, no) {
			const $el = inst.$wrapper;

			$el.eventDirection = [];
			inst.moveTo(no, 0);
		};

		let runTest = function (inst, direction) {
			const eventDirection = tutils.unique(inst.$wrapper.eventDirection);

			expect(direction).to.equal(eventDirection.length === 1 && eventDirection[0]);  // Panel moved to direction?
		};

		it("Non-circular", () => {
			// non-circular
			const inst = tutils.create("#mflick1");
			setCondition(inst, 1);
			runTest(inst, MC.DIRECTION_LEFT);

			setCondition(inst, 0);
			runTest(inst, MC.DIRECTION_RIGHT);
		});

		// circular
		it("Circular", () => {
			const inst = tutils.create("#mflick2", {
				circular : true
			});

			setCondition(inst, 2);
			runTest(inst, MC.DIRECTION_RIGHT);

			setCondition(inst, 0);
			runTest(inst, MC.DIRECTION_LEFT);

			setCondition(inst, 1);
			runTest(inst, MC.DIRECTION_LEFT);
		});
	});

	describe("Animation #1 - Duration value", () => {
		tutils.hooks.run();

		let value;
		let asyncFn;
		const customEvt = {
			flickEnd: function() {
				expect(
					parseInt(tutils.$getTransformValue(this.getElement()).match(RegExp(value)) + "")
				).equal(value);  // Moved to last panel?

				asyncFn && asyncFn();
			}
		};

		it("Default value", () => {
			const inst = tutils.create("#mflick1", null, customEvt);
			const count = inst._conf.panel.count;
			value = (count - 1) * 100;

			inst.moveTo(count - 1);  // move to last
		});

		it("Specified value", (done) => {
			const inst = tutils.create("#mflick2", null, customEvt);
			const count = inst._conf.panel.count;
			asyncFn = done;
			value = (count - 1) * 100;

			inst.moveTo(count - 1, 500);  // move to last
		});
	});

	describe("Animation #2", function() {
		tutils.hooks.run();

		// Given
		it("Moving to last panel", done => {
			const inst = tutils.create("#mflick3", {
					circular : true
				}, {
					flickEnd: function() {
						expect(count - 1).to.equal(this._conf.panel.no);  // Panel number indicate last panel number?
						expect(tutils.$getTransformValue(this.getElement()).match(RegExp(value)) + "").to.equal(value);  // Invoked element is placed in right position?
						expect(this.getElement().innerHTML.indexOf("Layer " + (count - 1))).to.be.ok;  // Moved correctly?

						done();
					}
				});

			const count = inst._conf.panel.count;
			const index = count - 1;
			const value = (inst._getBasePositionIndex() * 100) +"%";

			// When
			inst.moveTo(index, 300);  // move to last
		});

	});

	describe("Animation #3 - moving to next panel", function() {
		tutils.hooks.run();

		it("Moving to next panel", done => {
			const inst = tutils.create("#mflick3", { circular : true }, {
					flickEnd: function() {
						expect(panelToMove).to.equal(indexToMove);  // The index value to move From current panel?
						expect(this._conf.panel.no).to.equal(panelToMove);  // Panel number indicate 'panel n'?
						expect(tutils.$getTransformValue(this.getElement()).match(RegExp(value)) + "").to.deep.equal(value);  // Invoked element is placed in right position?
						expect(this.getElement().innerHTML.indexOf("Layer 2")).to.be.ok;  // Moved correctly

						done();
					}
				});

			const value = (inst._getBasePositionIndex() * 100) +"%";
			const panelToMove = 1;  // index value to move from current

			// When
			inst.moveTo(panelToMove,300);
			const indexToMove = inst._conf.indexToMove;
		});
	});
});
