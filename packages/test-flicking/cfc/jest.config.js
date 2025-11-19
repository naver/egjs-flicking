const path = require("path");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  projects: [
    path.resolve(__dirname, "./framework/vanilla/jest.config.js"),
    path.resolve(__dirname, "./framework/react/jest.config.js"),
    path.resolve(__dirname, "./framework/angular/jest.config.js"),
    path.resolve(__dirname, "./framework/vue/jest.config.js"),
    path.resolve(__dirname, "./framework/vue3/jest.config.js"),
    path.resolve(__dirname, "./framework/preact/jest.config.js"),
    path.resolve(__dirname, "./framework/svelte/jest.config.js"),
  ],
};
