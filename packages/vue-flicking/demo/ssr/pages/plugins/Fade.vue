<template>
<div id="fade" class="plugins container">
  <h1>Fade<a href="https://naver.github.io/egjs-flicking-plugins/release/latest/doc/eg.flicking.plugins.Fade.html"
    target="_blank">API</a></h1>
  <ul class="extra">
    <li>You can give fade in / out effect while moving panels. </li>
  </ul>
  <flicking class="flicking"
    :options="{ circular: true, gap: 10 }"
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
import { Fade } from "@egjs/flicking-plugins";

@Component({})
export default class FadeDemo extends Vue {
  plugins = [new Fade()];
  code0 = `<flicking class="flicking"
  :options="{ circular: true, gap: 10 }"
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

</style>
