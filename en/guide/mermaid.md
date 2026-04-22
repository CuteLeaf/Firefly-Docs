# Mermaid Diagram

Mermaid is a text-based diagram tool for Markdown, useful for flowcharts, sequence diagrams, state diagrams, and more.

In Firefly, Mermaid support is built-in and does not require a dedicated config file. Use a `mermaid` fenced code block directly in posts.

## Usage

```md
```mermaid
graph TD
  A[Start] --> B{Condition}
  B -->|Yes| C[Continue]
  B -->|No| D[End]
```
```

## Common Examples

### Flowchart

```mermaid
graph LR
  User[User] --> Web[Frontend]
  Web --> API[Backend API]
  API --> DB[(Database)]
```

### Sequence Diagram

```mermaid
sequenceDiagram
  participant U as User
  participant S as Server
  U->>S: Request data
  S-->>U: Return result
```

### State Diagram

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Published : Publish
  Published --> Archived : Archive
  Archived --> [*]
```

## Notes

- Mermaid diagrams are rendered on the client side.
- The fenced code block language must be `mermaid`.
- If rendering fails, validate Mermaid syntax first.

See [Mermaid Official Docs](https://mermaid.js.org/intro/).
