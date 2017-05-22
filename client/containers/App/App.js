import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render() {
    return (
      <div>
        <div>
          <Helmet
            title="Weather Forecast"
            titleTemplate="Weather Forecast"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default App;
