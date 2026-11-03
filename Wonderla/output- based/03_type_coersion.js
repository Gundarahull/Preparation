// Value	   Numeric conversion
// null	          0
// undefined	  NaN
// true         	1
// false	       0
// ""	           0
// "10"	            10
// "hello"	       NaN
console.log({} + {});

console.log({} + {});
objectObject;

//====

console.log([] + [1, 2]); // ""+"1,2" >>"1,2"


let a = 5;
console.log(a++ + ++a); // a++ post incremant so 5 again ++a pre incremant a already 6 so 7 5+7 = 12


const a = { age: 25 };
const b = { age: 25 };

console.log(a == b);
console.log(a === b); //false false 
//They are two separate objects in memory.


console.log([] == []);
console.log([] === []); //fasle fasle
// creating two sepearet objects , so doffernt memory


console.log([] == ![]);         // true
// all objects in the javaScript are truthy then 
// only ! tthis will change true or false


console.log([null] == 0); ?
// Step-by-Step Breakdown:
// Look for the ! (Exclamation Mark):

// Is there an ! in front of [null]? No.

// Because there is no !, we do not treat it as a truthy/falsy check. We follow the object rule instead (turning it into a string/primitive).

// Convert the Array to a Primitive (.toString()):

// When JavaScript calls .toString() on an array, it joins its elements together into text.

// An array with just null inside ([null]) converts to an empty string ("") because JavaScript treats null and undefined inside arrays as empty spaces.

// Now your expression looks like this: "" == 0

// Convert the String to a Number:

// When comparing a string and a number, JavaScript converts the string ("") into a number.

// Number("") is 0.

// Now your expression lo


//TRUTHY FALSY



&& → first falsy operand, otherwise last operand.



|| → first truthy operand, otherwise last operand.



! → Boolean conversion followed by inversion.



!! → Boolean conversion.



?? → fallback only for null or undefined.



Short-circuiting → skips unnecessary evaluation.



//==================
console.log(0 || "Hello"); //hello
console.log(0 ?? "Hello"); //0


//
console.log(![] + []); //"false"
console.log(!{} + []); //"false"
console.log(!![] + !![]); // 2
