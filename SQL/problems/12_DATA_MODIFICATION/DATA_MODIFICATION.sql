update users
set 
	city='Tirupati',
	status='inactive'
where id =1;

select * from users where id =1




-- UPSERT , find it, if existed update the things which u want to do, if not exists just create new one

INSERT INTO users (email, phone, status) 
VALUES ('rahul@email.com', '9999999999', 'active')
ON CONFLICT (email) -- 1. Watch out for duplicate emails!
DO UPDATE SET 
    phone = EXCLUDED.phone,   -- 2. If duplicate, update phone
    status = EXCLUDED.status; -- 3. If duplicate, update status


-- UPDATE CASE\

update products
set
	CASE
		when stock_quantity <10
		THEN stcvok_quantity+100
		ELSE stock_quantity
	END


------ RETURNING
INSERT INTO users(
    name,
    email
)
VALUES(
    'GUNDA',
    'GUNDA@gmail.com'
)
RETURNING *;-- returning id

update users
set city='Bengaluru', 
	status='active' 
where id =1 returning *;


BEGIN -> Start transaction

COMMIT -> Make changes permanent

ROLLBACK -> Forget everything

Crash before COMMIT -> Automatic rollback

Crash after COMMIT -> Changes survive


-- TRANSCTION

BEGIN;
	update products
	set price =100000
	where id =1;
	
	update products
	set price =200000
	where id =2;
COMMIT;



select DATE_PART('day', AGE(NOW(),created_at)) as party, AGE(NOW(),created_at)  from users

select *, (created_at + interval '7 days') from users where created_at > now()- interval '7 days'





