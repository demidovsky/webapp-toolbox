# Redis cheatsheet

## Key Manipulation:

- ```SET key value``` Set the value of a key.
- ```GET key``` Get the value of a key.
- ```DEL key [key ...]``` Delete one or more keys.
- ```EXISTS key [key ...]``` Check if a key exists.
- ```KEYS pattern``` Find all keys matching a pattern.

## String Manipulation:

- ```SET key value``` Set the value of a key.
- ```GET key``` Get the value of a key.
- ```APPEND key value``` Append a value to an existing key.
- ```STRLEN key``` Get the length of the value stored in a key.

## Expiration and TTL:

- ```EXPIRE key seconds``` Set an expiration time for a key in seconds.
- ```TTL key``` Get the remaining time to live for a key in seconds.
- ```PERSIST key``` Remove the expiration time from a key.


# Data structures

| Characteristics |	List |	Hash |	Set |
|-----------------|------|-------|------|
| Ordered Collection | Yes | No | No |
| Unordered Collection | No | Yes | Yes |
| Elements | Strings | Field-Value Pairs | Unique Strings |
| Add Operation | Push elements at head or tail | Set field-value pairs | Add unique elements |
| Access Operation | Access elements by index | Access values by field | Check for membership |
| Remove Operation | Remove elements by value or index | Remove fields or entire hash | Remove elements by value |
| Ordering | Elements are ordered and can be accessed by index | No specific ordering | No specific ordering |
| Duplicate Elements | Allowed | Not applicable | Not applicable |
| Use Cases | Managing queues, task lists, logs, chat message history | Storing and retrieving objects or records  |with multiple attributes | Managing unique tags or keywords, implementing follower/following |

Note **Sorted Set**: The difference is that each member of a sorted set is associated with a score, allowing them to be sorted from the smallest score to the largest.

Documentation: https://redis.io/commands