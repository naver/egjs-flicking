<template>
<div id="bound" class="container">
  <h1>Bound <img src="https://naver.github.io/egjs-flicking/images/bound-dog.png" width="40px" /></h1>
  <ul class="extra">
    <li>Bound the panels so that they are not out of the flicking area.</li>
    <li>This prevents unwanted free space within the flicking area.</li>
  </ul>
  <h2>bound: false</h2>
  <div class="hanger hanger0"></div>
  <flicking class="flicking flicking0" :options="{ gap: 10 }">
    <div class="panel0"><div class="anchor"></div></div>
    <div class="panel1"><div class="anchor"></div></div>
    <div class="panel2"><div class="anchor"></div></div>
    <div class="panel3"><div class="anchor"></div></div>
    <div class="panel4"><div class="anchor"></div></div>
    <div class="panel0"><div class="anchor"></div></div>
  </flicking>
  <h2>bound: true</h2>
  <div class="hanger hanger0"></div>
  <flicking class="flicking flicking1" :options="{ gap: 10, bound: true }">
    <div class="panel0"><div class="anchor"></div></div>
    <div class="panel1"><div class="anchor"></div></div>
    <div class="panel2"><div class="anchor"></div></div>
    <div class="panel3"><div class="anchor"></div></div>
    <div class="panel4"><div class="anchor"></div></div>
    <div class="panel0"><div class="anchor"></div></div>
  </flicking>
  <div class="pagination pagination2"></div>
  <pre><code class="hljs html" data-script="flicking1">{{ code1 }}</code></pre>
  </div>
</template>
<script>
export default {
  data() {
    code1: `<flicking class="flicking flicking1" gap={10} bound={true}>
  <div class="panel0"><div class="anchor"></div></div>
  <div class="panel1"><div class="anchor"></div></div>
  <div class="panel2"><div class="anchor"></div></div>
  <div class="panel3"><div class="anchor"></div></div>
  <div class="panel4"><div class="anchor"></div></div>
  <div class="panel0"><div class="anchor"></div></div>
</flicking>`
  },
  mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      window.hljs.highlightBlock(block);
    });
  }
}
</script>
<style scoped>
#bound .hanger {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin: 10px auto;
  height: 20px;
  z-index: 2002;
  top: 10px;
}
#bound .hanger {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin: 10px auto;
  height: 20px;
  z-index: 2002;
  top: 10px;
}
#bound .hanger:after {
  position: absolute;
  content: "hanger: 50%";
  font-weight: bold;
  left: 50%;
  transform: translate(-50%);
}
#bound .hanger:before {
  position: absolute;
  content: "";
  font-weight: bold;
  top: 100%;
  left: 50%;
  background: #333;
  width: 2px;
  height: 25px;
}
#bound .anchor {
  position: absolute;
  font-weight: bold;
  bottom: 5px;
  left: 50%;
  background: #333;
  width: 2px;
  height: 25px;
  z-index: 10;
}
#bound .anchor:after {
  position: absolute;
  content: "anchor: 50%";
  font-weight: bold;
  left: -40px;
  white-space: nowrap;
  bottom: 100%;
}
#bound .hanger:after {
  position: absolute;
  content: "hanger: 50%";
  font-weight: bold;
  left: 50%;
  transform: translate(-50%);
}
#bound .hanger:before {
  position: absolute;
  content: "";
  font-weight: bold;
  top: 100%;
  left: 50%;
  background: #333;
  width: 2px;
  height: 25px;
}
#bound .anchor {
  position: absolute;
  font-weight: bold;
  bottom: 5px;
  left: 50%;
  background: #333;
  width: 2px;
  height: 25px;
  z-index: 10;
}
#bound .anchor:after {
  position: absolute;
  content: "anchor: 50%";
  font-weight: bold;
  left: -40px;
  white-space: nowrap;
  bottom: 100%;
}
</style>
