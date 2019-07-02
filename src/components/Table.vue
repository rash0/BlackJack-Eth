<template>
  <div class="Table-side" :style="tableState(totalPoints)">
    <Cards v-for="(card, index) in cardList" :card="card" :isFliped="false" :key="index"/>
    <span>{{ totalPoints }}</span>
  </div>
</template>

<script>
import Cards from "./Cards"

export default {
  name: 'Table',
  props: ['cardList', 'totalPoints', 'name'],
  components: {
    Cards
  },
  methods:{
    tableState(points){

      if(points === 21) return 'background-color: RGBA(0, 255, 0, 0.2)'
      if(points > 21) return 'background-color: RGBA(255, 0, 0, 0.2)'
    },
    isCardFliped(index, n){
      if(index === 1 && this.name === 'houseSide') return true;
      return false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Table-side{
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
}
/* .Table-side div {
  display: flex;
} */
.Table-side span:last-child {
  position: absolute;
  left: 10rem;
  width: 50px;
  color: #a0aec0;
  font-weight:bolder;
  font-style: oblique;
  font-size: x-large;
  align-self: center
}
</style>
