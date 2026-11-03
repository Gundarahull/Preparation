let score = 0;

function add() {
  score += 10;

  return score;
}

function calculate() {
  let result = add() + add();

  return result;
}

console.log(calculate());

console.log(score);

//===============================================================

let obj = { value: 10 };

function change(data) {
  data.value = 20;

  data = { value: 30 };

  data.value = 40;
}

change(obj);

console.log(obj.value);

//==========================================================

function count(n) {
  if (n === 0) return;

  console.log(n);

  count(n - 1);

  console.log(n);
}

count(3); // 3 2 1  123

//=========================================================

function first() {
  console.log("A");

  second();

  console.log("B");
}

function second() {
  console.log("C");

  third();
}

function third() {
  console.log("D");
}

first();

//================================================

let x = 10;

function outer() {
  let x = 20;

  function inner() {
    let x = 30;

    console.log(x);
  }

  inner();

  console.log(x);
}

outer();

console.log(x);

//=========================

let x = 10;
function test() {
  let x = 20;
  console.log(x);
}
test();
console.log(x);

//===========

let a = 10;
let b = a;

a = 20;

console.log(a);
console.log(b);
