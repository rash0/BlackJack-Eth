<template>
  <div class="modal" :style="modalState ? 'transform: translateX(0rem)': 'transform: translateX(-43rem)'">
    <div class="modal-content">
      <span class="progress-bar" :style="progressBar" />
      <transition name="fade" mode="out-in">
        <div class="config-modal step0" v-if="CurrentStep === 0" key="0">
          <div>
            <img src="../assets/metamask.png" style="margin-bottom: 20px;" width="120" />
            <h3>Waiting For MetaMask!</h3>
            <p>
              Please Check your MetaMask Plugin
              <br />notifications,
              We need to connect to it.
            </p>
            <h5
              style="color:#2a89fed6;cursor:pointer"
              @click="reloadPage"
            >Can't Connect ? Refresh Page</h5>
          </div>
        </div>
        <div class="config-modal step1" v-if="CurrentStep === 1" key="1">
          <div>
            <div class="net">
              <NetworkStatus v-on:network-id="changeSteps($event)" />
            </div>
            <h3>Choose Network!</h3>
            <p>
              Please connect to the
              <span style="font-weight:bold;color:#ecc94b;">Ropsten</span>
              <br />Test Network.
            </p>
            <h5 style="color:#2a89fed6;cursor:pointer">
              <a
                href="https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d"
              >Having an Issue ?</a>
            </h5>
          </div>
        </div>
        <div class="config-modal step2" v-if="CurrentStep === 2" key="2">
          <div>
            <h1 style="font-size: 44px;">
              {{ walletBalance }}
              <span style="font-size: 15px;margin-left: -10px;">ETH</span>
            </h1>
            <!-- Show ONLY if the balance is bigger than 1 ETH -->
            <p v-if="walletBalance > 1">
              This is your current balance,
              <br />Please Input how much Ether you
              <br />want to convert to chips ?
            </p>
            <div class="eth-input" v-if="walletBalance > 1">
              <input min="0" required placeholder=" " v-model="betAmount" />
              <label class="label" for="name">AMOUNT (ETH)</label>
            </div>
            <!-- Show ONLY if the balance is less than 1 ETH -->
            <p v-if="walletBalance <= 1">
              Unforuntatley your current balance
              <br />is less Than or exactly equal to 1 ETH,
              Please go to the
              <br />
              <a
                href="https://faucet.metamask.io/"
                style="font-weight:400;color:#805ad5"
              >Ether Faucet</a> to get Test Ether.
            </p>
          </div>
          <div v-if="walletBalance > 1">
            <button></button>
            <button @click="firstBet">Next</button>
          </div>
        </div>
        <div class="config-modal step0" v-if="CurrentStep === 3" key="3">
          <div>
            <img src="../assets/mining.gif" style="margin-bottom: 20px;" width="150" />
            <p>
              Processing Your Request,
              <br />it can take up to 1 min!
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import NetworkStatus from "./NetworkStatus";
import Modal from "./Modal";
import getWeb3 from "../helper.js";
import { getAccountBalance } from "../helper.js";

export default {
  name: "ConfigSteps",
  data() {
    return {
      modalState: true,
      CurrentStep: 0,
      walletBalance: 0,
      playerAddress: "",
      betAmount: undefined
    };
  },
  components: {
    Modal,
    NetworkStatus
  },
  created() {
    this.initWeb3();
  },
  computed: {
    progressBar() {
      var margin;
      switch (this.CurrentStep) {
        case 0:
          margin = "margin-right: 18.5rem;";
          break;
        case 1:
          margin = "margin-right: 12rem;";
          break;
        case 2:
          margin = "margin-right: 5.6rem;";
          break;
        case 3:
          margin = "margin-right: -.7rem;";
          break;
      }
      return margin;
    }
  },
  methods: {
    initWeb3() {
      getWeb3().then(account => {
        this.playerAddress = account[0];
        getAccountBalance(account[0])
          .then(balance => (this.walletBalance = balance))
          .then(() =>
            Number(ethereum.networkVersion) !== 3
              ? (this.CurrentStep = 1)
              : (this.CurrentStep = 2)
          )
          .catch(err => console.log(err));
      });
    },
    changeSteps(id) {
      if (id === 3) {
        getAccountBalance(this.playerAddress).then(
          balance => (this.walletBalance = balance)
        );
        setTimeout(() => (this.CurrentStep = 2), 500);
      } else {
        this.CurrentStep = 1;
      }
    },
    reloadPage() {
      location.reload();
    },
    firstBet() {
      var GameContract = web3.eth
        .contract([
          {
            constant: false,
            inputs: [
              {
                name: "_gamelId",
                type: "bytes32"
              },
              {
                name: "_houseAddress",
                type: "address"
              }
            ],
            name: "startGame",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                name: "_playerAddress",
                type: "address"
              },
              {
                indexed: false,
                name: "amount",
                type: "uint256"
              }
            ],
            name: "PlayerDeposit",
            type: "event"
          }
        ])
        .at("0x7f1541157d9dfc361fadca90e5a60906e759e104");

      var getData = GameContract.startGame.getData(
        "13",
        "0xe0036b964290996ebB2FCE0eCDeA33Fde61552f8"
      );

      let send = web3.eth.sendTransaction(
        {
          from: this.playerAddress,
          data: getData,
          to: "0x7f1541157d9dfc361fadca90e5a60906e759e104",
          value: web3.toWei(this.betAmount, "ether")
        },
        (err, res) => {
          // if user rejected to sign
          if (err) throw err;
          this.CurrentStep = 3;
          var initEvent = GameContract.PlayerDeposit();
          initEvent.watch((err, result) => {
            if (err) throw err;
            // Handle error here better
            // close the modal if the transaction passed through
            this.modalState = false;
            if (this.$store.state.houseCards.length === 0) {
              setTimeout(() => this.$store.dispatch("startTheGame"), 700);
            }
            console.log(result);
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(251, 251, 251, 1);
  transition: all 0.5s;
}

.modal-content {
  background-color: #fefefe;
  margin: 11% auto;
  padding: 1px 10px 20px 10px;
  /* border: 1px solid #888; */
  width: 26rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.progress-bar {
  transition: all 0.5s;
  background-color: #68d391;
  height: 7px;
  margin-left: -0.6rem;
  margin-bottom: 30px;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.fade-enter {
  opacity: 0;
  transform: translateX(15px);
}
/* --------------------------------------------------------- */
/* Configurations */
.config-modal {
  display: flex;
  flex-direction: column;
}
.step0,
.step1 {
  padding: 0px 10px 20px 10px;
}
/* --------------------------------------------------------- */
/* Configurations Step 1 */
.step1 .net {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
}
/* --------------------------------------------------------- */
/* Configurations Step 2 */
.step2 div:nth-child(2) {
  display: flex;
  justify-content: space-between;
}
.step2 div:nth-child(2) button:nth-child(1) {
  border: none;
  text-decoration-line: underline;
  background: inherit;
}

.step2 div:nth-child(2) button:nth-child(2) {
  background-color: white;
  border: 0.7px solid #cbd5e0;
  min-width: 7rem;
  height: 1.7rem;
  margin: 0.4rem;
  border-radius: 15px;
  cursor: pointer;
  outline: none;
}

.step2 div:nth-child(2) button:nth-child(2):hover {
  background: #e9d8fd;
  border: none;
  color: #2a4365;
  font-weight: 700;
}
/* --------------------------------------------------------- */
/* Configurations Step 3 */
.eth-input {
  width: 100%;
  position: relative;
  margin: 20px 10px 30px;
}
.eth-input label {
  font-weight: bold;
  font-size: 1rem;
  color: grey;
  position: absolute;
  transition: 0.5s ease-in-out;
  left: 104px;
  margin-top: 5px;
  z-index: 0;
}
.eth-input input {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #555;
  font-size: 1rem;
  font-weight: 200;
  width: 13rem;
  height: 1.7rem;
  transition: all 0.5s;
  z-index: 1;
  position: relative;
  border-radius: 0;
  resize: none;
  scroll-behavior: none;
}

.eth-input input:valid ~ label,
.eth-input input:focus ~ label {
  color: #71acd6;
  font-size: 0.65rem;
  transform: translateY(-15px);
  transition: all 0.5s;
}

.eth-input input:valid,
.eth-input input:focus {
  border-color: #71acd6;
}

.eth-input input:invalid:not(:focus):not(:placeholder-shown),
.eth-input input:invalid:not(:focus):not(:placeholder-shown) ~ label {
  border-color: #ff6666;
  color: #ff6666;
}
</style>
