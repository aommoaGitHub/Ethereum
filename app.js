var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/eb7158911dd54506b06dedec2891436e')

const account1 = '0xaB9177cbA1eFd866132fb778dB176dFF2e022cD7'
const account2 = '0x56217e8c298A3D7E56692c2d66F4018CE85C73e3'

// console.log(web3.eth.accounts.crete())
// console.log(process.env.PRIVATE_KEY_1)

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getBalance(account1, (err, bal) => {
  console.log('account1 balance:', web3.utils.fromWei(bal, 'ether'))
})

web3.eth.getBalance(account2, (err, bal) => {
  console.log('account2 balance:', web3.utils.fromWei(bal, 'ether'))
})


web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toHex('1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  };

  // console.log(txObject)

  // Sign the transaction
  const tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();
  const raw = '0x' + serializedTransaction.toString('hex');

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash: ', txHash);
  });
});
