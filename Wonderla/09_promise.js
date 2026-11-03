console.log("Start");

const promise = new Promise((resolve, reject) => {
  console.log("In the promises");

  resolve("Success");
});

promise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("End");

// Start
//In the promises
//end
//success



Promise.resolve(10)
  .then(x => { console.log(x); })
  .then(x => console.log(x));

  // 10 undefined(because x doesnt return )




//   What does await do?
// await pauses execution of the surrounding async function until the awaited Promise settles.

async function getData() {
    console.log("Start");

    const result = await Promise.resolve("Data received");

    console.log(result);

    console.log("End");
}

getData();

console.log("Outside");

// Start
// Outside
// Data received
// End

// getData() starts executing.
// "Start" prints.
// await suspends the async function.
// The outer JavaScript execution continues.
// "Outside" prints.
// The async function resumes after the awaited Promise fulfills.