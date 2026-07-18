-- Find payment methods that appear in both delivered and returned orders.


select payment_method from orders
where status='delivered' 
INTERSECT
select payment_method from orders
where status='returned' 

-- Find payment methods that appear in delivered orders but do not appear in returned orders.
select payment_method from orders
where status='delivered' 
EXCEPT
select payment_method from orders
where status='returned' 

