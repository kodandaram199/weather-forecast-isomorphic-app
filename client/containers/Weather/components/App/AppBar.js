import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

class CustomAppBar extends Component {

	render() {
	  const {logout} = this.props;
		return (
			<div className="container-fluid">
				<AppBar
					title={"Weather Forecast"}
          			iconElementRight={<RaisedButton label="Logout" secondary={true} onClick={logout}/>}
				/>
			</div>
		);
	}
}

export default CustomAppBar;
