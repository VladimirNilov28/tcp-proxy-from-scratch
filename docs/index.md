---
layout: home

hero:
  name: "TCP Proxy from Scratch IT WORKS!!!"
  text: "Learn network programming with Java NIO"
  tagline: A step-by-step guide to understanding TCP connections, non-blocking I/O, and byte forwarding.
  actions:
    - theme: brand
      text: Read the introduction
      link: ./guide/introduction.md
    - theme: alt
      text: View on GitHub
      link: https://github.com/VladimirNilov28/tcp-proxy-from-scratch

features:
  - title: TCP fundamentals
    details: Understand how a proxy connects clients to an upstream server and forwards a stream of bytes in both directions.
  - title: Java NIO
    details: Explore channels, buffers, and selectors as the building blocks of non-blocking network applications.
  - title: Connection lifecycle
    details: Learn why partial writes, backpressure, and connection shutdown matter when designing a reliable proxy.
---

## Preview content

::: info Demo data
The following pages contain illustrative settings and simulated results for previewing this documentation site. They do not describe an implemented proxy or actual benchmark results.
:::

- [Sample configuration](./guide/sample-configuration.md): example addresses, buffer sizes, and connection settings.
- [Test scenarios](./guide/test-scenarios.md): sample traffic, simulated logs, and expected connection behavior.
