Bro, here's your Part 6 – Objects, Prototypes and Inheritance Master Cheat Sheet. Use this for quick revision before interviews and written tests.

# JavaScript Part 6 – Master Cheat Sheet

## 1. Object fundamentals

An object is a collection of key-value pairs.

```
const user = {
    name: "Rahul",
    age: 25,
    greet() {
        console.log(this.name);
    }
};
```

Common operations

```
user.name;              // Read
user["age"];            // Dynamic access
user.city = "Bengaluru"; // Add
user.age = 26;           // Update
delete user.city;        // Delete
```

Dot vs bracket notation

```
const key = "name";

user.key;   // undefined
user[key];  // Rahul
```

## 2. Object references and copying

| Concept                | Meaning                         |
| ---------------------- | ------------------------------- |
| `b = a`                | Both reference the same object  |
| `{...a}`               | Shallow copy                    |
| `Object.assign({}, a)` | Shallow copy                    |
| `structuredClone(a)`   | Deep clone for supported values |

```
const a = { address: { city: "Bengaluru" } };
const b = { ...a };

b.address.city = "Delhi";

console.log(a.address.city); // Delhi
```

Remember: shallow copying doesn't create independent nested objects.

## 3. Important Object methods

| Method                          | Purpose                                 |
| ------------------------------- | --------------------------------------- |
| `Object.keys(obj)`              | Own enumerable string keys              |
| `Object.values(obj)`            | Own enumerable values                   |
| `Object.entries(obj)`           | Own enumerable key-value pairs          |
| `Object.assign(target, source)` | Copies enumerable own properties        |
| `Object.freeze(obj)`            | Prevents changes to own properties      |
| `Object.seal(obj)`              | Prevents adding/deleting/reconfiguring  |
| `Object.preventExtensions(obj)` | Prevents adding properties              |
| `Object.hasOwn(obj, key)`       | Checks own property                     |
| `Object.create(proto)`          | Creates object with specified prototype |

## 4. Property descriptors

Every ordinary data property has four main attributes:

| Attribute      | Meaning                               |
| -------------- | ------------------------------------- |
| `value`        | Stored value                          |
| `writable`     | Can value be changed?                 |
| `enumerable`   | Appears in normal enumeration?        |
| `configurable` | Can property be deleted/reconfigured? |

Inspect a descriptor:

```
const user = { name: "Rahul" };

console.log(
    Object.getOwnPropertyDescriptor(user, "name")
);
```

Output:

```
{
    value: "Rahul",
    writable: true,
    enumerable: true,
    configurable: true
}
```

Define a property:

```
Object.defineProperty(user, "age", {
    value: 25,
    writable: false,
    enumerable: true,
    configurable: false
});
```

Interview trap: Omitted descriptor attributes in `Object.defineProperty()` default to `false`.

## 5. Getters and setters

Getter executes when reading a property. Setter executes when assigning it.

```
const user = {
    firstName: "Rahul",
    lastName: "Shaik",

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};

user.fullName = "John David";

console.log(user.fullName); // John David
```

Remember: `fullName` is accessed like a property, not a method.

## 6. preventExtensions vs seal vs freeze

| Operation                  | preventExtensions    | seal | freeze |
| -------------------------- | -------------------- | ---- | ------ |
| Add properties             | No                   | No   | No     |
| Update writable properties | Yes                  | Yes  | No     |
| Delete properties          | Yes, if configurable | No   | No     |
| Reconfigure properties     | Yes, if allowed      | No   | No     |

Important:

- All three are shallow.
- In strict mode, prohibited operations generally throw `TypeError`.
- In non-strict mode, many prohibited assignments/deletions are silently ignored.

## 7. Prototype fundamentals

A prototype is an object from which another object can inherit properties and methods.

Every ordinary object has an internal `[[Prototype]]` reference.

```
const numbers = [10, 20, 30];

console.log(
    Object.getPrototypeOf(numbers) === Array.prototype
); // true
```

### Array prototype chain

Array instance

numbers

Array.prototype

map, filter, reduce, push, pop

Object.prototype

toString, valueOf, hasOwnProperty

null

End of chain

## 8. `prototype` vs `[[Prototype]]`

| `prototype`                             | `[[Prototype]]`                           |
| --------------------------------------- | ----------------------------------------- |
| Property on constructible functions     | Internal property of objects              |
| Used when creating instances with `new` | Points to an object's prototype           |
| Access using `Constructor.prototype`    | Access using `Object.getPrototypeOf(obj)` |

Example:

```
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log(this.name);
};

const user = new User("Rahul");

console.log(
    Object.getPrototypeOf(user) === User.prototype
); // true
```

## 9. Prototype-related methods

```
Object.getPrototypeOf(obj);    // Get prototype

Object.setPrototypeOf(obj, parent); // Change prototype

Object.create(parent);         // Create with prototype

parent.isPrototypeOf(obj);     // Check prototype chain

Object.hasOwn(obj, "name");    // Check own property
```

`__proto__` is a legacy accessor for inspecting or setting an object's prototype. Prefer the standard methods above.

## 10. Prototype chain and property lookup

JavaScript searches for a property in this order:

```
Current object
      ↓
Parent prototype
      ↓
Grandparent prototype
      ↓
Object.prototype
      ↓
null
```

If not found, the result is `undefined`.

Example:

```
const parent = { role: "Developer" };

const child = Object.create(parent);
child.name = "Rahul";

console.log(child.name); // Rahul
console.log(child.role); // Developer
```

### Property shadowing

```
const parent = { role: "Employee" };

const child = Object.create(parent);

child.role = "Developer";

console.log(child.role);  // Developer
console.log(parent.role); // Employee
```

The child's own property takes precedence over the inherited property.

## 11. Constructor functions

Traditional way of creating objects with shared methods.

```
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log("Hello " + this.name);
};

const user1 = new User("Rahul");
const user2 = new User("John");

user1.greet();
user2.greet();
```

Methods added to the prototype are shared through inheritance rather than copied onto every instance.

## 12. ES6 classes

Classes provide cleaner syntax for constructor and prototype-based inheritance.

```
class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hello " + this.name);
    }
}

const user = new User("Rahul");

user.greet();
```

Check:

```
Object.getPrototypeOf(user) === User.prototype; // true
```

## 13. Inheritance using extends and super

```
class User {
    constructor(name) {
        this.name = name;
    }

    login() {
        console.log(this.name + " logged in");
    }
}

class Developer extends User {
    constructor(name, language) {
        super(name);
        this.language = language;
    }

    writeCode() {
        console.log(this.language);
    }
}

const dev = new Developer("Rahul", "Node.js");

dev.login();
dev.writeCode();
```

| Keyword          | Purpose                               |
| ---------------- | ------------------------------------- |
| `class`          | Defines a class                       |
| `constructor()`  | Initializes instances                 |
| `extends`        | Establishes class inheritance         |
| `super()`        | Calls parent constructor              |
| `super.method()` | Calls parent method                   |
| `instanceof`     | Checks constructor prototype in chain |

Example:

```
console.log(dev instanceof Developer); // true
console.log(dev instanceof User);      // true
console.log(dev instanceof Object);    // true
```

# 14. Most important interview traps

| Question                                                  | Answer                               |
| --------------------------------------------------------- | ------------------------------------ |
| Is JavaScript class-based or prototype-based?             | Prototype-based                      |
| Where does `map()` come from?                             | `Array.prototype`                    |
| Where does `toString()` come from on an array?            | `Object.prototype` through the chain |
| What is the end of the prototype chain?                   | `null`                               |
| Does `Object.create(null)` inherit from Object.prototype? | No                                   |
| Does spread create a deep copy?                           | No                                   |
| Does freeze deeply freeze nested objects?                 | No                                   |
| Does `Object.keys()` include inherited properties?        | No                                   |
| Does `in` check inherited properties?                     | Yes                                  |
| Does `Object.hasOwn()` check inherited properties?        | No                                   |
| Are class methods placed on the prototype?                | Yes, ordinary instance methods       |
| Can arrow functions be constructors?                      | No                                   |
| Is `__proto__` the recommended API?                       | No                                   |

## Final revision priorities

## Part 6 – What to remember

Very important

Revise thoroughly

- Prototype chain
- `prototype` vs `[[Prototype]]`
- `Object.create()`
- Property lookup and shadowing
- Constructor functions

  Important
- Property descriptors
- Getters and setters
- `freeze`, `seal`, `preventExtensions`
- `instanceof` and class inheritance

  Quick revision
- Object keys, values and entries
- Shallow vs deep copy
- `Object.hasOwn()` and `in`

My recommendation: Before your interview, be able to explain the array prototype chain on a whiteboard and implement a constructor function with a shared prototype method. Those two exercises will test much of the core concept.

Part 6 is complete, man. Next is Part 7 – Arrays and Important Methods (Very High priority). 💪