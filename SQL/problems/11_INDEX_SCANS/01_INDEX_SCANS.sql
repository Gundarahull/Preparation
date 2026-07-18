-- INDEXING

--SCANS


| Scan Type         | Best When                               | Example                                                |
| ----------------- | --------------------------------------- | ------------------------------------------------------ |
| Sequential Scan   | Most rows are needed                    | `status='delivered'` (96% of rows)                     |
| Index Scan        | Very few rows are needed                | `email='user100@example.com'`                          |
| Bitmap Index Scan | Hundreds or thousands of scattered rows | `status='pending'` returning a moderate number of rows |


EXPLAIN
SELECT *
FROM users
WHERE city='Bengaluru';

SELECT *
FROM users
WHERE email='user100@example.com';


EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email='user100@example.com';

"Index Scan using users_email_key on users  (cost=0.29..8.30 rows=1 width=59) (actual time=0.152..0.157 rows=1.00 loops=1)"
"  Index Cond: ((email)::text = 'user100@example.com'::text)"
"  Index Searches: 1"
"  Buffers: shared hit=3"
"Planning Time: 0.354 ms"
"Execution Time: 0.221 ms"

Postgres compares its "guess" (left side) against "reality" (right side):

cost=0.29..8.30: A raw score Postgres uses to plan the query. 0.29 is the cost to start getting data, 
and 8.30 is the total estimated work. Anything under 100 is exceptionally fast.

Planning Time = The Decision: This is the "brainstorming" phase. Postgres calculates different strategies (like using an index vs. scanning the whole table) and picks the fastest path.

Execution Time = The Reality: This is the physical work phase. Postgres actually runs the query and pulls the data from your memory or hard drive.

Why Planning Time > Execution Time Means Your Query Is Lightning Fast


| Question                                        | Answer                                                                                                                                  |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Why isn't PostgreSQL using my index?            | Because the optimizer found a cheaper plan, statistics are outdated, the query returns too many rows, or the predicate is not SARGable. |
| What is SARGability?                            | A query that allows PostgreSQL to efficiently use an index.                                                                             |
| What is Predicate Pushdown?                     | Applying filters as early as possible to reduce the amount of data processed.                                                           |
| Difference between EXPLAIN and EXPLAIN ANALYZE? | `EXPLAIN` shows the estimated execution plan. `EXPLAIN ANALYZE` executes the query and shows actual runtime statistics.                 |
