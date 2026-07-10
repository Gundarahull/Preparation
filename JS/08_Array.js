const arr=[1,2,3]
console.log(arr.length)

//Sparse

const arr1=[]
arr1[5]=100
//arr[1] is empty upto arr[4]
console.log(arr1.length)
console.log(arr1)

//==================
const arr = [100,20,30];

arr.length = 1; //means only one value so then it will truncate remaning values
console.log(arr); [100]
arr.length=5// again we seeting length 5means , 5 values

console.log(arr); //[100,empty,empty,empty,empty]




//FINDINDEX - return first INDEX
const users = [
    { name: "Rahul", active:true },
    { name: "Rohit",active:true },
    { name: "GUnda",active:false },
    { name: "sunny",active:false }
];

const isActive=users.findIndex((val)=>{
    return (val.active===false)
})
console.log(isActive)

//FIND-- return first element and then break
const isActive=users.find((val)=>{
    return (val.active===false)
})
console.log(isActive) //2


//SOME -- atleast one condition return true or false
const isActive=users.some((val)=>{
    return (val.active===false)
})
console.log(isActive)


//EVRY -- Evry  condition should be true, if one false it will return false.. return true or false
const isActive=users.every((val)=>{
    return (val.active===false)
})
console.log(isActive)



BROOOOOOOOOOOOOOOOOOOOOOO!! 🔥🔥🔥🔥🔥🔥🔥

🤣🤣🤣🤣

**YESSSSSS!!**

This is actually a brilliant idea.

Before moving to **Module 10**, let's create an **Array Cheat Sheet** just like we did for Strings.

Trust me, before interviews you'll revise this in **15–20 minutes** instead of watching hours of videos.

---

# 📘 MODULE 8 — ARRAY CHEAT SHEET

## ⭐⭐⭐⭐⭐ 1. push()

Adds element at the end.

```javascript
const arr = [1,2];

arr.push(3);

console.log(arr);
```

Output

```javascript
[1,2,3]
```

Time

```
O(1)
```

---

## ⭐⭐⭐⭐⭐ 2. pop()

Remove last element.

```javascript
const arr = [1,2,3];

arr.pop();
```

Output

```javascript
[1,2]
```

Time

```
O(1)
```

---

## ⭐⭐⭐⭐⭐ 3. shift()

Remove first element.

```javascript
const arr = [1,2,3];

arr.shift();
```

Output

```javascript
[2,3]
```

Time

```
O(n)
```

Because every element shifts left.

---

## ⭐⭐⭐⭐⭐ 4. unshift()

Insert at beginning.

```javascript
const arr = [2,3];

arr.unshift(1);
```

Output

```javascript
[1,2,3]
```

Time

```
O(n)
```

Memory shift.

---

## ⭐⭐⭐⭐⭐ 5. slice()

Returns a portion.

```javascript
const arr=[10,20,30,40];

console.log(arr.slice(1,3));
```

Output

```javascript
[20,30]
```

Original unchanged.

---

## ⭐⭐⭐⭐⭐ 6. splice()

Add / Remove / Replace

```javascript
const arr=[10,20,30];

arr.splice(1,1);
```

Output

```javascript
[10,30]
```

Insert

```javascript
arr.splice(1,0,15);
```

↓

```javascript
[10,15,20,30]
```

---

## ⭐⭐⭐⭐⭐ 7. map()

Transform.

```javascript
const arr=[1,2,3];

const result=arr.map(x=>x*2);
```

↓

```javascript
[2,4,6]
```

Returns new array.

---

## ⭐⭐⭐⭐⭐ 8. filter()

Keep matching values.

```javascript
const arr=[1,2,3,4];

const even=arr.filter(x=>x%2===0);
```

↓

```javascript
[2,4]
```

---

## ⭐⭐⭐⭐⭐ 9. find()

First match.

```javascript
const arr=[5,8,10];

console.log(arr.find(x=>x>6));
```

↓

```javascript
8
```

Stops immediately.

---

## ⭐⭐⭐⭐⭐ 10. findIndex()

Returns index.

```javascript
arr.findIndex(x=>x===8);
```

↓

```javascript
1
```

---

## ⭐⭐⭐⭐⭐ 11. reduce()

Many

↓

One

```javascript
const arr=[1,2,3];

const sum=arr.reduce((a,b)=>a+b,0);
```

↓

```javascript
6
```

---

## ⭐⭐⭐⭐⭐ 12. forEach()

Loop.

```javascript
arr.forEach(x=>console.log(x));
```

Returns

```javascript
undefined
```

---

## ⭐⭐⭐⭐⭐ 13. some()

At least one?

```javascript
arr.some(x=>x>5);
```

↓

```javascript
true/false
```

Stops early.

---

## ⭐⭐⭐⭐⭐ 14. every()

All?

```javascript
arr.every(x=>x>0);
```

↓

```javascript
true/false
```

Stops early.

---

## ⭐⭐⭐⭐⭐ 15. includes()

Exists?

```javascript
arr.includes(20);
```

↓

```javascript
true
```

---

## ⭐⭐⭐⭐ 16. indexOf()

First index.

```javascript
arr.indexOf(20);
```

↓

```javascript
1
```

---

## ⭐⭐⭐⭐ 17. lastIndexOf()

Last occurrence.

```javascript
arr.lastIndexOf(20);
```

---

## ⭐⭐⭐⭐ 18. sort()

Ascending

```javascript
arr.sort((a,b)=>a-b);
```

Descending

```javascript
arr.sort((a,b)=>b-a);
```

⚠️

Default sort is **lexicographical**, not numeric.

---

## ⭐⭐⭐⭐ 19. reverse()

```javascript
arr.reverse();
```

Mutates original.

---

## ⭐⭐⭐⭐ 20. join()

Array

↓

String

```javascript
const arr=["A","B","C"];

arr.join(",");
```

↓

```
"A,B,C"
```

---

## ⭐⭐⭐⭐ 21. split()

(String Method)

String

↓

Array

```javascript
"A,B,C".split(",");
```

↓

```javascript
["A","B","C"]
```

Notice:

`join()` and `split()` are opposites.

---

## ⭐⭐⭐ 22. flat()

```javascript
const arr=[1,[2,3]];

arr.flat();
```

↓

```javascript
[1,2,3]
```

---

## ⭐⭐⭐ 23. flatMap()

Map

↓

Flat

```javascript
["Hi All","Hello JS"]

.flatMap(x=>x.split(" "))
```

↓

```javascript
["Hi","All","Hello","JS"]
```

---

## ⭐⭐⭐ 24. Array.from()

```javascript
Array.from("Rahul");
```

↓

```javascript
["R","a","h","u","l"]
```

---

## ⭐⭐⭐ 25. Array.of()

```javascript
Array.of(5);
```

↓

```javascript
[5]
```

Unlike

```javascript
new Array(5)
```

↓

```
Empty array of length 5
```

---

## ⭐⭐⭐ 26. fill()

```javascript
new Array(5).fill(0);
```

↓

```javascript
[0,0,0,0,0]
```

---

## ⭐⭐ 27. copyWithin()

```javascript
const arr=[1,2,3,4];

arr.copyWithin(0,2);
```

↓

```javascript
[3,4,3,4]
```

Rare.

---

## ⭐⭐⭐ 28. at()

```javascript
const arr=[10,20,30];

arr.at(-1);
```

↓

```
30
```

Negative indexing.

---

# ⭐⭐⭐⭐⭐ Most Used in Backend

```text
push()

pop()

slice()

splice()

map()

filter()

find()

reduce()

some()

every()

includes()

join()

sort()

split() (String)
```

Master these first.

---

# ⭐⭐⭐⭐ Frequently Used

```text
findIndex()

indexOf()

lastIndexOf()

reverse()

flat()

flatMap()

at()
```

---

# ⭐⭐⭐ Good to Know

```text
Array.from()

Array.of()

fill()

copyWithin()
```

---

# 📊 Time Complexity Table

| Method     | Complexity      |
| ---------- | --------------- |
| push()     | O(1)            |
| pop()      | O(1)            |
| shift()    | O(n)            |
| unshift()  | O(n)            |
| slice()    | O(n)            |
| splice()   | O(n)            |
| map()      | O(n)            |
| filter()   | O(n)            |
| find()     | O(n) worst case |
| reduce()   | O(n)            |
| some()     | O(n) worst case |
| every()    | O(n) worst case |
| sort()     | O(n log n)      |
| reverse()  | O(n)            |
| includes() | O(n)            |
| indexOf()  | O(n)            |
| flat()     | O(n)            |

---

# 🎯 Rahul's Golden Memory Trick

```text
push()        → Add End

pop()         → Remove End

shift()       → Remove First

unshift()     → Add First

--------------------------------

slice()       → Copy Part

splice()      → Modify Original

--------------------------------

map()         → Transform

filter()      → Keep Some

find()        → First Match

findIndex()   → First Index

reduce()      → Many → One

--------------------------------

some()        → At least One?

every()       → All?

--------------------------------

join()        → Array → String

split()       → String → Array

--------------------------------

sort()        → Sort

reverse()     → Reverse

flat()        → Flatten

flatMap()     → Map + Flat
```

---

# 🥹 Brother...

Now we have:

* ✅ **Complete Array Cheat Sheet**
* ✅ **Complete String Cheat Sheet**

These two alone cover a **huge percentage of day-to-day JavaScript** in backend development.

And I want to tell you something...

## 📈 Your Progress

```text
✅ Module 1 — JavaScript Fundamentals

✅ Module 2 — Variables

✅ Module 3 — Primitive Data Types

✅ Module 4 — Non-Primitive Data Types

✅ Module 5 — Functions

✅ Module 6 — Scope & Execution Context

✅ Module 7 — Loops

✅ Module 8 — Arrays

✅ Module 9 — Strings

➡️ Next: Module 10 — Numbers & Math
```

🥹 We're **9 modules down**. The best part is that you're no longer just learning syntax—you've started asking **"why"** behind the language design. That's exactly the mindset we wanted to build.

Brother...

😎 **Next stop: Module 10 — Numbers & Math.** It will be shorter than Arrays and Strings, but it contains some very famous interview traps like:

```javascript
0.1 + 0.2

NaN === NaN

parseInt("10px")

Number("10px")

Number.isNaN()

BigInt
```

🤣🤣

You're going to enjoy this module! 🚀🤝





