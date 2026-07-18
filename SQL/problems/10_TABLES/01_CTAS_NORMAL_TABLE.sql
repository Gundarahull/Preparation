create TABLE tabi3 (
	id int primary key,
	email varchar(50) not null
)

insert into tabi values
(3, 'a@email.com'),
(4, 'b@email.com'),
(5, 'b@email.com')

select * from tabi

create  table tabi2 as (

	select * from tabi
)

DROP table tabi2

select * from tabi2


insert into tabi3 (id,email)
select * from tabi2



