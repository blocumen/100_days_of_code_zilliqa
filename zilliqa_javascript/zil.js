const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

const chainId = 333; // chainId of the developer testnet
const msgVersion = 1; // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion);

console.log("\n Pvt key of my blocumen wallet - added details in Image \n")






const privateKey =
  '81398035f9dc663d4c14cda1ade5290f9af428e7ab8da14422dd0d31b29b8282';

zilliqa.wallet.addByPrivateKey(privateKey);

const address = getAddressFromPrivateKey(privateKey);
console.log("hey This is thangaraj ! \n");
console.log("\n I am using my Blocumen wallet \n")
console.log(`My #zil account address is: ${address} \n`);
console.log(`My #zil account bech32 address is: ${toBech32Address(address)} \n`);