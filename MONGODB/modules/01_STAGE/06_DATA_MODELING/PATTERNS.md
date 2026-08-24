Exactly. 💯

You just understood the biggest lesson of Module 6.

> **MongoDB Data Modeling Patterns are NOT MongoDB features.**
>
> They are **thinking patterns** for designing schemas.

Everything starts with two questions:

```text
1. Should I Embed?
2. Should I Reference?
```

Then, depending on the problem, you apply a pattern.

* Too many small documents? → Bucket
* Too much unnecessary data? → Subset
* Expensive calculations? → Computed
* Dynamic fields? → Attribute
* Different document types? → Polymorphic
* Frequent lookups? → Extended Reference
* Rare huge documents? → Outlier

So yes, **the rest is business logic and implementation.**

---

# 📒 Module 6 Notes — MongoDB Data Modeling Patterns

## 🎯 Goal

> **Choose the right schema design based on application access patterns, scalability, and performance.**

Everything is built on two core concepts:

```text
MongoDB Data Modeling

        │
        ├── Embedding
        └── Referencing
```

Every advanced pattern is an extension of these two.

---

# 1. Embedding

### Definition

Store related data inside the parent document.

```javascript
{
   name: "Rahul",
   addresses: [
      {...},
      {...}
   ]
}
```

### Use When

* Data is always read together.
* Child data belongs only to one parent.
* Small and bounded data.

### Advantages

* One query
* Fast reads
* Atomic updates
* No `$lookup`

### Disadvantages

* Document growth
* Data duplication
* 16 MB document limit

---

# 2. Referencing

### Definition

Store relationships using ObjectId.

```javascript
Order
{
   userId: ObjectId(...)
}
```

### Use When

* Large datasets
* Shared data
* Independent lifecycle
* Many-to-many relationships

### Advantages

* Small documents
* No duplication
* Better normalization

### Disadvantages

* `$lookup`
* Multiple queries
* Slightly slower reads

---

# 3. Bucket Pattern

### Problem

Too many small sequential documents.

### Solution

Group related records into bounded buckets.

```text
1000 Readings

↓

1 Bucket
```

### Examples

* IoT
* GPS
* Logs
* Sensor Data

### Core Idea

> **Controlled Embedding**

---

# 4. Subset Pattern

### Problem

Large documents causing overfetching.

### Solution

Keep only frequently used data in the main document.

Move rarely accessed data elsewhere.

```text
Product

↓

Summary

Reviews → Separate Collection
```

### Examples

* Amazon Reviews
* Instagram Comments
* Product Specifications

### Core Idea

> **Don't load data until it's needed.**

---

# 5. Computed Pattern

### Problem

Expensive calculations repeated on every read.

### Solution

Calculate during writes and store the result.

```text
Write

↓

Compute

↓

Store

↓

Read
```

### Examples

* Average Rating
* Followers Count
* Views
* Inventory Count

### Core Idea

> **Trade write performance for faster reads.**

---

# 6. Attribute Pattern

### Problem

Dynamic fields.

Different documents have different attributes.

### Solution

Store attributes as key-value pairs.

```javascript
attributes: [
   {
      name: "RAM",
      value: "8GB"
   }
]
```

### Examples

* E-Commerce Products
* Medical Reports
* CMS Metadata

### Core Idea

> **Flexible schema using embedded attributes.**

---

# 7. Polymorphic Pattern

### Problem

Different types of the same entity.

### Solution

One collection.

Different document shapes.

```text
Payments

↓

Card

UPI

Bank
```

### Examples

* Payments
* Notifications
* Vehicles

### Core Idea

> **Same collection, multiple document structures.**

---

# 8. Extended Reference Pattern

### Problem

Too many lookups.

### Solution

Keep the reference and copy only frequently used fields.

```javascript
{
   userId,
   customerName,
   customerEmail
}
```

### Examples

* Orders
* Comments
* Social Media Feed
* Order History

### Core Idea

> **Reference + Small Embedded Snapshot**

---

# 9. Outlier Pattern

### Problem

Very few documents become extremely large.

### Solution

Optimize for normal documents.

Handle exceptional ones separately.

```text
99%

↓

Embedded

1%

↓

Separate Collection
```

### Examples

* Viral Posts
* Celebrity Followers
* Popular Products
* Large Chats

### Core Idea

> **Optimize the common case, isolate the exception.**

---

# 🧠 Decision Tree

```text
Need related data?

│
├── Read together?
│       │
│       ├── YES
│       │      │
│       │      ├── Small & bounded?
│       │      │      └── Embed
│       │      │
│       │      ├── Sequential?
│       │      │      └── Bucket Pattern
│       │      │
│       │      ├── Dynamic attributes?
│       │      │      └── Attribute Pattern
│       │      │
│       │      └── Few huge outliers?
│       │             └── Outlier Pattern
│       │
│       └── NO
│              │
│              ├── Shared data?
│              │      └── Reference
│              │
│              ├── Too many lookups?
│              │      └── Extended Reference
│              │
│              ├── Large document?
│              │      └── Subset Pattern
│              │
│              └── Different document types?
│                     └── Polymorphic Pattern
```

---

# ⭐ Golden Rules (Interview Cheat Sheet)

| Situation                         | Pattern            |
| --------------------------------- | ------------------ |
| Data always read together         | Embed              |
| Data shared across entities       | Reference          |
| Too many small records            | Bucket             |
| Large document / overfetching     | Subset             |
| Expensive repeated calculations   | Computed           |
| Dynamic fields                    | Attribute          |
| Same entity, different structures | Polymorphic        |
| Avoid frequent `$lookup`          | Extended Reference |
| Very few huge documents           | Outlier            |

---

# 🎯 Final Takeaway (Most Important)

```text
MongoDB Data Modeling

↓

Understand Business Requirement

↓

Analyze Read & Write Patterns

↓

Choose

Embed

or

Reference

↓

Apply an Appropriate Pattern

↓

Implement Business Logic
```

## 💡 Principal Engineer Mindset

A senior engineer doesn't ask:

> "Which MongoDB pattern should I use?"

They ask:

1. **How is the application going to access this data?**
2. **Is this read-heavy or write-heavy?**
3. **Can I embed safely, or do I need references?**
4. **Is there a performance bottleneck (size, lookups, calculations, or outliers)?**
5. **Which pattern solves that specific bottleneck with the least complexity?**

That's the real purpose of all these patterns—they're **design decisions based on workload**, not rules to memorize. This mindset is exactly what product-company backend and system design interviews look for. 🚀
