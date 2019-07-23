// 1.
const eutil = require('ethereumjs-util')

const hashedMsg = web3.sha3('foobar') // the details about the game and amount
const signedData = web3.eth.sign(web3.eth.accounts[0], hashedMsg)
const rsv = eutil.fromRpcSig(signedData)

// In the contract
// should return the signer address
myContract.recover(hashedMsg,
    eutil.bufferToHex(rsv.r),
    eutil.bufferToHex(rsv.s),
    rsv.v)

/** ------------------------------------------------------------- */

// Another way of genereting hashed stats

function generateHash(nonce, call, bet, balance, sequence) {
	const hash = '0x' + ethereumjs.ABI.soliditySHA3(
		['uint256', 'uint256', 'uint256', 'uint256', 'uint256'],
		[String(nonce), String(call), String(bet), String(balance), String(sequence)]
	).toString('hex')

	return hash
}

// And Sigining Them

function signMessage(hash) {
	return new Promise((resolve, reject) => {
		web3.personal.sign(hash, web3.eth.defaultAccount, (err, result) => {
			if(err) return reject(err)
			resolve(result)
		})
	})
}

// Verifiy the signed State

function verifyMessage(signedMessage, nonce, call, bet, balance, sequence, playerAddress) {
    const hash = generateHash(nonce, call, bet, balance, sequence)
    // utils.solidityKeccak256
	const message = ethereumjs.soliditySHA3(
		['string', 'bytes32'],
		['\x19Ethereum Signed Message:\n32', hash]
    )  
    // utils.splitSignature(flat)
    const splitSignature = ethereumjsUtil.fromRpcSig(signedMessage)
    // utils.recoverPublicKey ( digest , signature ) 
	const publicKey = ethereumjsUtil.ecrecover(message, splitSignature.v, splitSignature.r, splitSignature.s)
	const signer = ethereumjsUtil.pubToAddress(publicKey).toString('hex')
	const isMessageValid = (signer.toLowerCase() == ethereumjsUtil.stripHexPrefix(playerAddress).toLowerCase())
	return isMessageValid
}