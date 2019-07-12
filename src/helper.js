import web3 from "web3";

function sumPoints (state, prevState = 0) {
    var points = 0
    for (let card in state) {
      switch(state[card].num){
        case "J":
        case "Q":
        case "K":
          points += 10
          break;
        case "A":
          prevState < 11 ? points += 11 : points += 1
          break;
        default:
          points += state[card].num;
          break;
      }
    }
    return points
}


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
      return web3
    });
  });
export default getWeb3
export { sumPoints }