import React from 'react';
import { fetchWeather, fetchForecast } from '../../actions/weather';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    location: state.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (params, token) => {
      dispatch(fetchForecast(params, token));
      dispatch(fetchWeather(params, token))
    }
  };
}

class LocationsList extends React.Component{

  handleChange = (e) => {
    const token = localStorage.getItem('accessToken');
    this.props.fetchData(`q=${e.target.value}`, token);
  };

	render(){
		const {frequent_locations} = this.props.location;
		return(
			<div className="container text-center" style={{marginTop:"5%"}}>
        <h1>Your Favorite Searches</h1>
        <select className="form-control" onChange={this.handleChange}>
          {
          frequent_locations && Array.isArray(frequent_locations) && frequent_locations.map(item => {
            return(item['location'] && <option value={item['location']}>{item['location']}</option>)
          })
          }
        </select>
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
