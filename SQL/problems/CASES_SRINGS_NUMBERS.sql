select * from users
select * from orders
select * from products

select * from (
	select city, count(id) as users_city from users group by city
) as sumi 
where users_city >1000

select payment_method from orders group by payment_method having count(id)>5000

select payment_method from orders group by payment_method having sum(total_amount)>5000000


select cat.name, count(p.name) from products p
inner join categories cat
on p.category_id=cat.id
group by cat.name
having count(p.name) >100

select city, avg(id) from users group by city having avg(id)>1000


-- still didnt disCuss cASES
select 
      city,
	  SUM(CASE when status='inactive' THEN 1 END) as inactive_status ,
	  count(CASE when status='active' THEN 1 END) as active_status
from users group by city 


select payment_method, status, sum(total_amount) from orders
group by payment_method, status


select count(id), extract (year from order_date) from orders
group by extract (year from order_date)


--Find average product price by category and stock range.

select * from products

select cat.name, avg(p.price) from products p
inner join categories cat
on p.category_id=cat.id
group by cat.name 

select city, count(id), EXTRACT(year from created_at) from users group by city, EXTRACT(year from created_at) order by  EXTRACT(year from created_at) desc 

SELECT
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    COUNT(*) AS total_orders
FROM orders
GROUP BY year, month
ORDER BY year, month;


-- Find delivered, cancelled and returned orders count per payment method.
select  payment_method,
 count(
	 CASE
	  when status='pending' then 1
	 END
 ) as pending_count,
 COUNT(  
  CASE
   when status='returned' then 1
  END
 ) as returned_count,
 count(case when status='delivered' then 1 end) as deliverd_status

from orders group by payment_method



select payment_method, 
	SUM( CASE WHEN status='delivered' then total_amount else 0  end) as deliverd_amount,
	SUM( CASE WHEN status='cancelled' then total_amount else 0  end) as cancelled_amount
from orders group by payment_method



select payment_method,
EXTRACT(month from order_date) as mobnt,
 COUNT (CASE WHEN status='delivered' then 1 end) as delivers_count,
 SUM (case when status='delivered' then total_amount end) as montly 
from orders group by payment_method, EXTRACT(month from order_date)

select EXTRACT(year from created_at) as yyear,
	COUNT(CASE when status='inactive' then 1 END) as inactive_users,
	COUNT(CASE when status='active' then 1 END) as active_users
from users group by EXTRACT(year from created_at)

select 
	COUNT(case when payment_method ='UPI' then 1 END) as UPIorder,
	COUNT(case when payment_method ='Debit Card' then 1 END) as DCorder,
	COUNT(case when payment_method ='Credit Card' then 1 END) as CCorder
from orders


select 
	SUM(case when price <1000 then 1 else 0 end) as 1kless,
		SUM(case when price between 1000 and 5000 then 1 else 0 end) as 5kless,
			SUM(case when price >5000 then 1 else 0 end) as 5kplus
from products


select 
	extract(year from order_date) as yearii,
	SUM( CASE WHEN status='delivered' then 1 else 0  end) as deliverd_orders,
	SUM( CASE WHEN status='cancelled' then 1 else 0  end) as cancelled_orders,
	SUM( CASE WHEN status='returned' then 1 else 0  end) as returned_orders

from orders group by extract(year from order_date)


SELECT SUBSTRING('rahul@gmail.com',1,3);


select name from users where position('@example.com' in email)>0

select * from users


select DISTINCT(substring(email,pos,LENGTH(email))) from (
	select position('@' in email) as pos, email from users
) as sumi 

SELECT
    'USER-' || LPAD(id::TEXT,5,'0')
FROM users
LIMIT 10;

select 'uswe--' || lpad('890',5,'R')

select * from products

select Round((price*10)/100,2) from products

select SUM(price,gst) as gstplus from (
	select Round((price*18)/100,2) as GST,price from products
) as sumi

select CEIL(count(id)/20) from products

select id , MOD(id,2) from users where mod(id,2)=0

select id , MOD(id,2) from users where mod(id,2)=1

select MAX(price), MIN(price), (MAX(price)-MIN(price)) as diff from products


select Round((price*5)/100,2) as cashi from products 






















