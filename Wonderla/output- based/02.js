function test() {
  var a = 10;

  if (true) {
    var a = 20;
    console.log(a);
  }

  console.log(a);
}

test(); //20 20

//==============================

let company = "Wonderla";

function display() {
  console.log(company);
}

display();
console.log(company);


//======================
let a = 10;

function outer() {
    let b = 20;

    function inner() {
        let c = 30;

        console.log(a, b, c);
    }

    inner();
}

outer(); // 10 20 30 lexical scope

//========================================


greet();

var greet = function () {
    console.log("Hello");
}; // type error beavuse var -- The var binding is initialized with undefined. The function assignment hasn't happened yet.


//=============================================

foo();

var foo = function () {
    console.log("A");
};

function foo() {
    console.log("B");
}


