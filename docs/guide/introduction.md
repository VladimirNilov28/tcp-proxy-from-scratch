# Introduction

A TCP proxy sits between a client and an upstream server. It accepts a client connection, opens a separate connection to the upstream, and forwards bytes in both directions.

```text
Client <----> TCP proxy <----> Upstream server
```

This project explores how to build that proxy with Java NIO, focusing on the networking concepts behind the implementation rather than hiding them behind a framework.

::: info Work in progress
The guide contains this introduction and clearly labeled demo pages. Implementation chapters and runnable examples will be added as the project develops.
:::

## What a TCP proxy does

TCP provides an ordered stream of bytes, not individual messages. A single read can return only part of an application's message, or bytes from several messages at once. A transparent TCP proxy forwards those bytes without needing to understand the application protocol.

Each client session involves two connections:

- A downstream connection between the client and the proxy.
- An upstream connection between the proxy and the destination server.

Traffic flows independently in both directions. The proxy must retain bytes that have been read but not yet written, and it must handle failures and shutdown on either connection.

## Why Java NIO?

Java NIO provides the building blocks for handling multiple connections with non-blocking I/O:

- `ServerSocketChannel` accepts incoming connections.
- `SocketChannel` connects to the upstream server and reads or writes bytes.
- `ByteBuffer` holds data between reads and writes.
- `Selector` reports when registered channels are ready for operations such as accepting, connecting, reading, or writing.

Readiness does not mean an entire buffer can be transferred. Reads and writes may make only partial progress, so the proxy must preserve buffer state between events.

## Design considerations

### Bidirectional forwarding

Each direction needs its own pending-data state. Data received from the client must not overwrite data waiting to be sent back from the upstream.

### Backpressure

If one peer produces data faster than the other can receive it, the proxy needs to limit buffering and pause reads when necessary. Otherwise, a slow receiver can cause unbounded memory growth.

### Connection shutdown

An end-of-stream indication means a peer has finished sending; it does not necessarily mean that the reverse direction is finished. A proxy needs to account for pending writes and TCP half-closes rather than immediately discarding both connections.

## Before you start

Familiarity with Java, exceptions, and basic socket concepts will help. The implementation will use Java's NIO APIs rather than a networking framework.

Follow the project's progress in the [GitHub repository](https://github.com/VladimirNilov28/tcp-proxy-from-scratch).

## Explore the demo pages

Use the [sample configuration](/guide/sample-configuration) and [test scenarios](/guide/test-scenarios) to preview tables, code blocks, callouts, and navigation. All settings and results on those pages are illustrative.