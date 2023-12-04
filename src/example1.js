
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


  let arr = [ 1, 2, 15, 7, 95 ];

  console.log("Unsorted array: ", arr);
  arr.sort();
  console.log("Sorted array : ", arr);

  let result = arr.reduce((sum, current) => sum + current, 0);
  console.log("Sum of all array elements: ",  result);


//   https://www.freecodecamp.org/news/how-to-sort-javascript-array-accurately/
let originalArray = [2, 1, 3];
let sortedArray = originalArray.slice().sort((a, b) => a - b);

console.log(originalArray); // Output: [2, 1, 3]
console.log(sortedArray); // Output: [1, 2, 3]


let array = [1, 2, 5];

// начиная с индекса -1 (перед последним элементом)
// удалить 0 элементов,
// затем вставить числа 3 и 4
array.splice(-1, 0, 3, 4);

alert( array ); // 1,2,3,4,5

/**  DEBOUNCING
  - Delay the request (for example, to remote database or searsch service) 
    for a specific amount of time (e.g. 500ms)
  - If another request happens within the specified time,
    cancel the previous request and set up a new delay for the new request

*/