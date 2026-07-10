let a = 10;

function test() {

    console.log(a);

}

test();

//=======================
let x = 10;

function one() {

    let y = 20;

    function two() {

        let z = 30;

        console.log(x);

        console.log(y);

        console.log(z);

    }

    return two;

}

const fn = one();

fn();
//=================================

let a = 10;

function one() {

    function two() {

        console.log(a);

    }

    let a = 20;

    two();

}

one();
//================
function test() {
    let x = 10;
}

test();

console.log(x); // x is not defined refernce error, 

///==================================
🚀 Chapter 5 — Complete Flow

Let's trace everything.

function one() {
    console.log("One");

    two();

    console.log("Back to One");
}

function two() {
    console.log("Two");
}

one();

Think like V8.

Initial

GEC

Call one()

one
GEC

Output

One

Call two()

two
one
GEC

Output

Two

two() finishes.

Pop.

one
GEC

Continue.

Output

Back to One

one() finishes.

Pop.

GEC

Done.

Final Output
One
Two
Back to One

Brother...

This is one of the most asked interview questions.

//=========================

app.get("/users", handler);

const handler = (req, res) => {
    res.send("Hello");
};
//refence error