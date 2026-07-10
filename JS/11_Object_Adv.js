//this ia abpout who called it

const user = {
    name: "Rahul",

    greet() {
        console.log(this.name);
    }
};

const fn = user.greet;

fn();


//CALL -- we can decide what this should be

const user = {
    name: "Rahul",

    greet() {
        console.log(this.name);
    }
};

const fn = user.greet;

fn.call(user); // its nothing but user.greet() // call the function

//passing the argumnets
function greet(city,age) {
    console.log(this.name, city,age);
}

const person = {
    name: "Rahul"
};

greet.call(person, "Hyderabad",20);


//APPLY - passinmg arguments in the ARRAY
greet.apply(person, ["Hyderabad", 25]);


// in || when false,0,"",undefined,nul if its exists  it goes to fefault
// in ?? when null,undefined then is goes to deafult
const user = {
    address: {
        city: ""
    }
};

console.log(user.address?.city || "Hyderabad");

console.log(user.address?.city ?? "Hyderabad");


//Setting up default 
const user = {
    name: "Rahul"
};

const { age = 18 } = user;

console.log(age);

//nested destructure
const user = {
    address: {
        city: "Hyderabad"
    }
};

const {
    address: { city }
} = user;

console.log(city);


const user = {
    name: "Rahul",
    age: 25,
    city: "Hyderabad"
};

const { city, ...rest } = user;

console.log(city);
console.log(rest); // its a object


//
const user = {
    name: "Rahul",
    age:68
};

const address = {
    city: "Hyderabad",
    age:56
};

const result = {
    ...user,
    ...address
};

console.log(result);
//age are in both but we will take only latest one so >. in the result age will be age:56