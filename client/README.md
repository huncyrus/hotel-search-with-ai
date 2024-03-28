# Hotel Search API frontend
Frontend part for a Hotel Search project.


## Goal
- Minimalistic UI
- Reusable React components
- Experimental implementation for AI text parsing
- Ability to redirect user to a detail page


## Requirements
- NodeJS `18`+
- NPM `6`+
- The "backend" part of the project in the `server` directory
- `.env` file


## Installation
```bash
npm i
```

## Usage
- Please ensure that you have an `.env` file based on the `.env.example` file
- Please ensure that the `proxy` address in the `package.json` file is correctly points to the backend
- Please ensure that the `proxy` address in the `vite.config.ts` file is correctly points to the backend

```bash
npm run dev
```

In a browser, please open the `localhost:5173`

### Example prompt
`Barcelona, on jun 18-19-20, 1 room please`

## Features
- Auto suggestion with backend (suggest word, clickable, only last word)
- Search via text (~AI prompt)
- Cache for auto suggestion to 
- React components
- Tailwind with Vite (for fast prototype)
- Typescript based
- eslint


### Project Structure
| Directory               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| /public                 | The public assets, like logo.                         |
| /src                    | Source code                                           |
| /src/assets             | static asset files for react                          |
| /src/components         | React component directory                             |
| /src/components/common  | Generic, common components, such as footer or header. |
| /src/components/results | The hotel result view components                      |
| /src/components/search  | The search bar components                             |
| /src/interfaces         | Typescript interfaces for components & helpers.       |

### Used HTTP endpoints
| Endpoint                        |                                                     |
| ------------------------------- | --------------------------------------------------- |
| localhost:3001/suggestions      | For suggesting words for inputs                     |
| localhost:3001/api/search       | For hotel endpoint                                  |


# Note

## Future features
- Updating auto completion with suggesting word where the cursor is active in the input
- Better error messages for users
- Split React components even smaller
- e2e tests with Playwright or Storybook
- Fix user grammar
- Better UI for a travel agent~ish AI experience
- Docker container


<hr>

## Note for React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
