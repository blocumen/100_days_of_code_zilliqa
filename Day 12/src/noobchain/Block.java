package noobchain;

import java.util.Date;

public class Block {
	public String hash;
	public String previousHash;
	private String data;
	private long timestamp;
	private int nonce;
	
	public Block(String data, String previousHash) {
		this.data = data;
		this.previousHash = previousHash;
		this.timestamp = new Date().getTime();
		this.hash = calculateHash();
	}
	public String calculateHash() {
		String calculatedHash = StringUtil.applySha256(previousHash + Long.toString(timestamp)+Integer.toString(nonce)+data);
	return calculatedHash;
	}
	public void mineBlock(int difficulty) {
		String target = new String(new char[difficulty]).replace('\0', '0');
		while (!hash.substring(0, difficulty).equals(target)) {
			nonce ++;
			hash = calculateHash();
			
		}
		System.out.println("Block Mined!!! : "+ hash);
	}
}
