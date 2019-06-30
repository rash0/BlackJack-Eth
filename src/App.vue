<template>
  <div id="app">
    <HouseHand :cardList="houseCards" />
    <HouseHand :cardList="userCards" />
    <!-- <UserHand :msg="cardList"/> -->
    <button @click="oneCard">Click me</button>
    <h4>{{calculatePoints(this.houseTotal)}}</h4>
  </div>
</template>

<script>
import HouseHand from "./components/HouseHand.vue";
import UserHand from "./components/UserHand.vue";

export default {
  name: "app",
  components: {
    HouseHand,
    UserHand
  },
  data() {
    return {
      houseCards: [],
      houseTotal: 0,
      userCards: [],
      userTotal: 0,
      fullDeck: []
    };
  },
  mounted() {
    this.distrubateCard();
  },
  computed: {
    distrubateCard() {
      this.fullDeck = this.$store.getters.fullCardDeck;
      for (var i = 0; i < 4; i++) {
        if (i % 2 === 0) setTimeout(() => this.houseCards.push(this.fullDeck.pop()), i*1400 )
        if (i % 2 !== 0) setTimeout(() => this.userCards.push(this.fullDeck.pop()), i*1400 )
      }
    }
  },
  methods: {
    oneCard() {
      this.houseCards.push(this.fullDeck.pop());
    },
    calculatePoints(tableSide){
      var points = 0
      for (let card in tableSide){
        if(['J','Q', 'K', 'A'].indexOf(tableSide[card].num) !== -1){
          points += 10
        }else{
          points += tableSide[card].num
        }
      }
      this.tableSide = points
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  /* margin-top: 60px; */
}
</style>
