# For developers

## Technologies used:

* [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.aug1ngj77) rendering with async data fetching.
* [React](https://facebook.github.io/react/) as the view.
* [React Router v4](https://reacttraining.com/react-router/) as the router.
* [Redux](https://github.com/reactjs/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation.
* [Express](https://expressjs.com/) server.
* [Webpack 3](https://webpack.js.org/) for bundling and [**"Tree-Shaking"**](https://webpack.js.org/guides/tree-shaking/) support.
* [Babel](https://babeljs.io/) for ES6 and ES7 transpiling.
* [React Hot Loader 4](https://github.com/gaearon/react-hot-loader) to tweak React components in real time.
* [nodemon](https://nodemon.io/) to monitor for any changes in your node.js application and automatically restart the server.
* [axios](https://github.com/mzabriskie/axios) for universal data fetching/rehydration on the client.
* [redux-thunk](https://github.com/gaearon/redux-thunk) as the middleware to deal with asynchronous action.
* [react-router-redux](https://github.com/reactjs/react-router-redux) to keep your router in sync with Redux state.
* [react-helmet](https://github.com/nfl/react-helmet) to manage title, meta, styles and scripts tags on both server and client.
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server.
* [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware) serves the files emitted from webpack over the Express server.
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) allows you to add hot reloading into the Express server.
* [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) creates a visualize size of webpack output files with an interactive zoomable treemap.
* [morgan](https://github.com/expressjs/morgan) the HTTP request logger for server side debugging.
* [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) for next generation developer experience.
* [Flow](https://flowtype.org/) as the static type checker for javascript.
* [ESLint](http://eslint.org/) to maintain a consistent javascript code style (Airbnb + Prettier).
* [StyleLint](http://stylelint.io/) to maintain a consistent css/scss code style.
* CSS and SASS support with [PostCSS](https://github.com/postcss/postcss-loader) for advanced transformations (e.g. autoprefixer). [CSS modules](https://github.com/css-Modules/css-Modules) enabled.
* Image (with [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) for optimizing) and Font support.
* Split vendor's libraries from client bundle.
* No other view engines, just javascript based HTML rendering component.
* Shared app config between development and production.
* 404 error page and redirect handling.
* [Yarn](https://yarnpkg.com/lang/en/) as the package manager.

## Requirements

* [node](https://nodejs.org/en/) >= 6.0
* [npm](https://www.npmjs.com/) >= 3.0

## Getting Started

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/containerum/ui.git
cd ui
```

**2. Install all of the dependencies:**

```bash
yarn
```

**3. Start developer mode:**

```bash
yarn build    # Run once
yarn start
```
Now the app should be running at [http://localhost:3001/](http://localhost:3001/)

**4. Start production mode:**

```bash
yarn start:production    # Building bundle and running production server
```

For production mode app should be running at [http://localhost:8080/](http://localhost:8080/)

> Note: You can change the port that you want from `./package.json`.

## NPM Script Commands

I use [better-npm-run](https://github.com/benoror/better-npm-run) to manage the scripts in a better way, which also provides the compatibility of cross-platform. All of the scripts are listed as following:

| `yarn <script>`           | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Run your app on the development server at `localhost:3001`. HMR will be enabled.                  |
| `start:production`        | Bundle files to `./public/assets` and run it on the production server at `localhost:8080`.        |
| `start:prod`              | Run your app on the production server only at `localhost:8080`.                                   |
| `start:production:docker` | Bundle files to `./public/assets` and run app on the production in container at `localhost:3000`. |
| `start:prod:docker`       | Run your app on the production server in container at `localhost:3000`.                           |
| `build`                   | Remove the previous bundled files and bundle it to `./public/assets`.                             |
| `build:stats`             | Visualize the contents of all your bundles.                                                       |
| `lint`                    | Lint all `.js` and `.scss` files.                                                                 |
| `lint:js`                 | Lint all `.js` files (Use `--fix` to auto fix eslint errors).                                     |
| `lint:style`              | Lint all `.scss` files (Use `--fix` to auto fix stylelint errors).                                |
| `flow`                    | Run type checking for `.js` files.                                                                |
| `flow:stop`               | Stop type checking.                                                                               |
| `clean:all`               | Remove the client/server bundled stuff and the coverage report.                                   |
| `clean:build`             | Remove the `./public/assets` folder to clean the client bundled files.                            |
| ------------------------- | ------------------------------------------------------------------------------------------------- |

## App Structure

Here is the structure of the app, which serves as generally accepted guidelines and patterns for building scalable apps.

```
.
├── public                          # Express server static path/Webpack bundled output
│   └── favicon.ico                 # Favicon is placed in the same path with the main HTML page
├── src                             # App source code
│   ├── config                      # App configuration settings
│   │   ├── default.js              # Default settings
│   │   ├── index.js                # Configuration entry point
│   │   └── prod.js                 # Production settings (overrides the default settings)
│   ├── components                  # Reusable components (including scss files)
│   ├── containers                  # Container components (including scss files)
│   ├── actions                     # Redux actions
│   ├── reducers                    # Redux reducers
│   ├── utils                       # App-wide utils (e.g. HTML component)  
│   ├── theme                       # App-wide style and vendor CSS framework
│   ├── types                       # Flow types for reducer, action, state, store
│   │── configureStore.js           # Configure and instrument Redux store
│   ├── client.js                   # App bootstrap and rendering (webpack entry)
│   ├── routes.js                   # Routes configuration for both client and server side
│   └── server.js                   # Express server (with webpack dev/hot middlewares)
├── tools                           # Project related configurations (build etc.)
│   ├── flow                        # Flow types, interface, module aliasing definitions
│   ├── openBrowser                 # Utility for opening Google Chrome
│   ├── jest                        # Jest CSS modules and assets mocks settings
│   ├── webpack                     # Webpack settings
│   │   ├── config.babel.js         # Webpack configuration
│   │   └── WIT.config.js           # Webpack Isomorphic Tools configuration file
└── index.js                        # App entry point
```

## Server-Side Security and Performance

Concerning the security and performance of Express in production, there is already some middleware setup for you:

* [helmet](https://github.com/helmetjs/helmet) - Helps secure Express server with various HTTP headers.
* [hpp](https://github.com/analog-nico/hpp) - Express middleware to protect against HTTP Parameter Pollution attacks.
* [compression](https://github.com/expressjs/compression) - Gzip compression support for speeding up Express server responses.

> Note: It's just a basic protected mechanism for your app, you can see the [security best practices](https://expressjs.com/en/advanced/best-practice-security.html) for more advanced configuration.

## Setup Redux DevTools Extension

The [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) let us wire up our Redux app to a time-traveling debugger. It's enabled in development only. You can follow these installation guides to use it:

**For Chrome**

* from [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd);
* or build it with `npm i && npm run build:extension` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./build/extension`;
* or run it in dev mode with `npm i && npm start` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./dev`.

**For Firefox**

* from [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/remotedev/);
* or build it with `npm i && npm run build:firefox` and [load the extension's folder](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) `./build/firefox` (just select a file from inside the dir).

**For Electron**

* just specify `REDUX_DEVTOOLS` in [`electron-devtools-installer`](https://github.com/GPMDP/electron-devtools-installer).

**For other browsers and non-browser environment**

* use [`remote-redux-devtools`](https://github.com/zalmoxisus/remote-redux-devtools).

## Overview

### Stateless Functional Components

[React 0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html) introduced a simpler way to define components called [stateless functional components](https://facebook.github.io/react/docs/components-and-props.html). These components are written in plain javascript functions. In the starter boilerplate I use it wherever possible.

### Adding Routes

This starter use [React Router v4](https://reacttraining.com/react-router/) library to manage our routes. You can setup your routes in `./src/routes.js`. For example:

```javascript
import MyRouteComponent from './containers/MyRouteComponent';

// ...

export default [
  {
    // Define your route path
    path: '/myPath',
    // If the route matches the location.pathname exactly or not (used for index route usually)
    exact: true,
    // Add your route component here
    component: MyRouteComponent,
    // Add your sub route component here
    routes: [
      {
        path: '/myPath/mySubPath',
        component: MySubRouteComponent
      }
    ]
    // ...
  }
  // Setup other routes...
];
```

### Data Fetching from Server-side

Just write Redux actions and stores as normal (read the [Redux](http://redux.js.org/docs/basics/) guide if you are new). The starter using [axios](https://github.com/mzabriskie/axios) as the data fetcher, it's quite simple and easy to use. If the action creator is asynchronous then it will return a Promise (or a Promise.all) in the inner function.

Register the action(s) in `./src/routes.js`, which have to be called from server-side:

```javascript
// ...

export default [
  {
    // ...
    loadData: dispatch =>
      Promise.all([
        // Register your server-side call action(s) here
        dispatch(myReduxAction())
      ])
  }
  // ...
];
```

The action(s) will be dispatched through `./src/server.js` on server-side:

```javascript
// ...

app.get('*', (req, res) => {
  // ...

  // Here's the method for loading data from server-side
  const loadBranchData = (): Promise<*> | Object => {
    const promises = [];

    routes.some(route => {
      const match = matchPath(req.url, route);

      // $FlowFixMe: the params of pre-load actions are dynamic
      if (match && route.loadData)
        promises.push(route.loadData(store.dispatch, match.params));

      return match;
    });

    return Promise.all(promises);
  };

  // ...
});

// ...
```

On client-side, don't forget to invoke the action(s) in `componentDidMount`. This ensures that if the component is reached on the client, then the same actions will be invoked. It's up to the action(s) to figure out if fetches for data need to be made or not:

```javascript
componentDidMount() {
  // Invoke your redux action(s) for client rendering
  this.props.myReduxAction();
}
```

### Managing Title, Meta, Styles and Scripts

The parent `App.js` defines the base title and meta in a `<Helmet {...config.app} />` component. Any sub-component can override/add properties (supports meta, link, script, style tags and html attributes). See the [react-helmet](https://github.com/nfl/react-helmet) documents for more info.

### App config

You can store app settings under `./src/config`. By default the `default.js` will be loaded. If the `process.env.NODE_ENV` matches to production, the `prod.js` will be used instead, and it inherits the data info from `default.js`.

You can access the correct config with:

```javascript
import config from './config';
```

### Styles

The starter supports CSS, SASS and [CSS modules](https://github.com/css-Modules/css-Modules) is enabled by default. I use [PostCSS](https://github.com/postcss/postcss-loader) plugin to parse CSS and add autoprefixer to your stylesheet. You can access your stylesheet with two ways.

With CSS modules:

```javascript
import styles from './styles.scss';

// ...

render() {
  return (
    <div className={styles.myClass}>   // The className matches one of CSS classes in your SCSS file
      <Helmet title="Home" />
      {this.renderUserList()}
    </div>
  );
}
```

Without CSS modules (you need to turn off CSS modules from `./tools/webpack/config.babel.js`):

```javascript
import index.scss;

// ...

render() {
  return (
    <div className="myClass">    // Use the CSS class as normal
      <Helmet title="Home" />
      {this.renderUserList()}
    </div>
  );
}
```

By the way, if you want to use your based style or a vendor CSS framework, just import it through the `./src/containers/App/index.js` file, for example:

```javascript
import '../../theme/normalize.css'; // Import a vendor stylesheet here
import styles from index.scss; // Import your based stylesheet here

export default routes => {
  // ...
};
```

For the better development experience, don't forget to include those files in the `./src/utils/Html.js`, for example:

```javascript
// ...

  {
    _.keys(assets.styles).length === 0 ?
      <style
        dangerouslySetInnerHTML={{ __html:
          // Include the vendor CSS framework and your own style here
          require('../theme/normalize.css')._style +
          require('../containers/App/styles.scss')._style +
          // Other styles...
        }}
      />
      : null
  }

// ...
```

### Image and Font

It's super easy to render the image and font both on client and server, the usage would be like below.

Using image:

```javascript
// Require an image
<img src={require('./assets/logo.svg')} alt="Logo" role="presentation" />
```

Using font-awesome:

```javascript
// With CSS modules
import styles from './styles.scss';

// ...

return (
  <div>
    <div>
      <i className={styles.iconUser} /> Welly
    </div>
  </div>
);

// Without CSS modules
import './font-awesome.css';

// ...

return (
  <div>
    <div>
      <i className="fa fa-user" /> Welly
    </div>
  </div>
);
```

For using CSS modules, you have to set the proper font path in your scss/sass file:

```
$fa-font-path:"../node_modules/font-awesome/fonts";
@import "../node_modules/font-awesome/scss/font-awesome";
.icon-user {
  @extend .fa;
  @extend .fa-user;
}
```

### Boost App Performance by Shallow Compare

If your React component's render() function renders the same result given the same props and state, you can use [React.PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent) for performance boost.

React.PureComponent is exactly like React.Component but implements `shouldComponentUpdate()` with a shallow prop and state comparison. See the [Optimizing Performance](https://facebook.github.io/react/docs/optimizing-performance.html#examples) topic for more info.

How we implemented the optimizing:

```javascript
import React, { PureComponent } from 'react';

// ...

class Home extends PureComponent {
  // Use PureComponent instead of Component
  // ...
}
```

### Type Checking by Flow

[Flow](https://flow.org), a static type checker for javascript. It adds static typing to javascript to improve developer productivity and code quality. In particular, static typing offers benefits like early error checking, which helps you avoid certain kinds of runtime failures, and code intelligence, which aids code maintenance, navigation, transformation, and optimization.

Flow’s static analysis makes building web apps with React safe by tracking the types of props and state. Flow understands which props are required and also supports default props.

I love to write React, Redux with Flow, I know it's not easy to learn at the beginning. But trust me, it's worth to learn. There're some useful instructions that I can give you as below:

* If you are new to Flow, read the official [docs](https://flow.org/en/docs/) to understand it.

* Learn how to use Flow with React from [here](https://flow.org/en/docs/react/).

* Here's [an example](https://github.com/reactjs/redux/tree/master/examples/todos-flow), which shows you the overall concept of integrating Flow with Redux.

Moreover, often you will want to use third-party libraries. For these circumstances, Flow supports the concept of a "libdef" ("Library Definition") which allows you to describe the interface and types of the library separate from the library and without needing to add types to or change the library itself. You can write a libdef file yourself if you need to or use [flow-typed](https://flowtype.org/docs/third-party.html#using-flow-typed), which is a repository of third-party library interface definitions for use with Flow.

> Note: If you don't want to use Flow, just remove the `/* @flow */` comment and related typing definitions from each javascript file.

### JavaScript and Style Lint

[JavaScript lint](https://github.com/MoOx/eslint-loader) and [style lint](https://github.com/JaKXz/stylelint-webpack-plugin) are included into webpack compiling for runtime checking. If you want them to terminate webpack build process while an error occurs, you can enable those from `./tools/webpack/config.babel.js` (Default: false):

```javascript
// ...

// Enable build process terminated while there's an eslint error
const eslint = true;
// Enable build process terminated while there's an stylelint error
const stylelint = true;

// ...
```

You can also use [istanbul's ignore hints](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes) to specify specific lines of code in a javascript file to skip code coverage.

## Troubleshooting

* If you get the the following message during developing, try to run `yarn build` to create the necessary `webpack-assets.json` file for enable related assets (e.g. javascript, styles, image etc.) working on universal rendering.

> webpack-isomorphic-tools (waiting for the first webpack build to finish)

* If you encounter the markup mismatches error (it's a react universal issue, which usually occurs due to the non-synchronized rendering result between client and server), you can do:

  * Restart the server to solve it.
  * Or for v16.1.0 up, you can use `suppressHydrationWarning` attribute for intentional client/server text mismatches ([#11126](https://github.com/facebook/react/pull/11126)).

* If you run the starter through a cloud computing service such as AWS EC2 instance etc. and you encounter an `UnhandledPromiseRejectionWarning` like this [issue](https://github.com/wellyshen/react-cool-starter/issues/76). It might be caused by the "openBrowser" tool. You can solve the issue as follows.

In the `./package.json` script:

```
// ...

"start:prod": {
  "command": "node ./index.js",
  "env": {
    "NODE_PATH": "./src",
    "NODE_ENV": "production",
    "PORT": 8080,
    "BROWSER": "none"   // Add this node variable to turn off the open browser util
  }
},

// ...
```

* If you are on windows and encounter the following error: Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style. The following rule must be added to `./package.json`.

```
"linebreak-style": 0
```

So it will look like:

```
// ...
 "rules": {
      "linebreak-style": 0,
      "global-require": 0,
// ...
```
