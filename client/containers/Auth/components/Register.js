import React from 'react';
import { registerUser } from '../actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (username, password) => {
      dispatch(registerUser(username, password))
    }
  };
}

class RegisterPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.auth && nextProps.auth.login && nextProps.auth.login.token){
      const {router} = this.context;
      router.push('/weather');
    }
  }

  handleRegister = () => {
    const { username, password } = this.state;
    this.props.register(username, password);
  };

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  };

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  };

  render() {
    return (
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading">Register</h2>
          <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Email Address" onChange={this.handleUsernameChange} required="" autofocus="" />
          <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} required=""/>
          <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleRegister}>Register</button>
        </form>
      </div>
    )
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);


