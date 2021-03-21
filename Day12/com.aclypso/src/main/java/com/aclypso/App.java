package com.aclypso;

import java.util.ArrayList;

import com.github.gv2011.gson.GsonBuilder;


public class App 
{
    public static ArrayList<Block> blockchain = new ArrayList<Block>(); 
    public static void main( String[] args )
    {
        blockchain.add(new Block("Hi im the first block", "0"));		
		blockchain.add(new Block("Yo im the second block",blockchain.get(blockchain.size()-1).hash)); 
		blockchain.add(new Block("Hey im the third block",blockchain.get(blockchain.size()-1).hash));
		
		String blockchainJson = new GsonBuilder().setPrettyPrinting().create().toJson(blockchain);
		System.out.println(blockchainJson);
    }
}
