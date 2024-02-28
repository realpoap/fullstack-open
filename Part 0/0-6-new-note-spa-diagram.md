```mermaid
sequenceDiagram
    participant browser
    participant server

    autonumber

    note over browser: renders data.json content

    note over browser: user input and form submitted
    note over browser: rerenders the notes with the new one

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note over server: State: 201 Created
    deactivate server
```