<template>
  <div id="autoplay" class="plugins container">
    <h1>AutoPlay<a href="https://naver.github.io/egjs-flicking-plugins/release/latest/doc/eg.Flicking.plugins.AutoPlay.html"
      target="_blank">API</a></h1>
    <ul class="extra">
      <li>You can set Flicking to move to the next/previous panel periodically.</li>
    </ul>
    <flicking
      class="flicking"
      :options="{ circular: true, gap: 10, duration: 500 }"
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
import { Fade, AutoPlay } from "@egjs/flicking-plugins";

@Component({})
export default class AutoPlayDemo extends Vue {
  public mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      (window as any).hljs.highlightBlock(block);
    });
  }

  plugins = [new Fade(), new AutoPlay(2000, "NEXT")];
  code0 = `<flicking
  class="flicking"
  :options="{ circular: true, gap: 10, duration: 500 }"
  :plugins="this.plugins"
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

</style>
