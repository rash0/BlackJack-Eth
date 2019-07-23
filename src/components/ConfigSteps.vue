<template>
  <div class="modal" :style="modalState ? 'display: block': 'display: none; left:0; top: 0;'">
    <div class="modal-content">
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
          <!-- <div>
          <button disabled></button>
          <button>Next</button>
          </div>-->
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
              <input type="text" class="form-control" required />
              <label class="label" for="name">Amount (ETH)</label>
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
            <button>Next</button>
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
      playerAddress: ""
    };
  },
  components: {
    Modal,
    NetworkStatus
  },
  created() {
    this.initWeb3();
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
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(251, 251, 251, 1);
}

.modal-content {
  background-color: #fefefe;
  margin: 11% auto;
  padding: 30px 10px 20px 10px;
  /* border: 1px solid #888; */
  width: 26rem;
  display: flex;
  flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  /* border-top: 0.7px solid #cbd5e0; */
  /* margin-top: 1.2rem; */
  /* padding: 30px 10px 0px 10px; */
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
  font-weight: 100;
  font-size: 1.3rem;
  color: grey;
  position: absolute;
  transition: 0.5s ease-in-out;
  left: 105px;
  margin-top: -2px;
  z-index: 0;
}
.eth-input input {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #555;
  font-size: 1.4rem;
  font-weight: 200;
  width: 13rem;
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
  font-size: 1rem;
  transform: translateY(-15px);
  transition: all 0.5s;
}

.eth-input input:valid,
.eth-input input:focus {
  border-color: #71acd6;
}
</style>
