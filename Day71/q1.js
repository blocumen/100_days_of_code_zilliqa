var Zilliqa;
var ContractInits;
var ActiveAccount;
var ActiveNetwork;

function ConnectZilliqa() {
	Zilliqa = window.zilPay;

	if (Zilliqa){
	console.log("ZilPay Wallet Detected");
	if(Zilliqa.wallet.connect()){
	  	console.log("Connected successfully");
	  	console.log("DefaultAddress is " + Zilliqa.wallet.defaultAccount.bech32);
	  	ActiveNetwork = Zilliqa.wallet.net;
	  
	  	//Track Network Change of Wallet
		Zilliqa.wallet.observableNetwork().subscribe(function (net) {
			console.log("Network changed to " + net);
			ActiveNetwork = net;
			if(ActiveNetwork == "mainnet"){
				ChainId = 1;
			}else if(ActiveNetwork == "testnet"){
				ChainId = 333;
			}
			//alert("Network Changed to " + ActiveNetwork);
		});

		//Track Account Change of Wallet
		Zilliqa.wallet.observableAccount().subscribe(function (account) {
			console.log("Account changed to " + account.bech32);
			ActiveAccount = account;
			//alert("Account Changed to " + ActiveAccount.bech32);
			document.getElementById("CurrentUsedAccount").innerHTML = ActiveAccount.bech32 + " (" + ActiveNetwork + ")";
			if(ActiveNetwork == "mainnet"){
				ChainId = 1;
			}else if(ActiveNetwork == "testnet"){
				ChainId = 333;
			}
		});

	}else{
	  console.log("Failed to connect. Try again later.");
	}
	}else{
		console.log("Zilpay Not Detected.");
	}
}

var blocknum = 0;
var block;
var blocktxs;

function GetBlockDetails(i) {
	if(i==0){
		blocknum = document.getElementById("BlockNumberToFetch").value;
		console.log(blocknum)
		Zilliqa.blockchain.getTxBlock(blocknum).then(function(t){
			block=t;
			BNum = block.result.header.BlockNum;
			Zilliqa.blockchain.getTransactionsForTxBlock(BNum).then(function(t){
				blocktxs = t;
				console.log("Block fetched");
				buildTable();
			})
		})
	}else{
		Zilliqa.blockchain.getLatestTxBlock().then(function(t){
			block=t;
			BNum = block.result.header.BlockNum;
			Zilliqa.blockchain.getTransactionsForTxBlock(BNum).then(function(t){
				blocktxs = t;
				console.log("Block fetched");
				buildTable();
			})				
		})			
	}
	document.getElementById("BlockDetailsHeader").innerHTML = "Fetching Block .....";
}

function buildTable() {
	//List header data
	TableData = "<table style='width:80%'>";
	TableData += "<tr><th colspan='2'>Block Header</th></tr>";
	header = block.result.header;
	for(i in header){
		TRow = "<tr><td>" + i + "</td><td>" + header[i] + "</td></tr>";
		TableData += TRow;
	}
	TableData += "</table>";
	document.getElementById("BlockDetailsHeader").innerHTML = TableData;

	//List Microblocks
	TableData = "<table style='width:80%'>";
	TableData += "<tr><th colspan='2'>Micro Blocks List</th></tr>";
	MicroblockList = block.result.body.MicroBlockInfos;
	for(i in MicroblockList){
		TRow = "<tr><td>" + MicroblockList[i].MicroBlockHash + "</td></tr>";
		TableData += TRow;
	}
	TableData += "</table>";
	document.getElementById("BlockDetailsMicro").innerHTML = TableData;

	//List Transactions
	ttltxs = 0;
	TableData = "<table style='width:80%'>";
	TableData += "<tr><th colspan='2'>Block Txs</th></tr>";
	txs = blocktxs.result;
	for(i in txs){
		for(j in txs[i]){
			TRow = "<tr><td>" + txs[i][j] + "</td></tr>";
			TableData += TRow;
			ttltxs++;
		}
	}
	TableData += "<tr><th colspan='2'>Total=" + ttltxs + "</th></tr>";
	TableData += "</table>";
	document.getElementById("BlockDetailsTxs").innerHTML = TableData;

}