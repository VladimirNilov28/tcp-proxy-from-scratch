---
outline: deep
---

# Sample Configuration

::: warning Demo data only
This page uses fictional configuration settings to preview the documentation layout. The repository does not currently provide a proxy executable or a configuration parser for these settings.
:::

## Local development topology

The sample proxy listens on the loopback interface and forwards traffic to a local echo server.

```text
Test client         Sample proxy         Echo server
127.0.0.1      -->  127.0.0.1:8080  -->  127.0.0.1:9000
               <--                <--
```

### Example settings

```json
{
  "listen": {
    "host": "127.0.0.1",
    "port": 8080
  },
  "upstream": {
    "host": "127.0.0.1",
    "port": 9000
  },
  "bufferSizeBytes": 8192,
  "maxConnections": 100,
  "connectTimeoutMillis": 5000
}
```

| Setting | Sample value | Meaning |
| --- | --- | --- |
| Listen address | `127.0.0.1:8080` | Local endpoint accepting client connections |
| Upstream address | `127.0.0.1:9000` | Destination used by this example |
| Buffer size | `8192` bytes | Illustrative buffer capacity for each forwarding direction |
| Connection limit | `100` | Proposed maximum number of active client sessions |
| Connect timeout | `5000` ms | Proposed limit for establishing an upstream connection |

::: tip Keep the demo local
Using `127.0.0.1` limits listeners to the local machine. Binding to all interfaces would expose a listener to other reachable hosts.
:::

## Buffer lifecycle

This fragment illustrates the buffer state transitions after reading bytes. It is not a complete forwarding loop.

```java
ByteBuffer pending = ByteBuffer.allocate(8192);
int bytesRead = source.read(pending);

if (bytesRead > 0) {
    pending.flip();
    destination.write(pending);
    pending.compact();
}
```

`flip()` prepares the buffer for writing its contents to the destination. `compact()` preserves any bytes left after a partial write and makes the remaining space available for a later read.

::: warning Partial writes
A production event loop must retry pending writes when the destination is writable, handle end-of-stream and exceptions, and pause reads when the buffer is full. The fragment above omits that orchestration.
:::

## Related pages

Continue to [test scenarios](./test-scenarios.md) for sample traffic and expected behavior, or return to the [introduction](./introduction.md).
