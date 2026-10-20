# TCP Proxy from Scratch

A step-by-step guide to building a TCP proxy with Java NIO.

Read the [documentation](https://vladimirnilov28.github.io/tcp-proxy-from-scratch/).
The Markdown sources are maintained in [`docs/`](docs/index.md).
This checkout currently contains the guide only; Java implementation code and
tests have not been added yet.

## Documentation publishing

The [central documentation website](https://github.com/VladimirNilov28/VladimirNilov28.github.io)
imports `docs/`, preserving its directory structure and any documentation assets,
and publishes it under `/tcp-proxy-from-scratch/`.
Navigation and sidebar configuration belong in the central website, not this
repository. The pages use VitePress home-page frontmatter, `outline` frontmatter,
and custom containers, which the central site must support.

Pushes to `main` affecting `docs/**` run
`.github/workflows/notify-docs-hub.yml`, which sends a `documentation-updated`
repository dispatch event to the central repository. The workflow requires the
`DOCS_HUB_TOKEN` Actions secret: a fine-grained personal access token restricted
to the central repository with Contents read/write permission, or a GitHub App
installation token with equivalent access. This repository only maintains
documentation sources and sends notifications; the central website builds and
publishes the documentation.
