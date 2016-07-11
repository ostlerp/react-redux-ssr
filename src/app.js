import React from 'react';
import routes from './routes';
import DevTools from './containers/DevTools/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { configureStore } from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;
const dest = document.getElementById('root');

console.log('The API path is ' + window.API_PATH);
console.log('The ENV is ' + process.env.NODE_ENV);

// Stylesheets
require('./assets/styles/main.scss');

// Vendor JS
require('./vendor/polyfills.js');

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

if (process.env.NODE_ENV !== 'production' && !window.devToolsExtension) {
  const devToolsDest = document.createElement('div');
  dest.parentNode.insertBefore(devToolsDest, dest.nextSibling);
  render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    devToolsDest
  );
}
