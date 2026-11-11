Huiii bro! 😂🔥 Let's move to the next important module.

Module 11 – Advanced Aggregation Framework

Module 10 taught us how to filter, group, calculate and sort data. Module 11 takes aggregation to the next level: joining collections, flattening arrays, building dashboards and handling hierarchical data.

These topics are very important for Node.js backend interviews.

# Module 11 – Advanced Aggregation



Starting Module 11

10 subtopics



We'll use these two collections throughout the examples.

orders

```
{
  _id: 1,
  customerId: 101,
  product: "Laptop",
  amount: 60000,
  status: "Delivered"
}
```

customers

```
{
  _id: 101,
  name: "Rahul",
  city: "Bengaluru"
}
```

## 11.1 – `$lookup` (MongoDB JOIN)

This is one of the most important stages.

`$lookup` is used to join documents from another collection.

SQL equivalent: `LEFT OUTER JOIN`.

Syntax:

```
{
  $lookup: {
    from: "customers",
    localField: "customerId",
    foreignField: "_id",
    as: "customerDetails"
  }
}
```

Let's understand:

| Property       | Meaning                              |
| -------------- | ------------------------------------ |
| `from`         | Collection to join                   |
| `localField`   | Field in current collection          |
| `foreignField` | Matching field in foreign collection |
| `as`           | Name of the output array             |

Complete example:

```
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  }
]);
```

Output:

```
{
  _id: 1,
  customerId: 101,
  product: "Laptop",
  amount: 60000,
  customerDetails: [
    {
      _id: 101,
      name: "Rahul",
      city: "Bengaluru"
    }
  ]
}
```

Important: `$lookup` always produces an array in the `as` field, even when only one document matches.

### Real-world use cases

- Orders → Customers
- Products → Categories
- Employees → Departments
- Posts → Comments

## 11.2 – `$unwind`

`$unwind` is used to deconstruct an array field and create separate documents for each array element.

Suppose `$lookup` produced:

```
{
  _id: 1,
  product: "Laptop",
  customerDetails: [
    { name: "Rahul", city: "Bengaluru" },
    { name: "John", city: "Hyderabad" }
  ]
}
```

Apply:

```
db.orders.aggregate([
  {
    $unwind: "$customerDetails"
  }
]);
```

Output:

```
{
  _id: 1,
  product: "Laptop",
  customerDetails: {
    name: "Rahul",
    city: "Bengaluru"
  }
}
```

```
{
  _id: 1,
  product: "Laptop",
  customerDetails: {
    name: "John",
    city: "Hyderabad"
  }
}
```

One document becomes two documents.

Important interview question: What happens if the array is empty or null?

By default, `$unwind` removes documents where the array is:

- Empty.
- Missing.
- Null.

To preserve them:

```
{
  $unwind: {
    path: "$customerDetails",
    preserveNullAndEmptyArrays: true
  }
}
```

### `$lookup` vs `$unwind`

| `$lookup`                   | `$unwind`                             |
| --------------------------- | ------------------------------------- |
| Joins another collection    | Flattens an array                     |
| Creates an array field      | Creates separate documents            |
| Can return multiple matches | Produces one output per array element |

Most common interview pattern:

```
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  {
    $unwind: "$customer"
  }
]);
```

This joins orders with customers and converts the customer array into an object per output document.

## 11.3 – `$facet`

Important for dashboards

`$facet` allows multiple independent aggregation pipelines to process the same input documents in one aggregation operation.

Imagine an e-commerce admin dashboard needs:

1. Total revenue.
2. Total order count.
3. Orders grouped by status.
4. Top five expensive orders.

Instead of running separate aggregations, we can use `$facet`.

```
db.orders.aggregate([
  {
    $facet: {
      revenue: [
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" }
          }
        }
      ],

      orderCount: [
        { $count: "totalOrders" }
      ],

      statusSummary: [
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ],

      topOrders: [
        { $sort: { amount: -1 } },
        { $limit: 5 }
      ]
    }
  }
]);
```

Output structure:

```
[
  {
    revenue: [
      { _id: null, totalRevenue: 165000 }
    ],
    orderCount: [
      { totalOrders: 3 }
    ],
    statusSummary: [
      { _id: "Delivered", count: 2 },
      { _id: "Pending", count: 1 }
    ],
    topOrders: [
      // Top 5 orders
    ]
  }
]
```

Remember: Each facet branch receives the same input documents and runs independently. The results are returned as arrays inside one output document.

Note: `$facet` is useful for dashboard-style responses, but it has memory and BSON document-size limits. It isn't automatically faster than separate queries.

## 11.4 – `$bucket`

Used to group documents into predefined ranges.

Example: Group products based on price.

```
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 1000, 5000, 10000, 50000],
      default: "Premium",
      output: {
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: "$price" }
      }
    }
  }
]);
```

Ranges:

| Bucket  | Price range               |
| ------- | ------------------------- |
| 0       | 0–999                     |
| 1000    | 1000–4999                 |
| 5000    | 5000–9999                 |
| 10000   | 10000–49999               |
| Premium | Values outside boundaries |

Important: Lower boundary is inclusive; upper boundary is exclusive.

Use cases:

- Customer age groups.
- Product price ranges.
- Employee salary bands.
- Order value categories.

## 11.5 – `$bucketAuto`

Automatically creates buckets based on the number of documents you want in each bucket.

```
db.products.aggregate([
  {
    $bucketAuto: {
      groupBy: "$price",
      buckets: 4,
      output: {
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: "$price" }
      }
    }
  }
]);
```

Difference:

| `$bucket`            | `$bucketAuto`                          |
| -------------------- | -------------------------------------- |
| Manual boundaries    | Automatic boundaries                   |
| You define ranges    | MongoDB calculates ranges              |
| Fixed range grouping | Approximately balances document counts |

## 11.6 – `$replaceRoot`

Replaces the entire current document with a specified embedded document or expression that evaluates to a document.

Example:

```
{
  _id: 1,
  name: "Rahul",
  address: {
    city: "Bengaluru",
    state: "Karnataka"
  }
}
```

Query:

```
db.users.aggregate([
  {
    $replaceRoot: {
      newRoot: "$address"
    }
  }
]);
```

Output:

```
{
  city: "Bengaluru",
  state: "Karnataka"
}
```

The original root fields are replaced.

Related stage: `$replaceWith` is an alias for `$replaceRoot` using its expression directly.

## 11.7 – `$graphLookup`

Used for recursive or hierarchical relationships.

Example: Employee reporting structure.

```
{
  _id: 1,
  name: "Manager",
  managerId: null
}
```

```
{
  _id: 2,
  name: "Team Lead",
  managerId: 1
}
```

```
{
  _id: 3,
  name: "Developer",
  managerId: 2
}
```

Find all employees reporting directly or indirectly to Manager:

```
db.employees.aggregate([
  {
    $match: {
      name: "Manager"
    }
  },
  {
    $graphLookup: {
      from: "employees",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "managerId",
      as: "reportingEmployees",
      depthField: "level"
    }
  }
]);
```

Output includes the matching descendants in `reportingEmployees`.

Use cases:

- Employee hierarchies.
- Category trees.
- Organization structures.
- Parent-child relationships.

Remember: `$graphLookup` performs recursive traversal; it is not just a normal one-level join.

## 11.8 – `$unionWith`

Combines documents from another collection into the current aggregation pipeline.

SQL equivalent: `UNION ALL`.

Example: Combine active and archived orders.

```
db.orders.aggregate([
  {
    $unionWith: {
      coll: "archivedOrders"
    }
  }
]);
```

It appends documents from `archivedOrders` to the pipeline output.

Important: Unlike SQL `UNION`, `$unionWith` does not automatically remove duplicates.

## 11.9 – `$merge`

Writes aggregation results into an existing or new collection.

```
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" }
    }
  },
  {
    $merge: {
      into: "customerReports",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert"
    }
  }
]);
```

Useful for:

- Generating daily reports.
- Maintaining summary collections.
- Building analytics data.
- Scheduled background aggregation jobs.

## 11.10 – `$out`

Writes the aggregation output to a collection.

```
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalOrders: { $sum: 1 }
    }
  },
  {
    $out: "orderSummary"
  }
]);
```

The aggregation result is written to `orderSummary`, replacing that collection's contents.

### `$merge` vs `$out`

| `$merge`                                | `$out`                              |
| --------------------------------------- | ----------------------------------- |
| Can insert or update matching documents | Replaces output collection contents |
| Supports different match strategies     | Writes the complete result          |
| Useful for incremental summaries        | Useful for full rebuilds            |

Important: Both are write stages and must be placed at the end of the pipeline.

# Module 11 – Interview cheat sheet

| Stage          | Remember it as                    |
| -------------- | --------------------------------- |
| `$lookup`      | Join collections                  |
| `$unwind`      | Flatten arrays                    |
| `$facet`       | Multiple pipelines, one result    |
| `$bucket`      | Manual ranges                     |
| `$bucketAuto`  | Automatic ranges                  |
| `$replaceRoot` | Replace document root             |
| `$graphLookup` | Recursive relationship lookup     |
| `$unionWith`   | Combine collections               |
| `$merge`       | Insert/update aggregation results |
| `$out`         | Replace output collection         |

## Test your understanding

Let's check the most important concepts before moving forward.

Module 11 quiz

6/6 answered

1\. Which stage is used to join two collections?

$unwind

$lookup

$facet

$merge

Correct – $lookup performs a left outer join and returns matches as an array.

2\. After $lookup, which stage can convert the resulting array into individual documents?

$project

$group

$unwind

$bucket

Correct – $unwind creates one output document for each array element.

3\. You need revenue, order count and status statistics in one dashboard aggregation. Which stage?

$facet

$unionWith

$graphLookup

$out

Correct – $facet runs multiple independent pipelines over the same input.

4\. Which stage is best for finding all employees below a manager in a hierarchy?

$lookup

$graphLookup

$bucket

$replaceRoot

Correct – $graphLookup supports recursive traversal of hierarchical relationships.

5\. Which stage combines documents from another collection without automatically removing duplicates?

$merge

$out

$unionWith

$facet

Incorrect – $unionWith appends documents, including duplicates.

6\. Which stage can update matching documents in a target collection?

$merge

$unwind

$project

$count

Correct – $merge supports matching and configurable insert/update behavior.

Score: 5/6

Retry quiz

My recommendation: Pay special attention to `$lookup`, `$unwind`, `$facet`, and `$graphLookup`. These are particularly useful for backend system design and practical MongoDB interviews.

Next, we can practise real-world aggregation problems combining multiple stages, just like an interviewer would ask.
