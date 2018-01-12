/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/*eslint-disable */
import tutils from "./assets/utils";
import Axes from "@egjs/axes";

describe("Custom events", function() {
	describe("When changes panel normally", function() {
        tutils.hooks.run();

		// Given
		const eventOrder = ["beforeFlickStart", "flick", "flickEnd"];
		const data = {};
		const handler = function(e) {
			let type = e.eventType;
			let id = this.$wrapper.id;

			let eventFired = data[id].eventFired;
			let panel = data[id].panel;

			if(eventFired.indexOf(type) == -1) {
				if (!e.holding) {
					eventFired.push(type);

					panel[type] = {
						no: e.no,
						getElement: this.getElement(),
						getIndex: this.getIndex(),
						getNextElement: this.getNextElement(),
						getPrevElement: this.getPrevElement(),
						getNextIndex: this.getNextIndex(),
						getPrevIndex: this.getPrevIndex()
					};
				}
			}
		};

		const setCondition = (id, $el, option) => {
			const f = tutils.create($el, option, handler);

			data[id] = {
				eventFired: [],
				panel: {},
				inst: f,
				currentPanel: {
					no: f._conf.panel.currNo,
					getElement: f.getElement(),
					getIndex: f.getIndex(),
					getNextElement: f.getNextElement(),
					getPrevElement: f.getPrevElement(),
					getNextIndex: f.getNextIndex(),
					getPrevIndex: f.getPrevIndex()
				}
			};
		};

		const runTest = function(id, $el, done) {
			tutils.simulator($el, {
				deltaX: -70
			}, function() {
				let eventFired = data[id].eventFired;
				let inst = data[id].inst;
				let panel = data[id].panel;
				let currentPanel = data[id].currentPanel;

				// Then
				setTimeout(function() {
					// Custom events are fired in correct order
					expect(eventOrder).to.deep.equal(eventFired);

					let isCircular = inst.options.circular;

					for (let x in panel) {
						let oPanel = panel[x];
						let condition, value;

						if (x === "flickEnd") {
							condition = {
								// after flickEnd -> before flickEnd order
								// ex) getElement() on 'flickEnd' event is same as getNextElement() before 'flickEnd'
								getElement: "getNextElement",
								getIndex: "getNextIndex",
								getNextElement: isCircular ? "getPrevElement" : inst.getNextElement(),
								getNextIndex: currentPanel.no + 2,
								getPrevElement: "getElement",
								getPrevIndex: "getIndex"
							};

							for (let x in oPanel) {
								if (/^(no|getIndex)$/.test(x)) {
									let value = currentPanel[x];

									if (!isCircular || (isCircular && x !== "index")) {
										value += 1;
									}

									// Panel should be changed on event
									expect(oPanel[x]).to.equal(value);

								} else {
									value = condition[x];

									if (typeof value === "string") {
										value = currentPanel[ value ];
									}

									// The value from, should be equals with previous
									expect(oPanel[x]).to.deep.equal(value);
								}
							};

						} else {
							for (let x in oPanel) {
								// The value from, shouldn't be changed during event
								expect(oPanel[x]).to.deep.equal(currentPanel[x]);
							}
						}
					};

					done();
				},1000);
			});
		};

		it("Custom events #1", done => {
			const id = "mflick1";
			const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			setCondition(id, $el);
			runTest(id, $el, done);
		});

		it("Custom events #2", done => {
		    const id = "mflick2";
		    const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			setCondition(id, $el, {circular: true});
			runTest(id, $el, done);
		});

	});

	describe("When stop event on beforeRestore", function() {
		tutils.hooks.run();

		it("restore event should not be triggered", done => {
			let called = false;

			const inst = tutils.create("#mflick1", { threshold : 100 }, {
				beforeRestore: e => e.stop(),
				restore: () => called = true
			});

			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -70
			}, () => {
				expect(called).to.be.false;
				done();
			});
		});
	});

	describe("When stop on flick event", function() {
		tutils.hooks.run();

		it("The panel should not be moved during change", done => {
			let translate = "";

			const inst = tutils.create("#mflick1", null, {
				flick : e => {
					e.stop();
					translate = tutils.$getTransformValue(inst.$container, true);
				}
			});

			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -70,
				touches : 1
			}, () => {
				setTimeout(function() {
					expect(translate).to.not.equal(tutils.$getTransformValue(inst.$container, true));
					done();
				}, 500);
			});
		});
	});

	describe("When stop on beforeFlickStart event", function() {
		tutils.hooks.run();

		it("The panel stopped to move and is not positioned well?", done => {
			let translate = "";
			const $el = tutils.createFixture("#mflick1");

			const inst = tutils.create($el, null, {
				beforeFlickStart: e => {
					e.stop();
					$el.eventFired = [];
					$el.eventDirection = [];
					translate = tutils.$getTransformValue(inst.$container, true);
				}
			});

			let panelIndex = {
				no: inst._conf.panel.no,
				index: inst._conf.panel.index
			};

			// When
			tutils.simulator(inst.$wrapper, {
					pos: [0, 0],
					deltaX: -70,
					touches: 1
				}, () => {
					// Then
					let currPos = inst._axesInst.get().flick;

					// The panel stopped to move and is not positioned well?
					expect(currPos % inst._conf.panel.size).to.be.ok;

					// When
					inst.restore(0);
					currPos = inst._axesInst.get().flick;

					// The panel restored in its original position?
					expect(currPos % inst._conf.panel.size === 0).to.be.ok;

					// Restored panel index value?
					expect(panelIndex).to.deep.equal({
							no: inst._conf.panel.no,
							index: inst._conf.panel.index
						});

					// Restore events are fired correctly?
					expect($el.eventFired).to.deep.equal(["beforeRestore", "flick", "restore"]);

					let direction = tutils.unique($el.eventDirection);

					// Direction value of restore event are right?
					expect(direction.length === 1 && direction[0] === Axes.DIRECTION_RIGHT).to.be.ok;

					done();
				});
		});
	});

	describe("Events fired on move API call when duration is 0", function() {
        tutils.hooks.run();

		// Given
		const $el = tutils.createFixture("#mflick1");
		const eventOrder = ["beforeFlickStart", "flick", "flickEnd"];
		const panel = {};
		let currentPanel;

		const handler = e => {
			let type = e.eventType;

			if ($el.eventFired.indexOf(type) == -1) {
				$el.eventFired.push(type);

				panel[type] = {
					no: e.no
				};
			}
		};

		const inst = tutils.create($el, { circular: true }, {
			beforeFlickStart: handler,
			flick: handler,
			flickEnd: handler
		});

		const setCondition = function() {
			$el.eventFired = [];

			currentPanel = {
				no: inst._conf.panel.no
			};
		};

		const runTest = function() {
			for (let x in panel) {
				const oPanel = panel[x];

				if (x === "flickEnd") {
					// Panel no should be change on 'flickEnd' event
					expect(oPanel.no === currentPanel.no + 1 || oPanel.no === currentPanel.no - 1).to.be.ok;
				} else {
					// Panel no shouldn't be changed before 'flickEnd' event
					expect(oPanel.no).to.equal(currentPanel.no);
				}
			}
		};

		it("Events are fired in correct order, after calling next()?", () => {
			setCondition();
			inst.next(0);

			expect($el.eventFired).to.deep.equal(eventOrder);
			runTest();
		});

		it("Events are fired in correct order, after calling prev()?", () => {
			setCondition();
			inst.prev(0);

			expect($el.eventFired).to.deep.equal(eventOrder);
			runTest();
		});

		it("Events are fired in correct order, after calling moveTo()?", () => {
			setCondition();
			inst.moveTo(1,0);

			expect($el.eventFired).to.deep.equal(eventOrder);
			runTest();
		});
	});

	describe("Events fired on move API call when duration is greater than 0", function() {
        tutils.hooks.run();

		it("Events are fired in correct order, after calling methods?", done => {
			const eventOrder = ["beforeFlickStart", "flick", "flickEnd"];
			const eventFired = {
				next: [],
				prev: [],
				moveTo: []
			};
			let method = "";

			const handler = e => {
				const type = e.eventType;
				const event = eventFired[method];

				event.indexOf(type) === -1 &&
					event.push(type);
			};

			const inst = tutils.create("#mflick1", { circular: true }, {
				beforeFlickStart: handler,
				flick: handler,
				flickEnd: handler
			});

			// When
			setTimeout(() => {
				method = "next";
				inst.next(10);
			}, 200);

			// When
			setTimeout(() => {
				method = "prev";
				inst.prev(10);
			}, 400);

			// When
			setTimeout(() => {
				method = "moveTo";
				inst.moveTo(1, 10);
			}, 600);

			setTimeout(() => {
				for(let x in eventFired) {
					expect(eventFired[x]).to.deep.equal(eventOrder);
				}
				done();
			}, 1000);
		});
	});

	describe("Check for continuous action: 1)restore, 2)flick ", function() {
        tutils.hooks.run();

		it("Custom events for restoring are fired in correct order?", done => {
			const inst = tutils.create("#mflick1");

			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -30
			}, () => {
				setTimeout(() => {
						expect(inst.$wrapper.eventFired).to.deep.equal(
							["flick", "beforeRestore", "flick", "restore" ]
						);
					done();
				},500);
			});
		});

		it("Custom events for normal moves are fired in correct order?", done => {
			const inst = tutils.create("#mflick2");

			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -70
			}, () => {
				// Then
				setTimeout(() => {
						expect(inst.$wrapper.eventFired).to.deep.equal([ "flick", "beforeFlickStart", "flick", "flickEnd" ]);
					done();
				},500);
			});
		});
	});

	describe("Check for direction during hold and unhold on flick event", function() {
        tutils.hooks.run();

		// Given
		let directionHold = {};
		let directionUnhold = {};

		const handler = function(e) {
			let id = this.$wrapper.id;

			if (!directionHold[id]) {
				directionHold[id] = [];
				directionUnhold[id] = [];
			}

			e.holding ?
				directionHold[ id ].push(e.direction) :
				directionUnhold[ id ].push(e.direction);
		};

		const setCondition = ($el, options) => {
			tutils.create($el, options || {
					circular: true
				}, {
					flick: handler,
					circular: true
				});
		};

		const check = (arr, val) => arr.join("").replace(new RegExp(val,"g"), "") === "";

		// When
		it("Is left during touch hold/unhold?", done => {
			const id = "mflick1";
			const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			setCondition($el);

			// When
			tutils.simulator($el, { deltaX: -100, deltaY: 90 }, () => {
				// Is left during touch hold?
				expect(check(directionHold[id], Axes.DIRECTION_LEFT)).to.be.ok;

				// Is left during touch unhold?
				expect(check(directionUnhold[id], Axes.DIRECTION_LEFT)).to.be.ok;

				done();
			});
		});

		it("Is right during touch hold/unhold?", done => {
			const id = "mflick2";
			const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			setCondition($el);

			// When
			tutils.simulator($el, { deltaX: 100, deltaY: 50 }, () => {
				// Is right during touch hold?
				expect(check(directionHold[id], Axes.DIRECTION_RIGHT)).to.be.ok;

				// Is right during touch unhold?
				expect(check(directionUnhold[id], Axes.DIRECTION_RIGHT)).to.be.ok;

				done();
			});
		});

		it("Is up during touch hold/unhold?", done => {
			const id = "mflick3";
			const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			setCondition($el, {
				circular: true,
				horizontal: false
			});

			// When
			tutils.simulator($el, { deltaX: 50, deltaY: -100 }, () => {
				// Is up during touch hold?
				expect(check(directionHold[id], Axes.DIRECTION_UP)).to.be.ok;

				// Is up during touch unhold?
				expect(check(directionUnhold[id], Axes.DIRECTION_UP)).to.be.ok;

				done();
			});
		});

		it("Is down during touch hold/unhold?", done => {
			const id = "mflick3-1";
			const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			setCondition($el, {
				circular: true,
				horizontal: false
			});

			// When
			tutils.simulator($el, { deltaX: -50, deltaY: 100 }, () => {
				// Is down during touch hold?
				expect(check(directionHold[id], Axes.DIRECTION_DOWN)).to.be.ok;

				// Is down during touch unhold?
				expect(check(directionUnhold[id], Axes.DIRECTION_DOWN)).to.be.ok;

				done();
			});
		});
	});

	describe("Distance value during flick event", function() {
        tutils.hooks.run();

		const runTest = (id, options, pos, isPositive, done) => {
			const $el = tutils.createFixture(`#${id}`);
			$el.id = id;

			let distance = [];
			let index = 0;

			const inst = tutils.create($el, options, {
				flick: e => distance.push(e.distance),
				flickEnd: function() {
					distance = [];

					if (index === 0) {
						tutils.simulator(this.$wrapper, pos, () => {
							expect(
								distance.map(v => (isPositive ? v >= 0 : v <= 0) ? v : null).length
							).to.equal(distance.length);

							done();
						});
					}

					index++;
				}
			});

			inst[ isPositive ? "next" : "prev" ]();
		};

		it("Distance check #1", done => {
			runTest("#mflick1", { circular: true }, { deltaX: -100, deltaY: 0 }, true, done);
		});

		it("Distance check #2", done => {
			runTest("#mflick2", { circular: true }, { deltaX: 100, deltaY: 0 }, false, done);
		});

		it("Distance check #3", done => {
			runTest("#mflick2-1", { circular: true, horizontal: false },  { deltaX: 0, deltaY: -100 }, true, done);
		});

		it("Distance check #4", done => {
			runTest("#mflick3-1", { circular: true, horizontal: false },  { deltaX: 0, deltaY: 100 }, false, done);
		});

		it("without implicit user's action, e.distance should be null", done => {
			const inst = tutils.create("#mflick1", {
				circular: true
			}).on({
				flick: e => {
					expect(e.distance).to.be.null;
				},
				flickEnd: () => done()
			});

			inst.next();
		})
	});

	describe("Check for the animation status", function() {
		tutils.hooks.run();

		let status = {};
		const handler = e => {
			const holding = e.holding;
			const type = `${e.eventType}${holding ? "Hold": ""}`;

			if (!status[type]) {
				status[type] = {truthy: 0, falsy: 0};
			}

			status[type][inst.isPlaying() ? "truthy" : "falsy"]++;
		};
		const inst = tutils.create("#mflick1", { threshold : 50 }, {
			beforeRestore: handler,
			restore: handler,
			beforeFlickStart: handler,
			flick: handler,
			flickEnd: handler
		});

		it("during the normal flicking moves", done => {
			// When
			// -- flick -- beforeFlickStart -- flick -- flickEnd -->
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -70
			}, () => {
				setTimeout(() => {
					// during the flick hold
					expect(status.flickHold.truthy).to.be.equal(0);
					expect(status.flickHold.falsy > 0).to.be.true;

					// beforeFlickStart
					expect(status.beforeFlickStart.truthy).to.be.equal(0);
					expect(status.beforeFlickStart.falsy).to.be.equal(1);

					// during the flick without holding
					expect(status.flick.truthy > 0).to.be.true;
					expect(status.flick.falsy).to.be.equal(0);

					// flickEnd
					expect(status.flickEnd.truthy).to.be.equal(0);
					expect(status.flickEnd.falsy).to.be.equal(1);

					status = {};
					done();
				}, 500)
			});
		});

		it("when not trespassing the threshold", done => {
			// When
			// -- flick -- beforeRestore -- flick -- restore -->
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -30
			}, () => {
				setTimeout(() => {
					// during the flick hold
					expect(status.flickHold.truthy).to.be.equal(0);
					expect(status.flickHold.falsy > 0).to.be.true;

					// beforeRestore
					expect(status.beforeRestore.truthy).to.be.equal(0);
					expect(status.beforeRestore.falsy).to.be.equal(1);

					// during the flick without holding
					expect(status.flick.truthy > 0).to.be.true;
					expect(status.flick.falsy).to.be.equal(0);

					// restore
					expect(status.beforeRestore.truthy).to.be.equal(0);
					expect(status.beforeRestore.falsy).to.be.equal(1);

					done();
				}, 500)
			});
		});
	});

	describe("Check for the event.isTrusted value", function() {
		tutils.hooks.run();

		const isTrusted = [];
		const handler = e => {
			isTrusted.push(e.isTrusted);
		};
		const inst = tutils.create("#mflick1", { threshold : 50 }, {
			beforeRestore: handler,
			restore: handler,
			beforeFlickStart: handler,
			flick: handler,
			flickEnd: handler
		});

		it("run by API:next() calls", done => {
			inst.next(100);

			setTimeout(() => {
				expect(isTrusted.indexOf(true)).to.be.equal(-1);
				done();
			}, 150);
		});

		it("run by API:moveTo() calls", done => {
			isTrusted.splice(0);
			inst.moveTo(0, 100);

			setTimeout(() => {
				expect(isTrusted.indexOf(true)).to.be.equal(-1);
				done();
			}, 150);
		});

		it("during the normal flicking moves", done => {
			isTrusted.splice(0);

			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -70
			}, () => {
				expect(isTrusted.indexOf(false)).to.be.equal(-1);
				done();
			});
		});

		it("during the normal restoration", done => {
			isTrusted.splice(0);

			// When
			tutils.simulator(inst.$wrapper, {
				pos: [0, 0],
				deltaX: -30
			}, () => {
				expect(isTrusted.indexOf(false)).to.be.equal(-1);
				done();
			});
		});
	});
});
