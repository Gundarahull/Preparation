-- ISOLATIOn





BEGIN;

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT balance
FROM accounts
WHERE id = 1;

-- Another transaction updates balance

SELECT balance
FROM accounts
WHERE id = 1;

COMMIT;


---- 


BEGIN;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

SELECT * FROM accounts;

COMMIT;




-- BEGIN;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

UPDATE accounts
SET balance = balance - 2000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 2000
WHERE id = 2;

COMMIT;


const client = await pool.connect();

try {

    await client.query("BEGIN");

    await client.query(
        "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE"
    );

    await client.query(
        `UPDATE accounts
         SET balance = balance - 1000
         WHERE id = 1`
    );

    await client.query(
        `UPDATE accounts
         SET balance = balance + 1000
         WHERE id = 2`
    );

    await client.query("COMMIT");

}
catch(err){

    await client.query("ROLLBACK");

}
finally{

    client.release();

}


| Isolation Level                | What It Does                                                                                                                                             | Prevents                                                                                  | Still Allows                                                         | Common Use Cases                                                    | Should You Use It?                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| **Read Uncommitted**           | Allows reading uncommitted changes (SQL standard). **In PostgreSQL it behaves exactly like Read Committed because PostgreSQL never allows dirty reads.** | Dirty Reads (in PostgreSQL)                                                               | Non-repeatable Reads, Phantom Reads                                  | Rarely used. Mostly theoretical for PostgreSQL interviews.          | ❌ No practical use in PostgreSQL                 |
| **Read Committed** *(Default)* | Every query sees only data that was committed before that query started. A later query in the same transaction may see newer committed data.             | Dirty Reads                                                                               | Non-repeatable Reads, Phantom Reads                                  | CRUD APIs, Product Listing, User Profile, Dashboards, Order History | ✅ **Default choice for ~90–95% of applications** |
| **Repeatable Read**            | Transaction reads from the same snapshot throughout its lifetime. The same row returns the same value every time within the transaction.                 | Dirty Reads, Non-repeatable Reads *(and classic phantom reads in PostgreSQL due to MVCC)* | Serialization anomalies (certain complex concurrent write scenarios) | Financial Reports, Inventory Checks, Long-running Reports           | ✅ Use when you need a consistent snapshot        |
| **Serializable**               | PostgreSQL guarantees the outcome is equivalent to transactions running one after another. May abort conflicting transactions and require retries.       | Dirty Reads, Non-repeatable Reads, Phantom Reads, Serialization anomalies                 | None (highest isolation)                                             | Banking, Wallets, Payment Systems, Stock Trading, Booking Systems   | ✅ Use only when absolute correctness is required |
