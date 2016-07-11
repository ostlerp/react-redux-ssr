import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './containers/App';


const routes = (
  <Route>
    <Route path="/**" component={App} />
  </Route>
);

export default routes;
