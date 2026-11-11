Let's go man! 🔥 You've completed Window Functions, so now let's cover the other major part of Module 12.

MongoDB Date & Time operations are very useful for:

- Monthly and yearly sales reports.
- Finding orders from the last 7 or 30 days.
- Calculating delivery duration.
- Grouping transactions by day, week or month.
- Subscription expiry calculations.
- Tracking employee attendance and activity.

We'll use our existing `orders` collection.

# Module 12 – Date & Time Functions



Starting Date & Time

6 major concepts



## 1. Extracting date components

MongoDB provides operators to extract individual components from a BSON Date.

Suppose our document contains:

```
{
  _id: 1001,
  amount: 62000,
  orderDate: ISODate("2026-10-01T14:30:45Z")
}
```

### Important date extraction operators

| Operator       | Purpose                           |
| -------------- | --------------------------------- |
| `$year`        | Extract year                      |
| `$month`       | Extract month (1–12)              |
| `$dayOfMonth`  | Extract day (1–31)                |
| `$dayOfWeek`   | Extract weekday (1–7, Sunday = 1) |
| `$dayOfYear`   | Extract day number (1–366)        |
| `$hour`        | Extract hour                      |
| `$minute`      | Extract minute                    |
| `$second`      | Extract second                    |
| `$millisecond` | Extract milliseconds              |
| `$week`        | Extract week number               |
| `$isoWeek`     | Extract ISO week number           |
| `$isoWeekYear` | Extract ISO week year             |

Example: Extract year, month and day

```
db.orders.aggregate([
  {
    $project: {
      amount: 1,
      year: { $year: "$orderDate" },
      month: { $month: "$orderDate" },
      day: { $dayOfMonth: "$orderDate" },
      weekday: { $dayOfWeek: "$orderDate" }
    }
  }
]);
```

### Timezone support

You can specify a timezone when extracting components.

```
db.orders.aggregate([
  {
    $project: {
      year: {
        $year: {
          date: "$orderDate",
          timezone: "Asia/Kolkata"
        }
      },
      hour: {
        $hour: {
          date: "$orderDate",
          timezone: "Asia/Kolkata"
        }
      }
    }
  }
]);
```

Important: MongoDB stores BSON Date values as UTC timestamps. Timezone affects how date components are interpreted and displayed; it doesn't change the stored instant.

## 2. Date formatting – `$dateToString`

Used to convert a Date value into a formatted string.

Similar to formatting dates in SQL.

Syntax:

```
{
  $dateToString: {
    format: "%Y-%m-%d",
    date: "$orderDate"
  }
}
```

### Important format specifiers

| Specifier | Meaning          | Example |
| --------- | ---------------- | ------- |
| `%Y`      | Four-digit year  | 2026    |
| `%m`      | Month            | 10      |
| `%d`      | Day              | 01      |
| `%H`      | Hour (24-hour)   | 14      |
| `%M`      | Minute           | 30      |
| `%S`      | Second           | 45      |
| `%L`      | Milliseconds     | 000     |
| `%b`      | Short month name | Oct     |
| `%B`      | Full month name  | October |
| `%z`      | UTC offset       | +0530   |
| `%j`      | Day of year      | 274     |

Example: Format date

```
db.orders.aggregate([
  {
    $project: {
      orderDate: 1,
      formattedDate: {
        $dateToString: {
          format: "%d-%m-%Y",
          date: "$orderDate",
          timezone: "Asia/Kolkata"
        }
      }
    }
  }
]);
```

Output format:

```
{
  formattedDate: "01-10-2026"
}
```

Example: Date and time together

```
{
  $dateToString: {
    format: "%d-%m-%Y %H:%M:%S",
    date: "$orderDate",
    timezone: "Asia/Kolkata"
  }
}
```

Result: `01-10-2026 20:00:45`

### Reverse operation – `$dateFromString`

Converts a string into a BSON Date.

```
db.orders.aggregate([
  {
    $project: {
      convertedDate: {
        $dateFromString: {
          dateString: "2026-10-01",
          format: "%Y-%m-%d"
        }
      }
    }
  }
]);
```

Remember:

- `$dateToString` → Date to String.
- `$dateFromString` → String to Date.

## 3. Adding dates – `$dateAdd`

Used to add a specified amount of time to a date.

Syntax:

```
{
  $dateAdd: {
    startDate: "$orderDate",
    unit: "day",
    amount: 7
  }
}
```

### Supported units

- `year`
- `quarter`
- `month`
- `week`
- `day`
- `hour`
- `minute`
- `second`
- `millisecond`

Example: Calculate expected delivery date after 5 days.

```
db.orders.aggregate([
  {
    $project: {
      orderDate: 1,
      expectedDelivery: {
        $dateAdd: {
          startDate: "$orderDate",
          unit: "day",
          amount: 5
        }
      }
    }
  }
]);
```

Example: Subscription expiry after 3 months.

```
{
  $dateAdd: {
    startDate: "$subscriptionStart",
    unit: "month",
    amount: 3
  }
}
```

You can also specify a timezone for calendar-aware date arithmetic.

```
{
  $dateAdd: {
    startDate: "$orderDate",
    unit: "day",
    amount: 1,
    timezone: "Asia/Kolkata"
  }
}
```

## 4. Subtracting dates – `$dateSubtract`

Works similarly to `$dateAdd`, but subtracts the specified duration.

Example: Find a date 7 days before an order.

```
db.orders.aggregate([
  {
    $project: {
      orderDate: 1,
      previousWeek: {
        $dateSubtract: {
          startDate: "$orderDate",
          unit: "day",
          amount: 7
        }
      }
    }
  }
]);
```

Real-world examples:

| Requirement                 | Operation       |
| --------------------------- | --------------- |
| Delivery after 5 days       | `$dateAdd`      |
| Subscription expiry         | `$dateAdd`      |
| Find date 30 days earlier   | `$dateSubtract` |
| Calculate reminder date     | `$dateSubtract` |
| Calculate warranty end date | `$dateAdd`      |

## 5. Difference between dates – `$dateDiff`

Very important for interviews

Used to calculate the difference between two dates in a specified unit.

SQL equivalent: `DATEDIFF` (though exact boundary semantics can differ between databases).

Syntax:

```
{
  $dateDiff: {
    startDate: "$orderDate",
    endDate: "$deliveryDate",
    unit: "day"
  }
}
```

### Example: Calculate delivery duration

Let's temporarily imagine our order documents have a `deliveryDate` field.

```
db.orders.aggregate([
  {
    $project: {
      amount: 1,
      deliveryDays: {
        $dateDiff: {
          startDate: "$orderDate",
          endDate: "$deliveryDate",
          unit: "day"
        }
      }
    }
  }
]);
```

### Important `$dateDiff` properties

| Property      | Purpose                                    |
| ------------- | ------------------------------------------ |
| `startDate`   | Starting date                              |
| `endDate`     | Ending date                                |
| `unit`        | Difference unit                            |
| `timezone`    | Timezone for calendar calculations         |
| `startOfWeek` | Define the first weekday when unit is week |

Supported units include years, quarters, months, weeks, days, hours, minutes, seconds and milliseconds.

Example: Difference in hours

```
{
  $dateDiff: {
    startDate: "$orderDate",
    endDate: "$deliveryDate",
    unit: "hour"
  }
}
```

Important interview distinction: `$dateDiff` counts unit boundaries crossed, not simply a rounded decimal duration. For example, crossing a calendar day boundary can produce one day even if less than 24 hours elapsed.

## 6. Date truncation – `$dateTrunc`

This is especially useful for analytics.

`$dateTrunc` rounds a date down to the beginning of a specified time period.

Think of it as grouping timestamps into consistent calendar buckets.

### Example: Truncate to month

```
db.orders.aggregate([
  {
    $project: {
      orderDate: 1,
      monthStart: {
        $dateTrunc: {
          date: "$orderDate",
          unit: "month"
        }
      }
    }
  }
]);
```

If the original date is:

`2026-10-19T14:30:00Z`

The truncated date becomes:

`2026-10-01T00:00:00Z`

### Supported units

| Unit      | Truncates to     |
| --------- | ---------------- |
| `year`    | Start of year    |
| `quarter` | Start of quarter |
| `month`   | Start of month   |
| `week`    | Start of week    |
| `day`     | Start of day     |
| `hour`    | Start of hour    |
| `minute`  | Start of minute  |
| `second`  | Start of second  |

### Example: Group orders by month

```
db.orders.aggregate([
  {
    $group: {
      _id: {
        $dateTrunc: {
          date: "$orderDate",
          unit: "month"
        }
      },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$amount" }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);
```

Now you get monthly revenue instead of grouping by every individual timestamp.

### Custom intervals with `binSize`

For example, group timestamps into 15-minute intervals:

```
{
  $dateTrunc: {
    date: "$orderDate",
    unit: "minute",
    binSize: 15
  }
}
```

This is useful for hourly traffic and transaction analytics.

## 7. Practical combination – Monthly sales report

Let's combine multiple date operations.

Requirement: Generate monthly revenue and order counts.

```
db.orders.aggregate([
  {
    $group: {
      _id: {
        $dateTrunc: {
          date: "$orderDate",
          unit: "month",
          timezone: "Asia/Kolkata"
        }
      },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$amount" },
      averageOrderValue: { $avg: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      month: "$_id",
      totalOrders: 1,
      totalRevenue: 1,
      averageOrderValue: 1
    }
  },
  {
    $sort: { month: 1 }
  }
]);
```

This is a very common production reporting pattern.

## 8. Quick revision cheat sheet

| Requirement                       | MongoDB operator  |
| --------------------------------- | ----------------- |
| Extract year                      | `$year`           |
| Extract month                     | `$month`          |
| Extract day                       | `$dayOfMonth`     |
| Extract weekday                   | `$dayOfWeek`      |
| Format date                       | `$dateToString`   |
| Convert string to date            | `$dateFromString` |
| Add date duration                 | `$dateAdd`        |
| Subtract date duration            | `$dateSubtract`   |
| Difference between dates          | `$dateDiff`       |
| Round to month/day/year           | `$dateTrunc`      |
| Get current date/time             | `$$NOW`           |
| Extract date components as object | `$dateToParts`    |
| Build date from components        | `$dateFromParts`  |

One useful distinction:

- `$dateDiff` tells you how much time separates two dates in a specified unit.
- `$dateTrunc` normalizes dates to a common period boundary.
- `$dateToString` converts dates into display-friendly text.

## 9. Practice problems

Use our existing `orders` collection.

Date & Time practice – 8 questions

1\. Extract year, month and day from every orderDate.\


Show hint

2\. Display orderDate in DD-MM-YYYY format using Indian timezone.\


Show hint

3\. Calculate expected delivery date after 5 days.\


Show hint

4\. Find the date 30 days before each order.\


Show hint

5\. Group orders by month and calculate monthly revenue.\


Show hint

6\. Calculate the difference between orderDate and deliveryDate in hours.\


Show hint

7\. Find all orders placed in the last 30 days.\


Show hint

8\. Group orders into 15-minute intervals.\


Show hint

Our Module 12 progress:

-

  Completed

  &#x20;Window Functions – ranking, partitioning, LAG, LEAD, running totals, rolling totals and moving averages.


-

  Covered

  &#x20;Date & Time – extraction, formatting, arithmetic, differences and truncation.



Once you've practised these eight problems, we'll have completed the two major extensions to our aggregation learning.
