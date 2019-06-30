<template>
  <div class="househand">
    <Cards v-for="card in cardList" :card="card" :key="(card.name + card.num).toString()"/>
  </div>
</template>

<script>
import Cards from "./Cards"

export default {
  name: 'HouseHand',
  props: ['cardList'],
  components: {
    Cards
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.househand{
  width: 100%;
  height: 45vh;
  border: 1px solid red;
  display: flex;
  justify-content: center;
}
</style>
