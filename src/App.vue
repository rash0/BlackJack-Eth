<template>
  <div id="app">
    <Table :cardList="houseCards" :name="'houseSide'" :totalPoints="houseTotal"/>
    <Table :cardList="userCards" :name="'userSide'" :totalPoints="userTotal"/>
    <Controls :isDisabled="isControlsDisabled" :hitButton="hitButton" :doubleButton="doubleButton" :splitButton="splitButton" :standButton="standButton"/>
  </div>
</template>

<script>
import Table from "./components/Table";
import Controls from './components/Controls'

export default {
  name: "app",
  components: {
    Table, Controls
  },
  data() {
    return {
      houseCards: [],
      houseTotal: 0,
      userCards: [],
      userTotal: 0,
      fullDeck: [],
      isControlsDisabled: false
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
    // Controlls Buttons
    hitButton(){
      this.userCards.push(this.fullDeck.pop());
    },
    doubleButton(){},
    splitButton(){},
    standButton(){
      this.isControlsDisabled = true
    }
  },
  watch: {
    houseCards(state){
      this.getPoints('houseTotal', state)
    },
    userCards(state){
      this.getPoints('userTotal', state)
    },
    houseTotal(state){
      if(state >= 21) this.standButton()
    },
    userTotal(state){
      if(state >= 21) this.standButton()
    }

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
  /* margin-top: 60px; */
}
</style>
