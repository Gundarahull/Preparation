Exercise 1

Find orders placed by inactive users.

select * from users
inner join orders
on users.id= orders.user_id 
where users.status='inactive' --4012

select * from orders where user_id in (select id from users where status='inactive')

Exercise 2

Find orders placed by active users.
select * from orders where user_id in (select id from users where status='active')


Exercise 3

Find products that have appeared in at least one order item.

select name from products where id in (
	select product_id from order_items group by product_id having count(product_id)>1
)


select count(product_id) from order_items where product_id =1698

Exercise 4

Find products that have never appeared in any order item.

select name from products where id not in (
	select product_id from order_items group by product_id having count(product_id)>1
)

Exercise 5

Find employees whose department belongs to:

Engineering
Product
Finance

select * from employees where department_id in (select id from departments where name in ('Engineering',
'Product',
'Finance'))

Exercise 6

Find employees that do not belong to those departments.
select * from employees where department_id NOT in (select id from departments where name in ('Engineering',
'Product',
'Finance'))

Exercise 7

Find employees earning more than at least one employee in department 1.

select * from employees where salary >(
select Min(salary) from employees where department_id=1

)



Exercise 8

Find employees earning more than every employee in department 1.
select * from employees where salary >(
select max(salary) from employees where department_id=1

)

Exercise 9

Explain:

IN >> in refers to OR
NOT IN >> ooposite to IN 
ANY >> it can chhose any value 
ALL >> it will search all value which returned

in one line each.

Exercise 10

When would you prefer:

IN

vs

EXISTS

We'll answer that properly in correlated subqueries.