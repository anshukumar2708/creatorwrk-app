# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Node version

Use >=14.12.0 to install the dependencies

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Naming conventions

- File name should be Kebab Cased (kebab-cased)
- Variable names should be Camel Case (camelCase)
- Component names should be Pascal Case (PascalCase)
- Query names should be Snake Case (snake_case)
- Constant names should be (CAPITAL_SNAKE_CASE)

### Exports

- Named exports for components / utils / constants
- Default exports for pages
- Add pages to /pages folder
- pages should follow [pageName].tsx pattern
- components related to pages should be within that folder pages/[pageName]/components/abc.tsx
- Create logical sub-folder for routes / pages
