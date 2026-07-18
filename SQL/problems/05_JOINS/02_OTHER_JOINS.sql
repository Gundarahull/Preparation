select * from users
full join orders
on users.id=orders.user_id


select * from users
full join orders
on users.id=orders.user_id
where orders.user_id is null or users.id is null

--Show employee name and manager name.
-- by the way there is no manger assigned in the employees table, in the manager_id all are null
select * from  employees ei
join employees es 
on ei.id=es.manager_id

--Find employees without managers.
select * from  employees ei
join employees es 
on ei.id=es.manager_id
where ee.manager_id is null

--Find employees managed by a particular manager.
select ei.id from  employees ei
join employees es 
on ei.id=es.manager_id
group by es.manager_id, ei.id

-- Find departments with managers earning more than average salary.
select * from (
	select salary, dep.name,em.name, AVG(salary) as avg_salary from departments dep
	left join employees em
	on dep.id=em.department_id
	group by salary, dep.name,em.name
) as sumi
where sumi.salary> sumi.avg_salary


