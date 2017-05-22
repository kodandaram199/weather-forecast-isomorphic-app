import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

import App from './components/App/App';
import CustomAppBar from './components/App/AppBar'

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      render: true
    }
  }

  componentDidMount(){
    if(!localStorage.getItem('accessToken')){
      this.setState({render: false});
      this.context.router.push('/');
    }
  }

  handleLogout = (e) => {
    localStorage.removeItem('accessToken');
    this.context.router.push('/');
  };

  render(){
    return(
    <div>
      {this.state.render && <MuiThemeProvider>
        <div>
          <CustomAppBar logout={this.handleLogout}/>
          <App />
        </div>
      </MuiThemeProvider>
      }
    </div>
    )
  }
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default connect(
  mapStateToProps
)(Main);
