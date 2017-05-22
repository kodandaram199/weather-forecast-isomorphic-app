import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchWeather, fetchForecast } from '../actions/weather';
import WeatherCity from '../components/WeatherCity/WeatherCity';
import WeatherConditions from '../components/WeatherConditions/WeatherConditions';
import WeatherTemp from '../components/WeatherTemp/WeatherTemp';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import WeatherBackground from '../components/WeatherBackground/WeatherBackground';
import Loading from '../components/Loading/Loading';


class Weather extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      mounted: false
    }
  }

	componentWillUpdate(nextProps, nextState) {
		if (this.props.location !== nextProps.location) {
			const { latitude, longitude } = nextProps.location.location;
			if(nextProps.location.location.latitude && nextProps.location.location.longitude && !this.state.mounted)
			  this.updateWeather(`lat=${nextProps.location.location.latitude}&lon=${nextProps.location.location.longitude}`);
		}
	}

	updateWeather(params) {
    this.setState({mounted: true});
		this.props.dispatch(fetchWeather(params));
		this.props.dispatch(fetchForecast(params));
	}

	render() {
		const {weather_pending, weather_failed, current, forecast_pending, forecast_failed, forecast} = this.props.weather;
		return(
		  <div>
        { (weather_failed || forecast_failed) && <p>failed</p> }


        { (weather_pending ||  forecast_pending) && <Loading/> }


        {
          current && forecast && Array.isArray(forecast.list) && forecast.list.length > 0 &&
          <div className="container-fluid" style={{marginTop: "5%"}}>
            <div className="col-md-6">
              <WeatherForecast forecast={forecast.list}/>
            </div>
            <div className="col-md-6">
              <WeatherCity city={current.name}/>
              <WeatherTemp temperature={current.main}/>
              <WeatherConditions conditions={current.weather}/>
            </div>
          </div>
        }
      </div>
    )

	}
}

const mapStateToProps = (state) => {
	const { location, weather, auth } = state;

	return {
		location,
		weather,
    auth
	};
};

export default connect(mapStateToProps)(Weather);
