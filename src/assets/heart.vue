<template>
  <svg id="Heart" :width="width" viewBox="0 0 606 470.88">
    <polygon
      class="cls-1"
      width="550px"
      :stroke-width="strokeWidth"
      :stroke="strokeColor"
      points="439.14 0.71 303.67 136.18 168.55 1.06 0.71 168.91 301.98 470.18 605.29 166.86 439.14 0.71"
    />
  </svg>
</template>

<script>
export default {
  name: "Heart",
  props: ["strokeWidth", "strokeColor", "width"]
};
</script>

<style scoped>
.cls-1 {
  fill: #fff;
  stroke-miterlimit: 20;
}
</style>
