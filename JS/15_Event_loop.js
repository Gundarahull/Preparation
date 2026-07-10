function one() {
    console.log("One");
}

function two() {
    one();
    console.log("Two");
}

two();

// Step 1

// Global code starts executing.

// Stack:

// ┌─────────┐
// │ GEC     │
// └─────────┘

// Step 2
// two();

// Stack:

// ┌─────────┐
// │ two()   │
// ├─────────┤
// │ GEC     │
// └─────────┘


// Step 3

// Inside two():

// one();

// Stack:

// ┌─────────┐
// │ one()   │
// ├─────────┤
// │ two()   │
// ├─────────┤
// │ GEC     │
// └─────────┘

// Step 4

// one() completes.

// Pop it.

// ┌─────────┐
// │ two()   │
// ├─────────┤
// │ GEC     │
// └─────────┘
// Step 5

// two() completes.

// ┌─────────┐
// │ GEC     │
// └─────────┘
// Step 6

// Global code finishes.

// Stack empty.


function a() {
    console.log("A");
}

function b() {
    a();
    console.log("B");
}

function c() {
    b();
    console.log("C");
}

c(); // gec, c on gec , it wil l call b >> b() >> then a (). prinnts A out, B prints, C



// 👑 Microtasks
// Promise.then
// Promise.catch
// Promise.finally
// await continuation
// queueMicrotask
//fetch also nothing but a promise only right

// 🚶 Macrotasks
// setTimeout
// setInterval
// setImmediate
// DOM events
// fs.readFile callback
// I/O callbacks
//Metork calls 


// Golden Rule
// Call Stack Empty
//         ↓
// Run ALL Microtasks 👑
//         ↓
// Run ONE Macrotask 🚶
//         ↓
// Repeat Forever


// Database and Redis operations are asynchronous I/O tasks handled outside the JavaScript engine. 
// Once their associated promises resolve, the .then() callbacks or await continuations execute as microtasks


// One macrotask
// ↓
// Drain all microtasks
// ↓
// One macrotask
// ↓
// Drain all microtasks
// ↓
// Repeat forever