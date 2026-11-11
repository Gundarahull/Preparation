Let's go bro! 🔥 This is a very important topic, especially because you've already worked with SQL window functions.

The good news is that MongoDB supports almost the same analytical concepts as PostgreSQL and SQL Server, but the syntax is different.

We'll learn MongoDB window functions by translating SQL queries into MongoDB aggregation pipelines.

# Module 12 – Window Functions



Starting Module 12

Analytics & Ranking



## 1. First understand `$setWindowFields`

In SQL, you write:

```
SELECT
    *,
    SUM(amount) OVER(PARTITION BY status) AS total_amount
FROM orders;
```

In MongoDB, the equivalent is:

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$status",
      output: {
        totalAmount: {
          $sum: "$amount"
        }
      }
    }
  }
]);
```

Understand the three main properties:

| Property      | SQL equivalent     | Purpose                       |
| ------------- | ------------------ | ----------------------------- |
| `partitionBy` | `PARTITION BY`     | Divides documents into groups |
| `sortBy`      | `ORDER BY`         | Sorts documents within groups |
| `output`      | Window calculation | Defines calculated fields     |

Important: Unlike `$group`, `$setWindowFields` does not collapse documents into one document per group. It retains individual documents and adds calculated fields.

## 2. SUM OVER(PARTITION BY)

SQL:

```
SELECT
    customerId,
    status,
    amount,
    SUM(amount) OVER(PARTITION BY status) AS status_total
FROM orders;
```

MongoDB:

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$status",
      output: {
        statusTotal: {
          $sum: "$amount"
        }
      }
    }
  }
]);
```

Imagine our orders data:

| Order | Status    | Amount |
| ----- | --------- | ------ |
| 1001  | Delivered | 62000  |
| 1002  | Delivered | 30000  |
| 1003  | Pending   | 5000   |
| 1004  | Delivered | 60000  |
| 1005  | Cancelled | 4000   |
| 1006  | Delivered | 60000  |

Conceptual output:

| Order | Status    | Amount | Status total |
| ----- | --------- | ------ | ------------ |
| 1001  | Delivered | 62000  | 212000       |
| 1002  | Delivered | 30000  | 212000       |
| 1004  | Delivered | 60000  | 212000       |
| 1006  | Delivered | 60000  | 212000       |
| 1003  | Pending   | 5000   | 8000         |
| 1005  | Cancelled | 4000   | 4000         |

Each document receives its status group's total.

## 3. AVG, MIN, MAX, COUNT OVER(PARTITION BY)

The same concept works for other accumulators.

Average amount by status:

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$status",
      output: {
        averageAmount: {
          $avg: "$amount"
        }
      }
    }
  }
]);
```

Multiple calculations together:

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$status",
      output: {
        totalAmount: { $sum: "$amount" },
        averageAmount: { $avg: "$amount" },
        highestAmount: { $max: "$amount" },
        lowestAmount: { $min: "$amount" },
        orderCount: { $sum: 1 }
      }
    }
  }
]);
```

Here `$sum: 1` counts documents in each partition.

Other useful accumulators include `$min`, `$max`, `$stdDevPop`, and `$stdDevSamp`.

Remember: `partitionBy` is optional. If omitted, the window operates across the entire input set.

## 4. ROW_NUMBER(), RANK(), DENSE_RANK()

This is a very common interview topic.

Let's compare SQL and MongoDB.

### SQL

```
SELECT
    customerId,
    amount,
    ROW_NUMBER() OVER(ORDER BY amount DESC) AS row_num,
    RANK() OVER(ORDER BY amount DESC) AS rank_num,
    DENSE_RANK() OVER(ORDER BY amount DESC) AS dense_rank_num
FROM orders;
```

### MongoDB

```
db.orders.aggregate([
  {
    $setWindowFields: {
      sortBy: {
        amount: -1
      },
      output: {
        rowNumber: {
          $documentNumber: {}
        },
        rank: {
          $rank: {}
        },
        denseRank: {
          $denseRank: {}
        }
      }
    }
  }
]);
```

Notice these MongoDB equivalents:

| SQL            | MongoDB           |
| -------------- | ----------------- |
| `ROW_NUMBER()` | `$documentNumber` |
| `RANK()`       | `$rank`           |
| `DENSE_RANK()` | `$denseRank`      |

### Understanding ranking with duplicate values

Our `orders` collection already contains duplicate amounts, so let's use it.

For delivered orders, the amounts include:

`63000, 62000, 60000, 60000, 30000, 30000`

The results will look like this:

| Amount | ROW_NUMBER | RANK | DENSE_RANK |
| ------ | ---------- | ---- | ---------- |
| 63000  | 1          | 1    | 1          |
| 62000  | 2          | 2    | 2          |
| 60000  | 3          | 3    | 3          |
| 60000  | 4          | 3    | 3          |
| 30000  | 5          | 5    | 4          |
| 30000  | 6          | 5    | 4          |

The difference:

- `$documentNumber`: Always assigns a different sequential number.
- `$rank`: Tied values share a rank, and the next rank is skipped.
- `$denseRank`: Tied values share a rank, but the next rank is not skipped.

### Ranking within each partition

SQL:

```
RANK() OVER(
    PARTITION BY status
    ORDER BY amount DESC
)
```

MongoDB:

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$status",
      sortBy: { amount: -1 },
      output: {
        orderRank: {
          $rank: {}
        }
      }
    }
  }
]);
```

This ranks orders separately within each status.

For example:

- Delivered orders get their own ranking.
- Pending orders get their own ranking.
- Cancelled orders get their own ranking.

Interview tip: For deterministic `$documentNumber`, use a unique tie-breaker such as `_id` in `sortBy`. For `$rank` and `$denseRank`, keep the ranking sort to the value you want to compare, so equal amounts remain tied.

## 5. LAG and LEAD – Previous and Next document

In SQL, `LAG()` accesses a previous row and `LEAD()` accesses a following row.

MongoDB uses the `$shift` operator for both.

- `by: -1` → Previous document (LAG).
- `by: 1` → Next document (LEAD).
- `default` → Value to return when the requested document doesn't exist.

### SQL

```
SELECT
    customerId,
    orderDate,
    amount,
    LAG(amount) OVER(
        PARTITION BY customerId
        ORDER BY orderDate
    ) AS previous_amount,
    LEAD(amount) OVER(
        PARTITION BY customerId
        ORDER BY orderDate
    ) AS next_amount
FROM orders;
```

### MongoDB

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$customerId",
      sortBy: {
        orderDate: 1,
        _id: 1
      },
      output: {
        previousAmount: {
          $shift: {
            output: "$amount",
            by: -1,
            default: null
          }
        },
        nextAmount: {
          $shift: {
            output: "$amount",
            by: 1,
            default: null
          }
        }
      }
    }
  }
]);
```

Example for Rahul (`customerId: 101`):

| Order | Amount | Previous amount | Next amount |
| ----- | ------ | --------------- | ----------- |
| 1001  | 62000  | null            | 30000       |
| 1002  | 30000  | 62000           | null        |

Real-world applications:

- Compare current order with previous order.
- Calculate price changes.
- Detect changes in customer spending.
- Compare today's sales with yesterday's sales.

## 6. Running Total – Cumulative SUM

This is another important interview question.

A running total means adding the current value to all previous values in the sequence.

Example:

| Order | Amount | Running total |
| ----- | ------ | ------------- |
| 1001  | 62000  | 62000         |
| 1002  | 30000  | 92000         |
| 1003  | 5000   | 97000         |
| 1004  | 60000  | 157000        |

### SQL

```
SELECT
    customerId,
    orderDate,
    amount,
    SUM(amount) OVER(
        PARTITION BY customerId
        ORDER BY orderDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;
```

### MongoDB

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$customerId",
      sortBy: {
        orderDate: 1,
        _id: 1
      },
      output: {
        runningTotal: {
          $sum: "$amount",
          window: {
            documents: [
              "unbounded",
              "current"
            ]
          }
        }
      }
    }
  }
]);
```

Understand the window boundaries:

| MongoDB       | SQL                   | Meaning                       |
| ------------- | --------------------- | ----------------------------- |
| `"unbounded"` | `UNBOUNDED PRECEDING` | Start from the first document |
| `"current"`   | `CURRENT ROW`         | Include current document      |
| `-1`          | `1 PRECEDING`         | One document before           |
| `1`           | `1 FOLLOWING`         | One document after            |

So:

```
documents: ["unbounded", "current"]
```

Means: Add all previous documents and the current document.

## 7. Rolling Total – Moving Window

A rolling total calculates the sum over a fixed number of recent documents rather than all previous documents.

For example, calculate the total of the current order and the previous two orders.

### SQL

```
SUM(amount) OVER(
    PARTITION BY customerId
    ORDER BY orderDate
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
```

### MongoDB

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$customerId",
      sortBy: {
        orderDate: 1,
        _id: 1
      },
      output: {
        rollingTotal: {
          $sum: "$amount",
          window: {
            documents: [-2, "current"]
          }
        }
      }
    }
  }
]);
```

Example:

| Order | Amount | Rolling total (3 orders) |
| ----- | ------ | ------------------------ |
| 1     | 1000   | 1000                     |
| 2     | 2000   | 3000                     |
| 3     | 3000   | 6000                     |
| 4     | 4000   | 9000                     |
| 5     | 5000   | 12000                    |

Notice how the first order drops out when calculating the fifth order.

### Running total vs Rolling total

| Running total              | Rolling total            |
| -------------------------- | ------------------------ |
| Starts from first document | Uses a fixed-size window |
| Keeps accumulating         | Older values drop out    |
| `["unbounded", "current"]` | `[-2, "current"]`        |
| Cumulative sales           | Last 3 orders' sales     |

## 8. Moving Average – AVG OVER()

The same window logic works with `$avg`.

For example, calculate the average of the current order and previous two orders.

```
db.orders.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$customerId",
      sortBy: {
        orderDate: 1,
        _id: 1
      },
      output: {
        movingAverage: {
          $avg: "$amount",
          window: {
            documents: [-2, "current"]
          }
        }
      }
    }
  }
]);
```

This is useful for:

- Average sales over the last three transactions.
- Average stock price over recent trading days.
- Average customer spending.
- Performance trend analysis.

## 9. Complete SQL-to-MongoDB cheat sheet

| SQL window function | MongoDB equivalent                     |
| ------------------- | -------------------------------------- |
| `PARTITION BY`      | `partitionBy`                          |
| `ORDER BY`          | `sortBy`                               |
| `ROW_NUMBER()`      | `$documentNumber`                      |
| `RANK()`            | `$rank`                                |
| `DENSE_RANK()`      | `$denseRank`                           |
| `LAG()`             | `$shift` with `by: -1`                 |
| `LEAD()`            | `$shift` with `by: 1`                  |
| `SUM() OVER()`      | `$sum`                                 |
| `AVG() OVER()`      | `$avg`                                 |
| `MIN() OVER()`      | `$min`                                 |
| `MAX() OVER()`      | `$max`                                 |
| Running total       | `$sum` with `["unbounded", "current"]` |
| Rolling total       | `$sum` with `[-N, "current"]`          |

One more important concept:

MongoDB supports two types of window boundaries:

- `documents`: Based on the number of documents, such as the previous 2 orders.
- `range`: Based on values in the sort field, useful for time-based windows such as the previous 7 days.

We'll explore `range` windows when we cover date and time analytics.

Also, `$setWindowFields` does not guarantee the final output order. Add a separate `$sort` stage if you need the returned documents in a particular order.

## 10. Practice these interview scenarios

Use our existing `orders` collection.

Window function practice – 8 questions

1\. Calculate total order amount for each status without grouping documents.

Show hint

2\. Calculate average order amount for each customer.

Show hint

3\. Rank orders by amount separately for each status.

Show hint

4\. Generate row numbers for each customer's orders based on order date.

Show hint

5\. Find each customer's previous order amount.

Show hint

6\. Calculate cumulative spending for each customer.

Show hint

7\. Calculate a rolling total of the latest three orders per customer.

Hint: $sum + documents: [-2, current]

Hide hint

8\. Calculate a rolling average of the latest three orders per customer.

Show hint

My suggestion: Don't just read these queries. Run each one in MongoDB Compass and inspect the output.

One small correction to the earlier illustrative dashboard: using all 12 seeded orders, the actual delivered-order revenue is ₹305,000, not ₹212,000.

Once you've practised these eight scenarios, we'll move into date/time functions and learn date-based analytics, including seven-day rolling sales.
