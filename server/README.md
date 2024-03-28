# Hotel Search API backend

## Goal
- Minimalistic express based backend
- AI usage for text parsing
- Interacting with a Hotel Search API

## Requirements
- Node.js `18`+
- NPM `6`+
- `.env` file
- OpenAI API account (`organization ID`, `secret key`)
- Hotel Search API credentials
- A free port (see package.json & index.ts)

## Features
- OpenAI 3.5-turbo usage
- Auto suggestion via AI
- In-memory caching for autocompletion/suggestions
- Typescript
- Swagger based API doc (minimalistic)
- OpenAI doc-blocks for API doc
- Express.js routing
    - CORS support

## Install
```bash
npm install
```

Credentials, configs
- Ensure the `.env` file and it's content please
- Ensure the account of OpenAI API
- Ensure the account for a Hotel Search API
- Ensure the CORS address list in `src/index.ts` is correct
- Ensure the Proxy address within the `Client/package.json` file is correct


## Usage
```bash
npm run build
npm start
```

# Note

## Directory structure
| Directory                    |                                                        |
| ---------------------------- | ------------------------------------------------------ |
| dist                         | Compiled javascript                                    |
| node_modules                 | Dependencies                                           |
| src                          | Source files                                           |
| src/interfaces               | Typescript interfaces                                  |
| src/routes                   | Express routes                                         |
| src/services                 | Services for search and for AI                         |

## Future features
- Data and Config Validation (by zod or ajv for example)
- Better error handling (Unique Error classes)
- Monolog based logging (with log rotation)
- Smarter caching for searches and suggestions (ensuring garbage collection and memory usage)
- Docker container
- Handle visibility for classes (moving many features to private or protected)
- Unit tests for helpers
- Unit tests for endpoints


## Disclaimer
- OpenAI SDK is not free, require a paid account
- Each word that is sent to OpenAI will be considered as one (1) token therefore not free
- The backend contains loggin lines to validate steps
