import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

export default function Root(props) {
  return (
    <Provider store={props.store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
};
