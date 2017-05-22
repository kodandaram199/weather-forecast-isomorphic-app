import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/App';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}


if (process.env.NODE_ENV !== 'production') {
  require('./containers/Weather');
  require('./containers/Auth/components/Login');
}

export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Auth/components/Login').default);
        });
      }}
    />
    <Route
      path="/weather"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Weather').default);
        });
      }}
    />
  </Route>
);
