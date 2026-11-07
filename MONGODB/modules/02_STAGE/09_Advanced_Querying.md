BRO! 🔥 Here's your Module 9 — Advanced Querying Cheat Sheet. I've kept it compact, with syntax, examples and interview memory tricks so you can revise it in 5–10 minutes.

# MongoDB Module 9 — Cheat Sheet

# Advanced Querying

7 submodules · Interview revision

Completed

Sample document

```
{
  name: "iPhone 17",
  category: "Mobile",
  price: 80000,
  stock: 15,
  isActive: true,
  specifications: {
    brand: "Apple",
    ram: "8GB"
  },
  tags: ["Premium", "Electronics", "5G"],
  variants: [
    { color: "Black", price: 80000 },
    { color: "Blue", price: 82000 }
  ]
}
```

## 1. Complex Filters

Combine multiple conditions using logical and comparison operators.

```
db.products.find({
  isActive: true,
  category: "Mobile",
  price: { $gt: 50000 },
  stock: { $gt: 0 }
})
```

AND + OR combination:

```
db.products.find({
  isActive: true,
  $or: [
    { category: "Mobile", price: { $lt: 80000 } },
    { category: "Laptop", price: { $lt: 120000 } }
  ]
})
```

Remember:

- Multiple fields = implicit AND.
- `$or` = at least one condition.
- `$nin` = exclude multiple values.

## 2. Nested Documents

Use dot notation to query nested fields.

```
// Find Apple products
db.products.find({
  "specifications.brand": "Apple"
})

// Find 8GB RAM products
db.products.find({
  "specifications.ram": "8GB"
})
```

Exact embedded object match:

```
db.products.find({
  specifications: {
    brand: "Apple",
    ram: "8GB"
  }
})
```

Remember: Exact embedded-document equality requires the complete embedded object to match, including field order.

## 3. Array Queries

Find a specific array value:

```
db.products.find({
  tags: "Electronics"
})
```

Match any of several values:

```
db.products.find({
  tags: {
    $in: ["Premium", "5G"]
  }
})
```

Match an exact array:

```
db.products.find({
  tags: ["Premium", "Electronics", "5G"]
})
```

Remember: Exact array equality considers element order and contents.

## 4. `$elemMatch`

Checks whether at least one array element satisfies all specified conditions.

```
db.products.find({
  variants: {
    $elemMatch: {
      color: "Black",
      price: { $lt: 81000 }
    }
  }
})
```

Must remember

```
One array element
       |
       ├── color = Black
       |
       └── price < 81000

Both conditions must match the SAME element.
```

## 5. `$all`

Checks whether an array contains all specified values.

```
db.products.find({
  tags: {
    $all: ["Premium", "Electronics"]
  }
})
```

- Both values must exist.
- Order doesn't matter.
- Additional values are allowed.

## 6. `$size`

Find arrays with an exact number of elements.

```
// Exactly 3 tags
db.products.find({
  tags: { $size: 3 }
})
```

For more than two elements:

```
db.products.find({
  $expr: {
    $gt: [
      { $size: "$tags" },
      2
    ]
  }
})
```

Remember: `$size` alone doesn't support `$gt`, `$lt`, `$gte` or `$lte`.

## 7. `$expr`

Allows aggregation expressions inside normal queries.

Compare two fields:

```
db.products.find({
  $expr: {
    $lt: ["$discountPrice", "$price"]
  }
})
```

Calculate inside the query:

```
db.products.find({
  $expr: {
    $lt: [
      { $multiply: ["$price", 0.9] },
      75000
    ]
  }
})
```

Remember:

```
Normal query
     ↓
Field vs fixed value

$expr
     ↓
Field vs field
     ↓
Expressions and calculations
```

# Most Important Differences

| Operators                    | Difference                                                  |
| ---------------------------- | ----------------------------------------------------------- |
| `$all` vs `$elemMatch`       | All required values vs conditions on the same array element |
| Dot notation vs object match | Individual nested fields vs exact embedded object           |
| `$size` vs `$expr`           | Exact array length vs flexible expression                   |
| `$in` vs `$all`              | Any matching value vs all specified values                  |
| Normal comparison vs `$expr` | Fixed-value comparison vs expression-based comparison       |

# Top 10 Interview Questions

Flashcards

0/10 revealed

Q1. Which operator ensures multiple conditions match the same array element?Q2. Which operator checks whether all specified values exist in an array?Q3. Can $size directly accept $gt?Q4. How do you access a nested field?Q5. How do you compare two fields in the same document?Q6. Does exact array equality consider order?Q7. Does $all require exact array equality?Q8. What happens when multiple conditions are supplied in one query object?Q9. Can $elemMatch be used with arrays of embedded documents?Q10. What is the purpose of $expr?Reveal all answers

## Module 9 Completion

7/7 submodules revised

Next up: Module 10 — Aggregation Fundamentals

- Aggregation pipeline
- `$match`
- `$project`
- `$group`
- `$sort`
- `$limit`
- `$skip`
- `$count`
- `$addFields`

Keep this cheat sheet as your quick revision reference before interviews, man! 💪
