select AGE(now(), created_at) from users limit 10

select created_at, created_at + interval '1 day' as plusday from users limit 10

select NOW()
select current_date


select CURRENT_TIME


select 
	id, name, created_at ,
	now()- interval '30 days' as thdays
	from users
where created_at >=now()- interval '30 days'
-- in the sql srever it was easy riht DATEDIFF('day',GET_DATE(),created_at())<=30

select 
	id,
	now()- interval '90 days' as ninty_days_back

from orders
where order_date >= now()- interval '90 days'



select  
	(DATE_PART('quarter',order_date)) as quarter,
	(DATE_PART('year',order_date)) as year,
	COUNT(id) as orders_count
from orders group by 
(DATE_PART('quarter',order_date)),
(DATE_PART('year',order_date))
order by (DATE_PART('year',order_date)) ASC ,
		(DATE_PART('quarter',order_date)) ASC

select * from orders

select SUM(total_amount),
	DATE_TRUNC('month', order_date) as monthly
from orders group by DATE_TRUNC('month', order_date)

select TO_CHAR(current_date,'dd-mm-yyyy')

select TO_CHAR(current_date,'month')



SELECT 
    id, 
    UPPER(name) AS formatted_name, 
    AGE(NOW(), created_at) AS account_age
FROM users
ORDER BY created_at ASC
LIMIT 1;
-- why acnt we use here     MAX(AGE(NOW(), created_at)) AS oldest_age

select * from (
	select 
		id, created_at, 
		TRIM(TO_CHAR(created_at,'day')) as dayyy
	from users
) as sumi
where sumi.dayyy in ('saturday', 'sunday')









