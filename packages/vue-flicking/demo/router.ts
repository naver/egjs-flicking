import Align from "./features/Align.vue";
import Bound from "./features/Bound.vue";
import FreeScroll from "./features/FreeScroll.vue";
import Gap from "./features/Gap.vue";
import Progress from "./features/Progress.vue";
import Snap from "./features/Snap.vue";
import VariableSize from "./features/VariableSize.vue";
import Infinite from "./features/Infinite.vue";

import AutoPlay from "./plugins/Autoplay.vue";
import Fade from "./plugins/Fade.vue";
import Parallax from "./plugins/Parallax.vue";

export default {
  routes: [
    {
      path: "/align",
      name: "Align",
      component: Align,
    },
    {
      path: "/bound",
      name: "Bound",
      component: Bound,
    },
    {
      path: "/freeScroll",
      name: "FreeScroll",
      component: FreeScroll,
    },
    {
      path: "/gap",
      name: "Gap",
      component: Gap,
    },
    {
      path: "/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/snap",
      name: "Snap",
      component: Snap,
    },
    {
      path: "/variable",
      name: "VariableSize",
      component: VariableSize,
    },
    {
      path: "/infinite",
      name: "Infinite",
      component: Infinite,
    },
    {
      path: "/autoplay",
      name: "AutoPlay",
      component: AutoPlay,
    },
    {
      path: "/fade",
      name: "Fade",
      component: Fade,
    },
    {
      path: "/parallax",
      name: "Parallax",
      component: Parallax,
    },
  ],
};
