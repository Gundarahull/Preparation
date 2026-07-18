-- VALUE FUNCTIOSN

Problem 1

For every order show:

current order amount
previous order amount


select 
	id,
	total_amount,
	lag(total_amount) over(order by id asc) as prev_amount
from orders

Problem 2

For every order show:

current order amount
next order amount


select 
	id,
	total_amount,
	lead(total_amount) over(order by id asc) as next_amount
from orders



Problem 3

For every user show:

current order amount
first order amount


select
	user_id,
	total_amount,
	first_value(total_amount) over(partition by user_id order by order_date) as first_order
from orders



Problem 4

For every user show:

current order amount
latest order amount

select
	user_id,
	total_amount,
	first_value(total_amount) over(partition by user_id order by order_date desc) as latest_order
from orders



Problem 5

For every employee salary history record show:

current salary
previous salary
salary increase amount

select *, (current_salary - prev_salary) as sal_change from 
(
	select 
		s.employee_id as emp_id,
		e.salary as current_salary,
		first_value (s.salary) over(partition by employee_id order by effective_from desc) as prev_salary
	from salaries s
	inner join employees e
	on s.employee_id = e.id
) as sumi
group by emp_id, current_salary, prev_salary



	select 
		*
	from salaries s
	inner join employees e
	on s.employee_id = e.id
	where effective_from > Now()






Problem 6

For every employee salary history record show:

current salary
next salary
expected increment amount

-- there is no next salary to the employee, which is getting zero records

	select 
		*
	from salaries s
	inner join employees e
	on s.employee_id = e.id
	where effective_from > Now()



Problem 7

For every user order show:

current order amount
difference from previous order

select *, (total_amount - prev_amount) as diff_amount from 
(

	select 
		user_id,
		total_amount,
		order_date,
		lag(total_amount) over( partition by user_id order by order_date asc) as prev_amount
	from orders
)



