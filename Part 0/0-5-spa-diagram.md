```mermaid
sequenceDiagram
    participant browser
    participant server

    autonumber

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    note over server: State: 200 OK
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    note over server: State: 200 OK
    server -->> browser: stylesheet
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    note over server : State: 200 OK
    server-->> browser: js script file
    deactivate server
    note over browser : executes the script and fetches data.json

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    note over server : State: 200 OK
    server-->> browser: data (JSON) document
    deactivate server
    note over browser : renders data.json content via DOM-API

     browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    note over server: State : 404 Not found 
    deactivate server
    note over server: could not find favicon.ico

    