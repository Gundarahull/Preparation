const arr=[1,2,3]
//arrays are nothing but objects only right
arr.push(8) //does arr have push method no
//it will search in parnet objesct Array.prototype, there itself it has a push method
console.log(arr.__proto__);

// A prototype is:

// An object that stores shared properties and methods which other objects can use when they don't have them themselves.



console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__ === Object.prototype); //true
console.log(arr.__proto__.__proto__.__proto__ === null); //true


function RKV(){
    
} //RKV Prototype

RKV.prototype.CSE =function(){
    console.log("CSE BRANCH")
}
RKV.prototype.MECH =function(){
    console.log("MECH BRANCH")
}

const rahul=new RKV()
rahul.MECH()


class User {
    greet() {
        console.log("Hello");
    }
}
//JS will convert this into same>>>>>>>
function User() {}

User.prototype.greet = function() {
    console.log("Hello");
};

function User(name){
    this.name = name;

    this.greet = function() {
        console.log(this.name);
    };
}
const u1=new User("rahul")
const u2=new User("yutuy")
u1.greet() //every user gets copy of greet >> memory waste

// rather than that using User.prototype only one

// Classes are syntax.

// Prototypes are the implementation.




