import React from 'react';
import { connect } from 'react-redux';
import { fetchWeather, fetchForecast } from '../actions/weather';
import { saveLocation } from '../actions/locations';
import TextField from 'material-ui/TextField';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			query: ""
		}
	}

	handleChange = (e) => {
		this.setState({query: e.target.value});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({query: ""});
		this.props.dispatch(fetchWeather(`q=${this.state.query}`));
		this.props.dispatch(fetchForecast(`q=${this.state.query}`));
	};

  handleFavorites = (e) => {
    const token = localStorage.getItem('accessToken');
    this.setState({query: ""});
    this.props.dispatch(saveLocation(this.state.query, token));
    this.props.dispatch(fetchWeather(`q=${this.state.query}`));
    this.props.dispatch(fetchForecast(`q=${this.state.query}`));
  };

	render() {
		return (
			<form className="form container" onSubmit={this.handleSubmit} style={{marginTop: "5%"}}>
				<h1 className="text-center">Search Location</h1>
        <div className="col-md-10">
          <TextField
            hintText="Enter Keyword"
            fullWidth={true}
            onChange = {this.handleChange}
            inputStyle={ {fontSize: "150%", textAlign: "center"}}
            value={this.state.query}
          />
        </div>
        <div className="col-md-2">
          <button type="button" onClick={this.handleFavorites} className="btn btn-primary">Add to Favorites</button>
        </div>
			</form>
		);
	}
}

Search = connect()(Search);

export default Search;
