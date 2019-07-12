<template>
  <div class="Table-side" :style="tableState">
    <transition-group  name="card-group" tag="div">
      <Cards v-for="(card, index) in cardList" :card="card" :isFliped="isCardFliped(index)" :key="index"/>
    </transition-group>
    <div class="total-points">{{ totalPoints }}</div>
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
    tableState(){
      return this.$store.getters.tableState(this.name)
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
  opacity: 0;
  transform:scale(0);
  
}
.card-group-enter-to {
  opacity: 1;
  transform: scale(1);
}

.card-group-move {
  opacity: 1;
  transition: all 0.5s;
}

.Table-side {
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in;
}

.total-points {
  align-self:flex-start;
  margin-top: 4.8rem;
  margin-left: -6rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-color: #51D399;
  /* color: #a0aec0; */
  color: white;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
