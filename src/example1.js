
var price = 28.99;

var discount = 10;

var total = price - (price * (discount / 100));

//console.log(total) // 26.090999999999998

if (total > 25) {
    freeShipping();
}


var count = 10;
while (count > 0) {
    juggle();
    count = count - 1;
}

function freeShipping() {
    console.log("Congratulations, we'll deliver product for free!")
}

function juggle() {
    console.log("In the juggle() function ! ")
}

var dog = {name: "Rover", weight: 35};

if (dog.weight > 30) {
    alert("WOOF WOOF");
} else {
    alert("woof woof");
}

var circleRadius = 20;
var circleArea = Math.PI * (circleRadius * circleRadius);
console.log("circleArea: ", circleArea)

console.log(3**2);