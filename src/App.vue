<template>
  <div id="app">
    <HouseHand :cardList="fullCardDeck" />
    <UserHand :msg="cardList"/>
  </div>
</template>

<script>
import HouseHand from './components/HouseHand.vue'
import UserHand from './components/UserHand.vue'


export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    fullCardDeck(){
      return this.$store.getters.fullCardDeck
    }
  },
  components: {
    HouseHand, UserHand
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column
  /* margin-top: 60px; */
}
</style>
