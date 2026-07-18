| SQL Server | PostgreSQL              |
| ---------- | ----------------------- |
| GETDATE()  | NOW()                   |
| ISNULL()   | COALESCE()              |
| TOP 10     | LIMIT 10                |
| YEAR(date) | EXTRACT(YEAR FROM date) |
| DATEADD()  | INTERVAL                |

| Concept         | SQL Server   | PostgreSQL                |
| --------------- | ------------ | ------------------------- |
| Current Date    | `GETDATE()`  | `NOW()`                   |
| Extract Year    | `YEAR(date)` | `EXTRACT(YEAR FROM date)` |
| Top N Rows      | `TOP 10`     | `LIMIT 10`                |
| Null Handling   | `ISNULL()`   | `COALESCE()`              |
| Date Add        | `DATEADD()`  | `INTERVAL`                |
| Date Difference | `DATEDIFF()` | `AGE()` or subtraction    |
| Identity        | `IDENTITY`   | `BIGSERIAL`               |

================  STRINGS


| Purpose           | PostgreSQL      |   |   |
| ----------------- | --------------- | - | - |
| Length            | `LENGTH()`      |   |   |
| Lowercase         | `LOWER()`       |   |   |
| Uppercase         | `UPPER()`       |   |   |
| Trim spaces       | `TRIM()`        |   |   |
| Replace text      | `REPLACE()`     |   |   |
| Extract substring | `SUBSTRING()`   |   |   |
| Find position     | `POSITION()`    |   |   |
| Split text        | `SPLIT_PART()`  |   |   |
| Concatenate       | `CONCAT()` or ` |   | ` |
| Left pad          | `LPAD()`        |   |   |
| Right pad         | `RPAD()`        |   |   |


========================Numbers============

| Function  | Purpose              |
| --------- | -------------------- |
| `ROUND()` | Decimal rounding     |
| `CEIL()`  | Round upward         |
| `FLOOR()` | Round downward       |
| `ABS()`   | Remove negative sign |
| `MOD()`   | Remainder            |
| `POWER()` | Exponent             |
| `SQRT()`  | Square root          |




| SQL Server                | PostgreSQL          |
| ------------------------- | ------------------- |
| `GETDATE()`               | `NOW()`             |
| `CURRENT_TIMESTAMP`       | `CURRENT_TIMESTAMP` |
| `CAST(GETDATE() AS DATE)` | `CURRENT_DATE`      |
| `CAST(GETDATE() AS TIME)` | `CURRENT_TIME`      |


| SQL Server               | PostgreSQL                  |
| ------------------------ | --------------------------- |
| `YEAR(date)`             | `EXTRACT(YEAR FROM date)`   |
| `MONTH(date)`            | `EXTRACT(MONTH FROM date)`  |
| `DAY(date)`              | `EXTRACT(DAY FROM date)`    |
| `DATEPART(quarter,date)` | `DATE_PART('quarter',date)` |
| `DATEPART(week,date)`    | `DATE_PART('week',date)`    |
| `DATEPART(hour,date)`    | `DATE_PART('hour',date)`    |


| SQL Server              | PostgreSQL                   |
| ----------------------- | ---------------------------- |
| `DATEADD(day,30,date)`  | `date + INTERVAL '30 days'`  |
| `DATEADD(month,3,date)` | `date + INTERVAL '3 months'` |
| `DATEADD(year,1,date)`  | `date + INTERVAL '1 year'`   |


| SQL Server                 | PostgreSQL       |
| -------------------------- | ---------------- |
| `DATEDIFF(day,start,end)`  | `end - start`    |
| `DATEDIFF(year,start,end)` | `AGE(end,start)` |

