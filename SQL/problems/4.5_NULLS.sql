select coalesce(NULL,NULL,'RAHUL','0') -- it returns first value after null

select nullif(100,100) -- returns null, if both values are equal

select cast(id as text)-- conversion 
select id::text -- shoertcut conversion

-- Mission 1

-- Show user phone number or "Not Available".

-- there is no phone_number column in users

select COALESCE(phone_number,'Not Available') from users  

-- Mission 2

-- Show product discount or 0.

select (COALESCE(product_discount,0))

-- Mission 3

-- Calculate:

-- price - discount

-- without NULL problems.
select price - COALESCE(discount,0)

Mission 4

Avoid division by zero using NULLIF().

Mission 5

Find users without phone numbers.
-- no phone numbers colu

Type Conversion
Mission 6

Convert user ID to text.

Mission 7

Create:

ORD-00001
Mission 8

Convert current timestamp to date only.

Mission 9

Convert average order amount to numeric with 2 decimals.

Mission 10

Find orders created today using casting.
