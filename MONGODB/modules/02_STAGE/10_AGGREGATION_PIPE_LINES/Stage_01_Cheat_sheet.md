Let's start bro! 🔥 Module 10 – Aggregation Fundamentals is one of the most important MongoDB topics for backend interviews.

Aggregation is heavily used in real-world applications for:

- Sales reports and revenue calculations.
- Admin dashboards.
- Product analytics.
- Order statistics.
- User activity reports.
- Data transformation.

We'll cover it in rapid revision mode: concepts, syntax, practical examples, and interview questions.

# Module 10 – Aggregation Fundamentals



Starting Module 10

9 subtopics



## 10.1 – Aggregation Pipeline

What is aggregation?

Aggregation is a process of processing multiple documents through different stages to produce transformed or calculated results.

Think of it like an assembly line in a factory:

1. Receive documents.
2. Filter required documents.
3. Transform the data.
4. Group related documents.
5. Calculate totals.
6. Return the final result.

Each stage processes the output from the previous stage.

Syntax:

```
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
]);
```

Let's use an `orders` collection.

```
[
  {
    _id: 1,
    customer: "Rahul",
    product: "Laptop",
    category: "Electronics",
    amount: 60000,
    status: "Delivered"
  },
  {
    _id: 2,
    customer: "John",
    product: "Mobile",
    category: "Electronics",
    amount: 30000,
    status: "Pending"
  },
  {
    _id: 3,
    customer: "Rahul",
    product: "Headphones",
    category: "Accessories",
    amount: 5000,
    status: "Delivered"
  },
  {
    _id: 4,
    customer: "David",
    product: "Laptop",
    category: "Electronics",
    amount: 70000,
    status: "Delivered"
  }
]
```

Example: Find total delivered order amount.

```
db.orders.aggregate([
  {
    $match: { status: "Delivered" }
  },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$amount" }
    }
  }
]);
```

Output:

```
[
  {
    _id: null,
    totalRevenue: 135000
  }
]
```

Remember: Aggregation doesn't modify original documents unless you use stages such as `$merge` or `$out`.

## 10.2 – `$match`

Filters documents based on specified conditions.

Equivalent to SQL `WHERE`.

```
db.orders.aggregate([
  {
    $match: {
      status: "Delivered"
    }
  }
]);
```

Multiple conditions:

```
db.orders.aggregate([
  {
    $match: {
      status: "Delivered",
      amount: { $gt: 10000 }
    }
  }
]);
```

Interview point: Place `$match` as early as possible in the pipeline when logically possible. This reduces the number of documents processed by later stages and can use suitable indexes.

## 10.3 – `$project`

Controls which fields appear in the output. It can also create calculated fields.

Equivalent to SQL `SELECT`.

```
db.orders.aggregate([
  {
    $project: {
      customer: 1,
      product: 1,
      amount: 1,
      _id: 0
    }
  }
]);
```

Create a calculated field:

```
db.orders.aggregate([
  {
    $project: {
      customer: 1,
      amount: 1,
      tax: { $multiply: ["$amount", 0.18] }
    }
  }
]);
```

Here:

- `1` means include the field.
- `0` means exclude the field.
- `_id` is included by default unless explicitly excluded.
- You can calculate new fields using aggregation expressions.

Important: In an inclusion-style projection, you generally cannot mix inclusion and exclusion (except for `_id`).

## 10.4 – `$group`

One of the most important aggregation stages.

Groups documents based on a common value and performs calculations.

Equivalent to SQL `GROUP BY`.

Example 1: Total revenue by customer

```
db.orders.aggregate([
  {
    $group: {
      _id: "$customer",
      totalSpent: { $sum: "$amount" }
    }
  }
]);
```

Output:

```
[
  { _id: "Rahul", totalSpent: 65000 },
  { _id: "John", totalSpent: 30000 },
  { _id: "David", totalSpent: 70000 }
]
```

Example 2: Count orders by status

```
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalOrders: { $sum: 1 }
    }
  }
]);
```

Example 3: Multiple calculations

```
db.orders.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: "$amount" },
      averageAmount: { $avg: "$amount" },
      highestOrder: { $max: "$amount" },
      lowestOrder: { $min: "$amount" },
      totalOrders: { $sum: 1 }
    }
  }
]);
```

Important interview concept:

What does `_id: null` mean?

```
{
  $group: {
    _id: null,
    totalRevenue: { $sum: "$amount" }
  }
}
```

It groups all documents into one group, producing a single overall result.

## 10.5 – `$sort`

Sorts documents.

```
db.orders.aggregate([
  {
    $sort: { amount: -1 }
  }
]);
```

- `1` → Ascending.
- `-1` → Descending.

Sort by multiple fields:

```
db.orders.aggregate([
  {
    $sort: {
      status: 1,
      amount: -1
    }
  }
]);
```

## 10.6 – `$limit` and `$skip`

Used for pagination and restricting results.

Limit:

```
db.orders.aggregate([
  { $limit: 2 }
]);
```

Returns maximum two documents.

Skip:

```
db.orders.aggregate([
  { $skip: 2 }
]);
```

Skips the first two documents.

Pagination example:

```
const page = 2;
const limit = 10;

db.orders.aggregate([
  { $sort: { _id: 1 } },
  { $skip: (page - 1) * limit },
  { $limit: limit }
]);
```

For consistent pagination, use a deterministic sort, ideally with a unique tie-breaker such as `_id`.

## 10.7 – `$count`

Counts the documents reaching this stage.

```
db.orders.aggregate([
  { $match: { status: "Delivered" } },
  { $count: "totalDeliveredOrders" }
]);
```

Output:

```
[
  { totalDeliveredOrders: 3 }
]
```

If no documents reach `$count`, it returns an empty result.

## 10.8 – `$addFields`

Adds new fields to existing documents without removing the other fields.

```
db.orders.aggregate([
  {
    $addFields: {
      tax: { $multiply: ["$amount", 0.18] },
      totalAmount: {
        $multiply: ["$amount", 1.18]
      }
    }
  }
]);
```

Original fields remain, and the new fields are added.

Difference: `$project` vs `$addFields`

| `$project`                   | `$addFields`                                    |
| ---------------------------- | ----------------------------------------------- |
| Controls output fields       | Preserves existing fields                       |
| Can create calculated fields | Can create calculated fields                    |
| Can exclude fields           | Does not remove other fields unless overwritten |

## 10.9 – Putting everything together

Let's solve a real backend scenario.

Requirement: Generate a report showing the top two customers by delivered-order revenue.

```
db.orders.aggregate([
  {
    $match: {
      status: "Delivered"
    }
  },
  {
    $group: {
      _id: "$customer",
      totalRevenue: { $sum: "$amount" },
      totalOrders: { $sum: 1 }
    }
  },
  {
    $sort: {
      totalRevenue: -1
    }
  },
  {
    $limit: 2
  },
  {
    $project: {
      _id: 0,
      customer: "$_id",
      totalRevenue: 1,
      totalOrders: 1
    }
  }
]);
```

Expected result:

```
[
  {
    customer: "David",
    totalRevenue: 70000,
    totalOrders: 1
  },
  {
    customer: "Rahul",
    totalRevenue: 65000,
    totalOrders: 2
  }
]
```

Pipeline flow:

`$match`

Only delivered orders

`$group`

Calculate revenue per customer

`$sort`

Highest revenue first

`$limit`

Top two customers

`$project`

Format final response

## Interview quick revision

| Stage        | Purpose                 | SQL equivalent          |
| ------------ | ----------------------- | ----------------------- |
| `$match`     | Filter documents        | WHERE                   |
| `$project`   | Select/transform fields | SELECT                  |
| `$group`     | Group and calculate     | GROUP BY                |
| `$sort`      | Sort results            | ORDER BY                |
| `$limit`     | Restrict results        | LIMIT                   |
| `$skip`      | Skip results            | OFFSET                  |
| `$count`     | Count documents         | COUNT                   |
| `$addFields` | Add calculated fields   | Computed SELECT columns |

## Test yourself – 5 important questions

Module 10 knowledge check

5/5 answered

1\. Which stage is equivalent to SQL WHERE?

$project

$match

$group

$sort

Correct – $match filters documents before subsequent stages.

2\. What does \_id: null do inside $group?

Removes the \_id field

Groups all documents together

Groups documents by null fields only

Returns no documents

Correct – It creates one overall group from all input documents.

3\. Which accumulator counts documents in each group?

$count

$size

$sum: 1

$total

Incorrect – $sum: 1 adds one for every document entering the group.

4\. Which stage preserves existing fields while adding new ones?

$match

$limit

$addFields

$count

Correct – $addFields keeps the existing document fields and adds or overwrites specified fields.

5\. What happens if $count receives zero documents?

Returns {count: 0}

Returns null

Returns an empty result

Throws an error

Incorrect – The $count stage produces no output document when its input is empty.

## Score: 3/5

Try again

Module 10 checkpoint: We have covered all nine fundamentals. Next, Module 11 – Advanced Aggregation: `$lookup`, `$unwind`, `$facet`, `$bucket`, `$graphLookup`, and more. These are especially useful for real-world backend reporting and interview scenarios.
