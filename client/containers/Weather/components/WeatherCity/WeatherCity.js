import React, { PropTypes } from 'react';

const WeatherCity = ({ city }) => <h1 className="WeatherCity">{city}</h1>;

WeatherCity.propTypes = {
	city: PropTypes.string.isRequired
};

export default WeatherCity;
