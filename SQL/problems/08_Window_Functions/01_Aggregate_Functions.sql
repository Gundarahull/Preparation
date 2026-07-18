-- WINDOW FUNCTION

OVER() -- TURNING INTO WINDOW FUNCTION
PARTITION BY - CREATES DESIRED WINDOW
ORDER BY -- SORTING THE WINDOW
PRECEDDING _ MUNDHU unnavi
FOLLOWING -- TABRTHA


Mission 1

Show every employee with:

salary
company average salary


select 
	id,
	salary,
	AVG(salary) OVER() as company_avg_salary
from employees



Mission 2

Show every employee with:

salary
department average salary

select 
	id,
	salary,
	AVG(salary) OVER() as company_avg_salary
from employees


Mission 3

Show every employee with:

salary
number of employees in their department

select 
	id,
	salary,
	department_id,
	count(id) over(partition by department_id order by department_id asc)
from employees

Mission 4

Show every employee with:

salary
highest salary in their department


select 
	id,
	name,
	salary,
	department_id,
	max(salary) over(partition by department_id) as max_salary_dep
from employees
order by department_id asc


Mission 5

Show every employee with:

salary
lowest salary in their department

select 
	id,
	name,
	salary,
	department_id,
	min(salary) over(partition by department_id) as max_salary_dep
from employees
order by department_id asc

Mission 6

Show every order with:

order amount
total number of orders in the system


select
 id,
 total_amount,
 count(id) over() as total_orders
from orders


Mission 7

Show every order with:

order amount
cumulative revenue till that order date


select 
	id,
	total_amount,
	order_date,
	sum(total_amount) over(order by order_date rows between unbounded preceding and current row) as cummi
from orders

Mission 8

Show every user order with:

order amount
total spending by that user till that order

select
	id,
	user_id,
	total_amount,
	order_date,
	sum(total_amount) over(partition by user_id order by order_date rows between unbounded preceding and current row) as till
from orders

