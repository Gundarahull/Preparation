-- RANK FUNCTIONS

-- ROW_NUMBER() >> for each value it gives unique rank, even the values duplicates

-- even if its common, to differ the values we will use ROW_NUMBER()
-- suppose if 
-- 100 -1
-- 90 -2
-- 90 -3
-- 80- 4

--============================================================================================

-- RANK()
-- for the same values it will give eqal rank
-- suppose if 
-- 100 -1
-- 90 -2
-- 90 -2
-- 80- 4

-- it will give GAPS

-- we use this when ties happens
--====================================================================================================
-- DENSE RANK()

-- same as rank but fill gaps
-- suppose if 
-- 100 -1
-- 90 -2
-- 90 -2
-- 80- 3

-- it will fill the  GAPS


--============================================
NTILE(4) -- divides whole thing into 4 sub parts



SELECT
    user_id,
    total_amount,
    NTILE(4) OVER(
        ORDER BY total_amount DESC
    ) AS quartile
FROM orders;




Problem 1

Find the highest paid employee in the company.

select
name,
id
from employees where salary = (select MAX(salary) from employees)

select * from (

select
	name,
	id,
	DEnsE_rank() over(order by salary) as densi
from employees 
) as sumi
where densi = 1



Problem 2

Find the top 3 highest paid employees in each department.


select * from 
(
	select
		id,
		name,
		department_id,
		salary,
		dense_rank() over(partition by department_id order by salary  desc) as sal
	from employees
) sumi
where sal <=3




Problem 3

Find all employees having the highest salary in their department.

select * from 
(
	select
		id,
		name,
		department_id,
		salary,
		dense_rank() over(partition by department_id order by salary ) as sal
	from employees
) as sumi
where sal=1


Problem 4

Find the latest order placed by every user.

select * from (
	select 
		user_id,
		order_date,
		dense_rank() over(partition by user_id order by order_date desc) as od
	from orders
) as sumi
where od=1


Problem 5

Find the first order placed by every user.
select * from (
	select 
		user_id,
		order_date,
		dense_rank() over(partition by user_id order by order_date asc) as od
	from orders
) as sumi
where od=1

Problem 6

Find the top 5 spending users based on total spending.


	SELECT
	    user_id,
	    SUM(total_amount) AS total_user_spend
	FROM orders
	GROUP BY user_id
	order by  total_user_spend desc
	limit 5







Problem 7

Find all users sharing the same spending rank as the highest spender.

SELECT user_id, total_spent
FROM (
    SELECT 
        user_id,
        SUM(total_amount) AS total_spent,
        DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS spend_rank
    FROM orders
    GROUP BY user_id
) AS ranked_users
WHERE spend_rank = 1;







Problem 8

Find the 2nd highest salary in the company.

select * from (
	select 
		id,
		name,
		salary,
		DENSE_RANK() OVER(order by salary desc) as densi
	from employees
) as sumi
where sumi.densi=2

OR

select id, salary from employees order by salary desc offset 2 limit 1



Problem 9

Find the 3rd highest salary in every department.
select * from (
	select 
		id,
		name,
		salart
		DENSE_RANK() OVER(order by salary desc) as densi
	from employees
) as sumi
where densi=3

or 

Problem 10

Generate a leaderboard of products based on total quantity sold.

If two products sell the same quantity, they should share the same position and the next position should not be skipped.



select 
	*, DENSE_RANK()  OVER(order by  sumii desc), p.name from 
(
	select
		product_id,
		sum(quantity) as sumii
	from order_items
	group by product_id
) as sumi
inner join products p
on sumi.product_id = p.id






Problem 11

Divide employees into 4 salary buckets from highest to lowest.


select 
	salary,
	name,
	NTILE(4) over(order by salary desc) as segi
from employees




Problem 12

Find employees whose salary belongs to the top 10% of the company.

SELECT name, salary, p AS percentile_score
FROM (
    SELECT 
        name,
        salary,
        PERCENT_RANK() OVER (ORDER BY salary DESC) AS p
    FROM employees
) AS ranked_employees
WHERE p <= 0.10;


Problem 13

For every department, show:

employee name
salary
rank within department
total employees in department

select 
	name,
	salary,
	department_id,
	DEnsE_RANK() over(partition by department_id order by salary desc) as ranki,
	COUNT(id) over(partition by department_id) as tot_emp_in_dep
from employees








Problem 14

For every user order show:

order amount
order sequence number for that user



select 
	user_id,
	id,
	total_amount,
	order_date,
	row_number() over(partition by user_id order by order_date asc) as dsni
from orders

Example:

Rahul
Order1 -> 1
Order2 -> 2
Order3 -> 3
Problem 15

For every employee show:

company salary rank
department salary rank

select *from
(
	select 
		name,
		id,
		salary,
		department_id,
		dense_rank() over(partition by department_id order by salary desc) as sal_dept_rank,
		dense_rank() over(order by salary desc) as sal_cop_rank
	from employees
) as sumi
order by department_id asc , sal_dept_rank asc

--1015 1725


| Requirement               | Function     |
| ------------------------- | ------------ |
| Exactly one winner        | ROW_NUMBER   |
| Ties allowed with gaps    | RANK         |
| Ties allowed without gaps | DENSE_RANK   |
| Buckets                   | NTILE        |
| Percentile                | PERCENT_RANK |
| Distribution              | CUME_DIST    |
















