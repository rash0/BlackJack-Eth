<template>
  <div id="app">
    <Table :cardList="houseCards" :name="'houseSide'" />
    <Table :cardList="userCards" :name="'userSide'" />
    <Controls v-if="this.gameState === 'playing'"/>
    <button class="btn" @click="newRound" v-if="this.gameState === 'finished'">New Bet ?</button>
  </div>
</template>

<script>
import Table from "./components/Table";
import Controls from "./components/Controls";
import { mapGetters, mapState } from "vuex";
import getWeb3 from "./helper";
// import abi from './abi.json'
import web3 from "web3";

export default {
  name: "app",
  components: {
    Table,
    Controls
  },
  data() {
    return {
      provider: null,
      account: null
    };
  },
  // created: async function() {
  //   try {
  //     web3 = await getWeb3()
  //     var account = web3.eth.accounts[0]
  //     await console.log(web3.version)
  //     var HelloContract = await web3.eth.contract(abi,account);
  //     var ff = await HelloContract.at("0x120783B1cD2595C7b6Cd2c5c860247A07ce85D23")
  //     await ff.getMessage((err, result) => {
  //       if(!err){
  //         console.log(result)
  //       }
  //     })
  //   } catch (error) {
  //     console.log("Smth went wrong:\n", error);
  //   }
  // },
  beforeMount() {
    this.$store.dispatch("startTheGame");
  },
  computed: {
    ...mapState({
      houseCards: "houseCards",
      userCards: "userCards",
      gameState: "gameState",
      // housePoints: "housePoints",
      // userPoints: "userPoints",
      isControlsDisabled: "isControlsDisabled"
    }),
    // TODO //
    // Adjust timing, so not to start immeditaly after the game results
    setModalState() {
      if (this.gameState === "finished") {
        // this.getBalance();
        return "modal on";
      } else {
        return "modal";
      }
    }
  },
  methods: {
    newRound() {
      this.$store.dispatch("newRound");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:100&display=swap");

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

.btn {
  background-color: white;
  border: 1px solid grey;
  width: 5rem;
  margin: 0.4rem;
  border-radius: 10px;
  padding: 0.4rem;
  cursor: pointer;
  align-self: center;
}

.btn:hover {
  background: blue;
  color: white;
  font-weight: 700;
}
</style>
