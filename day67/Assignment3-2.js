//2.1

var x = 3;
var y = "3";
console.log(x - y)

//2.2

var x = 220;
var y = "Hello";
var z = undefined;
console.log(x || y)
console.log(x || z)
console.log(x && y)
console.log(y && z)
if (x && y) {
    console.log("code runss!");
}

if (x || y) {
    console.log("Code runs!");
}

//2.3

var obj = #8711;
var obj2 = obj;

var obj2 = #8711

obj1.name = "Akki";

console.log(obj2);


//2.4

var obj = {
    name: "vivek",
    getName: function () {
        console.log(this.name);
    }
}
var getName = obj.getName;
var obj2 = { name: "akshay kumar", getName };
obj2.getName();


//2.5

hoistedVariable = 3;
console.log(hoistedVariable);
var hoistedVariable;