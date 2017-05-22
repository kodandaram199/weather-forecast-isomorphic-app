import React from 'react';
import { loginUser } from '../actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(loginUser(username, password))
    }
  };
}

class LoginPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      loginFailed: false
    }
  }

  componentWillReceiveProps(nextProps){

    if(nextProps && nextProps.auth && nextProps.auth.login && nextProps.auth.login.token){
      localStorage.setItem('accessToken', nextProps.auth.login.token);
      const {router} = this.context;
      router.push('/weather');
    }

    if(nextProps && nextProps.auth && nextProps.auth.login && nextProps.auth.login.err){
      this.setState({loginFailed: true})
    }

  }

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  };

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  };

  render() {
    return (
    <div>
      <div className="row">
        <div className="col-md-3"/>
        <div className="wrapper col-md-6">
          <form className="form-signin">
            <h2 className="form-signin-heading">Please login</h2>
            <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Email Address" onChange={this.handleUsernameChange} required="" autofocus="" />
            <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} required=""/>
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleLogin}>Login</button>
          </form>
          {this.state.loginFailed &&
          <div className="alert alert-danger">
            <strong>Something went wrong. Please try again ..!</strong>
          </div>
          }
        </div>
        <div className="col-md-3"/>
      </div>
    </div>
    )
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
