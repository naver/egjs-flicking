<template>
  <div id="variable-size" class="container">
    <h1>Multiple Panel &amp; Variable Size</h1>
    <ul class="extra">
      <li>You can place multiple panels in the flicking area.</li>
      <li>You can specify various sizes for each panel.</li>
    </ul>
    <flicking class="flicking flicking0" :options="{ circular: true, gap: 10 }">
      <div class="panel0"></div>
      <div class="panel1"></div>
      <div class="panel2"></div>
      <div class="panel3"></div>
      <div class="panel4"></div>
    </flicking>
    <pre><code class="hljs html" data-script="flicking0">{{ code0 }}</code></pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code0: `<flicking class="flicking flicking0" :options="{ circular: true, gap: 10 }">
  <div class="panel0"></div>
  <div class="panel1"></div>
  <div class="panel2"></div>
  <div class="panel3"></div>
  <div class="panel4"></div>
</flicking>`,
    }
  },
  mounted() {
    document.querySelectorAll('.hljs').forEach((block) => {
      window.hljs.highlightBlock(block);
    });
  }
}
</script>
<style scoped>
#variable-size .flicking .panel0 {
  width: 100px;
}
#variable-size .flicking .panel1 {
  width: 200px;
}
#variable-size .flicking .panel2 {
  width: 80px;
}
#variable-size .flicking .panel3 {
  width: 250px;
}
#variable-size .flicking .panel4 {
  width: 150px;
}
</style>
