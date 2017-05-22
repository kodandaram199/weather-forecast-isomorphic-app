import React from 'react';
import Search from '../../containers/Search';
import Weather from '../../containers/Weather';
import LocationsList from '../../components/LocationsList/LocationList';
import { fetchFrequentLocations, fetchLocation } from '../../actions/locations';
import { connect } from 'react-redux';
import LoginPage from '../../../Auth/components/Login';
import RegisterPage from '../../../Auth/components/Register';

function mapStateToProps(state) {
	return {
		location: state.location,
		weather: state.weather,
    auth: state.auth
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadData: (token) => {
		  token && dispatch(fetchFrequentLocations(token));
      dispatch(fetchLocation());
		}
	};
}

class App extends React.Component{
	componentWillMount(){

	}

  componentDidMount(){
	  const token = localStorage.getItem('accessToken');
    this.props.loadData(token);
  }

	render(){
		return(
			<div>
				<Search {...this.props}/>
        <LocationsList {...this.props}/>
				<Weather {...this.props}/>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

