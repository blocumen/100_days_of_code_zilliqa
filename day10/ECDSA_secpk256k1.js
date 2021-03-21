
String.prototype.getBytes = function () {
    var bytes = [];
    for (var i = 0; i < this.length; ++i) {
      bytes.push(this.charCodeAt(i));
    }
    return bytes;
  };
  
  var m="thanga";
  
  var EC = require('elliptic').ec;
  
  var ec = new EC('secp256k1');
  
  var key = ec.genKeyPair();
  var publicKey = key.getPublic(false);
  
  console.log("Message:",m);
  console.log("\nPrivate key:",key);
  console.log("\nPublic key:",publicKey);
  
  msgHash=Buffer.from(m, 'utf8');
  
  var signature = key.sign(msgHash);
  
  console.log("\nSignature:",signature);
  // Export DER encoded signature in Array
  var derSign = signature.toDER();
  
  // Verify signature
  console.log("Signature verified:",key.verify(msgHash, derSign));