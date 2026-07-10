// CALL BACK
//FILES OPERATION loves call back 

// loginUser((user) => {
//     if (!user) {
//         return "something"
//     }

//     getProfile(user.id, (profile) => {
//         if (!profile) {
//             return something
//         }
//         return data

//         getOrders(profile.id, (orders) => {
//             if (!profile.isActive) {
//                 return "jkj"
//             }

//             return orders
//             processPayment(orders, (payment) => {
//                 return payment

//                 sendEmail(payment, () => {
//                     if (!payment) {
//                         return "mo"
//                     }

//                     console.log("Completed");

//                 });

//             });

//         });

//     });

// });


const pro1 = new Promise((res, rej) => {
    setTimeout(() => {
        res("1000")
    }, 1000)

}).then((data) => {
    console.log("data----", data);


}).catch((er) => {

}).finally(() => {
    console.log("Finally");


})

const pro2 = () => {
    const p = new Promise((res, rej) => {
        setTimeout(() => {
            res({ id: 99, active: true })
        }, 1000)

    })
    return p
}
pro2().then((data) => {
    console.log("data----", data);
    if (data.id == 1) {
        return { name: "profile" }
    } else {
        return { name: "pushhh" }

    }

}).then((data) => {
    console.log("chain data---", data);

}).catch((err) => {
    console.log("jshfksfk".err);

})


Promise.resolve("Rahul")
    .then((name) => {
        throw new Error("Oops");
    })
    .catch((err) => {
        console.log("---------------Caught", err);
    });

Promise.reject("Rahul")
    .then((name) => {
        throw new Error("Oops");
    })
    .catch((err) => {
        console.log("Caught", err);
    });

//ASYNC- AWAIT
async function test() {
    return 10;
}
console.log(test()) //Promise { <fulfilled>: 100 }


// RULE 1 : async function always returns a Promise.
// RULE 2 : await is mostly syntax sugar over .then().

async function test() {
    return 100;
}

test().then(console.log);