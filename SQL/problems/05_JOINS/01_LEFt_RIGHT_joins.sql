-- Mission 1

-- Show all orders and corresponding user names using RIGHT JOIN.

select * from users
right join orders
on orders.user_id =users.id

-- Mission 2

-- Rewrite Mission 1 using LEFT JOIN.

select * from orders left join users on orders.user_id=users.id

-- Mission 3

-- Show all categories and corresponding products using RIGHT JOIN.

select * from products pro right join categories cat on pro.category_id=cat.id

-- Mission 4

-- Rewrite Mission 3 using LEFT JOIN.
select * from categories cat left join products pro on pro.category_id=cat.id

-- Mission 5

-- Show all departments and employees using RIGHT JOIN.
select * from employees right join departments dep dep.id = employees.department_id

-- Mission 6

-- Rewrite Mission 5 using LEFT JOIN.
select * from departments dep left join employees  dep.id = employees.department_id


-- Mission 7

-- Find departments with no employees using RIGHT JOIN.

select * from employees right join departments dep on dep.id=employees.department_id where employees.department_id is null

-- Mission 8

-- Rewrite Mission 7 using LEFT JOIN.

select * from departments dep left join employees on dep.id=employees.department_id where employees.department_id is null


-- Mission 9

-- In one sentence explain:

-- LEFT JOIN
-- RIGHT JOIN

-- in the left join we make list all the rows which is left side of the left join.
-- same as for right join but we mostly left join 
-- Mission 10

-- Would you use RIGHT JOIN in production code?
-- we most mostly left join, right join is again a swap of left join double work

-- usually prefer LEFT JOIN because it keeps the query flow left-to-right and improves readability. RIGHT JOIN can always be rewritten as LEFT JOIN by swapping table order.

Honestly, if you understand LEFT JOIN properly, you've basically already learned RIGHT JOIN. The rest is just table positioning. ⚔️