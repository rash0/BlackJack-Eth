import Vue from 'vue'
import App from './App.vue'
import store from './store';
import getWeb3 from './helper';

// TODO //
// When the page loads, Check for MetaMask if installed or not
// if not installed and active, then provide a popup Modal with instrucations on
// how to Download it and use and plug it to the Dapp.
// ----------This Code check if web3 is injected and MetaMask is active------
//
//
// if (typeof web3 !== 'undefined') {
//   console.log('web3 is enabled')
//   if (web3.currentProvider.isMetaMask === true) {
//     console.log('MetaMask is active')
//   } else {
//     console.log('MetaMask is not available')
//   }
// } else {
//   console.log('web3 is not found')
// }
//
//
// --------------------------------------------------------------------------
Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  store,
  render: h => h(App),
  // created:
  // async () => {
  //   try{
  //     const web3 = await getWeb3();
  //     // console.log(web3)
  //     this.$store.commit('createWeb3Instance', web3)
  //     // await web3.eth.net.getNetworkType().then(console.log)
  //   }catch(err){
  //     console.log(err)
  //   }
  // },
}).$mount('#app')
