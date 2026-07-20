/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Guards the hybrid CJS export shape of the core bundle (see #952).
 *
 * The core CJS build must be produced from `src/index.cjs.ts`, which reassigns
 * `module.exports` to the Flicking class with the named exports attached. If the
 * build input silently reverts to the ESM entry (`src/index.ts`), `require()`
 * returns a namespace object instead of the class and consumers doing
 * `const F = require("@egjs/flicking"); new F()` break in CommonJS environments.
 *
 * Run against the built bundle (as a post-build step); asserts the contract and
 * exits non-zero on violation so a broken bundle never gets published.
 */
const assert = require("assert");
const path = require("path");

const cjsPath = path.resolve(process.cwd(), "dist/flicking.cjs.js");

const required = require(cjsPath);

assert.strictEqual(
  typeof required,
  "function",
  `require("@egjs/flicking") must return the Flicking class, got "${typeof required}". ` +
    "The CJS build likely dropped src/index.cjs.ts as its entry."
);
assert.ok(required.prototype, "require() result must have a .prototype (it must be the class)");
assert.strictEqual(required.default, required, "the .default export must self-reference the class");
assert.ok(required.EVENTS, "named exports (e.g. EVENTS) must be attached to the class");

console.log("✓ CJS export verified: require(\"@egjs/flicking\") returns the Flicking class");
