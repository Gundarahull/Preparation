                      PARTITIONING
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
Horizontal            Vertical          Declarative
(Rows)                (Columns)        (PostgreSQL manages)
      │
      ├──────────────┬───────────────┬───────────────┐
      │              │               │
    Range           List           Hash
  (By Date)     (By Category)   (Even Distribution)
      │
      ▼
Partition Pruning
(Scan Only Needed Partition)