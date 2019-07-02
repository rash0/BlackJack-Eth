<template>
  <div id="app">
    <Table :cardList="houseCards" :totalPoints="houseTotal"/>
    <Table :cardList="userCards" :totalPoints="userTotal"/>
    <button @click="dealOneCard">Click me</button>
  </div>
</template>

<script>
import Table from "./components/Table.vue";

export default {
  name: "app",
  components: {
    Table
  },
  data() {
    return {
      houseCards: [],
      houseTotal: 0,
      userCards: [],
      userTotal: 0,
      fullDeck: [],
    };
  },
  created() {
    this.distrubateCard();
  },
  methods: {
    distrubateCard() {
      this.fullDeck = this.$store.getters.fullCardDeck;
      for (var i = 0; i < 4; i++) {
        if (i % 2 === 0) setTimeout(() => this.houseCards.push(this.fullDeck.pop()), i*700 )
        if (i % 2 !== 0) setTimeout(() => this.userCards.push(this.fullDeck.pop()), i*700 )
      }
    },
    dealOneCard() {
      this.houseCards.push(this.fullDeck.pop());
    },
    getPoints(tableSide, state) {
      var points = 0
      for (let card in state){
        if(['J','Q', 'K', 'A'].indexOf(state[card].num) !== -1){
          points += 10
        }else{
          points += state[card].num
        }
      }
      // Add the card point to the designated state
      tableSide === 'houseTotal'? 
        this.houseTotal = points
      :
        this.userTotal = points
    },
  },
  watch: {
    houseCards(state){
      this.getPoints('houseTotal', state)
    },
    userCards(state){
      this.getPoints('userTotal', state)
    },

  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:100&display=swap');

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  padding: 30px;
  /* margin-top: 60px; */
}
</style>
