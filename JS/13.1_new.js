//MAIN FUNCTION
function User(name) {
    this.name = name

}

User.prototype.greet = function () {
    console.log(this.name);

}
//====================
// const obj = {};

// obj.__proto__ = User.prototype;

// User.call(obj, ...arguments);

// return obj;
//======================

const newww = new User("Rahul")
newww.greet()


class user1 {
    constructor(name, branch) {
        this.name = name
        this.branch = branch
    }
    //nothing but 
    //function User(name){
    //    this.name=name
    // }

    greet() {
        console.log("--", this.name)
        console.log("--", this.branch)
    }
    //Innner hood
    // user1.prototype.greet=function (params) {
    //             console.log(this.name)

    // }
}

const u3 = new user1("cool", "mech")
u3.greet()
//Instance.__proto__ === ClassName.prototype

class user2 extends user1 {
    constructor(name,branch,room) {
        super(name,branch) // call parent constructor, beacuse its constructor its internally this.name. this.branch
        this.room = room
    }

    withRomm(){
        console.log("0980909",{
            name:this.name,
            br:this.branch,
            ro:this.room
        });
        
    }

}

const u4 = new user2("f50", "jhdskhfk","room")
u4.greet()
u4.withRomm()
