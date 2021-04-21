package noobchain;
import java.util.ArrayList;

import com.google.gson.GsonBuilder;


public class NoobChain {
		
	public static ArrayList<Block> blockchain = new ArrayList<Block>();
	public static int difficulty = 1;
	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		Block genesisBlock = new Block("Hi im the first block","0");
//		System.out.println("Hash for block 1 : " + genesisBlock.hash);
//		Block secondBlock = new Block("Yo im the second block",genesisBlock.hash);
//		System.out.println("Hash for block 2 : " + secondBlock.hash);
//		
//		Block thirdBlock = new Block("Hey im the third block",secondBlock.hash);
//		System.out.println("Hash for block 3 : " + thirdBlock.hash);
		blockchain.add(new Block("Hi im the first block","0"));
		System.out.println("Trying to Mine block 1... ");
		blockchain.get(0).mineBlock(difficulty);
		blockchain.add(new Block("Yo im the second block",blockchain.get(blockchain.size()-1).hash));
		System.out.println("Trying to Mine block 2... ");
		blockchain.get(1).mineBlock(difficulty);
		blockchain.add(new Block("Hey im the third block",blockchain.get(blockchain.size()-1).hash));
		
		System.out.println("Trying to Mine block 3... ");
		blockchain.get(2).mineBlock(difficulty);	
		
		System.out.println("\nBlockchain is Valid: " + isChainValid());
		
		String blockchainJson = new GsonBuilder().setPrettyPrinting().create().toJson(blockchain);
		System.out.println("\nThe block chain: ");
		System.out.println(blockchainJson);

	}
	public static Boolean isChainValid() {
		Block currentBlock;
		Block previousBlock;
		
		for (int i=1;i< blockchain.size();i++) {
			currentBlock = blockchain.get(i);
			previousBlock = blockchain.get(i - 1);
			
			if(!currentBlock.hash.equals(currentBlock.calculateHash())){
				System.out.println("Current Hashes not equal");
				return false;
				
			}
			if(!previousBlock.hash.equals(currentBlock.previousHash)) {
				System.out.println("Previous Hashes not equal");
				return false;
			}
		}
		return true;
	}

}
