<template>
  <div id="infinite" class="container" v-highlight>
    <h1>Infinite flicking</h1>
    <h2>Append  &amp; Prepend panel dynamically</h2>
    <ul class="extra">
      <li>You can dynamically add panels to the flicking.</li>
      <li>The panel's indexes are zero-based integer.</li>
      <li>Note: The number displayed above each panel is not panel's index.</li>
    </ul>
    <flicking class="flicking flicking0" :options="{ gap: 10 }">
      <div v-for="num in list0" class="infinite" :class="`infinite${Math.abs(num) % 5}`" :key="num">
        {{ num }}
      </div>
    </flicking>
    <div class="buttons">
      <button id="prepend" @click="() => {
        const start = list0[0] || 0;
        list0.splice(0, 0, ...[start - 2, start - 1]);
      }">Prepend</button>
      <button id="append" @click="() => {
        const end = list0[list0.length - 1] || 0;
        list0.push(end + 1, end + 2);
      }">Append</button>
    </div>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
    <h2>infinite: true &amp; needPanel event</h2>
    <ul class="extra">
      <li>Enabling the infinite option can make <strong>needPanel</strong> event to be triggered when more panels at moving direction should be fetched within <strong>infiniteThreshold</strong> value.</li>
    </ul>
    <flicking
      class="flicking flicking1" :options="{ gap: 10, infinite: true, infiniteThreshold: 50 }"
      @need-panel="() => {
        const end = list1[list1.length - 1] || 0;
        list1.push(end + 1, end + 2);
      }">
      <div v-for="num in list1" class="infinite" :class="`infinite${Math.abs(num) % 5}`" :key="num">
        {{ num }}
      </div>
    </flicking>
    <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>
    <h2>infinite: true &amp; placeholder</h2>
    <ul class="extra">
      <li>You can make continuous carousel UI with asynchronous data by adding placeholder panel first, then update panel with fetched data later.</li>
    </ul>
    <flicking
      class="flicking flicking2" :options="{ gap: 10, infinite: true, moveType: 'freeScroll' }"
      @need-panel="() => {
        const end = list2[list2.length - 1] || 0;
        list2.push(end + 1, end + 2);
      }">
      <place-holder v-for="num in list2" :num="num" :key="num">
        {{ num }}
      </place-holder>
    </flicking>
    <pre><code class="hljs html" data-script="flicking2">{{ code2 }}</code></pre>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import PlaceHolder from "./component/PlaceHolderItem.vue";

@Component({
  components: {
    PlaceHolder,
  },
})
export default class Infinite extends Vue {
  list0 = [0, 1, 2, 3, 4];
  list1 = [0, 1, 2, 3, 4];
  list2 = [0, 1, 2, 3, 4];

  code0 = `<flicking class="flicking flicking0" :options="{ gap: 10 }">
  <div v-for="num in list0" class="infinite" :class="\`infinite\${Math.abs(num) % 5}\`" :key="num">
    {{ num }}
  </div>
</flicking>
<div class="buttons">
  <button id="prepend" @click="() => {
    const start = list0[0] || 0;
    list0.splice(0, 0, ...[start - 2, start - 1]);
  }">Prepend</button>
  <button id="append" @click="() => {
    const end = list0[list0.length - 1] || 0;
    list0.push(end + 1, end + 2);
  }">Append</button>
</div>`;
  code1 = `<flicking
  class="flicking flicking1" :options="{ gap: 10, infinite: true, infiniteThreshold: 50 }"
  @need-panel="() => {
    const end = list1[list1.length - 1] || 0;
    list1.push(end + 1, end + 2);
  }">
  <div v-for="num in list1" class="infinite" :class="\`infinite\${Math.abs(num) % 5}\`" :key="num">
    {{ num }}
  </div>
</flicking>`;
  code2 = `<flicking
  class="flicking flicking2" :options="{ gap: 10, infinite: true, moveType: 'freeScroll' }"
  @need-panel="() => {
    const end = list2[list2.length - 1] || 0;
    list2.push(end + 1, end + 2);
  }">
  <div v-for="num in list2" class="infinite" :class="\`infinite\${Math.abs(num) % 5}\`" :key="num">
    {{ num }}
  </div>
</flicking>`;
}
</script>
<style scoped>
  #infinite  .buttons {
    padding: 10px 0px;
    text-align: center;
  }
  #infinite .buttons button {
    padding: 10px 15px;
    background: #eee;
    border: 0;
    margin: 0px 2px;
  }
  #infinite .buttons button:hover {
    background: #ccc;
  }
  #infinite .panel, #infinite .infinite {
    font-weight: bold;
  }
  #infinite .flicking2 .infinite {
    transition: all ease 1s;
  }
  #infinite .flicking .infinite.placeholder {
    background: #ddd;
    color: transparent;
  }
</style>
