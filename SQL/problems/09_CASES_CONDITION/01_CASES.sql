-- CONDITIONAL




# Phase 10 — Conditional Logic

This phase is basically:

```text
CASE WHEN
```

and its variations.

If Window Functions are SQL's superpower, then `CASE WHEN` is SQL's **if-else statement**.

SQL equivalent:

```sql
CASE
    WHEN condition THEN value
    WHEN condition THEN value
    ELSE value
END
```

---

# Module 10.1 — Simple CASE WHEN

## Example

Classify employees based on salary.

```sql
SELECT
    name,
    salary,
    CASE
        WHEN salary >= 2000000 THEN 'HIGH'
        WHEN salary >= 1000000 THEN 'MEDIUM'
        ELSE 'LOW'
    END AS salary_band
FROM employees;
```

---

# Module 10.2 — Conditional Aggregation

You already know this one.

## Delivered vs Cancelled Revenue

```sql
SELECT
    payment_method,

    SUM(
        CASE
            WHEN status='delivered'
            THEN total_amount
            ELSE 0
        END
    ) AS delivered_revenue,

    SUM(
        CASE
            WHEN status='cancelled'
            THEN total_amount
            ELSE 0
        END
    ) AS cancelled_revenue

FROM orders
GROUP BY payment_method;
```

This is one of the most common interview patterns.

---

# Module 10.3 — CASE inside ORDER BY

Example:

Show active users first.

```sql
SELECT *
FROM users
ORDER BY
CASE
    WHEN status='active' THEN 1
    ELSE 2
END;
```

---

# Module 10.4 — CASE inside Window Functions

Example:

Rank delivered orders separately.

```sql
SELECT
    *,
    DENSE_RANK() OVER(
        PARTITION BY
            CASE
                WHEN status='delivered'
                THEN 'completed'
                ELSE 'others'
            END
        ORDER BY total_amount DESC
    )
FROM orders;
```

Not very common, but good to know.

---

# Arena Problems

## Problem 1

Classify products into:

```text
Premium   -> price > 30000
Standard  -> price between 10000 and 30000
Budget    -> below 10000
```

---

## Problem 2

Classify employees into:

```text
Senior Salary Band
Mid Salary Band
Junior Salary Band
```

Choose reasonable thresholds.

---

## Problem 3

Show total delivered revenue and cancelled revenue for each payment method.

---

## Problem 4

Show active and inactive user counts for each city.
select * from users

select
	city,
	count(
		CASE
			when status ='active' then 1
		end
	) as active_count,
	count(
		CASE
			when status ='inactive' then 1
		end
	) as in_active_count
from users 
group by city

## Problem 5

Show yearly order status distribution.

Example:

```text
2025
Delivered : 5000
Cancelled : 300
Returned  : 200
```

---

select 
	DATE_PART('year', order_date) as year,
	count(
		CASE
			when status ='delivered' then 1
		end
	) as del_count,
	count(
		CASE
			when status ='returned' then 1
		end
	) as ret_count
from orders
group by DATE_PART('year', order_date)

## Problem 6

Show product inventory status:

```text
Out of Stock
Low Stock
Healthy Stock
```

based on stock quantity.

---

## Problem 7

Show employees ordered by salary category:

```text
High
Medium
Low
```

with High appearing first.

---

## Problem 8

Show monthly revenue split by payment method.

---

## Problem 9

Generate customer segmentation:

```text
VIP
Premium
Regular
```

based on total spending.

---

## Problem 10

Explain in one line:

```text
CASE WHEN -- using a simple conditions
Conditional Aggregation -- using the CASES in aggregations
```

