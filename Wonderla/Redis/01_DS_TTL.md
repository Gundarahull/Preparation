Your data structure selection is strong. The next level is understanding the operation guarantees:
- SET NX – atomic create-if-absent.
- INCR – atomic counter increment.
- SADD – atomic insertion of a unique Set member.
- ZADD – insert/update a member's score.
- XADD – append an event.
- XREADGROUP / XACK – consumer-group processing and acknowledgement.