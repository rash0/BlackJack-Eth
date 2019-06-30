<template>
  <div class="userhand">
    <Cards v-for="i in msg" :msg="i" :key="i"/>
  </div>
</template>

<script>
import Cards from "./Cards"

export default {
  name: 'HouseHand',
  props: ['msg'],
  components: {
    Cards
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userhand {
  width: 100%;
  height: 45vh;
  border: 1px solid red;
  display: flex;
}
</style>
