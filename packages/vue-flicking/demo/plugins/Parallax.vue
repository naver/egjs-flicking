<template>
  <div id="parallax" class="plugins container">
    <h1>Parallax <a
      href="https://naver.github.io/egjs-flicking-plugins/release/latest/doc/eg.flicking.plugins.Parallax.html"
      target="_blank">API</a></h1>
    <ul class="extra">
      <li>Parallax effect will be applied to each panel while moving.</li>
    </ul>
    <flicking class="flicking"
      :options="{ gap: 10, circular: true }"
      :plugins="plugins"
    >
      <div class="panel">
        <img src="https://naver.github.io/egjs-flicking/images/bg01.jpg" />
      </div>
      <div class="panel">
        <img src="https://naver.github.io/egjs-flicking/images/bg02.jpg" />
      </div>
      <div class="panel">
        <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />
      </div>
    </flicking>
    <div class="pagination"></div>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Parallax } from "@egjs/flicking-plugins";

@Component({})
export default class AutoPlayDemo extends Vue {
  public mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      (window as any).hljs.highlightBlock(block);
    });
  }

  plugins = [new Parallax("img", 4)];
  code0 = `<!--
  import { Parallax } from "@egjs/flicking-plugins";
  const plugins = [new Parallax("img", 4)];
-->
<flicking class="flicking"
  :options="{ gap: 10, circular: true }"
  :plugins="plugins"
>
  <div class="panel">
    <img src="https://naver.github.io/egjs-flicking/images/bg01.jpg" />
  </div>
  <div class="panel">
    <img src="https://naver.github.io/egjs-flicking/images/bg02.jpg" />
  </div>
  <div class="panel">
    <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />
  </div>
</flicking>`;
}
</script>
<style scoped>
#parallax .flicking .panel {
  width: 500px;
}
</style>
