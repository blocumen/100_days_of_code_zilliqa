
pragma solidity ^0.4.18; 
   
// Defining contract 
contract merchantmap {
      
    //Defining structure
    struct merchant 
    {

        string merchantname;
        uint8 merchantID;
    }
      
    mapping (
    address => merchant
    ) riskscore;
    address[] public merchant_riskscore;   
    
    
        function adding_values() public {
        var merchant 
          = riskscore[778];
  
        merchant.merchantname = "PayTM";
        merchant.merchantID = 224;
        merchant_riskscore.push(
          991) -1;
  
    }
}