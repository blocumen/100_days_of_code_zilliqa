# python-blockchain

A simple blockchain in Python using the Flask micro web framework for the main implementation along with some HTML, Bootstrap CSS and jQuery for the front end.

![Blockchain Client](https://raw.githubusercontent.com/adbose/python-blockchain/share/pyblockchain_home.png)

The implementation has 2 parts:

- A client to generate wallets and transactions
- A p2p node to broadcast and view transactions, mine blocks, sync the blockchain, etc.

![Blockchain Node](https://raw.githubusercontent.com/adbose/python-blockchain/share/blockchain_transactions_1.png)

The blockchain client can connect to a node to view the transactions from the blockchain synced by that node.
The client also needs to connect to a node to broadcast a transaction to the network.

Each node must sync up for the latest state of the blockchain before mining for new blocks, else their chain and all transactions added by it will be discarded.

To sync up, a node must add other nodes to fetch the latest state of the blockchain.

## Usage

- Clone the repository and navigate to the project root
- Install dependencies and activate virtual environment using pipenv
- Run the blockchain client with `python blockchain-client/client.py`
- Run multiple blockchain nodes in separate console screens with `python blockchain-node/blockchain_node.py -p <PORT_NUMBER>` where PORT _NUMBER is a unique port number where a flask node will run.

**DISCLAIMER:** This application is purely for educational purposes and is not intended for production use.
