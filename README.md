# Hotel Search API with AI
Experimental project.

## Goal
- Small modular frontend with React, Tailwind and TypeScript
- Small backend with Express, TypeScript and AI


## Details
- [Frontend](client/README.md)
- [Backend](server/README.md)


## How to use
 - Start client
 - Start backend
 - Open browser
 - Enter an idea
 - Get results

# Note

## Mental model
 - Render client
    - Enter prompt
        - Backend get suggestions for autocompletion
        - Send search text
            - AI parse it
                - Handle error if occures
                    - Render error
                - Auth to Hotel Search API
                    - Handle error
                    - Get Location ID
                        - Handle error
                        - Get coordinates based on the location ID
                            - Handle error
                            - Build search payload from AI results and retrieved API results
                                - Handle errors
                                - Trigger hotel search
                                    - Render results

## Disclaimer
- The code is experimental
- The backend uses a demo API endpiont which is inconsistent
- No requirements for erorr handling strategy
- No requirements for logging
- No requirements for technologies, other than JavaScript, React and Express
- The client use `Axios` for HTTP endpoints
- The server use `Axios` and Node's `Fetch` for HTTP endpoints


## Known issues
- Loading animation is not the most perfect
- No dark mode
- Hotel search API might not respond properly, discovered responses:
    - Empty, no payload
    - Timeout (after 8 seconds)
    - Timeout (after 3 seconds)
    - Empty list
    - Text, Two new line character
    - Text, Two separated hotel list but as text, the two list is just two JSON array as text, near each other
    - JSON object with 3 different hotel list (with redundant elements)
    - JSON object with 2 different hotel list (no redundant element)
    - JSON object with 1 hotel list
- Experimental AI data parsing sometime corrupts the JSON structure which stops the process (mitigated)
- 