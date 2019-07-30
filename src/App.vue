<template>
  <div id="app">
    <HeadBar />
    <Table :cardList="houseCards" :name="'houseSide'" />
    <Table :cardList="userCards" :name="'userSide'" />
    <Controls v-if="this.gameState === 'playing'" />
    <!-- <div class="escrow">
      <div class="chip">
        <div>
          0.001
          <span>ETH</span>
        </div>
      </div>
    </div> -->
    <!-- TODO -->
    <!-- This button glows green slowely but beauful, it make you awant to press on -->
    <input class="btn" @click="newRound" v-if="this.gameState === 'finished'" v-model="betAmount" />
    <!-- <ConfigSteps /> -->
  </div>
</template>

<script>
import Table from "./components/Table";
import Controls from "./components/Controls";
import HeadBar from "./components/HeadBar";
import { mapGetters, mapState } from "vuex";
import getWeb3 from "./helper.js";
import EthCrypto from "eth-crypto";
import sigUtil from "eth-sig-util";
import Eth from "ethjs";
import ConfigSteps from "./components/ConfigSteps";

import "./global.css";

import { signMessage, verifyMessage, getAccountBalance } from "./helper.js";

export default {
  name: "app",
  components: {
    Table,
    Controls,
    HeadBar,
    ConfigSteps
  },
  data() {
    return {
      provider: null,
      account: null,
      betAmount: undefined
    };
  },
  beforeCreate() {},
  // created: async () => {
  // const web3 = await getWeb3();
  // const signature = await signMessage(web3)
  // const recoveredAddress = await verifyMessage(signature)
  // const netId = await web3.version.network;

  // console.log(recoveredAddress)

  // },
  created() {this.$store.dispatch("startTheGame")},
  computed: {
    ...mapState({
      houseCards: "houseCards",
      userCards: "userCards",
      gameState: "gameState",
      isControlsDisabled: "isControlsDisabled"
    })
  },
  methods: {
    newRound() {
      this.$store.dispatch("newRound");
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
}
.escrow {
  width: 100%;
}

.chip {
  font-size: 16px;
  line-height: 20px;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.7px solid slateblue;
}

.chip span {
  font-size: 12px !important;
}
.chip div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.7px solid violet;
}

.btn {
  border: 0.7px solid #cbd5e0;
  font-size: 19px;
  width: 10rem;
  margin-top: 0.4rem;
  border-radius: 35px;
  padding: 0.4rem;
  cursor: pointer;
  align-self: center;
  text-align: center;
  color: rgba(42, 117, 245, 0.5);
  border-color: rgba(42, 117, 245, 0.5);
  background-color: #fff;
  animation: blink normal 2s infinite ease-in-out;
}

.btn:hover {
  animation: none;
  box-shadow: none;
  background-color: #fff;
  color: rgba(42, 117, 245, 0.5);
}

@keyframes blink {
  0% {
    box-shadow: 0px 0px 14px 0px rgba(42, 117, 245, 0.5);
  }

  50% {
    box-shadow: none;
  }

  100% {
    box-shadow: 0px 0px 14px 0px rgba(42, 117, 245, 0.5);
  }
}
</style>
