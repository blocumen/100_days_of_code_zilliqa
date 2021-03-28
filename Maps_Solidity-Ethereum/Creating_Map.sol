pragma solidity ^0.4.18; 
   
// Defining contract 
contract merchantmap {
      
    //Defining structure
    struct merchant 
    {
        // Declaring different 
        // structure elements
        string merchantname;
        uint8 merchantID;
    }
      
    // Creating a mapping
    mapping (
    address => merchant
    ) riskscore;
    address[] public merchant_riskscore;    
}