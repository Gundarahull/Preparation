Good morning, man! ☀️

Let's prepare you for this properly. Since you have **2+ years of experience as a Node.js Backend Developer**, interviewers will expect more than definitions and basic coding.

At this experience level, interviewers want to understand three things:

1. **Technical knowledge:** Do you understand how Node.js, Express, databases, Redis, and APIs work internally?
2. **Real-time problem solving:** Can you handle production issues, concurrency, performance, failures, and unexpected situations?
3. **Practical experience:** Have you actually implemented these concepts, or do you only know the theory?

My recommendation is to prepare scenario-based questions rather than simply memorizing 500 theoretical questions.

I'll organize this into a comprehensive interview question bank, divided by probability:

**Interview preparation priority**

Very high probability

Must prepare

Node.js internals, APIs, async operations, database queries, authentication, error handling, Redis, concurrency.

High probability

Important

Transactions, caching, performance, security, scalability, production debugging, background jobs.

Medium probability

Should prepare

Microservices, message queues, WebSockets, AWS, database architecture, system design.

Low probability

Advanced preparation

Distributed systems, advanced event-loop behavior, memory leaks, fault tolerance, unusual production scenarios.

# **Part 1. Node.js core scenarios**

Very high probability

These questions are extremely important for a Node.js developer with 2+ years of experience.

### **1. Your Node.js API is taking 10 seconds to respond. How would you debug it?**

**Answer:**

First, I would identify where the delay is happening.

My debugging approach:

1. Check API response time using logs and monitoring.
2. Check whether the database query is taking more time.
3. Check external API calls.
4. Identify whether synchronous operations are blocking the event loop.
5. Check CPU and memory utilization.
6. Use profiling tools if necessary.

For example, if a database query takes 8 seconds, I would analyze the query, check indexes, and optimize it.

If an external API is slow, I would consider timeouts, retries, and parallel execution where appropriate.

**Interviewer expects:** You should not immediately say, "I will increase the server capacity." First identify the bottleneck.

### **2. Your Node.js server is handling 1,000 requests simultaneously. How does it manage them?**

**Answer:**

Node.js uses a single JavaScript execution thread with an event-driven, non-blocking I/O architecture.

When requests arrive:

- Node.js receives them through the event loop.
- I/O operations such as database queries and network requests are handled asynchronously.
- While waiting for I/O, Node.js can process other requests.
- When an operation completes, its callback or promise continuation gets scheduled for execution.

However, CPU-intensive operations can block the event loop.

For CPU-heavy tasks, I would use worker threads or separate background processing.

### **3. What happens if you use a synchronous function inside an API?**

**Answer:**

Synchronous operations block the JavaScript execution thread.

For example:

```
app.get("/data", (req, res) => {
    const data = fs.readFileSync("large-file.txt");
    res.json(data.toString());
});
```

While the file is being read, the event loop cannot execute other JavaScript callbacks.

If multiple requests arrive, they may have to wait.

I would use the asynchronous version instead:

```
const data = await fs.promises.readFile("large-file.txt");
```

### **4. An API calls three independent external APIs. How would you reduce response time?**

**Answer:**

If all three API calls are independent, I would execute them in parallel using `Promise.all()`.

```
const [users, orders, products] = await Promise.all([
    getUsers(),
    getOrders(),
    getProducts()
]);
```

With sequential execution, the total time is approximately the sum of all three operations.

With parallel execution, the total time is approximately the duration of the slowest operation.

However, if one operation fails, `Promise.all()` rejects. If I need individual success and failure results, I would use `Promise.allSettled()`.

### **5. What happens if one promise fails inside Promise.all?**

**Answer:**

`Promise.all()` immediately rejects when one of its promises rejects.

It does not automatically cancel the other ongoing operations.

If I want to process all results regardless of individual failures, I use `Promise.allSettled()`.

```
const results = await Promise.allSettled([
    getUsers(),
    getOrders(),
    getProducts()
]);
```

This gives me the status and result or error of each operation.

### **6. Your API is stuck and other requests are also getting delayed. What could be the reason?**

**Answer:**

One possible reason is event-loop blocking.

For example:

- Infinite loops.
- Large synchronous JSON processing.
- CPU-intensive calculations.
- Synchronous file operations.
- Expensive regular expressions.

I would investigate event-loop lag and CPU utilization.

For CPU-intensive work, I would move processing to worker threads or a separate service.

### **7. How would you handle an unhandled promise rejection?**

**Answer:**

I would ensure every asynchronous operation has proper error handling.

For example:

```
try {
    const user = await User.findByPk(id);
    return user;
} catch (error) {
    logger.error(error);
    throw error;
}
```

At the Express level, I would forward errors to centralized error-handling middleware.

I would also configure process-level monitoring for unexpected failures.

I would not simply swallow the error or continue operating in an unknown application state.

### **8. What happens if your Node.js application crashes in production?**

**Answer:**

First, I would identify the root cause using application logs and monitoring.

I would ensure the application is managed by a process manager or container orchestration platform that can restart failed instances.

For example:

- PM2 for process management.
- Docker with a restart policy.
- Kubernetes for container orchestration.

I would also investigate the crash, fix the root cause, and deploy a proper solution.

I would not rely only on automatic restarts.

### **9. How would you handle CPU-intensive tasks in Node.js?**

**Answer:**

Node.js is suitable for I/O-intensive applications, but CPU-intensive tasks can block its event loop.

For CPU-intensive operations, I can use:

- Worker Threads for parallel JavaScript execution.
- Child Processes for separate processes.
- Background workers for asynchronous business operations.

For example, generating a large PDF or processing a large file can be moved outside the main request-handling thread.

### **10. What is the difference between worker threads and child processes?**

**Answer:**

Worker Threads run JavaScript in separate threads within the same process. They can share memory through mechanisms such as SharedArrayBuffer.

Child Processes create separate operating-system processes with independent memory spaces.

I would use Worker Threads for CPU-intensive JavaScript calculations and Child Processes when I need process isolation or want to execute another program.

# **Part 2. Express.js and REST API scenarios**

Very high probability

### **11. Your API is receiving duplicate requests. How would you prevent duplicate records?**

**Answer:**

I would first identify why duplicate requests are happening.

Possible reasons:

- User double-clicking the submit button.
- Network retry.
- Client timeout followed by another request.
- Multiple requests reaching the server simultaneously.

For important operations such as payments or bookings, I would implement idempotency.

The client sends an idempotency key. The server stores that key with the operation result.

If the same key arrives again, I return the previously stored result instead of processing the operation again.

I would also use database unique constraints to provide an additional layer of protection.

### **12. An API request is taking too long, and the client sends the same request again. How would you handle it?**

**Answer:**

I would use idempotency for operations where duplicate execution is dangerous.

For example, suppose a payment request is submitted twice.

The first request processes the payment, but the response is delayed.

The second request should not create another payment.

I would associate both requests with the same idempotency key and return the original transaction result.

### **13. How do you handle errors in multiple controllers?**

**Answer:**

I would implement centralized error-handling middleware.

Instead of writing the same error response logic in every controller, I would pass errors to a common middleware.

```
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});
```

This keeps the application consistent and easier to maintain.

In production, I would avoid exposing stack traces or sensitive internal details.

### **14. What happens if you forget to call next() in Express middleware?**

**Answer:**

If middleware neither sends a response nor calls `next()`, the request remains pending.

The client may eventually receive a timeout.

For example, authentication middleware must either reject the request or allow it to continue.

### **15. How would you implement role-based authorization?**

**Answer:**

I would separate authentication and authorization.

Authentication verifies who the user is.

Authorization verifies what the user is allowed to do.

For example:

- User can view their own profile.
- Admin can view all users.
- Manager can access team-related information.

I would verify the user's identity using JWT or another authentication mechanism, then check their role or permissions in middleware before allowing access.

### **16. Your API works in Postman but fails from the frontend. What would you check?**

**Answer:**

I would investigate:

1. CORS configuration.
2. Request headers.
3. Authorization token.
4. HTTP method and URL.
5. Request payload.
6. Cookie credentials and SameSite settings, if cookies are used.
7. Browser network and console errors.

Postman does not enforce browser CORS restrictions, so CORS is one of the first things I would check.

### **17. How would you handle API rate limiting?**

**Answer:**

Rate limiting restricts the number of requests a client can make within a specific time window.

For example, allowing 100 requests per minute per client.

I can use Redis to maintain request counters with expiration.

When the limit is exceeded, I return HTTP 429.

For distributed deployments, Redis is useful because multiple application instances can share the same rate-limit state.

### **18. An API receives a large file upload. How would you handle it efficiently?**

**Answer:**

I would use streaming instead of loading the entire file into memory.

I would also:

- Set file-size limits.
- Validate file type and content.
- Restrict allowed file extensions.
- Store files in S3 or another object-storage service.
- Use multipart or streaming uploads for large files.

For example, I have worked with AWS S3 and Cloudinary for file-storage integrations.

### **19. How would you design pagination for an API containing millions of records?**

**Answer:**

For smaller datasets, offset-based pagination can be sufficient.

For example:

```
SELECT *
FROM users
ORDER BY id
LIMIT 20 OFFSET 100;
```

However, large offsets can become expensive.

For large datasets, I would prefer cursor-based pagination using an indexed column such as `id` or `created_at`.

```
SELECT *
FROM users
WHERE id > 1000
ORDER BY id
LIMIT 20;
```

Cursor-based pagination is generally more efficient for large datasets and avoids some issues caused by records being inserted between pages.

### **20. Your API is returning sensitive user information. How would you prevent it?**

**Answer:**

I would never return the entire database object directly.

Instead, I would explicitly select or serialize the required fields.

For example:

```
const response = {
    id: user.id,
    name: user.name,
    email: user.email
};
```

I would exclude passwords, password hashes, tokens, and other sensitive information.

# **Part 3. Database and SQL scenarios**

Very high probability

Since backend interviews heavily focus on database operations, transactions, query optimization, and concurrent updates, prepare these carefully.

### **21. Two users try to purchase the last available product simultaneously. How would you handle it?**

**Answer:**

This is a concurrency problem.

Suppose product stock is 1.

Two users send purchase requests simultaneously. Both might read stock as 1 and attempt to purchase.

To prevent this, I would use a database transaction and an atomic conditional update.

```
UPDATE products
SET stock = stock - 1
WHERE id = 101
AND stock > 0
RETURNING stock;
```

If the update returns a row, the purchase can continue.

If no row is returned, the product is out of stock.

I would perform the remaining order operations in the same transaction.

This prevents overselling because the database performs the conditional update atomically.

### **22. An order requires inserting data into three tables. What happens if the second insert fails?**

**Answer:**

I would use a database transaction.

Suppose an order involves:

1. Inserting into the orders table.
2. Inserting into the order_items table.
3. Updating product stock.

If the second operation fails, I would roll back the transaction.

This ensures that either all the operations succeed or none of them are committed.

With Sequelize:

```
const transaction = await sequelize.transaction();

try {
    const order = await Order.create(
        orderData,
        { transaction }
    );

    await OrderItem.create(
        itemData,
        { transaction }
    );

    await transaction.commit();
} catch (error) {
    await transaction.rollback();
    throw error;
}
```

### **23. Your database query is taking 15 seconds. How would you optimize it?**

**Answer:**

I would follow these steps:

1. Identify the slow query.
2. Analyze the execution plan using `EXPLAIN ANALYZE`.
3. Check whether appropriate indexes exist.
4. Avoid unnecessary columns using `SELECT *`.
5. Optimize joins and filtering conditions.
6. Check whether the query is returning too many records.
7. Check database locks and connection-pool utilization.

If the query is repeatedly accessing the same data, I would also consider caching.

### **24. Two transactions are updating the same record. How would you handle it?**

**Answer:**

I would consider transaction isolation and locking mechanisms.

Depending on the business requirement, I can use:

- Pessimistic locking using `SELECT FOR UPDATE`.
- Optimistic locking using a version column.
- Atomic SQL updates.

For example, if two admins update the same product, optimistic locking can help detect whether someone else modified the record before the update.

If the version has changed, I would reject the stale update and ask the client to refresh.

### **25. What is a database deadlock? How would you resolve it?**

**Answer:**

A deadlock occurs when two or more transactions hold locks on resources and wait for each other to release them.

Example:

- Transaction A locks record 1 and waits for record 2.
- Transaction B locks record 2 and waits for record 1.

Neither can proceed.

I would reduce the possibility of deadlocks by:

- Accessing records in a consistent order.
- Keeping transactions short.
- Avoiding unnecessary locks.
- Creating appropriate indexes.
- Implementing retries for transactions aborted due to deadlocks.

### **26. Your application is receiving more requests, but database connections are exhausted. What would you do?**

**Answer:**

I would first check the connection pool configuration.

Possible reasons:

- Connections are not being released.
- Too many concurrent queries.
- Pool size is too small.
- Long-running transactions.
- Multiple application instances are using excessive connections.

I would configure an appropriate connection pool with minimum and maximum connections, timeouts, and idle settings.

I would also calculate the total connection requirement across all application instances and ensure it does not exceed the database connection limit.

### **27. How would you prevent SQL injection?**

**Answer:**

I would use parameterized queries instead of directly concatenating user input into SQL queries.

Unsafe:

```
const query = `SELECT * FROM users WHERE email = '${email}'`;
```

Safer:

```
const result = await sequelize.query(
    "SELECT * FROM users WHERE email = :email",
    {
        replacements: { email },
        type: QueryTypes.SELECT
    }
);
```

I would also validate user inputs and avoid dynamically constructing SQL identifiers from untrusted input.

### **28. A user updates their profile while another request updates the same profile. How would you prevent lost updates?**

**Answer:**

I would use optimistic locking.

For example, every record has a version number.

Initially:

```
id = 1
name = Rahul
version = 1
```

The update query checks the version:

```
UPDATE users
SET name = 'New Name',
    version = version + 1
WHERE id = 1
AND version = 1;
```

If another request has already updated the record, the version will no longer match.

The second request will affect zero rows, and I can return a conflict response.

### **29. Your database contains 10 million records. How would you improve read performance?**

**Answer:**

I would:

- Create indexes based on actual query patterns.
- Use pagination.
- Avoid unnecessary columns.
- Optimize joins.
- Analyze slow queries.
- Use Redis caching for frequently accessed data.
- Consider read replicas if read traffic is high.
- Consider partitioning when the data-access pattern justifies it.

I would not blindly create indexes on every column because indexes also increase storage and write overhead.

### **30. When would you use a database transaction instead of separate queries?**

**Answer:**

Whenever multiple database operations must succeed or fail together.

For example, transferring money between two accounts:

- Deduct money from account A.
- Add money to account B.
- Insert a transaction record.

All three operations should be part of one transaction.

If one operation fails, everything should roll back.

### **31. Your API updates a record, but the frontend still displays old data. What could be wrong?**

**Answer:**

I would investigate:

- Whether the database update actually succeeded.
- Whether the API returns the updated record.
- Whether the frontend maintains stale state.
- Whether Redis or another cache contains old data.
- Whether a read replica has replication lag.
- Whether an HTTP cache is returning an old response.

I would identify which layer contains stale data before changing anything.

### **32. How would you handle database schema changes in production without losing data?**

**Answer:**

I would use database migrations instead of manually modifying production tables.

For risky changes, I would follow an expand-and-contract approach.

For example, when renaming a column:

1. Add the new column.
2. Support both old and new columns temporarily.
3. Backfill existing data.
4. Update application code to use the new column.
5. Verify everything.
6. Remove the old column in a later deployment.

This avoids breaking older application instances during deployment.

# **Part 4. Redis and caching scenarios**

Very high probability

Man, this is an important section. Redis questions are increasingly common in backend interviews, especially for developers who mention Redis in their resumes.

### **33. An API repeatedly fetches the same data from the database. How would you optimize it?**

**Answer:**

I would implement Redis caching using the cache-aside pattern.

The flow:

1. Check whether the data exists in Redis.
2. If it exists, return the cached data.
3. If it doesn't exist, fetch from the database.
4. Store the result in Redis with an appropriate TTL.
5. Return the result.

```
const cached = await redis.get(key);

if (cached) {
    return JSON.parse(cached);
}

const user = await User.findByPk(id);

await redis.set(
    key,
    JSON.stringify(user),
    "EX",
    300
);

return user;
```

This reduces repeated database queries.

### **34. Admin updates a product price from ₹100 to ₹200, but Redis still contains ₹100. How would you handle it?**

**Answer:**

This is a cache invalidation problem.

Whenever the admin updates the product price, I would update the database first and then invalidate the corresponding Redis key.

```
await Product.update(
    { price: 200 },
    { where: { id: productId } }
);

await redis.del(`product:${productId}`);
```

The next request will fetch the latest value from the database and populate Redis again.

For more complex distributed systems, I would consider reliable cache invalidation using events or an outbox pattern.

### **35. A request reads the old database value, but an admin updates the value at almost the same time. The old value gets inserted into Redis. How would you solve this?**

**Answer:**

This is a cache race condition.

For example:

1. Request A reads ₹100 from the database.
2. Admin updates the price to ₹200.
3. Admin invalidates the Redis key.
4. Request A writes the old ₹100 into Redis.

Now Redis contains stale data even though the database has ₹200.

One solution is to use versioned cache keys or a carefully coordinated locking/version-check mechanism.

Another practical approach is to use a write-through or event-driven cache update strategy with version validation.

For critical data, I would avoid relying on Redis as the source of truth and read directly from the database.

### **36. What happens if Redis goes down? Will your entire application stop working?**

**Answer:**

It depends on how Redis is used.

If Redis is only used for caching, I would implement graceful degradation.

If Redis is unavailable:

- Log the failure.
- Fall back to the database where safe.
- Avoid allowing cache errors to break the business operation.

However, if Redis is used for sessions, distributed locks, queues, or rate limiting, the impact is different.

For critical operations, I would define a failure strategy instead of blindly bypassing Redis.

### **37. Two requests try to acquire the same Redis lock simultaneously. How would you prevent this?**

**Answer:**

I would use Redis `SET` with the `NX` and `EX` options.

```
const result = await redis.set(
    "lock:order:101",
    uniqueToken,
    "EX",
    10,
    "NX"
);
```

`NX` means the key is created only if it does not already exist.

`EX` sets an expiration time.

Only one request should successfully acquire the lock.

I would also use a unique lock token so that a request only releases a lock that it owns.

### **38. Your Redis lock expires after 10 seconds, but the operation takes 15 seconds. What happens?**

**Answer:**

The lock expires after 10 seconds even though the original operation is still running.

Another request can acquire the same lock, causing both operations to execute simultaneously.

To solve this, I would consider:

- Appropriate lock TTL.
- Lock renewal or extension.
- Fencing tokens for protected resources.
- Atomic ownership checks while releasing locks.

For critical operations, I would ensure the database also protects the business invariant. A Redis lock alone should not be the only protection against duplicate processing.

### **39. What is a fencing token? Why is it required?**

**Answer:**

A fencing token is a monotonically increasing number assigned whenever a new lock is acquired.

For example:

- Request A gets token 10.
- Its lock expires.
- Request B gets token 11.
- Request A wakes up and tries to update the resource.

The resource should reject token 10 because it has already accepted token 11.

This prevents an old lock holder from performing stale operations.

The important point is that the protected resource must validate the fencing token. Merely generating the token in Redis is not enough.

### **40. Redis memory is full. What would you do?**

**Answer:**

I would check:

- Redis memory usage.
- Key sizes.
- TTL configuration.
- Large collections.
- Keys that are never expiring.
- Memory eviction policy.

I would remove unnecessary keys, optimize data structures, and configure an appropriate eviction policy based on the application requirement.

I would also monitor Redis memory continuously.

### **41. How would you implement distributed rate limiting using Redis?**

**Answer:**

I would use an atomic counter with expiration.

For example, a user can make 100 requests per minute.

Redis stores the request count against a key:

```
rate_limit:user:101
```

For each request, increment the counter.

If the counter exceeds 100, return HTTP 429.

For production, I would use an atomic Lua script or another atomic Redis operation to avoid race conditions between incrementing and setting the expiration.

### **42. How would you handle cache stampede?**

**Answer:**

A cache stampede occurs when a popular cache key expires and many requests simultaneously query the database to regenerate it.

I would consider:

- Cache locking.
- TTL jitter to avoid simultaneous expirations.
- Background cache refresh.
- Stale-while-revalidate.
- Request coalescing.

For example, only one request refreshes the cache while other requests wait or use an acceptable stale value.

### **43. What is the difference between Redis Pub/Sub and Redis Streams?**

**Answer:**

Redis Pub/Sub is a message broadcasting mechanism.

Subscribers receive messages while they are connected. If they disconnect, they generally miss those messages.

Redis Streams provide persistent messages, IDs, consumer groups, and message acknowledgment mechanisms.

I would use Pub/Sub for real-time notifications where missing a message may be acceptable.

I would consider Streams or a durable message queue when message processing and recovery are important.

# **Part 5. Authentication and security scenarios**

Very high probability

### **44. A JWT token expires while a user is using the application. How would you handle it?**

**Answer:**

I would implement access tokens and refresh tokens.

Access tokens have a short expiration time.

Refresh tokens have a longer lifetime and are used to generate new access tokens.

When an access token expires, the frontend can use the refresh token to obtain a new one.

I would also implement refresh-token rotation and revocation to reduce the impact of token theft.

### **45. A user changes their password, but their old JWT is still valid. How would you invalidate it?**

**Answer:**

JWTs are stateless, so changing the password does not automatically invalidate an already-issued token.

I would use a token-version or token-revocation strategy.

For example, maintain a `tokenVersion` field for the user.

When the password changes, increment the version.

The JWT contains the version at the time it was issued. During authentication, compare it with the current version.

If they differ, reject the token.

Another option is maintaining a revocation list in Redis until the token expires.

### **46. How would you securely store passwords?**

**Answer:**

I would never store passwords in plain text or encrypt them using reversible encryption.

I would use a password-hashing algorithm such as Argon2id or bcrypt with an appropriate cost configuration and unique salts.

During login, I would compare the submitted password against the stored hash using the algorithm's verification function.

### **47. How would you prevent brute-force login attacks?**

**Answer:**

I would implement:

- Rate limiting by IP and account.
- Increasing delays for repeated failures.
- Temporary account protection where appropriate.
- Monitoring suspicious login attempts.
- MFA for sensitive accounts.

I would avoid revealing whether the email or password was incorrect to reduce account enumeration.

### **48. A JWT is valid, but the user is trying to access another user's data. How would you prevent it?**

**Answer:**

Authentication alone is not enough.

I would implement authorization checks at the resource level.

For example:

```
const order = await Order.findOne({
    where: {
        id: orderId,
        userId: req.user.id
    }
});
```

This ensures the user can access only their own order.

For admin access, I would separately verify permissions.

### **49. How would you securely store JWT tokens in a browser-based application?**

**Answer:**

I would generally prefer secure, HttpOnly, SameSite cookies for refresh tokens in browser applications.

The cookie should also use the Secure flag in HTTPS environments.

I would implement CSRF protection where required.

I would avoid storing long-lived sensitive tokens in localStorage because JavaScript can access them if the application suffers an XSS attack.

### **50. Your API key or database credentials are accidentally committed to GitHub. What would you do?**

**Answer:**

I would immediately revoke or rotate the exposed credentials.

Then:

1. Remove the credentials from the source code.
2. Move secrets to a secure environment or secrets manager.
3. Review access logs for suspicious usage.
4. Remove the secret from repository history where appropriate.
5. Add secret scanning to the development workflow.

Simply deleting the secret from the latest commit is not enough because it may still exist in Git history.

# **Part 6. Production debugging and performance**

High probability

These questions separate developers who have worked on real applications from developers who only know theoretical concepts.

### **51. Your application's memory usage continuously increases. What would you investigate?**

**Answer:**

I would suspect a memory leak or increasing workload.

Possible reasons:

- Global variables holding unnecessary data.
- Event listeners not being removed.
- Unreleased timers.
- Unbounded caches.
- Large objects retained in memory.
- Unclosed connections or streams.

I would use heap snapshots and profiling tools to identify objects that remain in memory unexpectedly.

### **52. Your application works fine locally but crashes in production. Why?**

**Answer:**

I would compare the environments.

I would investigate:

- Environment variables.
- Node.js versions.
- Database connectivity.
- Production traffic.
- Memory and CPU limits.
- File permissions.
- External API connectivity.
- Missing dependencies or configuration.

I would check production logs and monitoring to identify the exact failure instead of assuming it is an environment issue.

### **53. Your API receives 10,000 requests per second. How would you scale it?**

**Answer:**

I would first identify the bottleneck.

Then I would consider:

- Running multiple Node.js instances.
- Using a load balancer.
- Horizontal scaling.
- Redis caching.
- Database query optimization.
- Connection pooling.
- Background processing.
- Rate limiting.
- Database read replicas where appropriate.

I would also monitor event-loop lag, CPU, memory, database connections, and response times.

### **54. An external payment gateway is unavailable. How would you handle it?**

**Answer:**

I would avoid keeping the user request waiting indefinitely.

I would implement:

- Request timeouts.
- Limited retries with exponential backoff.
- Circuit breakers.
- Idempotency keys.
- Transaction status tracking.
- Reconciliation mechanisms.

If the payment status is unknown due to a timeout, I would not immediately retry the payment blindly.

I would first check the transaction status through the gateway's status API or webhook events.

### **55. An API works properly, but suddenly starts returning 500 errors. How would you investigate?**

**Answer:**

I would check:

1. Application logs.
2. Recent deployments.
3. Database availability.
4. External dependencies.
5. Environment configuration.
6. CPU and memory.
7. Error frequency and affected endpoints.

I would identify whether the issue is isolated or affecting the entire application.

If a recent deployment introduced the problem, I would consider rolling back while investigating the root cause.

### **56. How would you handle an external API that frequently responds slowly?**

**Answer:**

I would configure:

- Connection and request timeouts.
- Limited retries.
- Exponential backoff with jitter.
- Circuit breaker.
- Fallback responses where appropriate.
- Monitoring of external API latency.

I would also avoid retrying non-idempotent operations unless they are protected with idempotency mechanisms.

### **57. Your application has a large number of console.log statements. Is that a problem?**

**Answer:**

Yes, excessive console logging can create performance and operational issues, especially under high traffic.

I would use a structured logging library such as Pino or Winston.

I would log meaningful information such as:

- Request ID.
- Endpoint.
- Execution time.
- Error details.
- Relevant business identifiers.

I would also avoid logging passwords, tokens, and sensitive personal information.

### **58. How would you identify whether an API is slow because of Node.js or the database?**

**Answer:**

I would measure the execution time of individual components.

For example:

```
const start = Date.now();

const user = await User.findByPk(id);

console.log("DB time:", Date.now() - start);
```

I would also measure:

- Middleware execution.
- External API latency.
- Serialization time.
- Total request duration.

By comparing these measurements, I can identify where the delay occurs.

# **Part 7. Background jobs, queues and asynchronous processing**

High probability

### **59. An API needs to send 10,000 emails. Would you send all emails inside the API request?**

**Answer:**

No. Sending all emails inside the request would increase response time and could cause timeouts.

I would use a background job queue.

The flow would be:

1. API receives the request.
2. API stores the required job information.
3. Jobs are added to a queue.
4. Background workers process the jobs.
5. Failed jobs can be retried.
6. The API immediately returns an acknowledgment.

I can use BullMQ with Redis for this.

### **60. A background job fails. How would you retry it?**

**Answer:**

I would configure retry attempts and exponential backoff.

For example:

- First retry after 1 second.
- Second retry after 2 seconds.
- Third retry after 4 seconds.

After all attempts fail, I would move the job into a failed-job state and investigate it.

I would also make the job idempotent because a retry can execute an operation more than once.

### **61. Two workers pick up the same job. How would you prevent duplicate processing?**

**Answer:**

I would use a queue system that supports job locking and atomic job claiming.

For BullMQ, job processing is coordinated using Redis-based locking.

However, I would not rely only on queue-level locking.

For critical business operations, I would implement application-level idempotency using unique job IDs, database constraints, or processed-event records.

This protects against duplicate execution even if a job is retried.

### **62. What happens if a worker crashes while processing a job?**

**Answer:**

The queue should detect that the worker has stopped renewing its lock.

After the lock expires, the job can become eligible for recovery or reprocessing.

I would configure appropriate lock durations and stalled-job handling.

I would also make sure the job is idempotent so that reprocessing does not create duplicate business operations.

### **63. When would you use BullMQ instead of executing an asynchronous function directly?**

**Answer:**

If the operation is small and needs to finish as part of the API response, I would use an asynchronous function.

But if the operation:

- Takes a long time.
- Needs retries.
- Must survive application restarts.
- Requires scheduled execution.
- Needs multiple workers.

I would use BullMQ or another durable queue system.

### **64. You need to generate a report every night at midnight. How would you implement it?**

**Answer:**

I would use a scheduled job.

For example, I could use BullMQ's repeatable or scheduled jobs.

The scheduler triggers the job at midnight, and a background worker generates the report.

I would ensure the scheduling system handles multiple application instances without accidentally scheduling duplicate jobs.

### **65. What happens if the same webhook is delivered multiple times?**

**Answer:**

Webhook providers can retry delivery when they don't receive a successful response.

I would store the webhook event ID in the database with a unique constraint.

When an event arrives:

1. Verify the webhook signature.
2. Check whether the event ID has already been processed.
3. If already processed, return success without repeating the operation.
4. Otherwise, process it and record its completion.

This makes webhook processing idempotent.

# **Part 8. Real-time communication and Socket.io**

High probability for real-time backend roles

Since you've worked with Socket.io and Redis Pub/Sub, these are worth preparing.

### **66. A user disconnects unexpectedly from a chat application. How would you handle it?**

**Answer:**

I would listen to Socket.io's `disconnect` event.

I would update the user's connection status and remove the socket from the relevant online-user tracking structure.

If the user reconnects, I would restore the necessary room memberships and fetch missed messages from the database.

I would not rely only on socket memory to store chat history.

### **67. Your application runs on three Node.js servers. A user connects to server A, but another user connects to server B. How would they communicate?**

**Answer:**

I would use the Socket.io Redis adapter.

Each server maintains its own socket connections, but Redis allows events to be propagated between the servers.

For example:

- User A connects to server A.
- User B connects to server B.
- User A sends a message.
- Server A emits the event.
- Redis adapter distributes it to server B.
- User B receives the message.

This allows real-time communication across multiple server instances.

### **68. How would you ensure that messages are not lost?**

**Answer:**

I would persist messages in the database before considering them successfully delivered.

I would maintain message IDs and delivery status.

When a user reconnects, I would fetch messages after their last acknowledged message ID.

This way, message delivery does not depend entirely on an active socket connection.

### **69. How would you implement online/offline user status?**

**Answer:**

I would maintain user connection information in Redis.

When a user connects, I update their presence.

When they disconnect, I update or remove their presence.

For multiple tabs or devices, I would track multiple active connections instead of immediately marking the user offline when one socket disconnects.

I would also use TTL or heartbeat mechanisms to handle unexpected disconnects.

### **70. A user sends a chat message, but the receiver is offline. What would you do?**

**Answer:**

I would store the message in the database with an appropriate delivery status.

When the receiver reconnects, I would fetch their pending messages and deliver them.

If push notifications are required, I would trigger a notification service or background job.

### **71. How would you handle multiple connections for the same user?**

**Answer:**

I would maintain a mapping between user IDs and their active socket IDs.

For example:

```
user:101 -> [socket1, socket2]
```

When the user sends a message, I can emit it to all active sockets associated with that user.

When one socket disconnects, I remove only that socket ID. The user should be considered offline only when no active connections remain.

# **Part 9. AWS, deployment and infrastructure**

Medium to high probability

### **72. Your Node.js application needs to upload images to AWS S3. How would you implement it?**

**Answer:**

I would use AWS SDK.

My approach:

1. Validate the file.
2. Generate a unique object key.
3. Upload the file to S3.
4. Store the object key or URL in the database.
5. Return the required file reference to the frontend.

For large uploads, I would consider presigned URLs so the frontend can upload directly to S3 without sending the entire file through my Node.js server.

### **73. Your application is running on an EC2 instance, and suddenly the server becomes unavailable. What would you check?**

**Answer:**

I would check:

- EC2 instance health.
- CPU and memory utilization.
- Disk usage.
- Application process status.
- Security group rules.
- Network connectivity.
- Application and system logs.
- Load balancer health checks, if configured.

Based on the issue, I would restore service and investigate the root cause.

### **74. How would you manage environment variables in production?**

**Answer:**

I would never hardcode secrets in the source code.

Locally, I can use `.env` files.

In production, I would prefer AWS Secrets Manager, Systems Manager Parameter Store, or the deployment platform's secret-management mechanism.

I would separate development, testing, and production configurations.

### **75. How would you deploy a Node.js application without downtime?**

**Answer:**

I would use a rolling deployment or blue-green deployment strategy.

In a rolling deployment:

1. Start a new application instance.
2. Check its health.
3. Route traffic to the new instance.
4. Gradually remove old instances.
5. Stop old instances after requests finish.

I would also ensure database migrations are backward-compatible with the running application versions.

### **76. How would you handle file storage when multiple Node.js servers are running?**

**Answer:**

I would avoid storing uploaded files only on the local filesystem of an application instance.

If the user uploads a file to server A, server B might not have access to it.

I would use centralized object storage such as AWS S3 or Cloudinary.

All application instances can access the same storage.

### **77. Your application needs to send a notification whenever an order is placed. How would you design it?**

**Answer:**

I would separate the order-processing logic from the notification logic.

After an order is successfully committed, I would publish an event or enqueue a notification job.

A background worker would process it and send the notification.

For stronger reliability, I would consider the transactional outbox pattern so that the order and the event are recorded consistently.

# **Part 10. Architecture and system design scenarios**

Medium to high probability

At 2+ years, you may not be expected to design massive distributed systems independently, but you should understand how to structure a backend application.

### **78. How would you structure a large Node.js application?**

**Answer:**

I would follow a modular structure, separating responsibilities.

For example:

```
src/
 ├── config/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── utils/
 ├── validators/
 ├── jobs/
 └── app.js
```

- Routes define endpoints.
- Controllers handle HTTP requests and responses.
- Services contain business logic.
- Repositories handle database interactions.
- Models define database structures.
- Middleware handles authentication, validation, and other common functionality.

This makes the application maintainable and testable.

### **79. What is the difference between monolithic and microservices architecture?**

**Answer:**

In a monolithic architecture, multiple application modules are deployed together as one application.

In microservices, the system is divided into independently deployable services.

For example, an e-commerce application could have:

- User service.
- Product service.
- Order service.
- Payment service.
- Notification service.

Microservices provide independent scaling and deployment, but introduce network communication, distributed transactions, monitoring, and operational complexity.

I would not choose microservices just because an application is growing. I would first evaluate the actual requirements.

### **80. How would you handle communication between microservices?**

**Answer:**

I would use synchronous communication when an immediate response is required.

For example, REST APIs or gRPC.

For asynchronous communication, I would use a message broker such as RabbitMQ or Kafka.

The choice depends on whether the services need immediate responses, event-driven processing, persistence, or high-throughput messaging.

### **81. An order service succeeds, but the payment service fails. How would you handle this?**

**Answer:**

I would not assume that a single database transaction can cover both independent services.

I would use a Saga pattern or another distributed workflow.

For example:

1. Create an order in pending status.
2. Initiate payment.
3. If payment succeeds, confirm the order.
4. If payment fails, cancel the order or release reserved inventory.

I would also make each step idempotent and maintain a clear transaction state.

### **82. How would you design an API that needs to support millions of users?**

**Answer:**

I would focus on scalability and reliability.

- Stateless application instances.
- Load balancing.
- Horizontal scaling.
- Database indexing and query optimization.
- Redis caching.
- Background processing.
- Rate limiting.
- Monitoring and logging.
- Database replication or partitioning when required.

I would also identify bottlenecks through load testing rather than assuming which component will fail first.

### **83. How would you prevent one microservice failure from affecting the entire application?**

**Answer:**

I would use fault-tolerance patterns such as:

- Circuit breakers.
- Timeouts.
- Limited retries.
- Bulkheads.
- Fallback responses.
- Asynchronous communication where appropriate.

For example, if the recommendation service fails, the product API can still return products without recommendations.

### **84. How would you design an order-management system?**

**Answer:**

I would divide it into modules:

- User management.
- Product management.
- Inventory management.
- Order management.
- Payment integration.
- Notification management.

When an order is placed, I would validate stock, reserve inventory, initiate payment, and update the order status.

I would use transactions for operations within a database boundary and idempotency for payment and order creation.

# **Part 11. Testing and code quality scenarios**

Medium probability

### **85. How would you test a Node.js API?**

**Answer:**

I would use unit testing and integration testing.

- Unit tests: Test individual functions and services.
- Integration tests: Test APIs with database interactions.
- End-to-end tests: Test complete business workflows.

I can use Jest or Vitest for testing and Supertest for Express API testing.

### **86. Your API depends on an external payment service. How would you test it without calling the actual gateway?**

**Answer:**

I would mock the external dependency.

I would simulate different responses:

- Successful payment.
- Payment failure.
- Timeout.
- Invalid response.
- Network error.

This allows me to test the application's behavior without depending on the actual payment gateway.

### **87. How would you handle validation in a Node.js application?**

**Answer:**

I would validate incoming data at the API boundary using libraries such as Joi or Zod.

For example, when registering a user, I would validate email format, password requirements, and mandatory fields before executing business logic.

I would also maintain database-level constraints because API validation alone is not sufficient.

### **88. How would you handle a production bug that cannot be reproduced locally?**

**Answer:**

I would collect relevant information from production:

- Request ID.
- Error logs.
- Application version.
- Request payload, excluding sensitive information.
- Database state.
- Environment configuration.
- Timing and concurrency information.

Then I would try to reproduce the same conditions in a staging environment.

I would fix the root cause and add a regression test.

### **89. How would you perform code reviews for a Node.js application?**

**Answer:**

I would check:

- Business logic correctness.
- Error handling.
- Security.
- Database query efficiency.
- Async operation handling.
- Code readability.
- Input validation.
- Test coverage.
- Performance implications.

I would also check whether the code introduces any breaking changes.

# **Part 12. Advanced and less frequently asked scenarios**

Low probability

These are not necessarily unimportant. They are generally more likely in product companies, senior-level technical rounds, or interviews focused on distributed systems.

### **90. What happens if the event loop is blocked for 30 seconds?**

**Answer:**

During those 30 seconds, the JavaScript execution thread cannot process other callbacks.

Incoming requests may wait, timers may execute late, and the application can become unresponsive.

I would identify the blocking operation using event-loop monitoring and CPU profiling.

For CPU-heavy tasks, I would use worker threads or background processing.

### **91. How would you handle a memory leak caused by event listeners?**

**Answer:**

I would identify whether listeners are repeatedly registered without being removed.

For example, registering the same event listener every time a user connects can increase memory usage.

I would remove unnecessary listeners using `removeListener()` or `off()` and ensure proper cleanup during disconnect or component lifecycle changes.

### **92. What happens if an application receives a very large JSON payload?**

**Answer:**

Parsing a large JSON payload can consume considerable memory and CPU time.

I would:

- Configure request-body size limits.
- Validate the payload.
- Avoid unnecessary JSON processing.
- Use streaming for large data transfers.
- Move expensive processing to background workers.

### **93. How would you prevent race conditions across multiple Node.js instances?**

**Answer:**

I would not depend on in-memory variables because each application instance has its own memory.

I would use shared coordination mechanisms such as:

- Database transactions.
- Atomic database updates.
- Redis distributed locks.
- Unique database constraints.
- Idempotency keys.
- Fencing tokens where required.

The correct mechanism depends on the business operation.

### **94. What is eventual consistency? Give an example.**

**Answer:**

Eventual consistency means different parts of a distributed system may temporarily contain different versions of data, but they should eventually converge.

For example, after an order is placed, the order service may update immediately while an analytics service receives the event a little later.

The order is already created, but the analytics dashboard may take some time to reflect it.

### **95. How would you handle a message that keeps failing in a message queue?**

**Answer:**

I would configure limited retries and move permanently failing messages into a dead-letter queue.

I would investigate the error, correct the issue, and replay the message if appropriate.

I would also ensure duplicate processing is safe.

### **96. What happens if a database primary server goes down?**

**Answer:**

It depends on the database architecture.

If a replica and automatic failover are configured, the system may promote a replica to become the new primary.

I would check replication lag, recovery status, connection configuration, and whether the application can reconnect to the new primary.

I would also consider possible transaction loss depending on the replication guarantees.

### **97. How would you design a system to prevent duplicate payments across distributed services?**

**Answer:**

I would use multiple protection layers:

1. Generate an idempotency key for every payment attempt.
2. Store the key with a unique database constraint.
3. Maintain transaction status.
4. Send the same idempotency key to the payment gateway if supported.
5. Verify the final payment status using webhooks or status APIs.
6. Implement reconciliation for uncertain transactions.

I would never assume that a network timeout means the payment failed.

### **98. How would you handle a sudden traffic spike?**

**Answer:**

I would first check whether the spike is legitimate or malicious.

Then I would:

- Apply rate limiting if required.
- Scale application instances.
- Use caching.
- Protect database connections.
- Move expensive work to queues.
- Monitor CPU, memory, and latency.

I would also check whether the external dependencies can handle the increased traffic.

### **99. What is backpressure, and why is it important?**

**Answer:**

Backpressure is a mechanism for controlling data flow when a consumer cannot process incoming data as quickly as it is received.

For example, when reading a large file and writing it to another destination, I should not keep reading unlimited data into memory.

Node.js streams support backpressure through mechanisms such as `write()` returning false and the `drain` event.

This helps prevent excessive memory consumption.

### **100. Your application needs to process millions of records. Would you fetch all records using findAll()?**

**Answer:**

No. Fetching millions of records at once can consume too much memory.

I would use:

- Cursor-based processing.
- Database streaming where supported.
- Batch processing.
- Pagination.
- Background workers.

For example, I could process 1,000 records at a time, complete the batch, and move to the next batch.

### **101. How would you handle a database migration when two versions of your application are running simultaneously?**

**Answer:**

I would use backward-compatible migrations.

I would avoid removing or renaming a column while the older application version still depends on it.

I would follow an expand-and-contract migration:

1. Add new schema elements.
2. Deploy compatible application code.
3. Migrate existing data.
4. Remove old schema elements only after older application versions are no longer running.

### **102. How would you protect an API from a DDoS attack?**

**Answer:**

I would implement protection at multiple levels:

- CDN and WAF.
- API gateway rate limiting.
- IP-based filtering.
- Request-size limits.
- Authentication and abuse detection.
- Infrastructure-level traffic protection.

I would not depend only on Express rate-limiting middleware because a large attack can exhaust resources before requests reach the application.

# **Part 13. Project-based scenarios from your experience**

Extremely important

Man, don't underestimate this section.

An interviewer can ask you 10 questions from your own project instead of asking 10 theoretical Node.js questions.

You should be able to defend every technology and feature mentioned in your resume.

Here are scenarios based on the type of backend projects you have worked on.

### **103. In your real-time chat application, how did you handle multiple agents accessing the same ticket?**

**Answer:**

I would maintain ticket ownership and status in the database.

When an agent accepts a ticket, I would perform an atomic update that assigns the ticket only if it is still available.

For example:

```
UPDATE tickets
SET assigned_agent_id = 101,
    status = 'assigned'
WHERE id = 500
AND status = 'open'
AND assigned_agent_id IS NULL;
```

If no row is updated, another agent has already acquired the ticket.

This prevents multiple agents from simultaneously claiming the same ticket.

### **104. In your chat application, how would you handle Redis Pub/Sub duplicate messages?**

**Answer:**

I would first investigate where the duplicates originate.

Possible reasons include:

- Multiple subscriptions.
- Reconnection logic.
- Multiple event handlers.
- Publishing the same event more than once.

I would ensure subscriptions are registered only once where appropriate.

For important business events, I would include unique event IDs and implement consumer-side deduplication.

### **105. How would you implement ticket expiration?**

**Answer:**

I would maintain an expiration timestamp in the database.

A background worker would periodically identify expired tickets and update their status.

I could use BullMQ delayed jobs or scheduled jobs.

I would also ensure the expiration update is conditional so that an already resolved or reassigned ticket is not incorrectly expired.

### **106. In your EV Pitstop application, how would you prevent users from submitting duplicate challan payments?**

**Answer:**

I would generate a unique payment reference or idempotency key.

Before processing payment, I would check the existing transaction status.

I would also add a database constraint to prevent duplicate successful payments for the same challan and payment attempt.

The final status would be updated only after verifying the payment gateway response or webhook.

### **107. How would you implement progressive onboarding?**

**Answer:**

I would maintain the user's onboarding status.

For example:

```
MOBILE_VERIFIED
EMAIL_VERIFIED
PROFILE_COMPLETED
ONBOARDING_COMPLETED
```

After each step, I would validate the previous step before allowing the next one.

I would store the verification status in the database rather than trusting frontend values.

### **108. Your API uploads a vehicle document to S3, but the database insertion fails. How would you handle it?**

**Answer:**

S3 and the database are separate systems, so a database transaction cannot automatically roll back an S3 upload.

I would use a compensating action.

For example:

1. Upload the document.
2. Attempt the database insertion.
3. If the database insertion fails, attempt to delete the uploaded object.
4. Log cleanup failures for later reconciliation.

For more complex workflows, I would maintain an upload status and use a background cleanup process.

### **109. How would you implement secure JWT authentication with JWKS?**

**Answer:**

I would fetch the public signing keys from the configured JWKS endpoint.

When a request contains a JWT:

1. Extract the token.
2. Read the `kid` from the JWT header.
3. Find the matching public key from JWKS.
4. Verify the signature.
5. Validate issuer, audience, expiration, and other required claims.
6. Attach the verified user information to the request.

I would cache the JWKS keys and refresh them when necessary, especially when key rotation occurs.

### **110. What happens when the JWT signing key rotates?**

**Answer:**

The application should support both the old and new keys during the rotation period.

The token header contains a `kid` identifying the signing key.

The application uses that identifier to select the correct public key from JWKS.

When the new key becomes active, new tokens use it, while previously issued tokens can still be verified using the old public key until it is retired.

# **Part 14. Additional tricky interview scenarios**

These are less predictable questions. They test whether you can reason about unexpected behavior.

| No. | Interview scenario                                                        | What they test                        |
| --- | ------------------------------------------------------------------------- | ------------------------------------- |
| 111 | API returns success, but data is not saved in the database.               | Transaction handling                  |
| 112 | One API is called twice because the frontend retries automatically.       | Idempotency                           |
| 113 | A Redis key disappears before the operation completes.                    | TTL and distributed locks             |
| 114 | The server restarts while a job is running.                               | Job recovery                          |
| 115 | An API returns 200 even when the database operation fails.                | Error handling                        |
| 116 | One user makes 1,000 concurrent requests.                                 | Rate limiting and resource management |
| 117 | A database connection remains open after an error.                        | Connection management                 |
| 118 | Two users book the same available appointment.                            | Atomic updates and concurrency        |
| 119 | An external API returns malformed JSON.                                   | Defensive programming                 |
| 120 | A payment webhook arrives before the original API response.               | Asynchronous event handling           |
| 121 | A user changes their role while an old JWT is still valid.                | Authorization consistency             |
| 122 | A scheduled job executes twice after deployment.                          | Distributed scheduling                |
| 123 | Your cache contains data that has already been deleted from the database. | Cache invalidation                    |
| 124 | An API returns different results from different server instances.         | Shared state and consistency          |
| 125 | A Node.js application has high CPU usage but low request traffic.         | Profiling and background tasks        |
| 126 | The database is healthy, but requests are waiting for connections.        | Connection pool saturation            |
| 127 | A large file upload gets interrupted halfway.                             | Streams and multipart uploads         |
| 128 | A user submits the same order from two browser tabs.                      | Idempotency and constraints           |
| 129 | A database transaction takes 30 seconds.                                  | Locking and transaction design        |
| 130 | An API response is successful, but the notification was never sent.       | Event reliability and outbox          |

For these, you should practice explaining the root cause, prevention, and recovery strategy.

# **Part 15. How interviewers evaluate your answers**

This is something I want you to follow for every scenario.

Don't directly jump into naming technologies.

Use this four-step answering method:

## **The 4-step interview answering framework**

1. **Identify the problem**

   Explain what is happening and why it could happen.
2. **Explain the root cause**

   Identify the technical issue: concurrency, blocking, stale cache, connection exhaustion, etc.
3. **Explain your solution**

   Describe the implementation and why you chose it.
4. **Explain failure handling**

   Explain what happens if your solution also fails, and how you prevent data corruption or service interruption.

Let's take an example.

**Interviewer:** Two users are booking the last available ticket simultaneously. How do you prevent double booking?

**Your answer:**

"Sir, this is a concurrency issue. Both requests might read the available count as one and try to book the same ticket.

I would handle this at the database level using an atomic conditional update or transaction with appropriate locking.

I would update the ticket only if its availability is still one. If the update succeeds, the booking continues. Otherwise, I would return that the ticket is no longer available.

This ensures that only one request can successfully book the last ticket.

I would also maintain idempotency to prevent duplicate booking attempts from the same client."

Notice how this answer explains the problem, solution, and protection without unnecessarily complicating things.

# **Part 16. Your preparation priority**

We have covered 130 scenarios. But don't study all of them with equal priority.

This is the order I recommend for your 2+ years Node.js backend interviews.

## **Preparation roadmap**

**Priority 1 – Must master**

First

Questions 1–58

- Node.js internals and event loop
- Express.js and REST APIs
- SQL and database transactions
- Redis and caching
- Authentication and security
- Production debugging

**Priority 2 – Strong preparation**

Second

Questions 59–89

- BullMQ and background jobs
- Socket.io and Redis Pub/Sub
- AWS and deployment
- System design
- Testing

**Priority 3 – Advanced preparation**

Third

Questions 90–110

- Distributed systems
- Event-loop internals
- Fault tolerance
- Microservices
- Advanced architecture

**Priority 4 – Project defense and tricky scenarios**

Continuous

Questions 103–130

- Explain your actual implementations.
- Be prepared for follow-up questions.
- Explain alternatives and trade-offs.
- Don't claim implementations you haven't actually done.

# **Part 17. Let's assess your interview readiness**

I don't want you to simply read these answers and feel prepared. You should be able to explain them without looking at notes.

Let's conduct a practical interview assessment.

**Mock technical interview**

Question 1 of 5

## **Two users try to purchase the last product simultaneously. How would you prevent overselling?**

Answer as if you are explaining to an interviewer. Don't worry about perfect wording.

Submit and reveal key points

PreviousNext question&#x20;

**My final advice, man:**

For your experience level, the most important thing is not knowing every technology. It's being able to explain why you selected a particular solution, what could go wrong, and how you would handle that failure.

Pay particular attention to these five topics:

1. Concurrency and database transactions.
2. Redis caching, TTL, NX, distributed locks and fencing tokens.
3. Idempotency and payment processing.
4. Node.js event loop, performance and memory management.
5. Production debugging and API optimization.

These topics can generate multiple follow-up questions in a single interview.

**Our goal should be to make you capable of handling the interviewer changing the scenario halfway through your explanation, rather than memorizing one fixed answer.** 💪
