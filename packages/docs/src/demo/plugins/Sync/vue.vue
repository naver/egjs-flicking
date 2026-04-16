<template>
  <div>
    <Flicking ref="mainRef" :options="{ bounce: 30, preventDefaultOnDrag: true }" :plugins="plugins">
      <div v-for="(src, i) in IMAGES" :key="i" class="main-panel">
        <img :src="src" />
      </div>
    </Flicking>
    <Flicking ref="thumbRef" class="thumb-flicking"
              :options="{ bound: true, bounce: 30, moveType: 'freeScroll', preventDefaultOnDrag: true }">
      <div v-for="(src, i) in IMAGES" :key="i" class="thumb-panel">
        <img :src="src" />
      </div>
    </Flicking>
  </div>
</template>

<script setup>
import { Sync } from "@egjs/flicking-plugins";
import Flicking from "@egjs/vue3-flicking";
import { onMounted, ref } from "vue";
import "@egjs/vue3-flicking/dist/flicking.css";

const IMAGES = [
  "https://picsum.photos/seed/sync1/600/300",
  "https://picsum.photos/seed/sync2/600/300",
  "https://picsum.photos/seed/sync3/600/300",
  "https://picsum.photos/seed/sync4/600/300",
  "https://picsum.photos/seed/sync5/600/300",
  "https://picsum.photos/seed/sync6/600/300"
];

const mainRef = ref(null);
const thumbRef = ref(null);
const plugins = ref([]);

onMounted(() => {
  plugins.value = [
    new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        { flicking: mainRef.value, isSlidable: true },
        { flicking: thumbRef.value, isClickable: true, activeClass: "active" }
      ]
    })
  ];
});
</script>
