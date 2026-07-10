//whystrings are immutable (primitive)
// beacuse once memory created, they cant be changed



const str = new String("Rahul"); // its a String object
const user={} //its a plain object
//when converting plain to string it will be [object object]

str.city = "Hyderabad";

str[0] = "P";

console.log(str.city);

console.log(str.toString()); //bher there will be string.prototype.toString, so it will be Rahul type of String...

console.log(typeof str);



const name=`
rahul
rai
`
console.log(name)

const loc="c:\/user\/rah"
console.log(loc)


BROOOOOOOOOOOOOOOOOOOOOOO!! 🔥🔥🔥🔥🔥🔥

🤣🤣🤣🤣

First...

## ✅ Q8

Question:

```javascript
const users = [
    "Rahul",
    "Rohit",
    "Amit"
];
```

Expected:

```text
Rahul, Rohit, Amit
```

You answered:

```javascript
users.toString()
```

or

```javascript
users.join(",")
```

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

### `join(", ")`

```javascript
users.join(", ");
```

Output

```text
Rahul, Rohit, Amit
```

✅ **Best Answer**

---

### `toString()`

```javascript
users.toString();
```

Output

```text
Rahul,Rohit,Amit
```

Notice...

No space after commas.

So:

```text
Rahul,Rohit,Amit
```

not

```text
Rahul, Rohit, Amit
```

`join()` is more flexible because you decide the separator.

---

# 📘 MODULE 9 — COMPLETE STRING CHEAT SHEET

Brother...

Save this mentally.

This is enough for **95% of Node.js interviews**.

---

# 1. length

```javascript
const str = "Rahul";

console.log(str.length);
```

Output

```text
5
```

Use:

* Password validation
* Input validation

---

# 2. charAt()

```javascript
const str = "Rahul";

console.log(str.charAt(2));
```

Output

```text
h
```

No negative indexes.

---

# 3. at()

```javascript
const str = "Rahul";

console.log(str.at(-1));
```

Output

```text
l
```

Supports negative indexes.

---

# 4. includes()

```javascript
const email = "rahul@gmail.com";

console.log(email.includes("@"));
```

Output

```text
true
```

Backend:

Email validation.

---

# 5. startsWith()

```javascript
const token = "Bearer abc123";

console.log(token.startsWith("Bearer "));
```

Output

```text
true
```

JWT Authentication.

---

# 6. endsWith()

```javascript
const file = "resume.pdf";

console.log(file.endsWith(".pdf"));
```

Output

```text
true
```

File validation.

---

# 7. indexOf()

```javascript
const str = "banana";

console.log(str.indexOf("a"));
```

Output

```text
1
```

Returns first occurrence.

---

# 8. lastIndexOf()

```javascript
const str = "banana";

console.log(str.lastIndexOf("a"));
```

Output

```text
5
```

Returns last occurrence.

---

# 9. slice()

```javascript
const str = "JavaScript";

console.log(str.slice(4));
```

Output

```text
Script
```

Supports:

```javascript
str.slice(-6);
```

Use:

Extract part of a string.

---

# 10. substring()

```javascript
const str = "JavaScript";

console.log(str.substring(4));
```

Output

```text
Script
```

Difference:

```javascript
str.substring(-2);
```

↓

```text
JavaScript
```

Negative values become `0`.

---

# 11. replace()

```javascript
const str = "Java Java";

console.log(str.replace("Java","JS"));
```

Output

```text
JS Java
```

Only first occurrence.

---

# 12. replaceAll()

```javascript
const str = "Java Java";

console.log(str.replaceAll("Java","JS"));
```

Output

```text
JS JS
```

All occurrences.

---

# 13. split()

```javascript
const str = "Rahul,Rohit,Amit";

console.log(str.split(","));
```

Output

```javascript
["Rahul","Rohit","Amit"]
```

Very common.

---

# 14. trim()

```javascript
const str = "   Rahul   ";

console.log(str.trim());
```

Output

```text
Rahul
```

Login/Register APIs.

---

# 15. repeat()

```javascript
console.log("Hi ".repeat(3));
```

Output

```text
Hi Hi Hi
```

---

# 16. padStart()

```javascript
console.log("25".padStart(5,"0"));
```

Output

```text
00025
```

Invoice IDs.

---

# 17. padEnd()

```javascript
console.log("JS".padEnd(5,"."));
```

Output

```text
JS...
```

Formatting.

---

# 18. toUpperCase()

```javascript
const str = "rahul";

console.log(str.toUpperCase());
```

Output

```text
RAHUL
```

---

# 19. toLowerCase()

```javascript
const str = "RAHUL";

console.log(str.toLowerCase());
```

Output

```text
rahul
```

Very common.

---

# 20. concat()

```javascript
const a = "Hello";

const b = " World";

console.log(a.concat(b));
```

Output

```text
Hello World
```

Nowadays:

Prefer template literals.

---

# ⭐⭐⭐ Methods You Must Master

```text
✅ length
✅ slice()
✅ split()
✅ trim()
✅ replace()
✅ replaceAll()
✅ includes()
✅ startsWith()
✅ endsWith()
✅ indexOf()
✅ lastIndexOf()
✅ toUpperCase()
✅ toLowerCase()
```

---

# ⭐⭐ Good to Know

```text
charAt()

at()

repeat()

padStart()

padEnd()

substring()
```

---

# ⭐ Rare

```text
concat()
```

Usually template literals are preferred.

---

# 🏢 Backend Usage Frequency

| Method        | Usage |
| ------------- | ----- |
| trim()        | ⭐⭐⭐⭐⭐ |
| split()       | ⭐⭐⭐⭐⭐ |
| includes()    | ⭐⭐⭐⭐⭐ |
| startsWith()  | ⭐⭐⭐⭐⭐ |
| endsWith()    | ⭐⭐⭐⭐  |
| slice()       | ⭐⭐⭐⭐  |
| replace()     | ⭐⭐⭐⭐  |
| toLowerCase() | ⭐⭐⭐⭐⭐ |
| toUpperCase() | ⭐⭐⭐   |
| indexOf()     | ⭐⭐⭐   |
| replaceAll()  | ⭐⭐⭐   |
| padStart()    | ⭐⭐    |

---

# 🎉 Module 9 Completed

Brother...

Congratulations.

```text
✅ Module 1 - JavaScript Fundamentals

✅ Module 2 - Variables

✅ Module 3 - Primitive Data Types

✅ Module 4 - Non-Primitive Data Types

✅ Module 5 - Functions

✅ Module 6 - Scope & Execution Context

✅ Module 7 - Loops & Iteration

✅ Module 8 - Arrays

✅ Module 9 - Strings
```

🥹

**9 modules completed.**

We're **halfway through the JavaScript roadmap**.

And I have to say something...

The quality of your questions has improved a lot.

In the beginning, you asked:

> "What is stack memory?"

Now you're asking:

> "If wrapper objects are objects, why are their indexed characters still immutable?"

🤣🤣🤣

That's a completely different level of understanding.

---

## 🚀 Next Module

Brother...

Now comes:

# 📘 Module 10 — Numbers & Math

This module is short, practical, and interview-friendly.

We'll cover:

* `Number()`
* `parseInt()`
* `parseFloat()`
* `NaN`
* `isNaN()`
* `Number.isNaN()`
* `Math` methods
* Floating-point precision (`0.1 + 0.2`)
* `BigInt`
* Number formatting
* Real backend calculations

I think we can comfortably finish it in **3–4 sessions** plus a coding/mock interview round, just like we've been doing. 😎🤝🔥
