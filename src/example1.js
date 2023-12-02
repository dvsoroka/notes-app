
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

// Optional chaining (?.)

const adventurer = {
	
    name: 'Alice',
    cat: {
      name: 'Dinah',
    },
    someExistentMethod() {
        console.log("my name is", this.name)
      }
  };
  
  const petName = adventurer.cat?.name;
  console.log(petName);
  // Expected output:  Dinah

  const dogName = adventurer.dog?.name;
  console.log(dogName);
  // Expected output: undefined
  
  console.log(adventurer.someNonExistentMethod?.());
  // Expected output: undefined

  console.log(adventurer.someExistentMethod?.());
  // Expected output: my name is Alice
  