import React, { PropTypes } from 'react';

class WeatherTemp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {temperature} = this.props;
    return (
      <div>
        { temperature && Object.keys(temperature).length > 0 &&
        <div>
          <h3>Temp - {temperature.temp}<sup>&#8451;</sup></h3>
          <h3>Max temp - {temperature.temp_max}<sup>&#8451;</sup></h3>
          <h3>Min Temp - {temperature.temp_min}<sup>&#8451;</sup></h3>
          <h3>Humidity - {temperature.humidity}</h3>
          <h3>Pressure - {temperature.pressure}</h3>
        </div>
        }
      </div>
    );
  }
}

WeatherTemp.propTypes = {
	temperature: PropTypes.object.isRequired
};

export default WeatherTemp;
