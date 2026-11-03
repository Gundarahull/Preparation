function outer() {
 let x = 10;
 return () => ++x;
}
const a = outer();
const b = a;
console.log(a(), b()); // beacuse having the same memory refernce