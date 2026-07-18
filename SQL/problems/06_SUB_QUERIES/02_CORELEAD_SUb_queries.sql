Find employees earning more than the average salary of their own department.

select * from employees e1
inner join (
	select employees.department_id as e2_id,AVG(salary) as avg_salary from employees
	group by employees.department_id
	order by employees.department_id
) as sumi
on e1.department_id = sumi.e2_id
where e1.salary > sumi.avg_salary


-- Find products priced above the average price of products in their own category.

select * from products p1 
inner join (
	select AVG(price) as avgp, category_id from products
	group by category_id
) p2
on p1.category_id =p2.category_id
where p1.price> avgp



--Find orders whose total amount is greater than the average order amount of that particular user.


select * from orders o1 inner join 
(

	select avg(total_amount) as avgi, user_id as ta from orders
	group by user_id
) as o2
on o1.user_id = o2.ta
where o1.total_amount> o2.avgi


-- Find users who have placed at least one order.

select * from users where id in (
	select user_id  from orders
	group by user_id
	having count(user_id)>=1
)



Subquery -- query whihin the query
Scalar query >> which returns only one value
Multi-row Subquery >> which returns multiple  values
Correlated Subquery >> inner query releated to outer qiery
EXISTS --return anything, it doesnt care about what u returned
NOT EXISTS -- opposite to exists





