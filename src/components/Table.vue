<template>
  <div class="Table-side">
    <transition-group  class="hand" name="card-group" tag="div">
      <Cards v-for="(card, index) in cardList" :card="card" :isFliped="isCardFliped(index)" :key="index"/>
    </transition-group>
    <!-- TODO -->
    <!-- Try to animate it, better than harsh movements -->
    <div class="total-points" :style="roundResult"><span>{{ totalPoints }}</span></div>
  </div>
</template>

<script>
import Cards from "./Cards"

export default {
  name: 'Table',
  props: ['cardList', 'name'],
  components: {
    Cards
  },
  computed: {
    totalPoints(){
      return (this.name === 'houseSide') ? this.$store.state.housePoints : this.$store.state.userPoints
    },
    roundResult(){
      return this.$store.state.gameState !== 'playing' ? 
        this.$store.getters.roundResult(this.name)
      :
        undefined;
    }
  },
  methods:{
    isCardFliped(index){
      var houseTurn = this.$store.state.houseTurn
      if(index === 1 && this.name === 'houseSide' && !houseTurn) return true;
      return false;
    }
  }
}
</script>
<style scoped>
.card-group {
  transition: all 0.5s;
}
.card-group-enter, .card-group-leave-to {
  transform: translateX(60px);
}
.card-group-leave-to{
  opacity: 0;
}

.hand{
  margin-left: 80px;
}
/* .card-group-enter-to {
  transition: all .8s ease-in;
  opacity: 1;
  transform: scale(1);
}

.card-group-move {
  opacity: 1;
  transition: all 0.5s;
} */

.Table-side {
  width: 100%;
  height: 40vh;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in;
}
.Table-side .hand {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 12rem;
}

.total-points {
  width: 1.8rem;
  height: 2rem;
  border-radius: 50%;
/* 
    box-sizing: initial;
    box-sizing: content-box; 
    text-align: center; */

  border: .7px solid #3182ce;
  color: #3182ce;
  font-weight: 300;
  padding: 0rem .1rem 0rem .1rem;
  line-height: 2rem;
  transition: all .3s ease-in;
}
</style>
