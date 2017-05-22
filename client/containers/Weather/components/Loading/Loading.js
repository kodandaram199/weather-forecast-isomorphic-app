import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends React.Component {
	render() {
		return (
			<div className="text-center">
				<CircularProgress size={60}/>
			</div>
		);
	}
}

export default Loading;
