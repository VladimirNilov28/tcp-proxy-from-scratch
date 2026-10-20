---
outline: deep
---

# Test Scenarios

::: warning Simulated results
All sessions, log entries, and results below are synthetic documentation fixtures. They are not output from an implemented proxy or an executed test suite.
:::

## Example traffic

These cases use the loopback addresses from the [sample configuration](./sample-configuration.md).

| Session | Client payload | Expected echo | Payload size |
| --- | --- | --- | --- |
| `demo-001` | `ping` | `ping` | 4 bytes |
| `demo-002` | `hello proxy` | `hello proxy` | 11 bytes |
| `demo-003` | `NIO test 123` | `NIO test 123` | 12 bytes |

Payload sizes assume UTF-8 encoding without a trailing newline. A stream can split these bytes across multiple reads; read boundaries are not message boundaries.

## Behavior checklist

| Scenario | Test setup | Expected behavior |
| --- | --- | --- |
| Echo forwarding | Send a short payload to a local echo server through the proxy | Receive the same bytes in the same order |
| Partial writes | Make the destination consume data slowly | Retain unsent bytes and resume writing without duplication |
| Backpressure | Send data faster than the destination reads | Pause source reads rather than growing buffers without a limit |
| Upstream unavailable | Leave the upstream port without a listener | Report the connection failure and release the session resources |
| Client half-close | Finish sending while continuing to receive | Forward pending bytes and allow the response direction to complete |
| Concurrent clients | Open several independent client sessions | Keep each session's payload and buffers isolated |

## Simulated session log

```text
12:00:00.000 INFO  session=demo-001 event=client-accepted
12:00:00.002 INFO  session=demo-001 event=upstream-connected address=127.0.0.1:9000
12:00:00.003 DEBUG session=demo-001 direction=client-to-upstream bytes=4
12:00:00.004 DEBUG session=demo-001 direction=upstream-to-client bytes=4
12:00:00.006 INFO  session=demo-001 event=session-closed reason=both-directions-complete
```

::: details Example failure log
```text
12:01:00.000 INFO  session=demo-004 event=client-accepted
12:01:00.002 ERROR session=demo-004 event=upstream-connect-failed reason=connection-refused
12:01:00.003 INFO  session=demo-004 event=session-closed reason=upstream-unavailable
```
:::

## Sample fixture

```json
{
  "sessionId": "demo-001",
  "payloadEncoding": "UTF-8",
  "sent": "ping",
  "expected": "ping",
  "expectedBytesEachDirection": 4,
  "simulated": true
}
```

## Before recording real results

- Compare the complete received byte stream with the sent byte stream.
- Include payloads larger than the forwarding buffer.
- Exercise slow readers, connection failures, and half-closes.
- Record the Java version, operating system, and workload with any measurements.

Return to the [introduction](./introduction.md) for the underlying networking concepts.
