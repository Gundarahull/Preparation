function greet(name = "Rahul") {
    console.log(name);
}

greet(undefined);

greet(null);
// =================================================================
function greet(name = "Rahul") {
    console.log(name);
}

greet();

greet(undefined);

greet(null);

greet("");

//================================================

function greet() {

    console.log("Hello");

}

function execute(callback) {

    callback();

}

execute(greet);

//=============================================
function greet() {
    console.log("Hello");
}

const a = greet;
const b = greet;

console.log(a == b);