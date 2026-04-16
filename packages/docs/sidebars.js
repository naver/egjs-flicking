module.exports = {
  // Guide sidebar
  guideSidebar: [
    "guide/quickstart",
    "guide/structure-and-styling",
    {
      type: "category",
      label: "Framework Guide",
      collapsed: false,
      items: ["guide/react-guide", "guide/vue3-guide"]
    },
    "guide/controlling-flicking",
    "guide/ssr",
    "guide/reactive-api"
    // Additional guide pages will be added here in future milestones
    // 'guide/css-guide',
  ],

  // Demos sidebar
  demosSidebar: [
    {
      type: "category",
      label: "Basic",
      collapsed: false,
      items: [
        "demos/basic/default",
        "demos/basic/alignment",
        "demos/basic/circular",
        "demos/basic/movement-types",
        "demos/basic/vertical",
        "demos/basic/panels-per-view",
        "demos/basic/bound",
        "demos/basic/duration",
        "demos/basic/easing",
        "demos/basic/deceleration",
        "demos/basic/threshold",
        "demos/basic/input-type",
        "demos/basic/disable-input",
        "demos/basic/default-index",
        "demos/basic/auto-init",
        "demos/basic/adaptive",
        "demos/basic/nested",
        "demos/basic/interruptable",
        "demos/basic/prevent-click"
        // Additional basic demos will be added in future milestones
        // 'demos/basic/bounce',
      ]
    },
    {
      type: "category",
      label: "Advanced",
      collapsed: false,
      items: [
        "demos/advanced/virtual-scroll",
        "demos/advanced/render-only-visible",
        "demos/advanced/fractional-size",
        "demos/advanced/infinite-scroll",
        "demos/advanced/resize-on-contents-ready",
        "demos/advanced/lazy-load",
        "demos/advanced/auto-resize",
        "demos/advanced/resize-debounce",
        // "demos/advanced/optimize-size-update", // Hidden: JS/Vue issues, fix pending
        "demos/advanced/add-remove",
        "demos/advanced/carousel",
        "demos/advanced/fullpage-scroll",
        "demos/advanced/cross-flicking",
        "demos/advanced/animation-threshold",
        "demos/advanced/use-css-order",
        "demos/advanced/observe-panel-resize"
        // Additional advanced demos will be added
      ]
    },
    {
      type: "category",
      label: "Reactive API",
      collapsed: false,
      items: [
        "demos/reactive/progress-bar",
        "demos/reactive/pagination",
        "demos/reactive/prev-next",
        "demos/reactive/parallax",
        "demos/reactive/coverflow"
      ]
    },
    {
      type: "category",
      label: "Plugins",
      collapsed: false,
      items: [
        "demos/plugins/fade",
        "demos/plugins/autoplay",
        "demos/plugins/parallax",
        "demos/plugins/perspective",
        "demos/plugins/arrow",
        "demos/plugins/pagination",
        "demos/plugins/sync"
      ]
    }
  ],
  // API sidebar (generated automatically)
  ...require("./sidebars-api.js")
};
