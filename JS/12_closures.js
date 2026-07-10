function outer() {

    let count = 0;

    return function () {

        count++;

        console.log(count);

    };

}

const counter = outer(); //remembering lexical env even 

counter();

counter();

counter();

//DATA HIDING ==>> Real BACKEND
function createBankAccount() {

    let balance = 0;

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

const account = createBankAccount();

account.deposit(500);

account.withdraw(200);

console.log(account.getBalance());



function createRateLimiter(limit) {

    // Your code here
    let count = 0
    return function () {

        if (count < limit) {
            count++
            console.log("Allowed")
        } else {
            console.log("Not")

        }
    }

}

const api = createRateLimiter(3);

api();

api();

api();

api();