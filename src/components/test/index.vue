<template>
  <div style="border: 1px solid #000; padding: 50px">
    <div>
      <span>data: </span>
      <span>{{ data }}</span>
    </div>
    <div>
      <span>children: </span>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "test",
  props: {
    data: {
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>