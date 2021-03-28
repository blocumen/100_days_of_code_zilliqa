
pragma solidity ^0.4.18; 
   
contract merchantmap {
      
    struct merchant_struct 
    {

        string merchantname;
        uint8 merchantID;
    }
      
    mapping (
    address => merchant_struct
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
    
         // Function to retrieve 
     // values from a mapping
     function get_merchant_riskscore(
     ) view public returns (address[]) {
        return merchant_riskscore;
    }
}