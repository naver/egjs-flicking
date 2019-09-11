<template>
  <div class="infinite" :class="classes"></div>
</template>
<script>
export default {
  data() {
    return {
      loaded: false,
    }
  },
  computed: {
    classes() {
      return `panel${this.$props.num % 5} ${this.loaded ? "" : "placeholder"}`;
    }
  },
  props: {
    num: Number
  },
  mounted() {
        setTimeout(() => {
      this.loaded = true;
    }, 1500);
  }
}
</script>
