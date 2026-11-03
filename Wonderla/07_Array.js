// What is the output?

// const arr = [1, 2, 3];
// const result = arr.forEach(x => x * 2);
// console.log(result);

// A. [2, 4, 6]

// B. [1, 2, 3]

// C. undefined

// D. 6

// Incorrect — forEach() always returns undefined, regardless of the callback's return value.

// const arr = [10,5,50];

// let largest = arr[0];
// let second = arr[0];

// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] > largest) {
//     second = largest;
//     largest = arr[i];
//   }
// }

// console.log(largest, second);

// const employees = [
//   { name: "Rahul", department: "IT" },
//   { name: "John", department: "HR" },
//   { name: "David", department: "IT" },
//   { name: "Sam", department: "HR" },
// ];

// const department = new Set();

// for (let i = 0; i < employees.length; i++) {
//   department.add(employees[i].department);
// }

// const suum = {};

// for (const key of department) {
//   const each = [];
//   for (let i = 0; i < employees.length; i++) {
//     if (employees[i].department == key) {
//       each.push(employees[i]);
//     }
//   }
//   suum[key] = each;
// }

// console.log(suum)

const nums = [2, 7, 11, 15];
const target = 9;

const targ = new Map();

for (let i = 0; i < nums.length; i++) {
  let b = target - nums[i];
  if (targ.has(b)) {
    console.log(b, nums[i]);
    break;
  } else {
    targ.set(nums[i]);
  }
}


