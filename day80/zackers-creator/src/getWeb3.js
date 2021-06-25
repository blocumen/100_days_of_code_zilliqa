
//getWeb3 = ConnectZilliqa
var currentUser


const web3 = () => {

  var Zilliqa = window.zilPay;

  if (Zilliqa) {
    console.log("zilpay wallet detected");

    if (Zilliqa.wallet.connect()) {
      console.log("connected successfully");
      console.log("DefaultAddress is " + Zilliqa.wallet.defaultAccount.bech32);
      var ActiveNetwork = Zilliqa.wallet.net;

      // //Track Network Change of Wallet
      // Zilliqa.wallet.observableNetwork().subscribe(function (net) {
      //   console.log("Network changed to " + net);
      ActiveNetwork = net;
      //   if (ActiveNetwork == "mainnet") {
      //     ChainId = 1;
      //   } else if (ActiveNetwork == "testnet") {
      //     ChainId = 333;
      //   }
      //   //alert("Network Changed to " + ActiveNetwork);
      // });

      // //Track Account Change of Wallet
      // Zilliqa.wallet.observableAccount().subscribe(function (account) {
      //   console.log("Account changed to " + account.bech32);
      //   ActiveAccount = account;
      //   //alert("Account Changed to " + ActiveAccount.bech32);

      currentUser = ActiveAccount.bech32 + " (" + ActiveNetwork + ")";

      //   if (ActiveNetwork == "mainnet") {
      //     ChainId = 1;
      //   } else if (ActiveNetwork == "testnet") {
      //     ChainId = 333;
      //   }
      // });
      return currentUser;
    }
    else {
      console.log("Failed to connect. try again later");
    }
  } else {
    console.log("zil pay not detected");
  }
}
export default web3;
