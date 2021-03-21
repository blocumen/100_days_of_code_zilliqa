const SHA256 = require('crypto-js/sha256');


class Block {
    constructor (index,timestamp,data,previous_hash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previous_hash = previous_hash;
        //HASH OF CURRENT BLOCK
        this.hash = this.calculateHash();
        //for mining
        this.nonce = 0;

    }

    //to calculate hash
    calculateHash() {

        //returning this hash of current block and data
        //not adding nonce heree will keep the loop run forever
        //mistakes to avoid while writing s.c
        //return SHA256(this.index + this.timestamp + this.previous_hash + JSON.stringify(this.data)).toString();

        return SHA256(this.index + this.timestamp + this.previous_hash + JSON.stringify(this.data) + this.nonce).toString();

    }


    mineBlock(difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            //console.log("nonce check ->",this.nonce);
            this.hash = this.calculateHash();
        }
        //after loop exits
        console.log("block is mined !!!!! ",this.hash);
    }
}

class BlockChain {
    //first create Genesis Block
    constructor() 
    {
        this.chain = [ this.CreateGenesisBlock];
        this.difficulty = 4;
    }
    CreateGenesisBlock() {
        return new Block(0,'12-03-2021','My Genesis BlockData','0')

    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previous_hash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    isChainValid() {
        for(var i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            //two check points
            // to check if the data present in the block is altered / changed
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            // to check the blocks are synched together and remains un changed 
            if(currentBlock.previous_hash !== previousBlock.hash){
                return false;
            }

            return true;
        }
    }
}

let thangasblockchain = new BlockChain();
console.log("Mining Block 1.. wait..");
thangasblockchain.addBlock(new Block(1,'12-03-2021',{ amount : 4, sender: "thanga",recepient : "vidhya" }));
console.log("Mining Block 2.. wait..");
thangasblockchain.addBlock(new Block(2,'12-03-2021',{ amount : 4, sender: "vidhya",recepient : "thanga" }));
console.log("Mining Block 3.. wait..");
thangasblockchain.addBlock(new Block(3,'12-03-2021',{ amount : 4, sender: "thanga",recepient : "siva" }));
console.log("Mining Block 4.. wait..");
thangasblockchain.addBlock(new Block(4,'13-03-2021',{ amount : 4, sender: "siva",recepient : "anandh" }));

// to print blockchain data
//console.log(JSON.stringify(thangasblockchain, null , 4));

// note this is only for validation 

console.log('Is Blockchain Valid ?',thangasblockchain.isChainValid());