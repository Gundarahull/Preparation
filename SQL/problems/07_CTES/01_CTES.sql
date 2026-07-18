-- CTES

Non-Recursive
 containing average salary per department and return departments above company average salary.

 with cte_avg_salary_dept as
 (
	select dep.id,avg(salary) as avg_dept from departments dep
	inner join employees e
	on dep.id=e.department_id
	group by dep.id
 )
 select 
 * 
 from cte_avg_salary_dept  
 where avg_dept > (select avg(salary) as avg_com from employees)



Create a CTE containing total spending per user and return top 10 users.

with cte_ta as 
(
 	select user_id,sum(total_amount) as ta from orders  group by user_id
) 
select * from cte_ta order by ta desc limit 10

select user_id,sum(total_amount) as ta from orders group by user_id order by ta desc limit 10






Create a CTE containing average product price per category and return products priced above category average.

with cte_avg_pro as
(
	select c.id, avg(p.price) as avgi from categories c
	inner join products p
	on p.category_id = c.id
	group by c.id
) select * from products pr 
inner join cte_avg_pro c
on  pr.category_id = c.id
where price > avgi



Create a CTE containing total quantity sold per product and return top 10 selling products.
select * from orders

with cte_to_qa as 
(
	select 
		oi.quantity, p.id, p.name 
	from order_items oi
	inner join products p 
	on oi.product_id = p.id
)
select * from cte_to_qa order by quantity desc limit 10

select * from products


Create a CTE containing total revenue per payment method and return the highest revenue payment method.


Multiple CTEs
Build a user spending CTE and then create another CTE that classifies users as high spender or regular spender.

with cte_user AS
(
 select user_id, sum(total_amount) as per from orders group by user_id
), 
cte_user_cati AS 
(
  select 
  user_id,
  	CASE
	  when per > 90000 then 'HIGH SPENDER'
	  when per > 50000 then 'MEDIUM SPENDER'
	  ELSE 'LOW SPENDER'
	 END as user_spend_segment
  from cte_user
)
select * from users u
inner join cte_user ct
on ct.user_id = u.id

Build a department salary CTE and then another CTE for departments above average company salary.
-- one cte with avg department salry
-- another cte with avg salary of the company
-- in main query with cte1 department salary > cte2 avg company salary


Recursive
Explain anchor member and recursive member using employee hierarchy example.

-- Anchor member which runs at first iteration only one time
-- for our case the manager_id whos null is the achor member, for our bad in our arena seed all employees manager_id is null, 
-- another than anchor memner all are recursicve 


Explain why UNION ALL is generally preferred in recursive CTEs.
-- it combies the rows right UNION ALL avoids duplicate elimination and sorting, making recursion significantly faster.


Explain how recursion stops. -- >> with the breaking condition whether its in where or in joins



UPDATE employees
SET manager_id = NULL
WHERE id = 1;


UPDATE employees
SET manager_id = 1
WHERE id BETWEEN 2 AND 11;


UPDATE employees
SET manager_id = floor(random()*10)::int + 2
WHERE id BETWEEN 12 AND 100;


UPDATE employees
SET manager_id = floor(random()*89)::int + 12
WHERE id >= 101;


