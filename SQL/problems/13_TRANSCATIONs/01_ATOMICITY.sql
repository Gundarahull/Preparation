-- TRANSCATIONS

select * from products where id in (1,2)

BEGIN;

update products
set price =100
where id=1;

update products
set price =price-200
where id=2;

COMMIT;

ACID

Atomicity

Both updates succeed or both roll back.

Consistency

Total money remains the same and all constraints remain valid.

Isolation

Other transactions shouldn't observe an inconsistent intermediate state like "Rahul debited, Arjun not yet credited" (subject to the isolation level).

Durability

After COMMIT, even a server crash won't lose the committed transfer.



| Problem             | What Changed?                                                                         |
| ------------------- | ------------------------------------------------------------------------------------- |
| Dirty Read          | Read another transaction's uncommitted changes                                        |
| Non-repeatable Read | Same row returned different values because another transaction committed an update    |
| Phantom Read        | The set of rows changed because another transaction inserted or deleted matching rows |

Where does PostgreSQL stand?

This is where PostgreSQL is impressive.

By default, PostgreSQL uses:

READ COMMITTED

Unlike some databases, PostgreSQL does not allow dirty reads, even if you ask for READ UNCOMMITTED. In PostgreSQL, READ UNCOMMITTED behaves the same as READ COMMITTED.

That means:

Problem	PostgreSQL Default (READ COMMITTED)
Dirty Read	✅ Prevented
Non-repeatable Read	❌ Possible
Phantom Read	❌ Possible


--===========================


