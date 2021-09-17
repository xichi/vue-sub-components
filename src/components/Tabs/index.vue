<template>
  <div style="padding: 20px 0;">
    <div style="display: flex;border-bottom: 1px solid #000;">
      <div
        v-for="(item, index) in data"
        :key="index"
        :class="active === index ? 'active' : ''"
        style="padding: 10px 20px; border: 1px solid #000"
        @click="() => switchTab(index)"
      >
        tab-{{ item }}
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "Tabs",
  props: {
    data: {
      default: "",
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    switchTab(index) {
      this.active = index;
      this.$emit('switchTab', {
        index,
        level: this.level,
      })
    },
  },
};
</script>
<style scoped>
.active {
  color: royalblue;
  background-color: antiquewhite;
}
</style>