const Map = new Map();



let user = {

    name: "Rahul"

};



Map.set(user, "Premium User");
console.log(Map)
user=null
console.log(Map)

//after making user as a null, still  map refernces to the object


const weakMap = new weakMap();



let user = {

    name: "Rahul"

};



weakMap.set(user, "Premium User");
console.log(weakMap)
user=null
console.log(weakMap)
//here weakmap makes weak refernces so Garbage collection doesnt count weak ownership, later it will remove 

//SAME FOR WEAKSET
const weakSet = new WeakSet();

let user = {
    name: "Rahul"
};

weakSet.add(user);

user = null;

