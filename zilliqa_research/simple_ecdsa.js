
var EC = require('elliptic').ec;

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1');

// Generate keys
var key = ec.genKeyPair();
console.log("\ngenerated private key",key);

// Sign the message's hash (input must be an array, or a hex-string)
var msgHash = [ 'T','H','A','N','G','A','R','A','J'];
var crossverify = [ 0 , 0 ]
console.log("\nmessage hash",msgHash);
var signature = key.sign(msgHash);
console.log("\nsignature ",signature);

// Export DER encoded signature in Array
var derSign = signature.toDER();

// Verify signature
console.log(key.verify(msgHash, derSign));

// CHECK WITH NO PRIVATE KEY
var pubPoint = key.getPublic();
var x = pubPoint.getX();
var y = pubPoint.getY();
console.log("\npubpoint",pubPoint);
console.log("\n x in pub : ",x);
console.log("\n y in pub : ",y);
// Public Key MUST be either:
// 1) '04' + hex string of x + hex string of y; or
// 2) object with two hex string properties (x and y); or
// 3) object with two buffer properties (x and y)
var pub = pubPoint.encode('hex');                                 // case 1
console.log("\n pub key hex string of x  and hex string of y :",pub);
var pub_case2 = { x: x.toString('hex'), y: y.toString('hex') };         // case 2
console.log("\n x to hex :",x.toString('hex'));
console.log("\n y to hex :",y.toString('hex'));
console.log("\n case 2 :",pub_case2);
// var pub = { x: x.toBuffer(), y: y.toBuffer() };                   // case 3
// var pub = { x: x.toArrayLike(Buffer), y: y.toArrayLike(Buffer) }; // case 3

// Import public key
var key = ec.keyFromPublic(pub, 'hex');
console.log("key consolidated :",key);

// Signature MUST be either:
// 1) DER-encoded signature as hex-string; or
// 2) DER-encoded signature as buffer; or
// 3) object with two hex-string properties (r and s); or
// 4) object with two buffer properties (r and s)

//var signature = '3046022100...'; // case 1
// var signature = new Buffer('...'); // case 2
// var signature = { r: 'b1fc...', s: '9c42...' }; // case 3

// Verify signature
console.log(key.verify(msgHash, signature));

//cross verify
// console.log(key.verify(crossverify, signature));