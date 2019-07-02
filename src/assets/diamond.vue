<template>
  <svg
    id="Diamond"
    :width="width"
    data-name="Diamond"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 606 470.88"
  >
      <!-- viewBox="0 0 606 606" -->
    <rect
      class="cls-1"
      x="78"
      y="82.67"
      width="330"
      height="330"
      :stroke-width="strokeWidth"
      :stroke="strokeColor"
      transform="translate(300 -115) rotate(45)"
    />
  </svg>
</template>
<script>
export default {
  name: "Diamond",
  props: ["strokeWidth", "strokeColor", "width"]
};
</script>
<style scoped>
.cls-1 {
  fill: #fff;
  stroke-miterlimit: 20;
}
</style>
