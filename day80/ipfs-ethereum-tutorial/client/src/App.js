import React, { Component } from "react";
import truffleContract from "truffle-contract";
import "./App.css";
import IPFSInboxContract from "./contracts/IPFSInbox.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
  web3: null,
  accounts: null,
  contract: null,
  ipfsHash: null
};
}
state = { storageValue: 0, web3: null, accounts: null, contract: null };

componentDidMount = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    //get contract instance
    const Contract = truffleContract(IPFSInboxContract);
    Contract.setProvider(web3.currentProvider);
    const instance = await Contract.deployed();

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    this.setState({ web3, accounts, contract: instance });
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
};

//turn the file submitted into a buffer
captureFile = (event) => {
  event.stopPropagation()
  event.preventDefault()
  const file = event.target.files[0]
  let reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => this.convertToBuffer(reader)
};

//helper functon for turning a file into a buffer
convertToBuffer = async (reader) => {
  const buffer = await Buffer.from(reader.result);
  this.setState({ buffer });
};

//this is function for sending the buffer to the ipfs node and shows
// the ipfs hash onto the ui
onIPFSSubmit = async (event) => {
  event.preventDefault();
  await ipfs.add(this.state.buffer, (err, ipfsHash) => {
    console.log(err, ipfsHash);
    this.setState({ ipfsHash: ipfsHash[0].hash });
  })
};


render() {
  if (!this.state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h2>1.Add a file to the iPFS here </h2>
      <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
        <input type="file"
          onChange={this.captureFile}
        />
        <button type="submit">
          send it
          </button>
      </form>
      <p>the ipfs hash is : {this.state.ipfsHash}</p>
    </div>
  );
}
}

export default App
