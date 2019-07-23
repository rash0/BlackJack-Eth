import EthCrypto from "eth-crypto";
import sigUtil from "eth-sig-util";
import Eth from 'ethjs';

function sumPoints(state) {
  var points = 0;
  var ace = 0;
  for (let card in state) {
    switch (state[card].num) {
      case "J":
      case "Q":
      case "K":
        points += 10;
        break;
      case "A":
        points += 1;
        ace += 1;
        break;
      default:
        points += state[card].num;
        break;
    }
  }

  // only Add 10 when there is one ace in hand
  if (ace === 1 && points < 12) {
    points += 10;
  }

  return points;
}

// sign the Typed data with users account addresss
function signMessage(web3) {
  return new Promise((resolve, reject) => {
    var from = web3.eth.defaultAccount;
    web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v3",
        params: [from, JSON.stringify(msgParams)],
        from: from
      },
      (err, result) => {
        if (!err) resolve(result.result);
        reject(err);
      }
    );
  });
}

function verifyMessage(signature) {
  const recovered = sigUtil.recoverTypedSignature({
    data: msgParams,
    sig: signature
  });
  return recovered;
}

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        // const web3 = new Web3(window.ethereum);
        try {
          window.ethereum.autoRefreshOnNetworkChange = false;
          const accounts = await window.ethereum.enable();
          resolve(accounts);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
    });
  });

function getAccountBalance(account){
  // const web3 = new Web3(window.ethereum)
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (err, balance) =>{
      if (err) reject(err);
      var balanceInETH = web3.fromWei(balance.toNumber());
      var walletBalance = parseFloat(balanceInETH).toFixed(2);
      resolve(walletBalance)
    })
  })
}
export default getWeb3;
export { sumPoints, signMessage, verifyMessage, getAccountBalance };
