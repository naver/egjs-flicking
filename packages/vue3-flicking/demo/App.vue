<template>
  <article>
    <div class="container">
      <h1>Default Rendering</h1>
      <Flicking>
        <div class="panel">0</div>
        <div class="panel">1</div>
        <div class="panel">2</div>
      </Flicking>
      <h1>Bound</h1>
      <Flicking :options="{ bound: true }">
        <div class="panel">0</div>
        <div class="panel">1</div>
        <div class="panel">2</div>
        <div class="panel">3</div>
        <div class="panel">4</div>
        <div class="panel">5</div>
        <div class="panel">6</div>
      </Flicking>
      <h1>FreeScroll</h1>
      <Flicking :options="{ moveType: 'freeScroll' }">
        <div class="panel">0</div>
        <div class="panel">1</div>
        <div class="panel">2</div>
      </Flicking>
      <h1>List Rendering</h1>
      <Flicking>
        <Test v-for="item in list0" :key="item" />
      </Flicking>
      <h1>Adding panels</h1>
      <Flicking :options="{ circular: true, renderOnlyVisible: true }">
        <div class="panel" v-for="panel in panels" :key="panel">{{ panel }}</div>
        <Test />
      </Flicking>
      <div>
        <span class="button" @click="() => {
          prepend();
        }">Prepend</span>
        <span class="button" @click="() => {
          append();
        }">Append</span>
      </div>
      <h1>Method call</h1>
      <Flicking ref="flick" :options="{ circular: true }">
        <div class="panel">0</div>
        <div class="panel">1</div>
        <div class="panel">2</div>
        <div class="panel">3</div>
        <div class="panel">4</div>
        <div class="panel">5</div>
        <div class="panel">6</div>
        <div class="panel">7</div>
        <div class="panel">8</div>
      </Flicking>
      <div>
        <span class="button" @click="() => {
          prev();
        }">Prev</span>
        <span class="button" @click="() => {
          next();
        }">Next</span>
      </div>
      <Flicking :plugins="arrow">
        <div class="panel">0</div>
        <div class="panel">1</div>
        <div class="panel">2</div>
        <div class="panel">3</div>
        <div class="panel">4</div>
        <template #viewport>
          <span class="flicking-arrow-prev"></span>
          <span class="flicking-arrow-next"></span>
        </template>
      </Flicking>
      <Flicking :plugins="fade" :options="{ renderOnlyVisible: true }">
        <div class="panel">0</div>
        <div class="panel">1</div>
        <div class="panel">2</div>
        <div class="panel">3</div>
        <div class="panel">4</div>
      </Flicking>
      <Flicking class="flicking flicking0" ref="vFlick" :options="{
        panelsPerView: 5,
        circular: true,
        virtual: {
          panelClass: 'panel',
          renderPanel: (panel) => `Panel ${panel.index}`,
          initialPanelCount: 100
        }
      }"></Flicking>
      <button @click="this.vPrepend">Prepend</button>
      <button @click="this.vAppend">Append</button>
    </div>
  </article>
</template>

<script>
import Flicking from "../src/Flicking";
import Test from "./components/Test.vue";
import Test2 from "./components/Test2.vue";
import { Arrow, Fade } from "@egjs/flicking-plugins";

export default {
  components: {
    Flicking,
    Test,
    Test2
  },
  data() {
    return {
      panels: [0, 1, 2, 3, 4, 5, 6],
      list0: [0, 1, 2],
      arrow: [new Arrow()],
      fade: [new Fade()]
    }
  },
  methods: {
    prepend() {
      this.panels.splice(0, 0, this.panels[0] - 2, this.panels[0] - 1)
    },
    append() {
      const lastEl = this.panels[this.panels.length - 1];
      this.panels.push(lastEl + 1, lastEl + 2)
    },
    prev() {
      this.$refs.flick.prev();
    },
    next() {
      this.$refs.flick.next();
    },
    vPrepend() {
      this.$refs.vFlick.virtual.prepend(100);
    },
    vAppend() {
      this.$refs.vFlick.virtual.append(100);
    }
  }
}
</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.panel {
  width: 200px;
  height: 200px;
  margin-right: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
