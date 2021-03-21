//console.log("simple example for merkle tree");

var sha1 = require('sha1');
let a = "a";
let b = "b";
let c = "c";
let d = "d";
let e = "e";
let f = "f";
let g = "g";
let h = "h";

var ab_hash = sha1(a,b);
var cd_hash = sha1(c,d);
var ef_hash = sha1(e,f);
var gh_hash = sha1(g,h);

console.log(" a -> b ",ab_hash);
console.log(" c -> d ",cd_hash);
console.log(" e -> f ",ef_hash);
console.log(" g -> h ",gh_hash);

var abcd_hash = sha1(ab_hash,cd_hash);
var efgh_hash = sha1(ef_hash,gh_hash);
console.log(" abcd ->",abcd_hash);
console.log(" efgh ->",efgh_hash);

var abcdefgh_hash = sha1(abcd_hash,efgh_hash);

console.log("<---- final hash ---->",abcdefgh_hash);





