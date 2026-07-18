-- PAGINATION OPTIMIZATION
select id from orders
OFFSET 100000
LIMIT 20;

-- 100k rows throw away and only 20


-- HIGH OPTIMIZATION RIGHT
instead of that
WHERE id>100000
ORDER BY id
LIMIT 20;
