-- CTES

Non-Recursive
 containing average salary per department and return departments above company average salary.

 with cte_avg_salary_dept as
 (
	select dep.id,avg(salary) as from departments dep
	inner join employees e
	on dep.id=e.department_id
	group by dep.id
	

 )

 select * from employees

 select 
 	department_id,
 	salary,
	 joining_date,
 	sum(salary) 
	OVER( partition by department_id order by joining_date  rows between current row and unbounded following) 
from employees



Create a CTE containing total spending per user and return top 10 users.
Create a CTE containing average product price per category and return products priced above category average.
Create a CTE containing total quantity sold per product and return top 10 selling products.
Create a CTE containing total revenue per payment method and return the highest revenue payment method.
Multiple CTEs
Build a user spending CTE and then create another CTE that classifies users as high spender or regular spender.
Build a department salary CTE and then another CTE for departments above average company salary.
Recursive
Explain anchor member and recursive member using employee hierarchy example.
Explain why UNION ALL is generally preferred in recursive CTEs.
Explain how recursion stops.