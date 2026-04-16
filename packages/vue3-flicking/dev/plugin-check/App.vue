<!--
  플러그인 마이그레이션 검증용 (임시)
  docs 데모 추가 후 제거 예정

  참고: https://naver.github.io/egjs-flicking/ko/Plugins
-->
<template>
  <div :style="{ maxWidth: '640px', margin: '0 auto', padding: '20px' }">
    <h1>Plugin Check</h1>
    <p :style="css.note">마이그레이션 검증용 — docs 데모 추가 후 제거 예정</p>

    <!-- Arrow -->
    <section :style="css.section">
      <div :style="css.title">Arrow</div>
      <Flicking :options="{ circular: true }" :plugins="arrowPlugins">
        <div v-for="n in 5" :key="n" :style="css.panel">{{ n }}</div>
        <template #viewport>
          <span class="flicking-arrow-prev"></span>
          <span class="flicking-arrow-next"></span>
        </template>
      </Flicking>
    </section>

    <!-- AutoPlay -->
    <section :style="css.section">
      <div :style="css.title">AutoPlay</div>
      <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="autoPlayPlugins">
        <div v-for="(src, i) in images.slice(0, 3)" :key="i" :style="css.pluginsPanel">
          <img :style="css.panelImage" :src="src" />
        </div>
      </Flicking>
    </section>

    <!-- Pagination -->
    <section :style="css.section">
      <div :style="css.title">Pagination (bullet)</div>
      <Flicking :options="{ circular: true }" :plugins="paginationPlugins">
        <div v-for="n in 8" :key="n" :style="css.panel">{{ n }}</div>
        <template #viewport>
          <div class="flicking-pagination"></div>
        </template>
      </Flicking>
    </section>

    <!-- Fade -->
    <section :style="css.section">
      <div :style="css.title">Fade</div>
      <Flicking :options="{ circular: true, preventDefaultOnDrag: true }" :plugins="fadePlugins">
        <div v-for="(src, i) in images.slice(0, 3)" :key="i" :style="css.pluginsPanel">
          <img :style="css.panelImage" :src="src" />
        </div>
      </Flicking>
    </section>

    <!-- Parallax -->
    <section :style="css.section">
      <div :style="css.title">Parallax</div>
      <Flicking :options="{ circular: true, preventDefaultOnDrag: true, gap: 2 }" :plugins="parallaxPlugins">
        <div v-for="(src, i) in images.slice(0, 3)" :key="i" :style="{ ...css.pluginsPanel, width: '100%' }">
          <img :style="{ ...css.panelImage, width: '150%', maxWidth: 'none' }" :src="src" />
        </div>
      </Flicking>
    </section>

    <!-- Perspective -->
    <section :style="css.section">
      <div :style="css.title">Perspective</div>
      <Flicking :options="{ circular: true }" :plugins="perspectivePlugins">
        <div v-for="n in 5" :key="n" :style="css.panel">{{ n }}</div>
      </Flicking>
    </section>

    <!-- Sync (camera) -->
    <section :style="css.section">
      <div :style="css.title">Sync (camera)</div>
      <Flicking ref="syncCam0" :options="{ align: 'prev', bound: true, bounce: 30 }" :plugins="syncCameraPlugins">
        <span v-for="item in fruits" :key="item" :style="css.syncItem">{{ item }}</span>
      </Flicking>
      <div style="margin-top: 4px;">
        <Flicking ref="syncCam1" :options="{ align: 'prev', bound: true, bounce: 30 }">
          <span v-for="item in foods" :key="item" :style="css.syncItem">{{ item }}</span>
        </Flicking>
      </div>
      <div style="margin-top: 4px;">
        <Flicking ref="syncCam2" :options="{ align: 'prev', bound: true, bounce: 30 }">
          <span v-for="item in drinks" :key="item" :style="css.syncItem">{{ item }}</span>
        </Flicking>
      </div>
    </section>

    <!-- Sync (index + thumbnail) -->
    <section :style="css.section">
      <div :style="css.title">Sync (index + thumbnail)</div>
      <Flicking ref="syncMain" :options="{ bounce: 30, preventDefaultOnDrag: true }" :plugins="syncIndexPlugins">
        <div v-for="(src, i) in images" :key="i" :style="css.pluginsPanel">
          <img :style="css.panelImage" :src="src" />
        </div>
      </Flicking>
      <div style="margin-top: 8px;">
        <Flicking ref="syncThumb" :options="{ moveType: 'freeScroll', bound: true, bounce: 30, preventDefaultOnDrag: true }">
          <div v-for="(src, i) in images" :key="i" :style="css.thumbPanel">
            <img :style="css.thumbImage" :src="src" />
          </div>
        </Flicking>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Arrow, AutoPlay, Fade, Pagination, Parallax, Perspective, Sync } from "@dev/plugins";
import Flicking from "@dev/vue3-flicking";
import { onMounted, ref } from "vue";

const css = {
  section: { marginBottom: "48px" },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    borderBottom: "2px solid #333",
    paddingBottom: "4px"
  },
  note: { fontSize: "12px", color: "#666", marginTop: "8px" },
  panel: {
    minWidth: "200px",
    height: "160px",
    margin: "0 5px",
    background: "#e0e7ff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    overflow: "hidden"
  },
  pluginsPanel: { position: "relative" as const, width: "100%", height: "200px", overflow: "hidden" },
  panelImage: { width: "100%", height: "100%", objectFit: "cover" as const },
  thumbPanel: {
    width: "100px",
    height: "70px",
    margin: "0 2px",
    overflow: "hidden",
    opacity: "0.5",
    transition: "opacity 0.3s"
  },
  thumbImage: { width: "100%", height: "100%", objectFit: "cover" as const },
  syncItem: {
    display: "inline-block",
    padding: "8px 16px",
    margin: "0 4px",
    background: "#f5f5f5",
    borderRadius: "4px",
    whiteSpace: "nowrap"
  }
};

const images = [
  "https://picsum.photos/seed/a/600/300",
  "https://picsum.photos/seed/b/600/300",
  "https://picsum.photos/seed/c/600/300",
  "https://picsum.photos/seed/d/600/300",
  "https://picsum.photos/seed/e/600/300",
  "https://picsum.photos/seed/f/600/300"
];

const fruits = [
  "🍎 Apple",
  "🍉 Watermelon",
  "🥝 Kiwi",
  "🍊 Orange",
  "🍇 Grape",
  "🍓 Strawberry",
  "🍑 Peach",
  "🍋 Lemon",
  "🫐 Blueberry",
  "🍌 Banana"
];
const foods = [
  "🍔 Hamburger",
  "🍕 Pizza",
  "🍞 Bread",
  "🌮 Taco",
  "🍜 Ramen",
  "🍣 Sushi",
  "🥗 Salad",
  "🍝 Pasta",
  "🥘 Stew",
  "🍱 Bento"
];
const drinks = [
  "🥛 Milk",
  "☕ Coffee",
  "🍵 Green tea",
  "🧃 Juice",
  "🥤 Soda",
  "🍺 Beer",
  "🧋 Bubble tea",
  "🍷 Wine",
  "🥥 Coconut",
  "🍶 Sake"
];

// Simple plugins (no ref dependency)
const arrowPlugins = [new Arrow()];
const autoPlayPlugins = [new AutoPlay()];
const paginationPlugins = [new Pagination({ type: "bullet" })];
const fadePlugins = [new Fade()];
const parallaxPlugins = [new Parallax("img")];
const perspectivePlugins = [new Perspective({ rotate: 1, scale: 2, perspective: 600 })];

// Sync plugins (need refs)
const syncCam0 = ref<InstanceType<typeof Flicking> | null>(null);
const syncCam1 = ref<InstanceType<typeof Flicking> | null>(null);
const syncCam2 = ref<InstanceType<typeof Flicking> | null>(null);
const syncCameraPlugins = ref<Sync[]>([]);

const syncMain = ref<InstanceType<typeof Flicking> | null>(null);
const syncThumb = ref<InstanceType<typeof Flicking> | null>(null);
const syncIndexPlugins = ref<Sync[]>([]);

onMounted(() => {
  syncCameraPlugins.value = [
    new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        { flicking: syncCam0.value!, isClickable: false },
        { flicking: syncCam1.value!, isClickable: false },
        { flicking: syncCam2.value!, isClickable: false }
      ]
    })
  ];

  syncIndexPlugins.value = [
    new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        { flicking: syncMain.value!, isSlidable: true },
        { flicking: syncThumb.value!, isClickable: true, activeClass: "active" }
      ]
    })
  ];
});
</script>
