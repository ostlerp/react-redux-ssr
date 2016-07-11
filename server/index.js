import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

const compiler = webpack(config);

if (process.env.NODE_ENV === 'local') {
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../src/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../src/routes';
import { fetchComponentData } from './util/fetchData';
import serverConfig from './config';

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(cookieParser());
app.use(Express.static(path.resolve(__dirname, '../')));

// Render Initial HTML
const renderFullPage = (html, initialState) => {

  let cssBundle = '';
  let jsBundle = 'app.js';
  if(process.env.NODE_ENV !== 'local'){
    let manifest = require('../dist/manifest.json');
    cssBundle = `<link rel="stylesheet" href="/dist/${manifest['main.css']}" />`;
    jsBundle = manifest['main.js'];
  }
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Redux SSR</title>
        ${cssBundle}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/${jsBundle}"></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    let state = {};
    const store = configureStore(state);

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res.status(200).end(renderFullPage(initialView, finalState));
      }).catch(err => {
        console.log('Error in server-side rendering:',err, err.stack);
      });
  });
});

function validUrl(url) {
  return (url.toLowerCase().indexOf('/invite') > -1
  || url.toLowerCase().indexOf('/reset') > -1);
}

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});

export default app;
