// let timer
// timer = setInterval(() => {
//     console.log("API Call:");
// }, 1000);

// console.log("-----------", timer)
// clearInterval(timer)




function search(query) {
    console.log("API Call:", query);
}

let timer;
let delay=600

function debouncedSearch(query) {
    // If old plan exists, cancel it
    clearTimeout(timer);
    // Create new plan
    timer = setTimeout(() => {
        search(query);
    }, delay);
}


debouncedSearch("R");
debouncedSearch("Ra");
debouncedSearch("Rah");
debouncedSearch("Rahul");


//THROTTEL
function search(query) {
    console.log("API Call:", query);
}

let canRun = true;

function throttledSearch(query) {

    if (canRun === false) {
        return;
    }

    search(query);

    canRun = false;

    setTimeout(() => {
        canRun = true;
    }, 1000);
}

throttledSearch("R");
throttledSearch("Ra");
throttledSearch("Rah");
throttledSearch("Rahu");


// Search Box           -> Debounce
// Auto Save            -> Debounce
// Window Resize End    -> Debounce

// Scroll Tracking      -> Throttle
// Mouse Movement       -> Throttle
// Progress Updates     -> Throttle
// Button Spam Control  -> Throttle


function multiply(a) {
    return function(b) {
        return a * b;
    };
}

const double = multiply(2);

console.log(double(5));
console.log(double(10));
console.log(double(20));


//MEMOIZATIOn-- CLOSURE
function memoizedSquare() {

    const cache = {};

    return function(n) {

        if (cache[n]) {
            return cache[n];
        }

        const result = n * n;

        cache[n] = result;

        return result;
    };
}

const square = memoizedSquare();
console.log("mmmmmmmmmmmmmmmmm",square(6))

//PATTERN- FACTORy
// Factory Pattern
// =
// Object creation pattern
function createUser(name) {
    return {
        name: name,

        greet() {
            console.log(`Hello ${this.name}`);
        }
    };
}

const user1 = createUser("Rahul");
const user2 = createUser("Virat");
const user3 = createUser("Rohit");

user1.greet();
user2.greet();
user3.greet();


//Singleton pattern nothing but creating only one object using everywhere just like db connection
const database = {
    connect() {
        console.log("Connected");
    }
};

//MODULE PATTERN ==>> private 
//just like using clousres in Bank 
function createBankAccount() {

    let balance = 1000;

    return {
        deposit(amount) {
            balance += amount;
        },

        withdraw(amount) {
            balance -= amount;
        },

        getBalance() {
            return balance;
        }
    };
}

//POLYFILLS


Array.prototype.myMap = function(callback) {

    const result = [];

    for(let i = 0; i < this.length; i++) {

        const value = callback(this[i]);

        result.push(value);
    }

    return result;
};

const arr = [1,2,3];

const result = arr.myMap(num => num * 2);

console.log(result);