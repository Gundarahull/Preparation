function test() {

    for (var i = 0; i < 3; i++) {

    }


}

test();
console.log(i);
//==================================

// ===============VAR IS GLOBAL SCOPE======================

for (var i = 1; i <= 3; i++) {

    console.log(i);

}

console.log("",i);

//LABLES-outer:

outer:
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 3; j++) {

        if (i === 2 && j === 2)

            break outer;

        console.log(i, j);

    }

}

// for of objects
const obj = {

    name: "Rahul"

};

for (const x of obj) {

}
// obj is not iteratable


//--------------------------------
const mapi= new Map()
mapi.set("name","rahul")
mapi.set("age","35")

const setti=new Set()
setti.add(18)
setti.add("rahullll")

for (let key of mapi){
    console.log(key) //[name,rahul]
}
//destructor
for (let [key,name] of mapi){
    console.log(key) //[name,age]
    console.log(name) //[rahul,35]
}
